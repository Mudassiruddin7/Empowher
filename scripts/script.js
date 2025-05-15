// Modal functionality
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.getElementsByClassName('close')[0];
const authTabs = document.querySelectorAll('.auth-tab');
const emailForm = document.getElementById('emailForm');
const phoneForm = document.getElementById('phoneForm');

// Open modal
loginBtn.onclick = function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Tab switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        authTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Show/hide forms based on selected tab
        if (tab.dataset.tab === 'email') {
            emailForm.classList.remove('hidden');
            phoneForm.classList.add('hidden');
        } else {
            emailForm.classList.add('hidden');
            phoneForm.classList.remove('hidden');
        }
    });
});

// Form submissions
emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email login:', { email, password });
    // Add your authentication logic here
});

phoneForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    console.log('Phone login:', { phone });
    // Add your OTP logic here
});
