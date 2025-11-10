// Modern Portfolio JavaScript with Animations

// Mobile Navigation
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
}

// Smooth scroll and active nav links
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      
      // Close mobile menu
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      
      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Typing Animation for Highlight Text
const highlightText = document.querySelector('.highlight-text');
const words = ['amazing apps', 'clean code', 'user experiences', 'digital solutions'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  if (!highlightText) return;
  
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    highlightText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    highlightText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
window.addEventListener('load', () => {
  setTimeout(typeWriter, 2000);
});

// Skill circle animation
function animateSkillCircles() {
  const skillCircles = document.querySelectorAll('.skill-circle');
  
  skillCircles.forEach(circle => {
    const circleTop = circle.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (circleTop < windowHeight - 50 && !circle.classList.contains('animated')) {
      const progress = circle.querySelector('.progress');
      const percent = circle.getAttribute('data-percent');
      const radius = progress.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100 * circumference);
      
      progress.style.strokeDashoffset = offset;
      
      // Animate number
      const numberElement = circle.querySelector('.skill-info span');
      let count = 0;
      const interval = setInterval(() => {
        if (count < percent) {
          count++;
          numberElement.textContent = count + '%';
        } else {
          clearInterval(interval);
        }
      }, 20);
      
      circle.classList.add('animated');
    }
  });
}

window.addEventListener('scroll', animateSkillCircles);
window.addEventListener('load', animateSkillCircles);

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.project-card, .about-container').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s ease';
  observer.observe(el);
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.float-item');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Form submission
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    
    if (name && email && message) {
      // Show success message
      alert('Thank you for your message! I\'ll get back to you soon.');
      contactForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// Add hover effects to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary, .social-link').forEach(element => {
  element.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Counter Animation for About Section
function animateCounters() {
  const counters = document.querySelectorAll('.stat-item');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const numberElement = counter.querySelector('.stat-number');
    const rect = counter.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && !counter.classList.contains('counted')) {
      let count = 0;
      const increment = target / 50;
      
      const updateCounter = () => {
        if (count < target) {
          count += increment;
          numberElement.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          numberElement.textContent = target;
        }
      };
      
      updateCounter();
      counter.classList.add('counted');
    }
  });
}

// Badge hover effects
document.querySelectorAll('.badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'translateY(-5px) scale(1.1)';
    badge.style.background = 'rgba(99, 102, 241, 0.3)';
  });
  
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'translateY(0) scale(1)';
    badge.style.background = 'rgba(255, 255, 255, 0.1)';
  });
});

// Skill tag interactions
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(0.95)';
    setTimeout(() => {
      tag.style.transform = 'scale(1)';
    }, 150);
  });
});

// Initialize animations on load
window.addEventListener('load', () => {
  // Trigger initial animations
  document.body.classList.add('loaded');
  
  // Add stagger animation to tech items
  const techItems = document.querySelectorAll('.tech-item');
  techItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'slideUp 0.6s ease forwards';
  });
  
  // Start counter animation
  animateCounters();
});

// Add scroll listener for counter animation
window.addEventListener('scroll', animateCounters);