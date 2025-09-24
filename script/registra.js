
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

// Role selection functionality
document.querySelectorAll('.role-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from all options
        document.querySelectorAll('.role-option').forEach(o => o.classList.remove('selected'));

        // Add selected class to clicked option
        option.classList.add('selected');

        // Update hidden input value
        const role = option.getAttribute('data-role');
        document.getElementById('selected-role').value = role;
        document.getElementById('phone-selected-role').value = role;
        document.getElementById('google-selected-role').value = role;
    });
});

// Password strength checker
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const requirements = {
    length: document.getElementById('length-req'),
    uppercase: document.getElementById('uppercase-req'),
    lowercase: document.getElementById('lowercase-req'),
    number: document.getElementById('number-req'),
    special: document.getElementById('special-req')
};

passwordInput.addEventListener('input', function () {
    const password = this.value;
    let strength = 0;

    // Check password requirements
    if (password.length >= 8) {
        strength++;
        requirements.length.classList.add('met');
    } else {
        requirements.length.classList.remove('met');
    }

    if (/[A-Z]/.test(password)) {
        strength++;
        requirements.uppercase.classList.add('met');
    } else {
        requirements.uppercase.classList.remove('met');
    }

    if (/[a-z]/.test(password)) {
        strength++;
        requirements.lowercase.classList.add('met');
    } else {
        requirements.lowercase.classList.remove('met');
    }

    if (/[0-9]/.test(password)) {
        strength++;
        requirements.number.classList.add('met');
    } else {
        requirements.number.classList.remove('met');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
        requirements.special.classList.add('met');
    } else {
        requirements.special.classList.remove('met');
    }

    // Update strength bar
    strengthBar.className = 'strength-bar';
    if (strength > 0) {
        if (strength <= 2) {
            strengthBar.classList.add('weak');
        } else if (strength <= 4) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    }
});

// Password confirmation check
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordMatch = document.getElementById('password-match');

confirmPasswordInput.addEventListener('input', function () {
    if (this.value === passwordInput.value) {
        passwordMatch.textContent = 'Passwords match!';
        passwordMatch.style.color = '#2ed573';
    } else {
        passwordMatch.textContent = 'Passwords do not match';
        passwordMatch.style.color = '#ff4757';
    }
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

// Save user data to Firebase Realtime Database
function saveUserData(userId, fullName, email, role, phone = null) {
    const userData = {
        fullName: fullName,
        email: email,
        role: role,
        phone: phone,
        createdAt: new Date().toISOString()
    };

    return database.ref('users/' + userId).set(userData);
}

// Email registration form submission
document.getElementById('email-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('selected-role').value;

    // Validation
    if (password !== confirmPassword) {
        displayMessage('Passwords do not match!', 'error');
        return;
    }

    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User created successfully
            const user = userCredential.user;

            // Save user data to database
            return saveUserData(user.uid, fullName, email, role);
        })
        .then(() => {
            displayMessage('Registration successful! Welcome to Gramik Digital Pathshala.', 'success');

            // Redirect to dashboard or clear form
            setTimeout(() => {
                // In a real app, you would redirect to the user's dashboard
                // window.location.href = 'dashboard.html';

                // For demo purposes, just clear the form
                document.getElementById('email-form').reset();
                document.querySelector('.role-option').classList.add('selected');
            }, 2000);
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                displayMessage('This email is already registered. Please use a different email or log in.', 'error');
            } else if (errorCode === 'auth/weak-password') {
                displayMessage('Password is too weak. Please choose a stronger password.', 'error');
            } else if (errorCode === 'auth/invalid-email') {
                displayMessage('Invalid email address. Please check your email and try again.', 'error');
            } else {
                displayMessage('Registration failed: ' + errorMessage, 'error');
            }
        });
});

// Phone registration
let verificationId = null;

document.getElementById('phone-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('phone-full-name').value;
    const countryCode = document.getElementById('country-code').value;
    const phoneNumber = document.getElementById('phone').value;
    const role = document.getElementById('phone-selected-role').value;
    const fullPhoneNumber = countryCode + phoneNumber;

    // For phone authentication, we need to use reCAPTCHA
    // This is a simplified version - in a real app, you'd implement reCAPTCHA

    displayMessage('Phone authentication requires additional setup. Please use email registration for this demo.', 'error');

    // In a real implementation, you would:
    // 1. Set up reCAPTCHA
    // 2. Send verification code
    // 3. Show verification input
});

// Google authentication
document.getElementById('google-signup-btn').addEventListener('click', function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    const role = document.getElementById('google-selected-role').value;

    auth.signInWithPopup(provider)
        .then((result) => {
            // This gives you a Google Access Token
            const credential = result.credential;
            const token = credential.accessToken;

            // The signed-in user info
            const user = result.user;

            // Check if this is a new user
            if (result.additionalUserInfo.isNewUser) {
                // Save user data to database
                return saveUserData(user.uid, user.displayName, user.email, role);
            } else {
                // User already exists, just sign them in
                displayMessage('Welcome back, ' + user.displayName + '!', 'success');
            }
        })
        .then(() => {
            displayMessage('Google authentication successful! Welcome to Gramik Digital Pathshala.', 'success');

            // Redirect to dashboard
            setTimeout(() => {
                // In a real app, redirect to dashboard
                // window.location.href = 'dashboard.html';
            }, 2000);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            displayMessage('Google authentication failed: ' + errorMessage, 'error');
        });
});

// Login link
document.getElementById('login-link').addEventListener('click', function (e) {
    e.preventDefault();
    displayMessage('Redirecting to login page...', 'success');
    // In a real app, you would redirect to the login page
    // window.location.href = 'login.html';
});

// Set first role option as selected by default
document.querySelector('.role-option').classList.add('selected');

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
