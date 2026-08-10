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
   LOADING
========================================================= */

window.addEventListener("load", function () {

  setTimeout(function () {

    loader.classList.add("hide");

  }, 1500);

});


/* =========================================================
   ENVELOPE OPENING
========================================================= */

let opened = false;


openButton.addEventListener("click", function () {

  if (opened) {
    return;
  }

  opened = true;


  /* -----------------------------------------
     Hide hint
  ----------------------------------------- */

  clickHint.style.opacity = "0";


  /* -----------------------------------------
     STEP 1
     Open flap completely
  ----------------------------------------- */

  envelopeStage.classList.add("opened");


  /* -----------------------------------------
     STEP 2
     Let flap finish opening first
     Then start paper movement
  ----------------------------------------- */

  setTimeout(function () {

    envelopeStage.classList.add("paper-out");

  }, 1450);


  /* -----------------------------------------
     STEP 3
     Let the envelope settle
  ----------------------------------------- */

  setTimeout(function () {

    envelopeStage.classList.add("transitioning");

  }, 3100);


  /* -----------------------------------------
     STEP 4
     Show invitation
  ----------------------------------------- */

  setTimeout(function () {

    app.classList.add("show-invitation");

  }, 3500);


  /* -----------------------------------------
     STEP 5
     Finish envelope transition
  ----------------------------------------- */

  setTimeout(function () {

    envelopeStage.classList.add("finished");

  }, 3900);


  /* -----------------------------------------
     STEP 6
     Enable scrolling
  ----------------------------------------- */

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

  attendBtn.addEventListener(
    "click",
    function () {

      attendBtn.classList.add("selected");

      declineBtn.classList.remove("selected");

      guests.classList.add("show");

    }
  );

}


/* =========================================================
   RSVP — DECLINE
========================================================= */

if (declineBtn) {

  declineBtn.addEventListener(
    "click",
    function () {

      declineBtn.classList.add("selected");

      attendBtn.classList.remove("selected");

      guests.classList.remove("show");

    }
  );

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
   RESET PARALLAX
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
   MOBILE DOUBLE TAP PROTECTION
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
