// fileData.js

let uploadedFiles = [];
let uploadedFilesFromDrive = [];

function addUploadedFile(file) {
  uploadedFiles.push(file);
}

function getUploadedFiles() {
  return uploadedFiles;
}

function resetUploadedFile() {
  uploadedFilesFromDrive = [];
}

function unlinkFiles(fileName) {
  var fs = require("fs");
  var filePath = "./logs/" + fileName;
  fs.unlinkSync(filePath);
  console.log("The file has deleted successfully!");
}

function unlinkFilesFromDrive(fileName) {
  var fs = require("fs");
  var filePath = "./driveLogs/" + fileName;
  fs.unlinkSync(filePath);
  console.log("The file has deleted successfully!");
}

module.exports = {
  addUploadedFile,
  getUploadedFiles,
  resetUploadedFile,
  unlinkFiles,
  unlinkFilesFromDrive,
};
