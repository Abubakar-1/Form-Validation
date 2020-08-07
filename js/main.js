const form = document.getElementById('form');
console.log('form');

function removeDefault(e) {
    e.preventDefault();
    return signUp();
}
form.addEventListener('submit', removeDefault);

function signUp() {
    const fname = document.getElementById('fname');
    const sname = document.getElementById('sname');
    const uname = document.getElementById('uname');
    const psw = document.getElementById('psw');
    const cpsw = document.getElementById('cpsw');

    const fnameVal = fname.value;
    const snameVal = sname.value;
    const unameVal = uname.value;
    const pswVal = psw.value;
    const cpswVal = cpsw.value;

    const fnameErrorEl = document.getElementById('fname-errorMsg');
    const snameErrorEl = document.getElementById('sname-errorMsg');
    const unameErrorEl = document.getElementById('uname-errorMsg');
    const pswErrorEl = document.getElementById('psw-errorMsg');
    const cpswErrorEl = document.getElementById('cpsw-errorMsg');

    let fieldHasError;
    let formErrors = [];

    fieldHasError = validate(fnameVal, fnameErrorEl, 'Please fill in your First name.');
    formErrors = updateErrors(fieldHasError, fnameErrorEl, formErrors);

    fieldHasError = validate(snameVal, snameErrorEl, 'Please fill in your Surname');
    formErrors = updateErrors(fieldHasError, snameErrorEl, formErrors);

    fieldHasError = validate(unameVal, unameErrorEl, 'Please fill in your Username');
    formErrors = updateErrors(fieldHasError, unameErrorEl, formErrors);

    fieldHasError = validate(pswVal, pswErrorEl, 'Please create in your Password');
    formErrors = updateErrors(fieldHasError, pswErrorEl, formErrors);

    fieldHasError = validate(cpswVal, cpswErrorEl, 'Please confirm your Password');
    formErrors = updateErrors(fieldHasError, cpswErrorEl, formErrors);


    if (formErrors.length > 0)
    return;

    console.log('saving')

}

function validate(value, errorEl, errorMsg) {
    if (value === "") {
        errorEl.textContent = errorMsg;
        return true;
    } else{
        errorEl.textContent = "";
        return false;
    }
}

function updateErrors(hasError, errorEl, errorArray) {
    if (hasError) {
        errorArray.push(errorEl);
    } else{
        const index = errorArray.indexOf(errorEl)
        if (index !== -1) {
            errorArray.splice(index, 1)
        }

    }
    return errorArray;
}