$(document).ready(() => {
  updateTracerouteDocumentContent();
});
var domainNames = {
  com: "<ol><li>service.zoho.com</li><li>accounts.zoho.com</li><li>h2-stratus.zohocdn.com</li><li>gsite.zohocdn.com</li><li>css.zohostatic.com</li></ol>",
  in: "<ol><li>service.zoho.in</li><li>accounts.zoho.in</li><li>h2-stratus.zohocdn.in</li><li>gsite.zohocdn.in</li><li>css.zohostatic.in</li></ol>",
  au: "<ol><li>service.zoho.au</li><li>accounts.zoho.au</li><li>h2-stratus.zohocdn.au</li><li>gsite.zohocdn.au</li><li>css.zohostatic.au</li></ol>",
  eu: "<ol><li>service.zoho.eu</li><li>accounts.zoho.eu</li><li>h2-stratus.zohocdn.eu</li><li>gsite.zohocdn.eu</li><li>css.zohostatic.eu</li></ol>",
  jp: "<ol><li>service.zoho.jp</li><li>accounts.zoho.jp</li><li>h2-stratus.zohocdn.jp</li><li>gsite.zohocdn.jp</li><li>css.zohostatic.jp</li></ol>",
  cn: "<ol><li>service.zoho.cn</li><li>accounts.zoho.cn</li><li>h2-stratus.zohocdn.cn</li><li>gsite.zohocdn.cn</li><li>css.zohostatic.cn</li></ol>",
  uk: "<ol><li>service.zoho.uk</li><li>accounts.zoho.uk</li><li>h2-stratus.zohocdn.uk</li><li>gsite.zohocdn.uk</li><li>css.zohostatic.uk</li></ol>",
  sa: "<ol><li>service.zoho.sa</li><li>accounts.zoho.sa</li></li><li>h2-stratus.zohocdn.sa</li><li>gsite.zohocdn.sa</li><li>css.zohostatic.sa</li></ol>",
  ca: "<ol><li>service.zoho.ca</li><li>accounts.zoho.ca</li></li><li>h2-stratus.zohocdn.ca</li><li>gsite.zohocdn.ca</li><li>css.zohostatic.ca</li></ol>",
};

var traceRouteContent = {
  windows:
    "<h3>Windows</h3><div class='warning'>Note: Traceroute on Windows is performed using the 'tracert' command.</div><h4>Step 1: Open Command Prompt</h4><p>Open the Command Prompt on your Windows system. You can do this by searching for 'cmd' in the Start menu.</p><h4>Step 2: Use the Tracert Command</h4><p>Use the following command to tracert a domain:</p><div class='terminal'><code>tracert [domain]</code></div><p>Replace <code>[domain]</code> with the domain you want to trace. For example:</p><div class='terminal'><code>tracert zoho.com</code></div><h4>Step 3: Analyze the Output</h4><p>The output will display the route taken by packets to reach the destination. Each line represents a hop, and you can see the IP addresses and response times.</p><h2>Example</h2><p>Here is an example of a traceroute to <code>zoho.com</code> on Linux:</p><div class='terminal'><code>traceroute zoho.com</code></div><p>And on Windows:</p><div class='terminal'><code>tracert zoho.com</code></div><h2>Conclusion</h2><p>Traceroute is a valuable tool for diagnosing network issues and understanding the path of data packets. Experiment with different domains and analyze the output to gain insights into your network connections.</p>",
  mac: "<h1>Traceroute Documentation</h1><h2>Introduction</h2><p>Traceroute is a network diagnostic tool that shows the route taken by packets across an IP network. It helps in identifying network delays and understanding the path taken by data packets.</p><h2>How to Traceroute a Domain</h2><h3>macOS</h3><h4>Step 1: Open Terminal</h4><p>Open the terminal on your macOS system. This can usually be done by searching for 'Terminal' in Spotlight or navigating to 'Applications' > 'Utilities' > 'Terminal.'</p><h4>Step 2: Use the Traceroute Command</h4><p>Use the following command to traceroute a domain:</p><div class='terminal'><code>traceroute [domain]</code></div><p>Replace <code>[domain]</code> with the domain you want to trace. For example:</p><div class='terminal'><code>traceroute zoho.com</code></div><h4>Step 3: Analyze the Output</h4><p>The output will display the route taken by packets to reach the destination. Each line represents a hop, and you can see the IP addresses and response times.</p><h2>Example</h2><p>Here is an example of a traceroute to <code>zoho.com</code> on macOS:</p><div class='terminal'><code>traceroute zoho.com</code></div>",
  linux:
    "<h1>Traceroute in Linux Documentation</h1><h2>Introduction</h2><p>Traceroute is a network diagnostic tool that shows the route taken by packets across an IP network. It helps in identifying network delays and understanding the path taken by data packets.</p><h2>How to Traceroute a Domain in Linux</h2><h3>Step 1: Open Terminal</h3><p>Open the terminal on your Linux system. This can usually be done by pressing <code>Ctrl + Alt + T</code>.</p><h3>Step 2: Use the Traceroute Command</h3><p>Use the following command to traceroute a domain:</p><pre><code>traceroute [domain]</code></pre><p>Replace <code>[domain]</code> with the domain you want to trace. For example:</p><pre><code>traceroute zoho.com</code></pre><h3>Step 3: Analyze the Output</h3><p>The output will display the route taken by packets to reach the destination. Each line represents a hop, and you can see the IP addresses and response times.</p><h2>Example</h2><p>Here is an example of a traceroute to <code>zoho.com</code>:</p><pre><code>traceroute zoho.com</code></pre>",
};

