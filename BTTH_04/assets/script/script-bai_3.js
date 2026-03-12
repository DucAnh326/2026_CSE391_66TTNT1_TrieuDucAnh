$(document).ready(function() {
    function setErr(id, msg) {
        $(`#${id}Error`).text(msg);
        $(`#${id}`).addClass("invalid");
    }

    function clrErr(id) {
        $(`#${id}Error`).text("");
        $(`#${id}`).removeClass("invalid");
    }

    $("#fullName").on("input", function() {
        var len = $(this).val().length;
        $("#nameCounter").text(len + "/50");
        clrErr("fullName");
    });

    $("#toggleView").on("click", function() {
        var passInput = $("#password");
        var isPass = passInput.attr("type") === "password";
        passInput.attr("type", isPass ? "text" : "password");
        $(this).text(isPass ? "👁" : "👁");
    });

    $("#password").on("input", function() {
        var val = $(this).val();
        var $bar = $("#strengthBar");
        clrErr("password");

        if (val.length === 0) {
            $bar.css("width", "0").attr("class", "");
            return;
        }

        var score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[a-z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;

        $bar.attr("class", ""); 

        if (score <= 2) {
            $bar.addClass("weak");
        } else if (score === 3) {
            $bar.addClass("medium");
        } else if (score >= 4) {
            $bar.addClass("strong");
        }
    });

    function valName() {
        var val = $("#fullName").val().trim();
        var letters = /^[a-zA-Z\s]+$/;
        if (val === "" || val.length < 3 || !letters.test(val)) {
            setErr("fullName", "Requires 3+ letters and spaces only.");
            return false;
        }
        return true;
    }

    function valEmail() {
        var val = $("#email").val().trim();
        var format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!format.test(val)) {
            setErr("email", "Invalid email format.");
            return false;
        }
        return true;
    }

    function valPhone() {
        var val = $("#phone").val().trim();
        if (val.length !== 10 || val[0] !== '0' || isNaN(val)) {
            setErr("phone", "Must be 10 digits starting with 0.");
            return false;
        }
        return true;
    }

    function valPass() {
        var val = $("#password").val();
        var format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!format.test(val)) {
            setErr("password", "Need 8+ chars (1 upper, 1 lower, 1 digit).");
            return false;
        }
        return true;
    }

    function valConfirm() {
        var p = $("#password").val();
        var cp = $("#confirmPassword").val();
        if (cp === "" || cp !== p) {
            setErr("confirmPassword", "Passwords do not match.");
            return false;
        }
        return true;
    }

    function valGender() {
        if (!$('input[name="gender"]:checked').val()) {
            $("#genderError").text("Please select a gender.");
            return false;
        }
        return true;
    }

    function valTerms() {
        if (!$("#terms").is(":checked")) {
            $("#termsError").text("Agreement required.");
            return false;
        }
        return true;
    }

    var fields = ["fullName", "email", "phone", "password", "confirmPassword"];
    
    $.each(fields, function(index, id) {
        $("#" + id).on("blur", function() {
            if (id === "fullName") valName();
            if (id === "email") valEmail();
            if (id === "phone") valPhone();
            if (id === "password") valPass();
            if (id === "confirmPassword") valConfirm();
        }).on("focus", function() {
            clrErr(id);
        });
    });

    $("#registrationForm").on("submit", function(e) {
        e.preventDefault();
        
        var isName = valName();
        var isEmail = valEmail();
        var isPhone = valPhone();
        var isPass = valPass();
        var isConf = valConfirm();
        var isGen = valGender();
        var isTerm = valTerms();

        if (isName & isEmail & isPhone & isPass & isConf & isGen & isTerm) {
            var user = $("#fullName").val();
            $("#formContainer").hide();
            $("#successDisplay").fadeIn().html("Registration Successful! <br>Welcome, " + user);
        }
    });
});