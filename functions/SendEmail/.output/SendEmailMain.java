import java.io.*;

import java.util.List;


import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.catalyst.advanced.CatalystAdvancedIOHandler;

import com.zc.component.mail.ZCMail;
import com.zc.component.mail.ZCMailContent;

import java.util.ArrayList;



@WebServlet(name = "SendEmailMain", urlPatterns = { "/server/SendEmail/sendemail" })
@MultipartConfig

public class SendEmailMain implements CatalystAdvancedIOHandler {

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

    ZCMailContent mailContent = ZCMailContent.getInstance();

    ArrayList<File> attachments = new ArrayList<>();
    ArrayList<String> toMailList = new ArrayList<>();
    String email = "";
    String clientIp = "";
    String domainType = "";
    String productType = "";
    String orgType = "";
    String DEVELOPER_ACCOUNT = "prathis.waran+1@zohotrainees.com";

    @SuppressWarnings("unchecked")
    @Override
    public void runner(HttpServletRequest request, HttpServletResponse response) throws Exception {

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
                            case "clientIp":
                                if (fieldValue == "" || fieldValue == null) {
                                    clientIp = "127.0.0.0";
                                    break;
                                }
                                clientIp = fieldValue;
                                break;
                            case "email":
                                email = fieldValue;
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

                mailContent.setFromEmail(email);
                mailContent.setAttachments(attachments);

                toMailList.add(DEVELOPER_ACCOUNT); // dev account
                mailContent.setToEmailList(toMailList);
                mailContent.setSubject("Customer raised an issue!!");
                mailContent.setHtmlMode(true);
                mailContent.setContent(
                        "<h2>Customer Details</h2><table><tr><th>S.no</th><th>Details</th><th>Info</th></tr><tr><td>1</td><td>Client IP</td><td>"
                                + clientIp + "</td></tr><tr><td>2</td><td>Email</td><td>" + email
                                + "</td></tr><tr><td>3</td><td>Domain</td><td>" + domainType
                                + "</td></tr><tr><td>4</td><td>Product</td><td>" + productType
                                + "</td></tr><tr><td>5</td><td>Organization</td><td>" + orgType
                                + "</td></tr></table>");
                ZCMail.getInstance().sendMail(mailContent);

                response.getWriter().write("Thanks for raising an issue");
                response.setStatus(200);

            } catch (FileUploadException e) {

                e.printStackTrace();
            }

        }
    }

}
