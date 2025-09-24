// Smooth scroll
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Circular progress animation
const skillCircles = document.querySelectorAll(".skill-circle");

function animateCircles() {
  skillCircles.forEach(circle => {
    const circleTop = circle.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if(circleTop < windowHeight - 50 && !circle.classList.contains("animated")){
      const progress = circle.querySelector(".progress");
      const percent = circle.getAttribute("data-percent");
      const radius = progress.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100 * circumference);
      progress.style.strokeDashoffset = offset;

      // Animate number
      const number = circle.querySelector("span");
      let count = 0;
      const interval = setInterval(() => {
        if(count < percent){
          count++;
          number.textContent = count + "%";
        } else {
          clearInterval(interval);
        }
      }, 15);

      circle.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", animateCircles);
window.addEventListener("load", animateCircles);


c// Rotating titles
const titles = ["Front-End Developer", "Full Stack Developer", "React Developer"];
let index = 0;
const rotatingElement = document.querySelector('.rotating-titles');

function rotateTitles() {
  rotatingElement.textContent = titles[index];
  index = (index + 1) % titles.length;
}

// Show first title immediately
rotateTitles();

// Rotate every 2.5 seconds
setInterval(rotateTitles, 2500);
