document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const forms = document.querySelectorAll('.registration-form');
    const roleCards = document.querySelectorAll('.role-card');
    const roleDetails = document.querySelectorAll('.role-details');
    let selectedRole = null;

    // Next step buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            const currentForm = button.closest('.registration-form');
            const currentStep = parseInt(currentForm.id.match(/\d+/) || 
                               Array.from(forms).indexOf(currentForm) + 1);
            
            if (validateForm(currentForm)) {
                // Mark current step as completed
                steps[currentStep - 1].classList.add('completed');
                
                // Activate next step
                steps[currentStep].classList.add('active');
                
                // Show next form
                currentForm.classList.remove('active');
                forms[currentStep].classList.add('active');
            }
        });
    });

    // Previous step buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            const currentForm = button.closest('.registration-form');
            const currentStep = Array.from(forms).indexOf(currentForm);
            
            // Update steps
            steps[currentStep].classList.remove('active');
            steps[currentStep - 1].classList.remove('completed');
            
            // Show previous form
            currentForm.classList.remove('active');
            forms[currentStep - 1].classList.add('active');
        });
    });

    // Role selection
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            roleCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Enable continue button
            const continueBtn = card.closest('form').querySelector('.next-step');
            continueBtn.disabled = false;
            
            // Store selected role
            selectedRole = card.dataset.role;
            
            // Show corresponding role details in next step
            roleDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            document.getElementById(selectedRole + 'Details').classList.add('active');
        });
    });

    // Form validation
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }

    // Final form submission
    document.getElementById('roleDetailsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect all form data
        const formData = {
            basicInfo: {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('regEmail').value,
                phone: document.getElementById('regPhone').value,
                password: document.getElementById('regPassword').value
            },
            role: selectedRole,
            roleDetails: getRoleDetails(selectedRole)
        };
        
        console.log('Registration data:', formData);
        // Here you would typically send this data to your backend
        alert('Registration successful! Welcome to Women Empowerment platform.');
        window.location.href = 'index.html';
    });

    function getRoleDetails(role) {
        switch(role) {
            case 'entrepreneur':
                return {
                    businessName: document.getElementById('businessName').value,
                    businessType: document.getElementById('businessType').value
                };
            case 'supplier':
                return {
                    companyName: document.getElementById('companyName').value,
                    productCategories: Array.from(document.getElementById('productCategories').selectedOptions).map(opt => opt.value)
                };
            case 'mentor':
                return {
                    expertise: Array.from(document.getElementById('expertise').selectedOptions).map(opt => opt.value),
                    experience: document.getElementById('experience').value
                };
            case 'funder':
                return {
                    investmentRange: document.getElementById('investmentRange').value,
                    sectors: Array.from(document.getElementById('sectors').selectedOptions).map(opt => opt.value)
                };
            default:
                return {};
        }
    }
});
