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


    /* ================================================
       HIDE HINT
    ================================================= */

    clickHint.style.opacity = "0";


    /* ================================================
       STOP PARALLAX
    ================================================= */

    envelope.style.transform =
      "translate(-50%, -50%)";


    /* ================================================
       STEP 1
       فتح الأربع جوانب
    ================================================= */

    envelopeStage.classList.add(
      "opened"
    );


    /*
      مدة فتح الظرف:
      حوالي 1.9 ثانية
    */


    /* ================================================
       STEP 2
       بعد ما الظرف يفتح بالكامل
       الورقة تصبح أمام الطبقات
    ================================================= */

    setTimeout(() => {

      envelopeStage.classList.add(
        "paper-visible"
      );

    }, 1950);


    /* ================================================
       STEP 3
       الورقة تبدأ تقرب
       بعد انتهاء فتح الظرف
    ================================================= */

    setTimeout(() => {

      envelopeStage.classList.add(
        "invitation-expand"
      );

    }, 2050);


    /* ================================================
       STEP 4
       لمعة خفيفة أثناء اقتراب الورقة
    ================================================= */

    setTimeout(() => {

      envelopeStage.classList.add(
        "sparkle"
      );

    }, 2250);


    /* ================================================
       STEP 5
       بعد انتهاء حركة الورقة
       نظهر الـInvitation
    ================================================= */

    setTimeout(() => {

      app.classList.add(
        "show-invitation"
      );

    }, 3900);


    /* ================================================
       STEP 6
       إخفاء الظرف بعد ظهور الـInvitation
    ================================================= */

    setTimeout(() => {

      envelopeStage.classList.add(
        "envelope-hide"
      );

    }, 4050);


    /* ================================================
       STEP 7
       إخفاء شاشة الظرف
    ================================================= */

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

if (attendBtn && declineBtn && guests) {

  attendBtn.addEventListener(
    "click",
    () => {

      attendBtn.classList.add(
        "selected"
      );

      declineBtn.classList.remove(
        "selected"
      );

      guests.classList.add(
        "show"
      );

    }
  );


  declineBtn.addEventListener(
    "click",
    () => {

      declineBtn.classList.add(
        "selected"
      );

      attendBtn.classList.remove(
        "selected"
      );

      guests.classList.remove(
        "show"
      );

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
