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


  /* -------------------------
     Hide click hint
  ------------------------- */

  clickHint.style.opacity = "0";


  /* -------------------------
     STEP 1
     Open flap
  ------------------------- */

  envelopeStage.classList.add("opened");


  /* -------------------------
     STEP 2
     Paper comes out
  ------------------------- */

  setTimeout(() => {

    envelopeStage.classList.add("paper-out");

  }, 1350);


  /* -------------------------
     STEP 3
     Move envelope slightly
  ------------------------- */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

  }, 2850);


  /* -------------------------
     STEP 4
     Show invitation
  ------------------------- */

  setTimeout(() => {

    app.classList.add("show-invitation");

    envelopeStage.classList.add("finished");

    document.body.style.overflowY = "hidden";

  }, 3350);


  /* -------------------------
     STEP 5
     Enable page scrolling
  ------------------------- */

  setTimeout(() => {

    document.body.style.overflowY = "auto";

    window.scrollTo({
      top: envelopeScreen.offsetHeight,
      behavior: "instant"
    });

  }, 4050);

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


/* =========================================================
   DESKTOP PARALLAX
========================================================= */

const desktopPointer =
  window.matchMedia("(pointer:fine)");


if (desktopPointer.matches) {

  document.addEventListener(
    "mousemove",
    (event) => {

      if (opened) {
        return;
      }


      const x =
        (event.clientX /
          window.innerWidth - 0.5) * 2;


      const y =
        (event.clientY /
          window.innerHeight - 0.5) * 2;


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
   RESET PARALLAX AFTER CLICK
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
   MOBILE DOUBLE TAP PROTECTION
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
