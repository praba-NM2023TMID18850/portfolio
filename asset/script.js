// Smooth scroll
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});



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
