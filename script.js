document.addEventListener("DOMContentLoaded", function () {

  const loader = document.getElementById("loader");

  console.log("SCRIPT WORKING");

  setTimeout(function () {
    loader.classList.add("hide");
  }, 1500);

});
