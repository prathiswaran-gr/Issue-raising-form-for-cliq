$(document).ready(() => {
  window.alert = () => {};
  updateTracerouteDocumentContent();
  handleSuccess();
});

var domainName = "zoho";
var domainExtension = "com";
var routeCommand = "traceroute"; // for mac and linux by default

var domainNames = {
  com: "<ol><li>cliq.zoho.com</li><li>accounts.zoho.com</li><li>static.zohocdn.com</li></ol>",
  in: "<ol><li>cliq.zoho.in</li><li>accounts.zoho.in</li><li>static.zohocdn.com</li></ol>",
  au: "<ol><li>cliq.zoho.com.au</li><li>accounts.zoho.com.au</li><li>static.zohocdn.com</li></ol>",
  eu: "<ol><li>cliq.zoho.eu</li><li>accounts.zoho.eu</li><li>static.zohocdn.com</li></ol>",
  jp: "<ol><li>cliq.zoho.jp</li><li>accounts.zoho.jp</li><li>static.zohocdn.com</li></ol>",
  cn: "<ol><li>cliq.zoho.com.cn</li><li>accounts.zoho.com.cn</li><li>static.zohocdn.com</li></ol>",
  uk: "<ol><li>cliq.zoho.uk</li><li>accounts.zoho.uk</li><li>static.zohocdn.com</li></ol>",
  sa: "<ol><li>cliq.zoho.sa</li><li>accounts.zoho.sa</li><li>static.zohocdn.com</li></ol>",
  ca: "<ol><li>cliq.zohocloud.ca</li><li>accounts.zohocloud.ca</li><li>static.zohocdn.com</li></ol>",
};

var traceRouteContent = {
  windows:
    "<h3>Traceroute documentation for Windows</h3><div class='warning'>Note: Traceroute on Windows is performed using the 'tracert' command.</div><h4>Step 1: Open Command Prompt</h4><p>Open the Command Prompt on your Windows system. You can do this by searching for 'cmd' in the Start menu.</p><h4>Step 2: Use the Tracert Command</h4><p>Use the following command to tracert a domain:</p><pre><code>tracert [domain]</code></pre><p>Replace <code>[domain]</code> with the domain you want to trace. For example:</p><pre><code id='copy-content'></code><span title='copy to clipboard' class='copy-icon'><span id='copy-icn' onclick='copyToClipboard()'>&#128203</span></span></pre><h4>Step 3: Analyze the Output</h4><p>The output will display the route taken by packets to reach the destination.</h4>",

  mac: "<h1>Traceroute Documentation</h1><h2>Introduction</h2><p>Traceroute is a network diagnostic tool that shows the route taken by packets across an IP network. It helps in identifying network delays and understanding the path taken by data packets.</p><h2>How to Traceroute a Domain</h2><h3>macOS</h3><h4>Step 1: Open Terminal</h4><p>Open the terminal on your macOS system. This can usually be done by searching for 'Terminal' in Spotlight or navigating to 'Applications' > 'Utilities' > 'Terminal.'</p><h4>Step 2: Use the Traceroute Command</h4><p>Use the following command to traceroute a domain:</p><pre><code>traceroute [domain]</code></pre><p>Replace <code>[domain]</code> with the domain you want to trace. For example:</p><pre><code id='copy-content'></code><span title='copy to clipboard' class='copy-icon'><span id='copy-icn' onclick='copyToClipboard()'>&#128203</span></span></pre><h4>Step 3: Analyze the Output</h4><p>The output will display the route taken by packets to reach the destination. Each line represents a hop, and you can see the IP addresses and response times.</p>",
  linux:
    "<h1>Traceroute in Linux Documentation</h1><h2>Introduction</h2><p>Traceroute is a network diagnostic tool that shows the route taken by packets across an IP network. It helps in identifying network delays and understanding the path taken by data packets.</p><h2>How to Traceroute a Domain in Linux</h2><h3>Step 1: Open Terminal</h3><p>Open the terminal on your Linux system. This can usually be done by pressing <code>Ctrl + Alt + T</code>.</p><h3>Step 2: Use the Traceroute Command</h3><p>Use the following command to traceroute a domain:</p><pre><code>traceroute [domain]</code></pre><p>Replace <code>[domain]</code> with the domain you want to trace. For example:</p><pre><code id='copy-content'></code><span title='copy to clipboard' class='copy-icon'><span id='copy-icn' onclick='copyToClipboard()'>&#128203</span></span></pre><h3>Step 3: Analyze the Output</h3><p>The output will display the route taken by packets to reach the destination. Each line represents a hop, and you can see the IP addresses and response times.</p>",
};
var harFileContent = {
  chrome:
    "<h1>Downloading HAR File from Chrome</h1><p>Follow the steps below to download a HAR file from the Chrome browser:</p><ol><li>Open Google Chrome on your computer.</li><li>Go to the webpage for which you want to capture network traffic.</li><li>Right-click anywhere on the page and select <strong>Inspect</strong> or press <code>Ctrl + Shift + I</code>.</li><li>Go to the <strong>Network</strong> tab in the Developer Tools.</li><li>Reload the page (you can press <code>Ctrl + R</code> or click the reload icon).</li><li>Click on the <strong>Export HAR</strong> button (a disk icon) to save the captured network traffic as a HAR file.</li></ol><p>Now you have successfully downloaded the HAR file from the Chrome browser.</p>",
  edge: "<h1>Downloading HAR File from Microsoft Edge</h1><p>Follow the steps below to download a HAR file from the Microsoft Edge browser:</p><ol><li>Open Microsoft Edge on your computer.</li><li>Go to the webpage for which you want to capture network traffic.</li><li>Right-click anywhere on the page and select <strong>Inspect</strong> or press <code>Ctrl + Shift + I</code>.</li><li>Go to the <strong>Network</strong> tab in the Developer Tools.</li><li>Reload the page (you can press <code>Ctrl + R</code> or click the reload icon).</li><li>Click on the <strong>Export HAR</strong> button (a floppy disk icon) to save the captured network traffic as a HAR file.</li></ol><p>Now you have successfully downloaded the HAR file from the Microsoft Edge browser.</p>",
  firefox:
    "<h1>Downloading HAR File from Mozilla Firefox</h1><p>Follow the steps below to download a HAR file from the Mozilla Firefox browser:</p><ol><li>Open Mozilla Firefox on your computer.</li><li>Go to the webpage for which you want to capture network traffic.</li><li>Right-click anywhere on the page and select <strong>Inspect Element</strong> or press <code>Ctrl + Shift + I</code>.</li><li>Go to the <strong>Network</strong> tab in the Developer Tools.</li><li>Reload the page (you can press <code>Ctrl + R</code> or click the reload icon).</li><li>Click on the <strong>Export</strong> button (a download icon) to save the captured network traffic as a HAR file.</li></ol><p>Now you have successfully downloaded the HAR file from the Mozilla Firefox browser.</p>",
  safari:
    "<h1>Downloading HAR File from Safari</h1><p>Follow the steps below to capture network traffic in Safari:</p><ol><li>Open Safari on your computer.</li><li>Go to the webpage for which you want to capture network traffic.</li><li>Enable the Developer menu in Safari. To do this, go to <strong>Safari</strong> -> <strong>Preferences</strong> -> <strong>Advanced</strong> and check the <strong>Show Develop menu in menu bar</strong> option.</li><li>Open the <strong>Develop</strong> menu in the menu bar and select <strong>Show Web Inspector</strong> or press <code>Option + Command + I</code>.</li><li>In the Web Inspector, go to the <strong>Network</strong> tab.</li><li>Reload the page.</li><li>Inspect the network requests and save the data using the options available in Safari's Web Inspector. Note: Safari might not provide a direct option to export as HAR, and you might need to manually save the data.</li></ol><p>Now you have captured network traffic data from Safari.</p>",
};

