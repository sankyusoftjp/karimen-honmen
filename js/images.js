const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");

// Prevent image drag
slides.forEach(slide => {
  const img = slide.querySelector("img");
  if (img) {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  }
});