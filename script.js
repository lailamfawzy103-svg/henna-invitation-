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

window.addEventListener("load", function () {

  setTimeout(function () {

    loader.classList.add("hide");

  }, 1500);

});


/* =========================================================
   OPEN ENVELOPE
========================================================= */

let opened = false;


openButton.addEventListener("click", function () {

  /*
    منع الضغط أكثر من مرة
  */

  if (opened) {
    return;
  }

  opened = true;


  /*
    إخفاء النص الموجود تحت الظرف
  */

  if (clickHint) {
    clickHint.style.opacity = "0";
  }


  /*
    ---------------------------------------------
    STEP 1
    فتح الفلاب بالكامل
    ---------------------------------------------
  */

  envelopeStage.classList.add("opened");


  /*
    ---------------------------------------------
    STEP 2
    ننتظر الفلاب يخلص حركته
    ثم تبدأ الورقة في الخروج
    ---------------------------------------------
  */

  setTimeout(function () {

    envelopeStage.classList.add("paper-out");

  }, 1250);


  /*
    ---------------------------------------------
    STEP 3
    بعد ما الورقة تبدأ تخرج
    نخلي الظرف يستقر
    ---------------------------------------------
  */

  setTimeout(function () {

    envelopeStage.classList.add("transitioning");

  }, 2850);


  /*
    ---------------------------------------------
    STEP 4
    إظهار صفحة الدعوة
    ---------------------------------------------
  */

  setTimeout(function () {

    app.classList.add("show-invitation");

  }, 3350);


  /*
    ---------------------------------------------
    STEP 5
    إخفاء الظرف بعد اكتمال الانتقال
    ---------------------------------------------
  */

  setTimeout(function () {

    envelopeStage.classList.add("finished");

  }, 4000);


  /*
    ---------------------------------------------
    STEP 6
    السماح بالـscroll
    ---------------------------------------------
  */

  setTimeout(function () {

    document.body.style.overflowY = "auto";

    window.scrollTo({
      top: envelopeScreen.offsetHeight,
      behavior: "smooth"
    });

  }, 4200);

});


/* =========================================================
   RSVP — ATTEND
========================================================= */

if (attendBtn) {

  attendBtn.addEventListener("click", function () {

    attendBtn.classList.add("selected");

    if (declineBtn) {
      declineBtn.classList.remove("selected");
    }

    if (guests) {
      guests.classList.add("show");
    }

  });

}


/* =========================================================
   RSVP — DECLINE
========================================================= */

if (declineBtn) {

  declineBtn.addEventListener("click", function () {

    declineBtn.classList.add("selected");

    if (attendBtn) {
      attendBtn.classList.remove("selected");
    }

    if (guests) {
      guests.classList.remove("show");
    }

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
    function (event) {

      /*
        بعد الضغط لا نحرك الظرف بالماوس
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
   RESET PARALLAX WHEN OPENING
========================================================= */

openButton.addEventListener(
  "click",
  function () {

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
  function (event) {

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
