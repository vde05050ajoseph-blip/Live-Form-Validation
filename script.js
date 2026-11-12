const signupSection = document.getElementById("signupSection");
const loadingSection = document.getElementById("loadingSection");
const successSection = document.getElementById("successSection");
const signinSection = document.getElementById("signinSection");


const signupForm = document.getElementById("signupForm");

const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");


const signinForm = document.getElementById("signinForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const nameHint = document.getElementById("nameHint");
const emailHint = document.getElementById("emailHint");
const phoneHint = document.getElementById("phoneHint");
const addressHint = document.getElementById("addressHint");
const passwordHint = document.getElementById("passwordHint");
const confirmHint = document.getElementById("confirmHint");
const termsHint = document.getElementById("termsHint");


function showMessage(input, hint, message, isValid) {
    input.classList.remove("valid", "invalid");
    hint.classList.remove("error", "success");

    if (isValid.test(input.value)) {
        hint.textContent = "Yes!👍 This Looks Perfect ✓";
        input.classList.add("valid");
        hint.classList.add("success");

    } else {
        hint.textContent = message;
        input.classList.add("invalid");
        hint.classList.add("error");

    }
}



const namePattern = /^[a-zA-Z0-9\s,.'#-]{3,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(?:(?:\+234)|0)[789][01]\d{8}$/;
const addressPattern = /^(?=.*\d)[a-zA-Z0-9\s.,'#-]{8,}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;


username.addEventListener("input", () => {
    showMessage(username, nameHint,
        "Name must contain more than 3 characters.", namePattern
    );
});


email.addEventListener("input", () => {
    showMessage(email,
        emailHint,
        "Enter a valid email address.",
        emailPattern
    );
});


phone.addEventListener("input", () => {
    showMessage(phone,
        phoneHint,
        "Enter a valid Nigerian mobile number.",
        phonePattern
    );
});


address.addEventListener("input", () => {
    showMessage(address,
        addressHint,
        "Address must contain at least 8 characters and a House number.",
        addressPattern
    );
});


password.addEventListener("input", () => {
    showMessage(password,
        passwordHint,
        "Use at least 6 characters, one uppercase letter and one number.",
        passwordPattern
    );
});


confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value !== password.value) {
        confirmHint.textContent = "Password Mismatch";
        confirmPassword.classList.add("invalid");
        confirmHint.classList.add("error");
    } else {
        confirmHint.textContent = "Yes! This Looks Perfect ✓";
        confirmPassword.classList.add("valid");
        confirmHint.classList.add("success");
    }
});

terms.addEventListener("input", () => {
    if (!terms.checked) {
        termsHint.textContent = "You must agree to the Terms and Privacy Policy.";
        terms.classList.add("invalid");
        termsHint.classList.add("error");
    } else {
        termsHint.textContent = " ";
    }
});


const showLogin = document.getElementById("showLogin");

showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupSection.style.display = "none";
    signinSection.style.display = "block"
});


const showSignup = document.getElementById("showSignup");
showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    signupSection.style.display = "block";
    signinSection.style.display = "none"
    window.location.reload()
});


const successLoginBtn = document.getElementById("successLoginBtn");
successLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    successSection.style.display = "none";
    signinSection.style.display = "block"
});


const toggleSignupPassword = document.getElementById("toggleSignupPassword");

toggleSignupPassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        toggleSignupPassword.textContent = "Hide";

    } else {
        password.type = "password";
        toggleSignupPassword.textContent = "Show";

    }

});


const toggleLoginPassword =
    document.getElementById("toggleLoginPassword");

toggleLoginPassword.addEventListener("click", () => {

    if (loginPassword.type === "password") {
        loginPassword.type = "text";
        toggleLoginPassword.textContent = "Hide";

    } else {
        loginPassword.type = "password";
        toggleLoginPassword.textContent = "Show";

    }

});


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const namePass = namePattern.test(username.value)
    const emailPass = emailPattern.test(email.value)
    const phonePass = phonePattern.test(phone.value)
    const addressPass = addressPattern.test(address.value)
    const passwordPass = passwordPattern.test(password.value)
    const accountError = document.getElementById("accountError");

    if (namePass && emailPass && phonePass && addressPass && passwordPass) {
        signupSection.style.display = "none";
        loadingSection.style.display = "flex"

        setTimeout(() => {
            loadingSection.style.display = "none"
            successSection.style.display = "block";
        }, 4000);
    } else {
        accountError.style.display = "block"

        function completeError(input, notification, report, pattern) {
            input.classList.remove("valid", "invalid");
            notification.classList.remove("error", "success");

            if (pattern.test(input.value)) {
                notification.textContent = "Yes!👍 This Looks Perfect ✓";
                input.classList.add("valid");
                notification.classList.add("success");

            } else if (input.value.trim() === "") {
                notification.textContent = report;
                input.classList.add("invalid");
                notification.classList.add("error");
            } else {
                input.classList.add("invalid");
                notification.classList.add("error");
            }
        }

        completeError(username, nameHint, "Field is empty, input your name", namePattern);
        completeError(email, emailHint, "Field is empty, enter a valid email", emailPattern);
        completeError(phone, phoneHint, "Field is empty, enter a valid Nigerian Number", phonePattern);
        completeError(address, addressHint, "Field is empty, your home address is required", addressPattern);
        completeError(password, passwordHint, "Field is empty, Set a secure Password", passwordPattern);


        
        if (confirmPassword.value.trim() === "") {
            confirmHint.textContent = "Field is empty, Set a Matching Password";
            confirmPassword.classList.add("invalid");
            confirmHint.classList.add("error");
        }
        else if (confirmPassword.value !== password.value) {
            confirmHint.textContent = "Password Mismatch";
            confirmPassword.classList.add("invalid");
            confirmHint.classList.add("error");
        } else {
            confirmHint.textContent = "Yes!👍 This Looks Perfect ✓";
            confirmPassword.classList.add("valid");
            confirmHint.classList.add("success");
        }



        if (!terms.checked) {
            termsHint.textContent = "You must agree to the Terms and Privacy Policy.";
            terms.classList.add("invalid");
            termsHint.classList.add("error");
        } else {
            termsHint.textContent = " ";
        }


    }

})




