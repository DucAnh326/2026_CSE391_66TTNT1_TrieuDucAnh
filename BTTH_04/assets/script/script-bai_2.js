const prices = { "Laptop": 20000000, "Phone": 10000000, "Tablet": 8000000 };

function showError(id, msg) {
    document.getElementById(id + "Error").innerText = msg;
}

function clearError(id) {
    document.getElementById(id + "Error").innerText = "";
}

function validateFullName() {
    var val = document.getElementById("fullName").value.trim();
    var regex = /^[a-zA-Z\s]+$/;
    if (val === "" || val.length < 3 || !regex.test(val)) {
        showError("fullName", "Invalid name (min 3 chars, letters only)");
        return false;
    }
    return true;
}

function validateEmail() {
    var val = document.getElementById("email").value.trim();
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
        showError("email", "Invalid email format");
        return false;
    }
    return true;
}

function validatePhone() {
    var val = document.getElementById("phone").value.trim();
    if (val.length !== 10 || val[0] !== '0') {
        showError("phone", "Must be 10 digits starting with 0");
        return false;
    }
    return true;
}

function validatePassword() {
    var val = document.getElementById("password").value;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(val)) {
        showError("password", "Min 8 chars, 1 upper, 1 lower, 1 digit");
        return false;
    }
    return true;
}

function validateConfirm() {
    var p = document.getElementById("password").value;
    var cp = document.getElementById("confirmPassword").value;
    if (cp === "" || cp !== p) {
        showError("confirmPassword", "Passwords do not match");
        return false;
    }
    return true;
}

function validateGender() {
    var check = document.querySelector('input[name="gender"]:checked');
    if (!check) {
        showError("gender", "Select a gender");
        return false;
    }
    return true;
}

function validateTerms() {
    var check = document.getElementById("terms").checked;
    if (!check) {
        showError("terms", "Required");
        return false;
    }
    return true;
}

function validateProduct() {
    if (document.getElementById("product").value === "") {
        showError("product", "Select a product");
        return false;
    }
    return true;
}

function validateQuantity() {
    var val = parseInt(document.getElementById("quantity").value);
    if (isNaN(val) || val < 1 || val > 99) {
        showError("quantity", "Range 1-99");
        return false;
    }
    return true;
}

function validateDate() {
    var val = document.getElementById("deliveryDate").value;
    if (!val) {
        showError("deliveryDate", "Select a date");
        return false;
    }
    var d = new Date(val);
    var now = new Date();
    now.setHours(0,0,0,0);
    var max = new Date();
    max.setDate(now.getDate() + 30);
    if (d < now || d > max) {
        showError("deliveryDate", "Date must be between today and +30 days");
        return false;
    }
    return true;
}

function validateAddress() {
    var val = document.getElementById("address").value.trim();
    if (val.length < 10) {
        showError("address", "Min 10 characters required");
        return false;
    }
    return true;
}

function validatePayment() {
    var check = document.querySelector('input[name="payment"]:checked');
    if (!check) {
        showError("payment", "Select payment method");
        return false;
    }
    return true;
}

function updatePrice() {
    var p = document.getElementById("product").value;
    var q = parseInt(document.getElementById("quantity").value) || 0;
    var total = (prices[p] || 0) * q;
    document.getElementById("totalDisplay").innerText = total.toLocaleString("vi-VN");
}

document.querySelectorAll("input, select, textarea").forEach(el => {
    el.onblur = function() {
        if (this.id === "fullName") validateFullName();
        if (this.id === "email") validateEmail();
        if (this.id === "phone") validatePhone();
        if (this.id === "password") validatePassword();
        if (this.id === "confirmPassword") validateConfirm();
        if (this.id === "product") validateProduct();
        if (this.id === "quantity") validateQuantity();
        if (this.id === "deliveryDate") validateDate();
        if (this.id === "address") validateAddress();
    };
    el.oninput = function() {
        clearError(this.id || this.name);
        if (this.id === "note") {
            var len = this.value.length;
            var counter = document.getElementById("charCounter");
            counter.innerText = len + "/200";
            if (len > 200) {
                counter.style.color = "red";
                showError("note", "Limit exceeded");
            } else {
                counter.style.color = "black";
                clearError("note");
            }
        }
        if (this.id === "product" || this.id === "quantity") updatePrice();
    };
});

document.getElementById("product").onchange = updatePrice;

document.getElementById("registrationForm").onsubmit = function(e) {
    e.preventDefault();
    var valid = validateFullName() & validateEmail() & validatePhone() & 
                validatePassword() & validateConfirm() & validateGender() & validateTerms();
    if (valid) {
        var name = document.getElementById("fullName").value;
        document.getElementById("registrationContainer").style.display = "none";
        document.getElementById("finalSuccess").style.display = "block";
        document.getElementById("finalSuccess").innerText = "Registration Successful! 🎉 Welcome " + name;
    }
};

document.getElementById("orderForm").onsubmit = function(e) {
    e.preventDefault();
    var valid = validateProduct() & validateQuantity() & validateDate() & 
                validateAddress() & validatePayment();
    if (valid && document.getElementById("note").value.length <= 200) {
        var p = document.getElementById("product").value;
        var q = document.getElementById("quantity").value;
        var d = document.getElementById("deliveryDate").value;
        var t = document.getElementById("totalDisplay").innerText;
        document.getElementById("summaryContent").innerHTML = 
            "<p>Product: "+p+"</p><p>Qty: "+q+"</p><p>Total: "+t+" VND</p><p>Date: "+d+"</p>";
        document.getElementById("confirmationBox").style.display = "block";
    }
};

document.getElementById("cancelBtn").onclick = function() {
    document.getElementById("confirmationBox").style.display = "none";
};

document.getElementById("confirmBtn").onclick = function() {
    document.getElementById("orderContainer").style.display = "none";
    document.getElementById("confirmationBox").style.display = "none";
    document.getElementById("finalSuccess").style.display = "block";
    document.getElementById("finalSuccess").innerText = "Order Placed Successfully! 🎉";
};