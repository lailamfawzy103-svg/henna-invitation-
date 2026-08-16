/* =========================================================
   WEDDING INVITATION
   Ahmed & Shahd
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const EVENT_DATE = new Date(
  2026,
  7,
  20,
  21,
  0,
  0
);


/* =========================================================
   ELEMENTS
========================================================= */

const loader =
  document.getElementById("loader");

const app =
  document.getElementById("app");

const envelopeStage =
  document.getElementById("envelopeStage");

const envelope =
  document.getElementById("envelope");

const paperWrapper =
  document.getElementById("paperWrapper");

const openButton =
  document.getElementById("openButton");

const locationButton =
  document.getElementById("locationBtn");

const attendButton =
  document.getElementById("attendBtn");

const declineButton =
  document.getElementById("declineBtn");

const guests =
  document.getElementById("guests");

const guestCount =
  document.getElementById("guestCount");


/* =========================================================
   STATE
========================================================= */

let opened = false;

let countdownStarted = false;


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", function () {

  setTimeout(function () {

    if (loader) {
      loader.classList.add("hide");
    }

  }, 1500);

});


/* =========================================================
   OPEN ENVELOPE
========================================================= */

function openEnvelope() {

  if (opened) {
    return;
  }

  opened = true;


  if (openButton) {
    openButton.disabled = true;
  }


  /*
    STEP 1
    Flap opens.
  */

  if (envelope) {
    envelope.classList.add("opened");
  }


  /*
    STEP 2
    Paper starts coming out.
  */

  setTimeout(function () {

    if (envelope) {
      envelope.classList.add("paper-out");
    }

  }, 850);


  /*
    STEP 3
    Paper rises.
  */

  setTimeout(function () {

    if (envelope) {
      envelope.classList.add("transitioning");
    }

  }, 1450);


  /*
    STEP 4
    Paper becomes the invitation.
  */

  setTimeout(function () {

    if (envelope) {
      envelope.classList.add("show-invitation");
    }

  }, 2050);


  /*
    STEP 5
    Envelope fades away.
  */

  setTimeout(function () {

    if (envelope) {
      envelope.classList.add("finished");
    }

  }, 2700);


  /*
    STEP 6
    Countdown.
  */

  setTimeout(function () {

    startCountdown();

  }, 3000);

}


/* =========================================================
   OPEN BUTTON
========================================================= */

if (openButton) {

  openButton.addEventListener(
    "click",
    openEnvelope
  );

}


/* =========================================================
   LOCATION
========================================================= */

if (locationButton) {

  locationButton.addEventListener(
    "click",
    function () {

      const mapUrl =
        "https://www.google.com/maps";

      window.open(
        mapUrl,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =========================================================
   RSVP - ATTEND
========================================================= */

if (attendButton) {

  attendButton.addEventListener(
    "click",
    function () {

      attendButton.classList.add("selected");

      if (declineButton) {
        declineButton.classList.remove("selected");
      }

      if (guests) {
        guests.classList.add("show");
      }

    }
  );

}


/* =========================================================
   RSVP - DECLINE
========================================================= */

if (declineButton) {

  declineButton.addEventListener(
    "click",
    function () {

      declineButton.classList.add("selected");

      if (attendButton) {
        attendButton.classList.remove("selected");
      }

      if (guests) {
        guests.classList.remove("show");
      }

    }
  );

}


/* =========================================================
   GUEST COUNT
========================================================= */

if (guestCount) {

  guestCount.addEventListener(
    "change",
    function () {

      console.log(
        "Guest count:",
        guestCount.value
      );

    }
  );

}


/* =========================================================
   COUNTDOWN
========================================================= */

function pad(value) {

  return String(value).padStart(2, "0");

}


function startCountdown() {

  if (countdownStarted) {
    return;
  }

  countdownStarted = true;

  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );

}


function updateCountdown() {

  const now =
    new Date();

  const difference =
    EVENT_DATE.getTime() -
    now.getTime();


  if (difference <= 0) {

    updateCountdownValues(
      0,
      0,
      0,
      0
    );

    return;
  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  updateCountdownValues(
    days,
    hours,
    minutes,
    seconds
  );

}


function updateCountdownValues(
  days,
  hours,
  minutes,
  seconds
) {

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  if (daysElement) {

    daysElement.textContent =
      pad(days);

  }


  if (hoursElement) {

    hoursElement.textContent =
      pad(hours);

  }


  if (minutesElement) {

    minutesElement.textContent =
      pad(minutes);

  }


  if (secondsElement) {

    secondsElement.textContent =
      pad(seconds);

  }

}
