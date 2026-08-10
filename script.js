/* =========================================================
   ELEMENTS
========================================================= */

const loader = document.getElementById("loader");

const app = document.getElementById("app");

const openButton = document.getElementById("openButton");

const envelopeStage =
  document.getElementById("envelopeStage");

const envelopeScreen =
  document.getElementById("envelopeScreen");

const clickHint =
  document.getElementById("clickHint");

const attendBtn =
  document.getElementById("attendBtn");

const declineBtn =
  document.getElementById("declineBtn");

const guests =
  document.getElementById("guests");

const envelope =
  document.getElementById("envelope");


/* =========================================================
   LOADING PAGE
========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("hide");

  }, 1500);

});


/* =========================================================
   OPEN ENVELOPE
========================================================= */

let opened = false;

openButton.addEventListener("click", () => {

  /* منع فتح الظرف أكثر من مرة */
  if (opened) {
    return;
  }

  opened = true;


  /* =======================================================
     STEP 1
     إخفاء جملة اضغطي لفتح الدعوة
  ======================================================= */

  clickHint.style.opacity = "0";


  /* =======================================================
     STEP 2
     فتح الفلاب بالكامل
  ======================================================= */

  envelopeStage.classList.add("opened");


  /* =======================================================
     STEP 3
     بعد فتح الفلاب تبدأ الورقة في الخروج
     
     الورقة تبدأ من داخل الظرف،
     مش من بره.
  ======================================================= */

  setTimeout(() => {

    envelopeStage.classList.add("paper-out");

  }, 1450);


  /* =======================================================
     STEP 4
     بعد خروج الورقة يحصل انتقال بسيط للظرف
  ======================================================= */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

  }, 3100);


  /* =======================================================
     STEP 5
     إظهار صفحة الانفتيشن
  ======================================================= */

  setTimeout(() => {

    app.classList.add("show-invitation");

    envelopeStage.classList.add("finished");

    /*
      نمنع السكرول أثناء الانتقال
    */
    document.body.style.overflowY = "hidden";

  }, 3500);


  /* =======================================================
     STEP 6
     السماح بالسكرول والانتقال للانفتيشن
  ======================================================= */

  setTimeout(() => {

    document.body.style.overflowY = "auto";


    window.scrollTo({

      top: envelopeScreen.offsetHeight,

      behavior: "instant"

    });

  }, 4200);

});


/* =========================================================
   RSVP — ATTEND
========================================================= */

if (attendBtn) {

  attendBtn.addEventListener("click", () => {

    attendBtn.classList.add("selected");

    declineBtn.classList.remove("selected");

    guests.classList.add("show");

  });

}


/* =========================================================
   RSVP — DECLINE
========================================================= */

if (declineBtn) {

  declineBtn.addEventListener("click", () => {

    declineBtn.classList.add("selected");

    attendBtn.classList.remove("selected");

    guests.classList.remove("show");

  });

}


/* =========================================================
   DESKTOP PARALLAX
========================================================= */

const desktopPointer =
  window.matchMedia("(pointer:fine)");


if (desktopPointer.matches) {

  document.addEventListener(
    "mousemove",
    (event) => {

      /*
        بعد فتح الظرف نوقف حركة الماوس
      */

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


      envelope.style.transform = `
        translate(-50%, -50%)
        rotateY(${x * 2}deg)
        rotateX(${y * -1.2}deg)
      `;

    }
  );

}


/* =========================================================
   RESET ENVELOPE POSITION
========================================================= */

openButton.addEventListener(
  "click",
  () => {

    envelope.style.transform =
      "translate(-50%, -50%)";

  },
  {
    once: true
  }
);


/* =========================================================
   MOBILE DOUBLE-TAP PROTECTION
========================================================= */

let lastTouchEnd = 0;

document.addEventListener(
  "touchend",
  (event) => {

    const now = Date.now();

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
