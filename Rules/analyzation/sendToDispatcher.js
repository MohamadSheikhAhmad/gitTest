var request = require("request");

function sendToDispatcher(abnormalErrors, file_analyzed, req, jira) {
  //
  const clientIP = req.ip; // This will give you the IP address of the client (IoT device)
  const sendData = {
    errors: abnormalErrors,
    date: file_analyzed.file_date,
    file_name: file_analyzed.file_name,
    userName: file_analyzed.userName,
    email: req.user.email,
    companyName: req.user.companyName,

    phone: req.user.phone,
  };
  if (jira > 0) {
    sendData.jiraBaseUrl = req.body.jiraBaseUrl;
    sendData.jiraEmail = req.body.jiraEmail;
    sendData.apiToken = req.body.apiToken;
    sendData.projectKey = req.body.projectKey;
    sendData.IOT_IP = req.body.IOT_IP;
  }
  console.log(JSON.stringify(req.user.phone));
  var clientServerOptions = {
    uri: "http://localhost:8080/reportError",
    body: JSON.stringify(sendData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(clientServerOptions, function (error, response) {
    //console.log(error,response.body);
    return;
  });
}

module.exports = sendToDispatcher;
