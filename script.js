/* =========================================================
   ELEMENTS
========================================================= */

const loader =
  document.getElementById("loader");

const app =
  document.getElementById("app");

const envelopeStage =
  document.getElementById("envelopeStage");

const openButton =
  document.getElementById("openButton");

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
   OPEN ENVELOPE
========================================================= */

openButton.addEventListener("click", () => {

  if (opened) return;

  opened = true;

  openButton.disabled = true;

  clickHint.style.opacity = "0";


  /* =====================================================
     STEP 1
     الفلاب يفتح فقط
  ===================================================== */

  envelopeStage.classList.add("opened");


  /* =====================================================
     STEP 2
     الورقة تطلع وهي بنفس شكل ومقاس الظرف
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

    envelopeStage.classList.add("paper-out");

  }, 700);


  /* =====================================================
     STEP 3
     الورقة تبدأ تكبر بعد ما خرجت
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("paper-expand");

  }, 2100);


  /* =====================================================
     STEP 4
     إخفاء الظرف فقط
     
     الورقة خارج envelope لذلك لن تختفي معه.
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("finished");

  }, 3500);


  /* =====================================================
     STEP 5
     إظهار صفحة الدعوة
  ===================================================== */

  setTimeout(() => {

    app.classList.add("show-invitation");

  }, 3900);

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
