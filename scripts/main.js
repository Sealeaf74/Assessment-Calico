// Navigation functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

const toggleMenu = () => {
  navMenu.classList.toggle('active');
};

menuToggle?.addEventListener('click', toggleMenu);

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');

const smoothScroll = (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

navLinks.forEach(link => {
  link.addEventListener('click', smoothScroll);
});

// Yarn ball scattering functionality
const yarnSkeins = document.querySelectorAll('.yarn-skein');
const yarnDisplay = document.querySelector('.yarn-display');

// Store original positions
const originalPositions = [];

yarnSkeins.forEach((skein, index) => {
  const rect = skein.getBoundingClientRect();
  originalPositions[index] = {
    x: skein.offsetLeft,
    y: skein.offsetTop
  };
});

// Mouse movement tracking for yarn scattering across entire page
const handleMouseMove = (e) => {
  if (!yarnDisplay) return;
  
  const rect = yarnDisplay.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  yarnSkeins.forEach((skein, index) => {
    const skeinRect = skein.getBoundingClientRect();
    const skeinCenterX = skeinRect.left + skeinRect.width / 2 - rect.left;
    const skeinCenterY = skeinRect.top + skeinRect.height / 2 - rect.top;
    
    // Calculate distance from mouse to yarn ball
    const distance = Math.sqrt(
      Math.pow(mouseX - skeinCenterX, 2) + Math.pow(mouseY - skeinCenterY, 2)
    );
    
    // If mouse is close to the yarn ball, trigger scatter effect
    if (distance < 150) {
      const angle = Math.atan2(mouseY - skeinCenterY, mouseX - skeinCenterX);
      const scatterDistance = Math.max(0, 150 - distance);
      
      // Calculate scatter direction (away from mouse) with much larger distance
      const scatterX = -Math.cos(angle) * scatterDistance * 2;
      const scatterY = -Math.sin(angle) * scatterDistance * 2;
      
      // Apply scatter effect
      skein.style.setProperty('--scatter-x', `${scatterX}px`);
      skein.style.setProperty('--scatter-y', `${scatterY}px`);
      
      // Add scatter class for animation
      if (!skein.classList.contains('scatter')) {
        skein.classList.add('scatter');
        
        // Remove scatter class after animation
        setTimeout(() => {
          skein.classList.remove('scatter');
        }, 1200);
      }
    }
  });
};

// Add mouse move listener to entire document for full page scattering
document.addEventListener('mousemove', handleMouseMove);

// Individual yarn ball hover effects with enhanced scattering
yarnSkeins.forEach((skein) => {
  skein.addEventListener('mouseenter', () => {
    // Trigger dramatic scatter effect
    const randomAngle = Math.random() * Math.PI * 2;
    const scatterDistance = 200 + Math.random() * 300; // Random distance between 200-500px
    
    const scatterX = Math.cos(randomAngle) * scatterDistance;
    const scatterY = Math.sin(randomAngle) * scatterDistance;
    
    skein.style.setProperty('--scatter-x', `${scatterX}px`);
    skein.style.setProperty('--scatter-y', `${scatterY}px`);
    
    // Add dramatic scatter animation
    skein.style.animation = 'none';
    skein.classList.add('scatter');
    
    setTimeout(() => {
      skein.classList.remove('scatter');
      skein.style.animation = 'float 6s ease-in-out infinite';
    }, 1200);
  });
  
  skein.addEventListener('mouseleave', () => {
    // Reset to original floating animation
    setTimeout(() => {
      skein.style.animation = 'float 6s ease-in-out infinite';
    }, 1200);
  });
});

// Add click effect for even more dramatic scattering
yarnSkeins.forEach((skein) => {
  skein.addEventListener('click', () => {
    // Create multiple scatter effects for all yarn balls
    yarnSkeins.forEach((otherSkein, index) => {
      const randomAngle = Math.random() * Math.PI * 2;
      const scatterDistance = 300 + Math.random() * 400; // Even larger distance
      
      const scatterX = Math.cos(randomAngle) * scatterDistance;
      const scatterY = Math.sin(randomAngle) * scatterDistance;
      
      otherSkein.style.setProperty('--scatter-x', `${scatterX}px`);
      otherSkein.style.setProperty('--scatter-y', `${scatterY}px`);
      
      otherSkein.style.animation = 'none';
      otherSkein.classList.add('scatter');
      
      setTimeout(() => {
        otherSkein.classList.remove('scatter');
        otherSkein.style.animation = 'float 6s ease-in-out infinite';
      }, 1500);
    });
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

const handleNewsletterSubmit = (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  // Here you would typically send the email to your backend
  console.log('Newsletter subscription:', email);
  
  // Show success message
  const button = e.target.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Subscribed!';
  button.style.background = '#10B981';
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
    e.target.reset();
  }, 2000);
};

newsletterForm?.addEventListener('submit', handleNewsletterSubmit);

// Cart functionality
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');

let cartItems = 0;

const updateCart = () => {
  cartCount.textContent = cartItems;
};

const addToCart = () => {
  cartItems++;
  updateCart();
  
  // Add animation to cart button
  cartBtn.style.transform = 'scale(1.1)';
  setTimeout(() => {
    cartBtn.style.transform = 'scale(1)';
  }, 200);
};

// Add to cart buttons (you can add these to your product cards)
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');

const toggleSearch = () => {
  // Create search overlay
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.innerHTML = `
    <div class="search-modal">
      <div class="search-header">
        <h3>Search Yarns</h3>
        <button class="close-search">&times;</button>
      </div>
      <input type="text" placeholder="Search for yarns, colors, or fibers..." class="search-input">
      <div class="search-results"></div>
    </div>
  `;
  
  document.body.appendChild(searchOverlay);
  
  // Focus on search input
  const searchInput = searchOverlay.querySelector('.search-input');
  searchInput.focus();
  
  // Close search
  const closeSearch = searchOverlay.querySelector('.close-search');
  closeSearch.addEventListener('click', () => {
    document.body.removeChild(searchOverlay);
  });
  
  // Close on overlay click
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      document.body.removeChild(searchOverlay);
    }
  });
};

searchBtn?.addEventListener('click', toggleSearch);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.collection-card, .step, .social-link');

animateElements.forEach(el => {
  observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
  
  .search-modal {
    background: white;
    padding: 40px;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .close-search {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6B7280;
  }
  
  .search-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #E5E7EB;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #8B5A96;
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
  
  .collection-card, .step, .social-link {
    opacity: 0;
  }
`;

document.head.appendChild(style); 