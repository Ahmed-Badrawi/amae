/**
 * amae - Global Trade & Commercial Partnerships
 * Interactive functionality & UI control
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Sticky Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking navigation links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 4. Scroll Reveal Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in, .audience-card, .category-card, .why-card, .pillar-card');
  
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    revealObserver.observe(el);
  });

  // 5. Commercial Inquiries Modal Handling
  const modal = document.getElementById('inquiryModal');
  const modalClose = document.getElementById('modalClose');
  const openQuoteBtn = document.getElementById('openQuoteModal');
  const openSupplierBtn = document.getElementById('openSupplierModal');
  const inquiryForm = document.getElementById('inquiryForm');
  const formSuccessMsg = document.getElementById('formSuccessMsg');
  const resetModalBtn = document.getElementById('resetModalBtn');

  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalTag = document.getElementById('modalTag');
  const inquiryTypeSelect = document.getElementById('inquiryType');

  // Open for B2B Quotations
  if (openQuoteBtn) {
    openQuoteBtn.addEventListener('click', () => {
      modalTag.textContent = 'Wholesale & B2B Inquiry';
      modalTitle.textContent = 'Request a Commercial Quotation';
      modalSubtitle.textContent = 'Specify target volumes, destination ports, and batch timeline.';
      if (inquiryTypeSelect) inquiryTypeSelect.value = 'wholesale';
      openModal();
    });
  }

  // Open for Supplier Partnerships
  if (openSupplierBtn) {
    openSupplierBtn.addEventListener('click', () => {
      modalTag.textContent = 'Supplier & Brand Submission';
      modalTitle.textContent = 'Become an Approved Supplier';
      modalSubtitle.textContent = 'Introduce your product line, regulatory certificates, and factory capacity.';
      if (inquiryTypeSelect) inquiryTypeSelect.value = 'supplier';
      openModal();
    });
  }

  function openModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (inquiryForm) {
          inquiryForm.reset();
          inquiryForm.style.display = 'flex';
        }
        if (formSuccessMsg) {
          formSuccessMsg.style.display = 'none';
        }
      }, 300);
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (resetModalBtn) resetModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking on the backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Handle Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation check
      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('workEmail').value.trim();

      if (!name || !email) {
        alert('Please complete all mandatory fields.');
        return;
      }

      // Simulation of submission to AMAE Commercial Desk
      inquiryForm.style.display = 'none';
      if (formSuccessMsg) {
        formSuccessMsg.style.display = 'block';
      }
    });
  }

  // 6. Smooth Scroll for Internal Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
