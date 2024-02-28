import java.io.*;

import java.util.List;
import java.util.Properties;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.simple.JSONObject;

import com.catalyst.advanced.CatalystAdvancedIOHandler;

import com.zc.component.mail.ZCMail;
import com.zc.component.mail.ZCMailContent;

import java.util.ArrayList;

@WebServlet(name = "SendEmailMain", urlPatterns = { "/server/SendEmail/sendemail" })
@MultipartConfig

public class SendEmailMain implements CatalystAdvancedIOHandler {
    boolean DEBUG_MODE = true; // false for deployment server
    ZCMailContent mailContent = ZCMailContent.getInstance();
    ArrayList<File> attachments = new ArrayList<>();
    ArrayList<String> toMailList = new ArrayList<>();
    JSONObject responseData = new JSONObject();
    String clientEmail;
    String fromMail;
    String toMail;
    String clientIp;
    String domainType;
    String productType;
    String orgType;
    String redirectUrl;

    public File inputStreamToFile(InputStream inputStream, String fileName) {

        try {

            File tempFile = File.createTempFile(fileName, ".tmp");

            tempFile.deleteOnExit();

            try (OutputStream out = new FileOutputStream(tempFile)) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    out.write(buffer, 0, bytesRead);
                }
            }

            return tempFile;
        } catch (IOException e) {
            e.printStackTrace();

            return null;
        }
    }

    private String getClientIp(HttpServletRequest request) {

        String remoteAddr = "";

        if (request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }

        return remoteAddr;
    }

    @SuppressWarnings("unchecked")
    @Override
    public void runner(HttpServletRequest request, HttpServletResponse response) throws Exception {

        if (DEBUG_MODE) { // for localhost
            redirectUrl = "http://localhost:3000/app/?success=true";
            fromMail = ""; // from address
            toMail = ""; // to address
        } else { // Environment variable properties from catalyst
            redirectUrl = System.getenv("live_redirect_url");
            fromMail = System.getenv("sender_email");
            toMail = System.getenv("receiver_email");
        }

        if (ServletFileUpload.isMultipartContent(request)) {
            try {

                DiskFileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);

                List<FileItem> items = upload.parseRequest(request);

                for (FileItem item : items) {
                    if (item.isFormField()) {
                        String fieldName = item.getFieldName();
                        String fieldValue = item.getString();
                        System.out.println(fieldName + " : " + fieldValue);

                        switch (fieldName) {
                            case "email":
                                clientEmail = fieldValue;
                                break;

                            case "domain_type":
                                domainType = fieldValue;
                                break;
                            case "product_type":
                                if (fieldValue == "all_product") {
                                    productType = "All products";
                                } else {
                                    productType = "Particular product";
                                }
                                break;
                            case "org_type":
                                if (fieldValue == "whole_org") {
                                    orgType = "Entrire Organization";
                                } else {
                                    orgType = "Few users";
                                }
                                break;
                            default:
                                break;
                        }

                    } else {
                        String fileName = item.getName();
                        InputStream fileContent = item.getInputStream();
                        File outputFile = inputStreamToFile(fileContent, fileName);
                        attachments.add(outputFile);
                    }
                }
                clientIp = getClientIp(request);
                mailContent.setFromEmail(fromMail);
                mailContent.setAttachments(attachments);

                toMailList.add(toMail); // dev account
                mailContent.setToEmailList(toMailList);
                mailContent.setSubject("Customer raised an issue!!");
                mailContent.setHtmlMode(true);
                mailContent.setContent(
                        "<!DOCTYPE html><html lang='en'><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td,th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body><h2>Client Details</h2><table><tr><th>S.no</th><th>Details</th><th>Information</th></tr><tr><td>1</td><td>Client IP</td><td>"
                                + clientIp + "</td></tr><tr><td>2</td><td>Email</td><td>" + clientEmail
                                + "</td></tr><tr><td>3</td><td>Domain</td><td>" + domainType
                                + "</td></tr><tr><td>4</td><td>Product</td><td>" + productType
                                + "</td></tr><tr><td>5</td><td>Organization</td><td>" + orgType
                                + "</td></tr></table></body></html>");
                ZCMail.getInstance().sendMail(mailContent);
                responseData.put("message", "Form submitted successfully");
                response.setContentType("application/json");
                response.getWriter().write(responseData.toString());
                response.sendRedirect(redirectUrl);
                response.setStatus(200);

            } catch (FileUploadException e) {

                e.printStackTrace();
            }

        }
    }

}
