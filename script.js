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

const paperWrapper =
  document.getElementById("paperWrapper");

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
     FLAP OPENS
     
     الفلاب يبدأ يرفع.
  ===================================================== */

  envelopeStage.classList.add("opened");


  /* =====================================================
     STEP 2
     PAPER APPEARS FROM INSIDE
     
     بعد ما الفلاب يرفع جزء منه،
     الورقة تظهر من جوه الظرف.
     
     مهم:
     هنا لا نطلع الورقة بالكامل.
     فقط نرفعها قليلًا بحيث يظهر الجزء
     العلوي منها من داخل الظرف.
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("paper-visible");

    /*
      الورقة تفضل داخل أبعاد الظرف،
      لكن نرفعها قليلًا لأعلى.

      z-index = 36
      أعلى من جسم الظرف السفلي 35
      وأقل من الفلاب 40.
    */

    paperWrapper.style.zIndex = "36";

    paperWrapper.style.top = "43%";

    paperWrapper.style.width = "min(87vw, 610px)";

    paperWrapper.style.height = "auto";

    paperWrapper.style.transform =
      "translate(-50%, -50%)";

  }, 700);


  /* =====================================================
     STEP 3
     PAPER STARTS COMING OUT
     
     بعد ما يظهر جزء من الورقة،
     تبدأ فعلًا في الخروج من الظرف.
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

    envelopeStage.classList.add("paper-out");

    /*
      الورقة أصبحت فوق الظرف بالكامل
      أثناء الخروج.
    */

    paperWrapper.style.zIndex = "45";

  }, 1450);


  /* =====================================================
     STEP 4
     ENVELOPE DISAPPEARS
     
     الورقة تكون خرجت وكبرت،
     وبعدها الظرف يختفي.
  ===================================================== */

  setTimeout(() => {

    envelopeStage.classList.add("finished");

  }, 2700);


  /* =====================================================
     STEP 5
     INVITATION PAGE APPEARS
  ===================================================== */

  setTimeout(() => {

    app.classList.add("show-invitation");

  }, 3250);

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
