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

const wishName =
  document.getElementById("wishName");

const wishText =
  document.getElementById("wishText");


/* =========================================================
   GOOGLE APPS SCRIPT
========================================================= */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyBlHtGBJ6dsGTaM45BwJ2BytrsHmS8iH204o8RPvugQ5gs6AxJlWQ8d_1rDzpZ7jTn2w/exec";


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("hide");

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


openButton.addEventListener(
  "click",
  () => {

    if (opened) {
      return;
    }

    opened = true;


    clickHint.style.opacity = "0";


    envelope.style.transform =
      "translate(-50%, -50%)";


    envelopeStage.classList.add(
      "opened"
    );


    setTimeout(() => {

      envelopeStage.classList.add(
        "paper-visible"
      );

    }, 1950);


    setTimeout(() => {

      envelopeStage.classList.add(
        "invitation-expand"
      );

    }, 2050);


    setTimeout(() => {

      envelopeStage.classList.add(
        "sparkle"
      );

    }, 2250);


    setTimeout(() => {

      app.classList.add(
        "show-invitation"
      );

    }, 3900);


    setTimeout(() => {

      envelopeStage.classList.add(
        "envelope-hide"
      );

    }, 4050);


    setTimeout(() => {

      envelopeScreen.classList.add(
        "completely-hidden"
      );

      envelopeStage.classList.add(
        "finished"
      );

    }, 4550);

  }
);


/* =========================================================
   RSVP
========================================================= */

let attendanceChoice = "";


/* =========================================================
   SEND DATA TO GOOGLE SHEET
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

  if (!guestName) {
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
      guestCount &&
      guestCount.value !== ""
        ? Number(guestCount.value)
        : 0;

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


  const success =
    await sendToGoogleSheet(data);


  if (success) {

    alert(
      "تم تسجيل ردك بنجاح ❤️"
    );

  } else {

    alert(
      "حدث خطأ أثناء الإرسال، حاولي مرة أخرى."
    );

  }

}


/* =========================================================
   ATTEND BUTTON
========================================================= */

if (
  attendBtn &&
  declineBtn &&
  guests
) {

  attendBtn.addEventListener(
    "click",
    async () => {

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


      await submitRSVP();

    }
  );


  declineBtn.addEventListener(
    "click",
    async () => {

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


      await submitRSVP();

    }
  );

}


/* =========================================================
   GUEST WISHES BUTTON
========================================================= */

if (
  wishName &&
  wishText
) {

  const wishesSection =
    document.querySelector(
      ".wishes-section"
    );


  if (wishesSection) {

    const wishButton =
      document.createElement(
        "button"
      );


    wishButton.type =
      "button";


    wishButton.className =
      "wish-submit";


    wishButton.textContent =
      "إرسال";


    wishesSection.appendChild(
      wishButton
    );


    /* ================================================
       SEND WISH
    ================================================= */

    wishButton.addEventListener(
      "click",
      async () => {

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


        wishButton.disabled =
          true;


        wishButton.textContent =
          "جارِ الإرسال...";


        const data = {

          type:
            "wish",

          name:
            name,

          message:
            message

        };


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


          wishButton.textContent =
            "تم الإرسال ✓";


        } else {

          alert(
            "حدث خطأ أثناء الإرسال، حاولي مرة أخرى."
          );


          wishButton.disabled =
            false;


          wishButton.textContent =
            "إرسال";

        }

      }
    );

  }

}


/* =========================================================
   DESKTOP PARALLAX
========================================================= */

const desktopPointer =
  window.matchMedia(
    "(pointer:fine)"
  );


if (desktopPointer.matches) {

  document.addEventListener(
    "mousemove",
    (event) => {

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
        `
        translate(-50%, -50%)
        rotateY(${x * 2}deg)
        rotateX(${y * -1.2}deg)
        `;

    }
  );

}


/* =========================================================
   MOBILE DOUBLE TAP PROTECTION
========================================================= */

let lastTouchEnd = 0;


document.addEventListener(
  "touchend",
  (event) => {

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
