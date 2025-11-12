// Professional Car Rental System - Main JavaScript

// Dark Mode Toggle
(function() {
  // Initialize theme from localStorage or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Add smooth transition
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  // Initialize theme toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navbarMenu && !event.target.closest('.navbar-container')) {
      navbarMenu.classList.remove('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Form validation
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!validateForm(this)) {
        e.preventDefault();
      }
    });
  });

  // Auto-hide alerts after 5 seconds
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  });

  // Add fade-in animation to cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .feature-card, .car-card, .stat-card').forEach(el => {
    observer.observe(el);
  });
});

// Form Validation
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

  inputs.forEach(input => {
    // Remove previous error messages
    const errorMsg = input.parentElement.querySelector('.form-error');
    if (errorMsg) errorMsg.remove();

    // Validate
    if (!input.value.trim()) {
      showError(input, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      showError(input, 'Please enter a valid email address');
      isValid = false;
    } else if (input.type === 'tel' && !isValidPhone(input.value)) {
      showError(input, 'Please enter a valid phone number');
      isValid = false;
    } else if (input.type === 'number') {
      const min = input.getAttribute('min');
      const max = input.getAttribute('max');
      const value = parseFloat(input.value);

      if (min && value < parseFloat(min)) {
        showError(input, `Value must be at least ${min}`);
        isValid = false;
      } else if (max && value > parseFloat(max)) {
        showError(input, `Value must be at most ${max}`);
        isValid = false;
      }
    } else if (input.name === 'password' && input.value.length < 6) {
      showError(input, 'Password must be at least 6 characters');
      isValid = false;
    } else if (input.name === 'confirmPassword' || input.name === 'confirmpassword') {
      const password = form.querySelector('input[name="password"]');
      if (password && input.value !== password.value) {
        showError(input, 'Passwords do not match');
        isValid = false;
      }
    }
  });

  return isValid;
}

function showError(input, message) {
  input.style.borderColor = '#ef4444';
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);

  // Remove error styling when user starts typing
  input.addEventListener('input', function() {
    this.style.borderColor = '';
    const error = this.parentElement.querySelector('.form-error');
    if (error) error.remove();
  }, { once: true });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Search functionality
function initializeSearch() {
  const searchInput = document.querySelector('#searchInput');
  const searchButton = document.querySelector('#searchButton');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
}

function performSearch() {
  const searchInput = document.querySelector('#searchInput');
  const query = searchInput.value.trim();

  if (query) {
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }
}

// Date picker restrictions
function initializeDatePickers() {
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');

  dateInputs.forEach(input => {
    // Set minimum date to today for pickup dates
    if (input.name === 'pickupDate' || input.name === 'PickupDate') {
      input.min = today;
    }

    // Set return date minimum based on pickup date
    if (input.name === 'returnDate' || input.name === 'ReturnDate') {
      const pickupInput = document.querySelector('input[name="pickupDate"], input[name="PickupDate"]');
      if (pickupInput) {
        pickupInput.addEventListener('change', function() {
          input.min = this.value;
          if (input.value && input.value < this.value) {
            input.value = this.value;
          }
        });
      }
    }
  });
}

// Initialize date pickers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeDatePickers();
  initializeSearch();
});

// Confirmation dialogs for delete actions
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn-danger, .delete-btn')) {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      e.preventDefault();
    }
  }
});

// Car status badge styling
function updateCarStatusBadges() {
  const statusElements = document.querySelectorAll('.car-status');
  statusElements.forEach(el => {
    const status = el.textContent.trim().toLowerCase();
    el.classList.remove('active', 'rented', 'out-of-service');

    if (status === 'active') {
      el.classList.add('active');
    } else if (status === 'rented') {
      el.classList.add('rented');
    } else if (status === 'out of service') {
      el.classList.add('out-of-service');
    }
  });
}

document.addEventListener('DOMContentLoaded', updateCarStatusBadges);

// Loading state for forms
function addLoadingState(form) {
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  if (submitBtn) {
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Processing...';

    // Reset after 30 seconds as fallback
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 30000);
  }
}

// Auto-format phone numbers
document.addEventListener('input', function(e) {
  if (e.target.type === 'tel') {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);

    if (value.length > 6) {
      e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
      e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      e.target.value = `(${value}`;
    }
  }
});

// Filter and sort functionality
function initializeFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const sortSelect = document.querySelector('[data-sort]');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      filterItems(filter);

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      sortItems(this.value);
    });
  }
}

function filterItems(filter) {
  const items = document.querySelectorAll('[data-item]');
  items.forEach(item => {
    if (filter === 'all' || item.dataset.item === filter) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function sortItems(sortBy) {
  const container = document.querySelector('[data-container]');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('[data-item]'));

  items.sort((a, b) => {
    const aValue = a.dataset[sortBy] || a.textContent;
    const bValue = b.dataset[sortBy] || b.textContent;

    return aValue.localeCompare(bValue);
  });

  items.forEach(item => container.appendChild(item));
}

document.addEventListener('DOMContentLoaded', initializeFilters);

// Utility: Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Utility: Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Export functions for use in other scripts
window.CarRentalApp = {
  validateForm,
  formatCurrency,
  formatDate,
  showError
};
