/* =========================================================
   ELEMENTS
========================================================= */

const openButton =
  document.getElementById("openButton");

const invitationStage =
  document.getElementById("envelopeStage");

const app =
  document.getElementById("app");

const loader =
  document.getElementById("loader");

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

window.addEventListener("load", function () {

  setTimeout(function () {

    loader.classList.add("hide");

  }, 1500);

});


/* =========================================================
   OPEN ENVELOPE
========================================================= */

openButton.addEventListener("click", function () {

  if (opened) return;

  opened = true;


  /*
    المرحلة الأولى:
    فتح الـ flap
  */

  invitationStage.classList.add("opened");


  /*
    المرحلة الثانية:
    تحريك الظرف قليلًا
  */

  setTimeout(function () {

    invitationStage.classList.add("transitioning");

  }, 350);


  /*
    المرحلة الثالثة:
    الورقة تبدأ في الخروج
  */

  setTimeout(function () {

    invitationStage.classList.add("paper-out");

  }, 850);


  /*
    المرحلة الرابعة:
    إظهار صفحة الدعوة
  */

  setTimeout(function () {

    app.classList.add("show-invitation");

  }, 2100);


  /*
    المرحلة الأخيرة:
    اختفاء الظرف بعد خروج الورقة
  */

  setTimeout(function () {

    invitationStage.classList.add("finished");

  }, 3000);

});


/* =========================================================
   RSVP - ATTEND
========================================================= */

attendBtn.addEventListener("click", function () {

  attendBtn.classList.add("selected");

  declineBtn.classList.remove("selected");

  guests.classList.add("show");

});


/* =========================================================
   RSVP - DECLINE
========================================================= */

declineBtn.addEventListener("click", function () {

  declineBtn.classList.add("selected");

  attendBtn.classList.remove("selected");

  guests.classList.remove("show");

});
