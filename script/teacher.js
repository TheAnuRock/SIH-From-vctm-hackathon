
// Check if teacher is logged in
const isTeacherLoggedIn = localStorage.getItem('teacherLoggedIn');

// If not logged in, show authentication modal
if (!isTeacherLoggedIn) {
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
document.getElementById('teacher-login').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // In a real application, this would be an API call to verify credentials
    if (email && password) {
        localStorage.setItem('teacherLoggedIn', 'true');
        localStorage.setItem('teacherEmail', email);
        closeAuthModal();
        // Refresh the page to show the actual portal content
        location.reload();
    } else {
        alert('Please enter valid credentials');
    }
});

// Handle registration form submission
document.getElementById('teacher-registration').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const subject = document.getElementById('reg-subject').value;
    const qualification = document.getElementById('reg-qualification').value;
    const experience = document.getElementById('reg-experience').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // In a real application, this would be an API call to register the user
    if (name && email && phone && subject && qualification && experience && password) {
        // Store registration data (in a real app, this would be sent to a server)
        const teacherData = {
            name, email, phone, subject, qualification, experience
        };
        localStorage.setItem('teacherData', JSON.stringify(teacherData));
        localStorage.setItem('teacherLoggedIn', 'true');
        localStorage.setItem('teacherEmail', email);

        alert('Registration successful! You can now login.');
        switchAuthTab('login');
    } else {
        alert('Please fill in all fields');
    }
});

// Show different sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active-section');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active-section');

    // Update active menu item
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Open tab content
function openTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab content and activate the button
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Open course creation modal
function openCourseModal() {
    document.getElementById('course-modal').style.display = 'flex';
}

// Close course creation modal
function closeCourseModal() {
    document.getElementById('course-modal').style.display = 'none';
}

// Handle course creation form
document.getElementById('course-creation').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('course-title').value;
    const description = document.getElementById('course-description').value;
    const subject = document.getElementById('course-subject').value;
    const grade = document.getElementById('course-grade').value;

    // In a real application, this would create a course via API
    if (title && description && subject && grade) {
        alert(`Course "${title}" created successfully!`);
        closeCourseModal();
        // Reset form
        document.getElementById('course-creation').reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Open assignment creation modal
function openAssignmentModal() {
    alert('Assignment creation feature would open here in a full implementation.');
}

// Open grading modal
function openGradingModal() {
    alert('Grading interface would open here in a full implementation.');
}

// Logout functionality
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('teacherLoggedIn');
    localStorage.removeItem('teacherEmail');
    location.reload();
});

// Initialize the page with dashboard visible
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('dashboard').classList.add('active-section');
});
