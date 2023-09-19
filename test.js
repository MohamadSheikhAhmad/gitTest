//const intervalID = setInterval(myCallback, 500, "Parameter 1", "Parameter 2");
const mongoose = require("mongoose");
const Admin = mongoose.mongo.Admin;

function myCallback(a, b) {
  console.log(a);
  console.log(b);
}

/**
 * Add the date time variable to the object when openining new connection to the database
 * create a worker thread with a seperated file
 * in the file the worker checks for the array of objects that contains the connections
 * if 25 minutes have been passed from the current time and the time the connection have
 * been established delete the connetion
 * the worker will go and check each 10 minutes
 * in addition each time we request a connection we update the time variable in the connection
 */
const ob = [];

const time2 = "09/09/2023 15:20:45";

//const differenceInMilliseconds = Date.parse() - Date.parse(time2);
//const differenceInMinutes = differenceInMilliseconds / 1000 / 60;

function getCurrentDate(today) {
  return (
    (today.getDate() < 10 ? "0" : "") +
    today.getDate() +
    "/" +
    (today.getMonth() + 1 < 10 ? "0" : "") +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear()
  );
}
function getCurrentTime(today) {
  return (
    (today.getHours() < 10 ? "0" : "") +
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? "0" : "") +
    today.getMinutes() +
    ":" +
    (today.getSeconds() < 10 ? "0" : "") +
    today.getSeconds()
  );
}

function gettime() {
  let today = new Date();
  ob.push(today);
}

function deletetime() {
  const time1 = new Date();
  var differenceInMilliseconds;
  var differenceInsec;
  for (let i = 0; i < ob.length; i++) {
    differenceInMilliseconds = time1 - ob[i];
    differenceInsec = differenceInMilliseconds / 1000;
    if (differenceInsec > 5) {
      console.log(differenceInsec);
      ob.splice(i, 1);
    }
  }
}

setInterval(gettime, 2500);
setInterval(deletetime, 6000);
