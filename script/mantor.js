
// Check if mentor is logged in
const isMentorLoggedIn = localStorage.getItem('mentorLoggedIn');

// If not logged in, show authentication modal
if (!isMentorLoggedIn) {
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
document.getElementById('mentor-login').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // In a real application, this would be an API call to verify credentials
    if (email && password) {
        localStorage.setItem('mentorLoggedIn', 'true');
        localStorage.setItem('mentorEmail', email);
        closeAuthModal();
        // Refresh the page to show the actual portal content
        location.reload();
    } else {
        alert('Please enter valid credentials');
    }
});

// Handle registration form submission
document.getElementById('mentor-registration').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const specialization = document.getElementById('reg-specialization').value;
    const qualification = document.getElementById('reg-qualification').value;
    const experience = document.getElementById('reg-experience').value;
    const bio = document.getElementById('reg-bio').value;
    const approach = document.getElementById('reg-approach').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // In a real application, this would be an API call to register the user
    if (name && email && phone && specialization && qualification && experience && bio && approach && password) {
        // Store registration data (in a real app, this would be sent to a server)
        const mentorData = {
            name, email, phone, specialization, qualification, experience, bio, approach
        };
        localStorage.setItem('mentorData', JSON.stringify(mentorData));
        localStorage.setItem('mentorLoggedIn', 'true');
        localStorage.setItem('mentorEmail', email);

        alert('Application submitted successfully! Our team will review your profile and contact you soon.');
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

// Open mentee detail modal
function openMenteeDetail(menteeName) {
    document.getElementById('mentee-detail-content').innerHTML = `
                <h3>${menteeName}</h3>
                <div class="mentee-stats" style="margin: 1rem 0;">
                    <div><strong>Grade:</strong> 10</div>
                    <div><strong>Focus Area:</strong> Mathematics</div>
                    <div><strong>Joined:</strong> 3 months ago</div>
                </div>
                <div class="progress-section">
                    <div class="progress-label">
                        <span>Overall Progress</span>
                        <span>78%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 78%;"></div>
                    </div>
                </div>
                <h4 style="margin-top: 1.5rem;">Recent Sessions</h4>
                <ul>
                    <li>Oct 10, 2023: Algebraic Expressions (45 mins)</li>
                    <li>Oct 3, 2023: Problem Solving Techniques (60 mins)</li>
                    <li>Sep 26, 2023: Equation Fundamentals (50 mins)</li>
                </ul>
                <h4 style="margin-top: 1.5rem;">Current Goals</h4>
                <ul>
                    <li>Improve algebra test scores to 90% (70% complete)</li>
                    <li>Complete 10 practice worksheets (40% complete)</li>
                </ul>
                <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
                    <button class="btn">Schedule Session</button>
                    <button class="btn-outline">Send Message</button>
                </div>
            `;
    document.getElementById('mentee-detail-modal').style.display = 'flex';
}

// Close mentee detail modal
function closeMenteeDetailModal() {
    document.getElementById('mentee-detail-modal').style.display = 'none';
}

// Open add mentee modal
function openAddMenteeModal() {
    alert('Mentee assignment feature would open here in a full implementation.');
}

// Open session scheduling modal
function openSessionModal() {
    alert('Session scheduling interface would open here in a full implementation.');
}

// Handle goal form submission
document.getElementById('goal-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const mentee = document.getElementById('goal-mentee').value;
    const title = document.getElementById('goal-title').value;
    const description = document.getElementById('goal-description').value;
    const deadline = document.getElementById('goal-deadline').value;

    // In a real application, this would create a goal via API
    if (mentee && title && description && deadline) {
        alert(`Goal "${title}" created successfully!`);
        // Reset form
        document.getElementById('goal-form').reset();
        // Switch back to active goals tab
        openTab('active-goals');
    } else {
        alert('Please fill in all fields');
    }
});

// Logout functionality
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('mentorLoggedIn');
    localStorage.removeItem('mentorEmail');
    location.reload();
});

// Initialize the page with dashboard visible
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('dashboard').classList.add('active-section');
});
