document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent actual submission

    // Clear previous errors
    document.querySelectorAll('.error').forEach(span => span.textContent = '');

    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value;
    const gender = document.getElementById('gender').value;
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();

    let isValid = true;

    // ✅ Name Validation
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        document.getElementById('nameError').textContent = "Please enter a valid name.";
        isValid = false;
    }

    // ✅ Address Validation
    if (!address) {
        document.getElementById('addressError').textContent = "Address cannot be empty.";
        isValid = false;
    }

    // ✅ City Validation
    if (!city || !/^[A-Za-z\s]+$/.test(city)) {
        document.getElementById('cityError').textContent = "Please enter a valid city.";
        isValid = false;
    }

    // ✅ State Validation
    if (!state) {
        document.getElementById('stateError').textContent = "Please select a state.";
        isValid = false;
    }

    // ✅ Gender Validation
    if (!gender) {
        document.getElementById('genderError').textContent = "Please select a gender.";
        isValid = false;
    }

    // ✅ Mobile Number Validation (10-digit starting 6–9)
    // if (!mobile || !/^[6-9][0-9]{9}$/.test(mobile)) {
    //     document.getElementById('mobileError').textContent = "Enter a valid 10-digit mobile number.";
    //     isValid = false;
    // }

    // ✅ Fixed Email Validation (proper regex)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // ✅ If everything is valid → Redirect to success page
    if (isValid) {
        window.location.href = "success.html";
    }
});
