
const form            = document.getElementById('form');
const username        = document.getElementById('username');
const email           = document.getElementById('email');
const password        = document.getElementById('password');
const password_repeat = document.getElementById('password_repeat');

/**
 * Show input error message
 *
 * @param input
 * @param message
 */
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

/**
 * Show success outline
 *
 * @param input
 */
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/**
 * Check email is valid
 *
 * @param input
 */
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email не валиден');
    }
}

/**
 * Check required fields
 *
 * @param inputArr
 */
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `Поле ${getFieldName(input)} обязательно`);
        } else {
            showSuccess(input);
        }
    });
}

/**
 * Check input length
 *
 * @param input
 * @param min
 * @param max
 */
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `Поле ${getFieldName(input)} должно быть не короче ${min} символов`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `Поле ${getFieldName(input)} должно быть не длинее ${max} символов`
        );
    } else {
        showSuccess(input);
    }
}

/**
 * Check passwords match
 *
 * @param input1
 * @param input2
 */
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Пароль и его повторение не совпадают');
    }
}

/**
 * Get fieldname
 *
 * @param input
 * @returns {string}
 */
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/**
 * Event listeners
 */
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password_repeat]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password_repeat);
});
