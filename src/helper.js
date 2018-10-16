import moment from 'moment';

export function getDaysOfTheWeek() {
  let weekday = moment().weekday();

  let weekDays = []
  for (let i = 0; i < 7; i ++) {
    weekDays.push(
      moment().subtract(weekday - i, 'days')
    )
  }
  return weekDays
}

export function notifyMe(msg, onClick) {
  let sendNoti = () => {
    var notification = new Notification('TomatoWorks', {
      body: msg,
      icon: 'favicon.png'
    });
    notification.onclick =  function(x) {
      window.focus(); this.close();
      if (onClick) {
        onClick();
      }
    };
  }

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    sendNoti()
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        sendNoti();
      }
    });
  }
  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}