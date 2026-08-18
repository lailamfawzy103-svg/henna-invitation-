/* =========================================================
   ELEMENTS
========================================================= */

const loader =
  document.getElementById("loader");

const app =
  document.getElementById("app");

const openButton =
  document.getElementById("openButton");

const envelopeStage =
  document.getElementById("envelopeStage");

const envelopeScreen =
  document.getElementById("envelopeScreen");

const clickHint =
  document.getElementById("clickHint");

const envelope =
  document.getElementById("envelope");

const attendBtn =
  document.getElementById("attendBtn");

const declineBtn =
  document.getElementById("declineBtn");

const guests =
  document.getElementById("guests");

const guestName =
  document.getElementById("guestName");

const guestCount =
  document.getElementById("guestCount");

const rsvpSubmit =
  document.getElementById("rsvpSubmit");

const wishName =
  document.getElementById("wishName");

const wishText =
  document.getElementById("wishText");

const wishSubmit =
  document.getElementById("wishSubmit");


/* =========================================================
   GOOGLE APPS SCRIPT
========================================================= */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyBlHtGBJ6dsGTaM45BwJ2BytrsHmS8iH204o8RPvugQ5gs6AxJlWQ8d_1rDzpZ7jTn2w/exec";


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
   COUNTDOWN
========================================================= */

const eventDate =
  new Date(
    "2026-08-20T21:00:00"
  ).getTime();


function updateCountdown() {

  const now =
    new Date().getTime();

  const difference =
    eventDate - now;


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");


  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement
  ) {
    return;
  }


  if (difference <= 0) {

    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";

    return;
  }


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (
        difference %
        (1000 * 60 * 60 * 24)
      ) /
      (1000 * 60 * 60)
    );


  const minutes =
    Math.floor(
      (
        difference %
        (1000 * 60 * 60)
      ) /
      (1000 * 60)
    );


  daysElement.textContent =
    String(days).padStart(2, "0");

  hoursElement.textContent =
    String(hours).padStart(2, "0");

  minutesElement.textContent =
    String(minutes).padStart(2, "0");

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   OPEN ENVELOPE
========================================================= */

let opened = false;


if (openButton) {

  openButton.addEventListener(
    "click",
    function () {

      if (opened) {
        return;
      }

      opened = true;


      if (clickHint) {
        clickHint.style.opacity = "0";
      }


      if (envelope) {

        envelope.style.transform =
          "translate(-50%, -50%)";

      }


      if (envelopeStage) {

        envelopeStage.classList.add(
          "opened"
        );


        setTimeout(function () {

          envelopeStage.classList.add(
            "paper-visible"
          );

        }, 1950);


        setTimeout(function () {

          envelopeStage.classList.add(
            "invitation-expand"
          );

        }, 2050);


        setTimeout(function () {

          envelopeStage.classList.add(
            "sparkle"
          );

        }, 2250);

      }


      setTimeout(function () {

        if (app) {

          app.classList.add(
            "show-invitation"
          );

        }

      }, 3900);


      setTimeout(function () {

        if (envelopeStage) {

          envelopeStage.classList.add(
            "envelope-hide"
          );

        }

      }, 4050);


      setTimeout(function () {

        if (envelopeScreen) {

          envelopeScreen.classList.add(
            "completely-hidden"
          );

        }


        if (envelopeStage) {

          envelopeStage.classList.add(
            "finished"
          );

        }

      }, 4550);

    }
  );

}


/* =========================================================
   RSVP
========================================================= */

let attendanceChoice = "";


/* =========================================================
   SEND TO GOOGLE SHEET
========================================================= */

async function sendToGoogleSheet(data) {

  try {

    await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(data)
      }
    );

    return true;

  } catch (error) {

    console.error(
      "Google Sheet Error:",
      error
    );

    return false;

  }

}


/* =========================================================
   RSVP SUBMIT
========================================================= */