function updateDomain(extension) {
  if (extension == "au") {
    domainExtension = "com.au";
  } else if (extension == "cn") {
    domainExtension = "com.cn";
  } else if (extension == "ca") {
    domainName = "zohocloud";
  } else if (extension == "in") {
    domainExtension = "in";
  } else if (extension == "eu") {
    domainExtension = "eu";
  } else if (extension == "jp") {
    domainExtension = "jp";
  } else if (extension == "uk") {
    domainExtension = "uk";
  } else if (extension == "sa") {
    domainExtension = "sa";
  }
  getDocDetails();
}

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

function copyToClipboard() {
  var copyText = document.getElementById("copy-content");
  navigator.clipboard.writeText(copyText.innerHTML);
  document.getElementById("copy-icn").innerHTML = "&#x2713;";
  setTimeout(() => {
    document.getElementById("copy-icn").innerHTML = "&#128203";
  }, 1000);
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
  updateDomain(selectedOption);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function handleSuccess(data) {
  const successParam = getParameterByName("success");

  if (successParam === "true") {
    swal("Submitted", "Thanks for raising an issue!!", "success", {
      button: "Ok",
    });
  } else {
    // console.log("error");
  }
}
function sendResponse() {
  $("form").submit(function (event) {
    var formData = new FormData($("#form")[0]);
    event.preventDefault();
    $.ajax({
      url: "/server/SendEmail/sendemail",
      type: "post",
      contentType: false,
      processData: false,
      data: formData,
      success: function (data) {
        showSubmittingAnimation("Submit");
        document.getElementById("form").reset();
      },
      error: function (error) {
        alert(error);
      },
    });
  });

  showSubmittingAnimation("Submitting...");
}

function getBrowserType() {
  if (navigator.userAgent.indexOf("Edge") != -1) {
    return "edge";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    alert("Firefox");
    return "firefox";
  } else {
    alert("unknown");
  }
}

function moveToHelpTabContent() {
  document.getElementById("openHelpTab").click();
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
    routeCommand = "tracert";
  } else if (platform.includes("Linux")) {
    traceroute.innerHTML = traceRouteContent["linux"];
  } else if (
    platform.includes("Mac68K") ||
    platform.includes("MacPPC") ||
    platform.includes("MacIntel")
  ) {
    traceroute.innerHTML = traceRouteContent["mac"];
  }
  document.getElementById("copy-content").textContent =
    routeCommand + " cliq." + domainName + "." + domainExtension;

  var browserType = getBrowserType();
  if (browserType == "chrome") {
    har.innerHTML = harFileContent["chrome"];
  } else if (browserType == "safari") {
    har.innerHTML = harFileContent["safari"];
  } else if (browserType == "firefox") {
    har.innerHTML = harFileContent["firefox"];
  } else {
    har.innerHTML = harFileContent["edge"];
  }
}
