/* =========================================================
   ELEMENTS
========================================================= */

const loader = document.getElementById("loader");

const app = document.getElementById("app");

const envelopeStage =
  document.getElementById("envelopeStage");

const openButton =
  document.getElementById("openButton");

const attendBtn =
  document.getElementById("attendBtn");

const declineBtn =
  document.getElementById("declineBtn");

const guests =
  document.getElementById("guests");


/* =========================================================
   LOADING
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

  if (opened) return;

  opened = true;


  /*
    المرحلة الأولى:
    فتح الـ FLAP
  */

  envelopeStage.classList.add("opened");


  /*
    المرحلة الثانية:
    تحريك الظرف قليلًا
  */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

  }, 350);


  /*
    المرحلة الثالثة:
    إخراج الورقة من داخل الظرف
  */

  setTimeout(() => {

    envelopeStage.classList.add("paper-out");

  }, 700);


  /*
    المرحلة الرابعة:
    إخفاء الظرف بعد خروج الورقة
  */

  setTimeout(() => {

    envelopeStage.classList.add("finished");

  }, 2300);


  /*
    المرحلة الخامسة:
    إظهار صفحة الدعوة
  */

  setTimeout(() => {

    app.classList.add("show-invitation");

  }, 2700);

});


/* =========================================================
   RSVP
========================================================= */

attendBtn.addEventListener("click", () => {

  attendBtn.classList.add("selected");

  declineBtn.classList.remove("selected");

  guests.classList.add("show");

});


declineBtn.addEventListener("click", () => {

  declineBtn.classList.add("selected");

  attendBtn.classList.remove("selected");

  guests.classList.remove("show");

});
