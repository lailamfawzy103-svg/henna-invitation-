/* =========================================================
   ELEMENTS
========================================================= */

const loader = document.getElementById("loader");

const app = document.getElementById("app");

const envelopeStage =
  document.getElementById("envelopeStage");

const openButton =
  document.getElementById("openButton");

const envelope =
  document.getElementById("envelope");

const paperWrapper =
  document.getElementById("paperWrapper");

const clickHint =
  document.getElementById("clickHint");

const attendBtn =
  document.getElementById("attendBtn");

const declineBtn =
  document.getElementById("declineBtn");

const guests =
  document.getElementById("guests");


/* =========================================================
   STATE
========================================================= */

let opened = false;


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("hide");

  }, 1500);

});


/* =========================================================
   OPEN INVITATION
========================================================= */

openButton.addEventListener("click", () => {

  if (opened) return;

  opened = true;

  /*
    امنع الضغط مرة ثانية
  */

  openButton.disabled = true;

  /*
    اخفاء hint
  */

  clickHint.style.opacity = "0";


  /* =====================================================
     STEP 1
     فتح الـ flap
  ===================================================== */

  envelopeStage.classList.add("opened");


  /*
    نستنى فتح الـ flap
    قبل ما الورقة تبدأ تتحرك.
  */

  setTimeout(() => {

    /* ===================================================
       STEP 2
       الورقة تبدأ الخروج
    =================================================== */

    envelopeStage.classList.add("transitioning");

    envelopeStage.classList.add("paper-out");

  }, 650);


  /*
    ندي الورقة وقت كافي عشان تخرج بالكامل.
  */

  setTimeout(() => {

    /* ===================================================
       STEP 3
       الظرف يبدأ يتحرك للخلف
    =================================================== */

    envelopeStage.classList.add("finished");

  }, 2350);


  /*
    بعد اختفاء الظرف:
    نظهر صفحة الدعوة.
  */

  setTimeout(() => {

    app.classList.add("show-invitation");

  }, 2850);

});


/* =========================================================
   RSVP — ATTEND
========================================================= */

attendBtn.addEventListener("click", () => {

  attendBtn.classList.add("selected");

  declineBtn.classList.remove("selected");

  guests.classList.add("show");

});


/* =========================================================
   RSVP — DECLINE
========================================================= */

declineBtn.addEventListener("click", () => {

  declineBtn.classList.add("selected");

  attendBtn.classList.remove("selected");

  guests.classList.remove("show");

});


/* =========================================================
   PREVENT DOUBLE TAP / ZOOM ON SEAL
========================================================= */

openButton.addEventListener(
  "touchstart",
  (event) => {

    event.preventDefault();

  },
  {
    passive: false
  }
);
