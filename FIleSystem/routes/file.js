var express = require("express");
const fileData = require("../fileData"); // Import the fileData module
const { Worker } = require("worker_threads");

function workerHandler(databaseName) {
  console.log("enterned");
  console.log(fileData.getUploadedFiles());
  let worker = new Worker("./FIleSystem/routes/worker.js");
  worker.postMessage({ data: fileData.getUploadedFiles(), db: databaseName });
  worker.on("message", (data) => {
    console.log(data);
  });
}

module.exports = workerHandler;
