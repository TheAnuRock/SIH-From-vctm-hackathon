
// Check if user is logged in (in a real app, this would be handled by backend)
const isLoggedIn = localStorage.getItem('studentLoggedIn');

// If not logged in, show authentication modal
if (!isLoggedIn) {
    document.getElementById('auth-modal').style.display = 'flex';
}

// Switch between login and registration tabs
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

    if (tab === 'login') {
        document.querySelector('.auth-tab:nth-child(1)').classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        document.querySelector('.auth-tab:nth-child(2)').classList.add('active');
        document.getElementById('register-form').classList.add('active');
    }
}

// Close authentication modal
function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

// Handle login form submission
document.getElementById('student-login').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // In a real application, this would be an API call to verify credentials
    if (email && password) {
        localStorage.setItem('studentLoggedIn', 'true');
        localStorage.setItem('studentEmail', email);
        closeAuthModal();
        // Refresh the page to show the actual portal content
        location.reload();
    } else {
        alert('Please enter valid credentials');
    }
});

// Handle registration form submission
document.getElementById('student-registration').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const dob = document.getElementById('reg-dob').value;
    const grade = document.getElementById('reg-grade').value;
    const school = document.getElementById('reg-school').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // In a real application, this would be an API call to register the user
    if (name && email && phone && dob && grade && school && password) {
        // Store registration data (in a real app, this would be sent to a server)
        const studentData = {
            name, email, phone, dob, grade, school
        };
        localStorage.setItem('studentData', JSON.stringify(studentData));
        localStorage.setItem('studentLoggedIn', 'true');
        localStorage.setItem('studentEmail', email);

        alert('Registration successful! You can now login.');
        switchAuthTab('login');
    } else {
        alert('Please fill in all fields');
    }
});

// Logout functionality
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentEmail');
    location.reload();
});
