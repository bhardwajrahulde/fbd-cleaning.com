// FBD Cleaning Landing Page Interactions

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.getElementById('navbar');
  
  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
      
      // Animate hamburger lines
      const spans = menuBtn.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
      
      // Rotate lines for cross symbol
      if (navbar.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking nav link
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 3. Scroll Reveal Animation Trigger
  const animatedElements = document.querySelectorAll('.fade-in-section, .product-card');
  
  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4.5;
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('is-visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Initial run to reveal visible elements on load
  revealOnScroll();

  // 3.5. Load Founder Social & Email details from founders_info.js
  if (typeof FOUNDERS_CONTACT !== 'undefined') {
    const updateFounderLinks = (founderId, contactObj) => {
      const container = document.getElementById(`socials-${founderId}`);
      if (container) {
        const lnLink = container.querySelector('.ln-link');
        const igLink = container.querySelector('.ig-link');
        const emailLink = container.querySelector('.email-link');
        
        if (lnLink) {
          if (contactObj.linkedin === '#' || contactObj.linkedin === '') {
            lnLink.style.display = 'none';
          } else {
            lnLink.href = contactObj.linkedin;
            lnLink.style.display = 'inline-flex';
          }
        }
        
        if (igLink) {
          if (contactObj.instagram === '#' || contactObj.instagram === '') {
            igLink.style.display = 'none';
          } else {
            igLink.href = contactObj.instagram;
            igLink.style.display = 'inline-flex';
          }
        }
        
        if (emailLink) {
          if (contactObj.email === '#' || contactObj.email === '') {
            emailLink.style.display = 'none';
          } else {
            emailLink.href = contactObj.email.startsWith('mailto:') ? contactObj.email : `mailto:${contactObj.email}`;
            emailLink.style.display = 'inline-flex';
          }
        }
      }
    };
    
    updateFounderLinks('rahul', FOUNDERS_CONTACT.rahul);
    updateFounderLinks('sparsh', FOUNDERS_CONTACT.sparsh);
  }
});

// 4. Product Category Switcher
function switchCategory(category) {
  // Update Active Tab Button styling
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(category)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Filter Cards
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
      // Re-trigger scroll animations for newly shown cards
      setTimeout(() => {
        card.classList.add('is-visible');
      }, 50);
    } else {
      card.style.display = 'none';
    }
  });
}

// 5. Contact Form Handler (Mock Submission)
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get values
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const phone = document.getElementById('form-phone').value;
  const msg = document.getElementById('form-msg').value;

  console.log('Form Submitted:', { name, email, phone, msg });

  // Show Toast Success Notification
  const toast = document.getElementById('success-toast');
  toast.classList.add('show');

  // Reset form inputs
  document.getElementById('contact-form').reset();

  // Hide toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
