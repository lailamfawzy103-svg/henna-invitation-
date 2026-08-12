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
     فتح الـ FLAP
     
     الورقة لسه جوه الظرف
  ===================================================== */

  envelopeStage.classList.add("opened");


  /* =====================================================
     STEP 2
     إظهار جزء من الـ INVITATION
     
     بعد ما الـ flap يرفع،
     جزء من الدعوة يظهر من جوه الظرف
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("paper-visible");

  }, 850);


  /* =====================================================
     STEP 3
     الدعوة تبدأ تخرج من جوه الظرف
     
     تخرج وهي بنفس مقاس الظرف
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

    envelopeStage.classList.add("paper-out");

  }, 1250);


  /* =====================================================
     STEP 4
     الدعوة تكمل خروجها وتبدأ تكبر
     
     هنا بنظهر الـ invitation page
     بعد ما الورقة خرجت فعليًا من الظرف
  ===================================================== */

  setTimeout(() => {

    app.classList.add("show-invitation");

  }, 2350);


  /* =====================================================
     STEP 5
     الظرف يختفي بعد ما الدعوة أصبحت هي الشاشة
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("finished");

  }, 3000);

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
