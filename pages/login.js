
// ✅ Correct Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8fyCsAWfL5fiAXwJ0Zi7n45Bw7TFZG7s",
    authDomain: "dental-management-system.firebaseapp.com",
    projectId: "dental-management-system-a165e",
    storageBucket: "dental-management-system.appspot.com",
    messagingSenderId: "513485187568",
    appId: "1:513485187568:web:cdc36fafe2b271d8015535"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Function for Email/Password Login
function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
            Swal.fire("Success!", "Logged in successfully!", "success").then(() => {
                window.location.href = "home.html";  // Redirect after login
            });
        })
        .catch(error => {
            Swal.fire("Error!", error.message, "error");
        });
}

// ✅ Function for Google Login
function handleGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
            Swal.fire("Success!", "Logged in with Google successfully!", "success").then(() => {
                window.location.href = "home.html";  // Redirect after login
            });
        })
        .catch(error => {
            Swal.fire("Error!", error.message, "error");
        });
}

// ✅ Function for Password Reset
function forgotPassword() {
    const email = document.getElementById("email").value;
    if (!email) {
        Swal.fire("Error!", "Please enter your email!", "warning");
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            Swal.fire("Success!", "Password reset email sent!", "success");
        })
        .catch(error => {
            Swal.fire("Error!", error.message, "error");
        });
}

// ✅ Function to Toggle Password Visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
