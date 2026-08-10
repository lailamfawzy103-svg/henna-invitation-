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


  /* -----------------------------------------
     STEP 1
     Hide click hint
  ----------------------------------------- */

  clickHint.style.opacity = "0";


  /* -----------------------------------------
     STEP 2
     Open flap
  ----------------------------------------- */

  envelopeStage.classList.add("opened");


  /* -----------------------------------------
     STEP 3
     Paper comes out
     
     IMPORTANT:
     The paper does NOT appear immediately.
  ----------------------------------------- */

  setTimeout(() => {

    envelopeStage.classList.add("paper-out");

  }, 1250);


  /* -----------------------------------------
     STEP 4
     Move envelope away
  ----------------------------------------- */

  setTimeout(() => {

    envelopeStage.classList.add("transitioning");

  }, 2650);


  /* -----------------------------------------
     STEP 5
     Show invitation
  ----------------------------------------- */

  setTimeout(() => {

    app.classList.add("show-invitation");

    envelopeStage.classList.add("finished");


    /*
      Prevent scrolling during
      the transition.
    */

    document.body.style.overflowY =
      "hidden";

  }, 3050);


  /* -----------------------------------------
     STEP 6
     Restore normal scrolling
  ----------------------------------------- */

  setTimeout(() => {

    document.body.style.overflowY =
      "auto";


    /*
      Move viewport to invitation.
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

attendBtn.addEventListener(
  "click",
  () => {

    attendBtn.classList.add("selected");

    declineBtn.classList.remove("selected");

    guests.classList.add("show");

  }
);


declineBtn.addEventListener(
  "click",
  () => {

    declineBtn.classList.add("selected");

    attendBtn.classList.remove("selected");

    guests.classList.remove("show");

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
        (event.clientX /
          window.innerWidth - .5) * 2;


      const y =
        (event.clientY /
          window.innerHeight - .5) * 2;


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
