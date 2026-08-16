/* =========================================================
   WEDDING INVITATION
   أحمد & شهد
========================================================= */

(function () {

  "use strict";


  /* =========================================================
     CONFIG
  ========================================================= */

  var EVENT_DATE =
    new Date(2026, 7, 20, 21, 0, 0);


  /* =========================================================
     ELEMENTS
  ========================================================= */

  var loader =
    document.getElementById("loader");

  var app =
    document.getElementById("app");

  var envelopeStage =
    document.getElementById("envelopeStage");

  var envelope =
    document.getElementById("envelope");

  var paperWrapper =
    document.getElementById("paperWrapper");

  var openButton =
    document.getElementById("openButton");

  var clickHint =
    document.getElementById("clickHint");

  var locationButton =
    document.getElementById("locationButton");

  var attendButton =
    document.getElementById("attendBtn");

  var declineButton =
    document.getElementById("declineBtn");

  var guests =
    document.getElementById("guests");


  /* =========================================================
     LOADER
  ========================================================= */

  window.addEventListener(
    "load",
    function () {

      setTimeout(
        function () {

          loader.classList.add("hide");

        },
        1500
      );

    }
  );


  /* =========================================================
     ENVELOPE OPENING
  ========================================================= */

  var opened = false;


  openButton.addEventListener(
    "click",
    openEnvelope
  );


  function openEnvelope() {

    if (opened) {
      return;
    }

    opened = true;

    openButton.disabled = true;

    openButton.style.pointerEvents =
      "none";

    clickHint.style.opacity = "0";


    /* STEP 1 — FLAP */
    envelopeStage.classList.add(
      "opened"
    );


    /* STEP 2 — PAPER VISIBLE */
    setTimeout(
      function () {

        envelopeStage.classList.add(
          "paper-visible"
        );

      },
      650
    );


    /* STEP 3 — PAPER OUT */
    setTimeout(
      function () {

        envelopeStage.classList.add(
          "paper-out"
        );

      },
      1450
    );


    /* STEP 4 — TRANSITION */
    setTimeout(
      function () {

        envelopeStage.classList.add(
          "transitioning"
        );

      },
      2050
    );


    /* STEP 5 — SHOW INVITATION */
    setTimeout(
      function () {

        app.classList.add(
          "show-invitation"
        );

      },
      2600
    );


    /* STEP 6 — FADE ENVELOPE */
    setTimeout(
      function () {

        envelopeStage.classList.add(
          "finished"
        );

        startCountdown();

      },
      3650
    );

  }


  /* =========================================================
     LOCATION
  ========================================================= */

  locationButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      /*
        ضعِي رابط Google Maps هنا لاحقًا
      */

      var mapUrl =
        "https://maps.google.com/";

      window.open(
        mapUrl,
        "_blank",
        "noopener"
      );

    }
  );


  /* =========================================================
     RSVP
  ========================================================= */

  attendButton.addEventListener(
    "click",
    function () {

      attendButton.classList.add(
        "selected"
      );

      declineButton.classList.remove(
        "selected"
      );

      guests.classList.add(
        "show"
      );

    }
  );


  declineButton.addEventListener(
    "click",
    function () {

      declineButton.classList.add(
        "selected"
      );

      attendButton.classList.remove(
        "selected"
      );

      guests.classList.remove(
        "show"
      );

    }
  );


  /* =========================================================
     COUNTDOWN
  ========================================================= */

  var days =
    document.getElementById("days");

  var hours =
    document.getElementById("hours");

  var minutes =
    document.getElementById("minutes");


  function pad(value) {

    return String(value)
      .padStart(2, "0");

  }


  function updateCountdown() {

    var now =
      new Date();

    var difference =
      EVENT_DATE.getTime() -
      now.getTime();


    if (difference <= 0) {

      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";

      return;

    }


    var totalSeconds =
      Math.floor(
        difference / 1000
      );


    var d =
      Math.floor(
        totalSeconds / 86400
      );


    var h =
      Math.floor(
        (totalSeconds % 86400) / 3600
      );


    var m =
      Math.floor(
        (totalSeconds % 3600) / 60
      );


    days.textContent =
      pad(d);

    hours.textContent =
      pad(h);

    minutes.textContent =
      pad(m);

  }


  var countdownStarted = false;


  function startCountdown() {

    if (countdownStarted) {
      return;
    }

    countdownStarted = true;

    updateCountdown();

    setInterval(
      updateCountdown,
      1000
    );

  }


})();
