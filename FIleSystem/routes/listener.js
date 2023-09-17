const chokidar = require("chokidar");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { Worker } = require("worker_threads");
const collect = require("./gDrive");

function startLogListener(logFolder, filesSet, databaseName) {
  const watcher = chokidar.watch(logFolder, { persistent: true });
  const targetFolder = "./localLogs";

  // Function to process an individual file
  async function processFile(filePath) {
    const fileName = path.basename(filePath);
    console.log(fileName);
    console.log(`New file added or modified: ${filePath}`);

    // Copy the file to the target folder
    const targetFilePath = path.join(targetFolder, path.basename(filePath));
    try {
      if (fileName.includes(".txt")) {
        fs.copyFileSync(filePath, targetFilePath);
        collect.checkCollection(fileName);
        workerHandler(fileName, databaseName);
        console.log(`File copied to target folder: ${targetFilePath}`);
      }
    } catch (error) {
      console.error(`Error copying file: ${error.message}`);
    }

    // Send the eventType and filePath to the server
    axios.post("http://localhost:5000/filesystem/file-changed", {
      eventType: "add",
      filePath,
    });
  }

  // Watch for new changes or additions
  watcher.on("add", (filePath) => {
    processFile(filePath);
  });

  // Watch for changes to existing files
  watcher.on("change", (filePath) => {
    processFile(filePath);
  });

  // Handle initial scan of existing files
  watcher.on("ready", () => {
    const watchedDirectories = Object.keys(watcher.getWatched());
    watchedDirectories.forEach((dir) => {
      const files = watcher.getWatched()[dir];
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        processFile(filePath);
      });
    });
  });
}

function workerHandler(fileName, databaseName) {
  console.log("enterned");
  let worker = new Worker("./FIleSystem/routes/listenerWorker.js");
  worker.postMessage({ data: fileName, db: databaseName });
  worker.on("message", (data) => {
    console.log(data);
  });
}

module.exports = { startLogListener };
