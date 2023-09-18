var today = new Date();

function getCurrentDate() {
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
function getCurrentTime() {
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

function getDate() {
  return getCurrentDate() + " " + getCurrentTime();
}
module.exports = {
  getDate,
};