async function submitRSVP() {

  if (
    !guestName ||
    !rsvpSubmit
  ) {
    return;
  }


  const name =
    guestName.value.trim();


  if (!name) {

    alert(
      "من فضلك اكتبي الاسم أولًا."
    );

    guestName.focus();

    return;

  }


  if (!attendanceChoice) {

    alert(
      "من فضلك اختاري الحضور أو الاعتذار."
    );

    return;

  }


  let numberOfGuests = 0;


  if (
    attendanceChoice === "سأحضر"
  ) {

    numberOfGuests =
      Number(
        guestCount ? guestCount.value : 0
      );


    if (
      Number.isNaN(numberOfGuests) ||
      numberOfGuests < 0
    ) {

      numberOfGuests = 0;

    }


    if (
      numberOfGuests > 10
    ) {

      numberOfGuests = 10;

    }

  }


  const data = {

    type:
      "rsvp",

    name:
      name,

    attendance:
      attendanceChoice,

    guests:
      numberOfGuests

  };


  console.log(
    "RSVP DATA:",
    data
  );


  rsvpSubmit.disabled =
    true;

  rsvpSubmit.textContent =
    "جارِ الإرسال...";


  const success =
    await sendToGoogleSheet(
      data
    );


  if (success) {

    alert(
      "تم تسجيل ردك بنجاح ❤️"
    );


    rsvpSubmit.textContent =
      "تم الإرسال ✓";

  } else {

    alert(
      "حدث خطأ أثناء الإرسال، حاولي مرة أخرى."
    );


    rsvpSubmit.disabled =
      false;

    rsvpSubmit.textContent =
      "إرسال";

  }

}


/* =========================================================
   RSVP BUTTONS
========================================================= */

if (
  attendBtn &&
  declineBtn &&
  guests &&
  rsvpSubmit
) {


  /* =======================================================
     ATTEND
  ======================================================= */

  attendBtn.addEventListener(
    "click",
    function () {

      attendanceChoice =
        "سأحضر";


      attendBtn.classList.add(
        "selected"
      );


      declineBtn.classList.remove(
        "selected"
      );


      guests.classList.add(
        "show"
      );


      rsvpSubmit.classList.add(
        "show"
      );

    }
  );


  /* =======================================================
     DECLINE
  ======================================================= */

  declineBtn.addEventListener(
    "click",
    function () {

      attendanceChoice =
        "أعتذر عن الحضور";


      declineBtn.classList.add(
        "selected"
      );


      attendBtn.classList.remove(
        "selected"
      );


      guests.classList.remove(
        "show"
      );


      rsvpSubmit.classList.add(
        "show"
      );

    }
  );


  /* =======================================================
     RSVP SEND
  ======================================================= */

  rsvpSubmit.addEventListener(
    "click",
    async function () {

      await submitRSVP();

    }
  );

}


/* =========================================================
   GUEST WISHES
========================================================= */

if (
  wishName &&
  wishText &&
  wishSubmit
) {

  wishSubmit.addEventListener(
    "click",
    async function () {

      const name =
        wishName.value.trim();


      const message =
        wishText.value.trim();


      if (!name) {

        alert(
          "من فضلك اكتبي الاسم أولًا."
        );

        wishName.focus();

        return;

      }


      if (!message) {

        alert(
          "من فضلك اكتبي الأمنية."
        );

        wishText.focus();

        return;

      }


      wishSubmit.disabled =
        true;

      wishSubmit.textContent =
        "جارِ الإرسال...";


      const data = {

        type:
          "wish",

        name:
          name,

        message:
          message

      };


      console.log(
        "WISH DATA:",
        data
      );


      const success =
        await sendToGoogleSheet(
          data
        );


      if (success) {

        alert(
          "تم إرسال أمنيتك ❤️"
        );


        wishName.value =
          "";

        wishText.value =
          "";


        wishSubmit.textContent =
          "تم الإرسال ✓";

      } else {

        alert(
          "حدث خطأ أثناء الإرسال، حاولي مرة أخرى."
        );


        wishSubmit.disabled =
          false;

        wishSubmit.textContent =
          "إرسال";

      }

    }
  );

}


/* =========================================================
   DESKTOP PARALLAX
========================================================= */

const desktopPointer =
  window.matchMedia(
    "(pointer:fine)"
  );


if (
  desktopPointer.matches &&
  envelope
) {

  document.addEventListener(
    "mousemove",
    function (event) {

      if (opened) {
        return;
      }


      const x =
        (
          event.clientX /
          window.innerWidth -
          0.5
        ) * 2;


      const y =
        (
          event.clientY /
          window.innerHeight -
          0.5
        ) * 2;


      envelope.style.transform =
        "translate(-50%, -50%) " +
        "rotateY(" + (x * 2) + "deg) " +
        "rotateX(" + (y * -1.2) + "deg)";

    }
  );

}


/* =========================================================
   MOBILE DOUBLE TAP PROTECTION
========================================================= */

let lastTouchEnd = 0;


document.addEventListener(
  "touchend",
  function (event) {

    const now =
      Date.now();


    if (
      now - lastTouchEnd <= 300
    ) {

      event.preventDefault();

    }


    lastTouchEnd = now;

  },
  {
    passive: false
  }
);
