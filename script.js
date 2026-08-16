/* =========================================================
   ELEMENTS
========================================================= */

const loader = document.getElementById("loader");

const envelopeScreen =
  document.getElementById("envelopeScreen");

const envelope =
  document.getElementById("envelope");

const openButton =
  document.getElementById("openButton");

const invitationPage =
  document.getElementById("invitationPage");


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

openButton.addEventListener("click", (event) => {

  event.stopPropagation();

  if (opened) return;

  opened = true;

  /*
     إخفاء التعليمات
  */

  envelopeScreen.classList.add("opened-screen");


  /*
     فتح الظرف
  */

  envelope.classList.add("opened");


  /*
     لمعة بسيطة
  */

  setTimeout(() => {
    createSparkles();
  }, 1900);


  /*
     تكبير الدعوة
  */

  setTimeout(() => {
    invitationPage.classList.add("show");
  }, 2150);


  /*
     إخفاء الظرف بعد ظهور الدعوة
  */

  setTimeout(() => {
    envelopeScreen.classList.add("envelope-hide");
  }, 3550);


  /*
     السماح بالـ scroll بعد الانتقال
  */

  setTimeout(() => {
    document.body.style.overflowY = "auto";
  }, 4200);

});


/* =========================================================
   SPARKLES
========================================================= */

function createSparkles() {

  const positions = [
    [45, 42],
    [52, 37],
    [58, 45],
    [48, 51],
    [55, 55],
    [40, 48]
  ];

  positions.forEach((position, index) => {

    setTimeout(() => {

      const sparkle =
        document.createElement("div");

      sparkle.className = "sparkle";

      sparkle.style.left =
        position[0] + "%";

      sparkle.style.top =
        position[1] + "%";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);

    }, index * 100);

  });

}


/* =========================================================
   IMPORTANT
========================================================= */

/*
   مفيش mousemove هنا نهائيًا.

   وبالتالي:
   - الظرف لا يلف مع الماوس
   - الورقة البيضاء لا تتحرك مع الماوس
   - لا يوجد rotateX
   - لا يوجد rotateY
   - لا يوجد parallax

   الحركة الوحيدة بتحصل عند الضغط على الختم.
*/