var harDocumentContent =
  "<h1>Download HAR File Documentation</h1><h2>Introduction</h2><p>This documentation provides instructions on how to download a HAR (HTTP Archive) file from the Google Chrome browser using its built-in Developer Tools. </p><h2>Instructions for Google Chrome</h2><ul class='chrome-steps'><li class='chrome-step'><span>Step 1:</span> Open the Chrome Developer Tools: Right-click on the page and select 'Inspect' or press <code>Ctrl + Shift + I</code> (Windows/Linux) or <code>Cmd + Opt + I</code> (Mac) to open the Developer Tools. </li><li class='chrome-step'><span>Step 2:</span> Go to the 'Network' tab.</li><li class='chrome-step'><span>Step 3:</span> Perform the actions on the website for which you want to capture network traffic.</li><li class='chrome-step'><span>Step 4:</span> Once the network requests are recorded, right-click anywhere on the grid and select 'Save as HAR with Content' or 'Save all as HAR with Content'.</li></ul>";

function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

document.getElementById("defaultOpen").click();

function updateTracerouteDocumentContent() {
  var contentContainer = document.getElementById("tracerouteContent");

  var e = document.getElementById("domain_type");
  var selectedOption = e.options[e.selectedIndex].text;
  switch (selectedOption) {
    case "com":
      contentContainer.innerHTML = domainNames["com"];
      break;
    case "in":
      contentContainer.innerHTML = domainNames["in"];
      break;
    case "au":
      contentContainer.innerHTML = domainNames["au"];
      break;

    case "eu":
      contentContainer.innerHTML = domainNames["eu"];
      break;

    case "jp":
      contentContainer.innerHTML = domainNames["jp"];
      break;

    case "cn":
      contentContainer.innerHTML = domainNames["cn"];
      break;

    case "uk":
      contentContainer.innerHTML = domainNames["uk"];
      break;

    case "sa":
      contentContainer.innerHTML = domainNames["sa"];
      break;

    case "ca":
      contentContainer.innerHTML = domainNames["ca"];
      break;
    default:
  }
}

function sendResponse() {
  $("form").submit(function (event) {
    event.preventDefault();
    var formData = new FormData($("#form")[0]);

    $.ajax({
      url: "/server/SendEmail/sendemail",
      type: "post",
      contentType: false,
      processData: false,
      data: formData,
      success: function (data) {
        showSubmittingAnimation("Submit");
        document.getElementById("form").reset();
        console.log(data);
      },
      error: function (error) {
        alert(error);
      },
    });
  });
  showSubmittingAnimation("Submitting...");
}

function moveToHelpTabContent() {
  document.getElementById("openHelpTab").click();
}

function validateForm() {
  var form = document.forms["formName"];
  var email = form["email"].value;
  var domain_type = form["domain_type"].value;
  var screenshots = form["tr-screenshots"].value;
  var product_type = form["product_type"].value;
  var org_type = form["org_type"].value;
  var har = form["har"].value;
  if (email == "") {
    alert("Email must be filled out");
    return false;
  }
  if (domain_type == "") {
    alert("Domain type must be filled out");
    return false;
  }
  if (screenshots == "") {
    alert("Traceroute screenshots must be uploaded");
    return false;
  }
  if (product_type == "") {
    alert("Product type must be filled out");
    return false;
  }
  if (org_type == "") {
    alert("Organization type must be filled out");
    return false;
  }
  if (har == "") {
    alert("HAR files must be uploaded");
    return false;
  }

  sendResponse();
  return true;
}
function showSubmittingAnimation(buttonText) {
  var btn = document.getElementById("btn");
  btn.textContent = buttonText;
}
function getDocDetails() {
  var platform = navigator.platform;
  var traceroute = document.getElementById("helpTabContent-tr");
  var har = document.getElementById("helpTabContent-har");
  if (platform.includes("Win32") || platform.includes("Win64")) {
    traceroute.innerHTML = traceRouteContent["windows"];
  } else if (platform.includes("Linux")) {
    traceroute.innerHTML = traceRouteContent["linux"];
  } else if (
    platform.includes("Mac68K") ||
    platform.includes("MacPPC") ||
    platform.includes("MacIntel")
  ) {
    traceroute.innerHTML = traceRouteContent["mac"];
  }
  har.innerHTML = harDocumentContent;
}
