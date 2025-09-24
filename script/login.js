
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCs6RK2HbbpR3lWXy64dPvvSIUGtLyVM0Y",
    authDomain: "learningpath-c6733.firebaseapp.com",
    databaseURL: "https://learningpath-c6733-default-rtdb.firebaseio.com",
    projectId: "learningpath-c6733",
    storageBucket: "learningpath-c6733.firebasestorage.app",
    messagingSenderId: "372727572304",
    appId: "1:372727572304:web:7beb4ec9e06d7959bc6e55",
    measurementId: "G-YF3K4G82F6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Tab switching functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle eye icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Forgot password functionality
document.getElementById('forgot-password-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('email-form').style.display = 'none';
    document.getElementById('reset-password-section').classList.add('active');
});

// Back to login from reset password
document.getElementById('back-to-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('reset-password-section').classList.remove('active');
    document.getElementById('email-form').style.display = 'block';
});

// Display message function
function displayMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;

    // Auto remove message after 5 seconds
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}

// Email login form submission
document.getElementById('email-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            displayMessage('Login successful! Welcome back.', 'success');

            // Redirect to dashboard
            setTimeout(() => {
                // In a real app, you would redirect to the user's dashboard
                window.location.href = 'dashboard.html';
            }, 2000);
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/user-not-found') {
                displayMessage('No account found with this email. Please check your email or register.', 'error');
            } else if (errorCode === 'auth/wrong-password') {
                displayMessage('Incorrect password. Please try again.', 'error');
            } else if (errorCode === 'auth/invalid-email') {
                displayMessage('Invalid email address. Please check your email and try again.', 'error');
            } else {
                displayMessage('Login failed: ' + errorMessage, 'error');
            }
        });
});

// Send password reset email
document.getElementById('send-reset-link').addEventListener('click', function () {
    const email = document.getElementById('reset-email').value;

    if (!email) {
        displayMessage('Please enter your email address.', 'error');
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            displayMessage('Password reset email sent! Check your inbox.', 'success');

            // Hide reset section and show login form after a delay
            setTimeout(() => {
                document.getElementById('reset-password-section').classList.remove('active');
                document.getElementById('email-form').style.display = 'block';
                document.getElementById('reset-email').value = '';
            }, 3000);
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found') {
                displayMessage('No account found with this email address.', 'error');
            } else {
                displayMessage('Error sending reset email: ' + error.message, 'error');
            }
        });
});

// Phone login (simplified for demo)
document.getElementById('phone-form').addEventListener('submit', function (e) {
    e.preventDefault();
    displayMessage('Phone authentication requires additional setup. Please use email login for this demo.', 'error');
});

// Google authentication
document.getElementById('google-login-btn').addEventListener('click', function () {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            // This gives you a Google Access Token
            const credential = result.credential;
            const token = credential.accessToken;

            // The signed-in user info
            const user = result.user;

            displayMessage('Google authentication successful! Welcome back.', 'success');

            // Redirect to dashboard
            setTimeout(() => {
                // In a real app, redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 2000);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            displayMessage('Google authentication failed: ' + errorMessage, 'error');
        });
});

// Monitor authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is signed in:', user);
    } else {
        // User is signed out
        console.log('User is signed out');
    }
});
