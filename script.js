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
   LOADING SCREEN
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

  if (opened) {
    return;
  }

  opened = true;


  /* =======================================================
     STEP 1
     HIDE CLICK HINT
  ======================================================= */

  clickHint.style.opacity = "0";


  /* =======================================================
     STEP 2
     OPEN ENVELOPE
  ======================================================= */

  envelopeStage.classList.add(
    "opened"
  );


  /* =======================================================
     STEP 3
     SPARKLE
  ======================================================= */

  setTimeout(() => {

    envelopeStage.classList.add(
      "sparkle"
    );

  }, 1900);


  /* =======================================================
     STEP 4
     AS PAPER STARTS APPROACHING
  ======================================================= */

  setTimeout(() => {

    envelopeStage.classList.add(
      "invitation-expand"
    );

  }, 2150);


  /* =======================================================
     STEP 5
     REAL INVITATION APPEARS
  ======================================================= */

  setTimeout(() => {

    app.classList.add(
      "show-invitation"
    );

  }, 2350);


  /* =======================================================
     STEP 6
     ENVELOPE STARTS FADING
  ======================================================= */

  setTimeout(() => {

    envelopeStage.classList.add(
      "envelope-hide"
    );

  }, 3550);


  /* =======================================================
     STEP 7
     REMOVE ENVELOPE SCREEN
  ======================================================= */

  setTimeout(() => {

    envelopeScreen.classList.add(
      "completely-hidden"
    );

    envelopeStage.classList.add(
      "finished"
    );

  }, 4100);


  /* =======================================================
     STEP 8
     RESTORE SCROLL
  ======================================================= */

  setTimeout(() => {

    document.body.style.overflowY =
      "auto";

  }, 4200);

});


/* =========================================================
   RSVP
========================================================= */

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


/* =========================================================
   DESKTOP ENVELOPE PARALLAX
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
   RESET PARALLAX WHEN OPENING
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
