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

const paperWrapper =
  document.getElementById("paperWrapper");

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


/* =========================================================
   LOADING
========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("hide");

  }, 1500);

});


/* =========================================================
   OPEN SEQUENCE
========================================================= */

let opened = false;

openButton.addEventListener("click", () => {

  if (opened) return;

  opened = true;

  /*
    STEP 1
    Start opening flap.
  */

  envelopeStage.classList.add("opened");

  clickHint.style.opacity = "0";


  /*
    STEP 2
    Wait until flap has almost completely opened.
    Only then start moving the paper.
  */

  setTimeout(() => {

    envelopeStage.classList.add("paper-out");

  }, 1250);


  /*
    STEP 3
    Let paper finish coming out.
    Then transition toward the invitation.
  */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

  }, 2650);


  /*
    STEP 4
    Hide envelope screen.
    Show the real invitation page.
  */

  setTimeout(() => {

    app.classList.add("show-invitation");

    envelopeStage.classList.add("finished");

    /*
      Lock scroll briefly during transition.
    */

    document.body.style.overflowY = "hidden";

  }, 3050);


  /*
    STEP 5
    Restore normal page scrolling.
  */

  setTimeout(() => {

    document.body.style.overflowY = "auto";

    envelopeScreen.style.pointerEvents = "none";

    /*
      Start at the top of invitation.
    */

    window.scrollTo({
      top: envelopeScreen.offsetHeight,
      behavior: "instant"
    });

  }, 3800);

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

const envelope =
  document.getElementById("envelope");

if (
  window.matchMedia("(pointer:fine)").matches
) {

  document.addEventListener(
    "mousemove",
    (event) => {

      if (opened) return;

      const x =
        (event.clientX / window.innerWidth - .5) * 2;

      const y =
        (event.clientY / window.innerHeight - .5) * 2;

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
   PREVENT DOUBLE TAP ZOOM
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
