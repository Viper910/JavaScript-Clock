let time;
let alarmList = [];

function getMonth(month) {
  switch (month + 1) {
    case 1:
      return "January";
      break;

    case 2:
      return "February";
      break;

    case 3:
      return "March";
      break;

    case 4:
      return "April";
      break;

    case 5:
      return "May";
      break;

    case 6:
      return "June";
      break;

    case 7:
      return "July";
      break;

    case 8:
      return "August";
      break;

    case 9:
      return "September";
      break;

    case 10:
      return "October";
      break;

    case 11:
      return "November";
      break;

    case 12:
      return "December";
      break;
  }
}

function getDay(day) {
  switch (day) {

    case 0:
      return "Sunday";
      break;

    case 1:
      return "Monday";
      break;

    case 2:
      return "Tuesday";
      break;

    case 3:
      return "Wednesday";
      break;

    case 4:
      return "Thursday";
      break;

    case 5:
      return "Friday";
      break;

    case 6:
      return "Saturday";
      break;

  }
}

function giveDate() {
  const clock = new Date();
  const [month, date, year, day] = [
    clock.getMonth(),
    clock.getDate(),
    clock.getFullYear(),
    clock.getDay(),
  ];
  document.getElementsByClassName("date")[0].innerHTML =
    getDay(day) + ", " + date + "/" + getMonth(month) + "/" + year;
}

function giveTime() {
  const clock = new Date();
  let hr = checktime(clock.getHours());
  let min = checktime(clock.getMinutes());
  let sec = checktime(clock.getSeconds());
  let timeformat = converTo_12hr(hr, min, sec);
  alarmCheck(hr, min, sec);
  document.getElementsByClassName("time")[0].innerHTML = timeformat;
}

function converTo_12hr(hr, min, sec) {
  let hour;
  if (hr > 12) {
    hour = ((hr + 11) % 12) + 1;
    return (time = hour + ":" + min + ":" + sec + " PM");
  } else {
    return (time = hr + ":" + min + ":" + sec + " AM");
  }
}

function checktime(i) {
  if (i < 10) {
    return "0" + i;
  } else {
    return i;
  }
}

function alarmCheck(hr, min, sec) {
  let sethr, setmin;
  let setsec = "00";
  alarmList.forEach((element) => {
    sethr = parseInt(element.slice(0, 2));
    setmin = element.slice(3, 5);
    if (hr == sethr && min == setmin && setsec == sec) {
      let audio = new Audio("alarmtune.mp3");
      audio.play();
    }
  });
}

function setAlarm() {
  let value = document.getElementsByClassName("setalarm")[0].value;
  if (value == "") {
    alert("Select proper time");
  } else {
    alarmList.push(value);
    var hr = checktime(parseInt(value.slice(0, 2)));
    var min = checktime(parseInt(value.slice(3, 5)));
    var correcttime = converTo_12hr(hr, min, "00");
    var para = document.createElement("P");
    para.innerHTML = correcttime;
    document.getElementById("alarm-list-section").appendChild(para);
  }
}

function clear() {
  alarmList = [];
  document.getElementById("alarm-list-section").innerHTML = "";
}

setInterval(giveTime, 1000);
setInterval(giveDate, 1000);

document.getElementsByClassName("submit")[0].addEventListener("click", setAlarm);

document.getElementsByClassName("submit")[1].addEventListener("click", clear);
