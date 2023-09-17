//var express = require("express");
//var app = express();
//var cors = require("cors");
//var bodyParser = require("body-parser");

var express = require("express");
var router = express.Router();
var multer = require("multer");

const fileData = require("./fileData"); // Import the fileData module
const workerHandler = require("./routes/file");
const { startLogListener } = require("./routes/listener");
const { pollFile } = require("./routes/gDrive"); // Import the Google Drive functionality
const { Auth } = require("../middlewares/Auth");

const {
  getMongooseConnection,
  checkFileCollectionExistence,
} = require("../DataBase/DBmongoose");

//const port = 5000;

let logFolder = "D:/test listener";
const filesSet = new Set(); // Store modified or added files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "logs/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//app.use(cors());

// Use upload.array() to handle multiple files
router.post(
  "/logs",
  upload.array("files", 10),
  Auth,
  async function (req, res) {
    // 'files' should match the name attribute in your frontend form
    // The second argument (10) represents the maximum number of files allowed; adjust as needed
    // Handle the uploaded files here, for example:
    const uploadedFiles = req.files;
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    // You can process each file as needed; for example, logging their original names
    let failedToUpload = await checkCollections(
      uploadedFiles,
      req.user.companyName
    );
    console.log(failedToUpload);
    workerHandler(req.user.companyName);
    if (failedToUpload.length > 0) {
      res.json({
        message:
          "Files: " +
          fileData.getUploadedFiles() +
          " uploaded successfully except : " +
          failedToUpload,
      });
    } else {
      res.json({
        message: "Files uploaded successfully:" + fileData.getUploadedFiles(),
      });
    }
  }
);

async function checkCollections(uploadedFiles, databaseName) {
  const collectionlist = await checkFileCollectionExistence(databaseName);

  let failure = [];
  for (const file of uploadedFiles) {
    console.log("Uploaded file:", file.originalname);

    // const connection = await getMongooseConnection(databaseName);
    // const db = mongoose.connection;
    const collectionNameToCheck =
      "file_" + file.originalname.toLowerCase() + "s";

    try {
      //const collections = await db.db.listCollections().toArray();
      //const collectionNames = collections.map((collection) => collection.name);
      const collectionExists = collectionlist.includes(collectionNameToCheck);

      if (collectionExists) {
        failure.push(file.originalname);
      } else if (file.originalname.includes(".txt")) {
        fileData.addUploadedFile(file.originalname);
      } else {
        failure.push(file.originalname);
        fileData.unlinkFiles(file.originalname);
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log(failure);
  return failure;
}

var file = require("./routes/file");

router.use("/file", file);

//local folder watcher
router.post("/set-folder", Auth, (req, res) => {
  const { folderPath } = req.body;
  logFolder = folderPath;
  startLogListener(logFolder, filesSet, req.user.companyName); // Pass the filesSet to the local listener
  res.send(`Now watching: ${logFolder}`);
});

router.post("/file-changed", Auth, (req, res) => {
  const { eventType, filePath } = req.body;

  if (eventType === "add") {
    filesSet.add(filePath); // Add the filePath to the Set for new files
  } else if (eventType === "change") {
    filesSet.delete(filePath); // Remove the filePath if it was modified
    filesSet.add(filePath); // Add the modified filePath back to the Set
  }
  console.log(
    `${eventType === "add" ? "New file added:" : "File modified:"} ${filePath}`
  );
  // Handle the eventType and filePath as needed
  res.send("File change notification received.");
});

//google drive folder watcher
router.post("/set-drive-folder", Auth, (req, res) => {
  const { folderLink } = req.body; // Update variable name here
  let logDriveFolder = folderLink;
  pollFile(logDriveFolder, req.user.companyName); // Pass the folderLink to the local listener
  res.send(`Now watching: ${logDriveFolder}`);
});

router.get("/files", Auth, (req, res) => {
  res.send(Array.from(filesSet));
});

module.exports = router;
