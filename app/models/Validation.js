function Validation() {
    this.emptyCheck = function (input, spanId, message) {
        if (input === '') {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        } else {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        }
    };

    /* this.lengCheck = function (input, spanId, message, min, max) {
        if (input.length < min || input.length > max) {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        } else {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        }
    } */

    this.idCheck = function (input, spanId, message) {
        var condition = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9]).{6,12}$");
        if (condition.test(input)) {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        } else {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        }
    }

    this.vnTextCheck = function (input, spanId, message) {
        // var condition = /^[A-Za-z]+$/;
        var firstLetter = "[A-EGHIK-VXYÂĐỔÔÚỨ]".normalize("NFC"),
            otherLetters = "[a-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫]".normalize("NFC"),
            regexString = "^"
                + firstLetter + otherLetters + "+\\s"
                + "(" + firstLetter + otherLetters + "+\\s)*"
                + firstLetter + otherLetters + "+$",
            regexPattern = RegExp(regexString);

        if (regexPattern.test(input)) {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        } else {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        }
    }

    this.passwordCheck = function (input, spanId, message) {
        var condition = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$");
        if (condition.test(input)) {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        } else {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        }
    }

    this.duplicateCheck = function (taiKhoan, spanId, message) {
        var userList = JSON.parse(localStorage.getItem("DSND"));
        var isValid = !userList.some(function (item) {
            return item.TaiKhoan === taiKhoan;
        });

        if (isValid) {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        } else {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        }
    }

    this.emailCheck = function (input, spanId, message) {
        var mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var email = input.toLowerCase();
        if (email.match(mailFormat)) {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        } else {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        }
    }

    this.phoneNumberCheck = function(input, spanId, message) {
        var condition = new RegExp("^(?=.*[0-9]).{10,12}$");
        if (condition.test(input)) {
            $(`#${spanId}`).css("display", "none");
            $(`#${spanId}`).html('');
            return true;
        } else {
            $(`#${spanId}`).css("display", "block");
            $(`#${spanId}`).html(message);
            return false;
        }
    }
}