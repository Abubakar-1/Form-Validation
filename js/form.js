const form = document.getElementById('form');

function removeDefault(e) {
    e.preventDefault();
    return signup();
};

form.addEventListener('submit', removeDefault);

function signup() {
    const fname = document.getElementById('fname');
    const uname = document.getElementById('uname');
    const sname = document.getElementById('sname');
    const psw = document.getElementById('psw');
    const cpsw = document.getElementById('cpsw');

    const fnameVal = fname.value;
    const snameVal = sname.value;
    const unameVal = uname.value;
    const pswVal = psw.value;
    const cpswVal = cpsw.value;

    const fnameErrorEl = document.getElementById('fnameErrorEl');
    const snameErrorEl = document.getElementById('snameErrorEl');
    const unameErrorEl = document.getElementById('unameErrorEl');
    const pswErrorEl = document.getElementById('pswErrorEl');
    const cpswErrorEl = document.getElementById('cpswErrorEl');

    const fnameSuccessEl = document.getElementById('fnameSuccessEl');
    const snameSuccessEl = document.getElementById('snameSuccessEl');
    const unameSuccessEl = document.getElementById('unameSuccessEl');
    const pswSuccessEl = document.getElementById('pswSuccessEl');
    const cpswSuccessEl = document.getElementById('cpswSuccessEl');

    const successMsgEl = document.getElementById('successMsg');
    const cpswErrorMsgEl = document.getElementById('cpswerrormsg')


    let formErrors = [];
    let fieldHasError;

    fieldHasError = errorColor(fnameVal, fname, 'red', fnameErrorEl, 'block', fnameSuccessEl);
    formErrors = updateErrors(fieldHasError, fnameErrorEl, formErrors);

    fieldHasError = errorColor(snameVal, sname, 'red', snameErrorEl, 'block', snameSuccessEl);
    formErrors = updateErrors(fieldHasError, snameErrorEl, formErrors);

    fieldHasError = errorColor(unameVal, uname, 'red', unameErrorEl, 'block', unameSuccessEl);
    formErrors = updateErrors(fieldHasError, unameErrorEl, formErrors);

    fieldHasError = errorColor(pswVal, psw, 'red', pswErrorEl, 'block', pswSuccessEl);
    formErrors = updateErrors(fieldHasError, pswErrorEl, formErrors);

    fieldHasError = errorColor(cpswVal, cpsw, 'red', cpswErrorEl, 'block', cpswSuccessEl);
    formErrors = updateErrors(fieldHasError, cpswErrorEl, formErrors);

    if (formErrors.length > 0)
    return;

    formErrors = updateErrors(fieldHasError, cpswErrorEl, formErrors);

    if (cpswVal !== pswVal) {
        cpsw.style.borderColor = 'red'; 
        cpswErrorEl.style.display = 'block';
        cpswErrorEl.style.color = 'red';
        cpswSuccessEl.style.display = 'none';
        cpswErrorMsgEl.textContent = 'Passwords don\'t match';
        formErrors.push(cpswErrorEl);
    } else{
        cpsw.style.borderColor = 'green';
        cpswErrorEl.style.display = 'none'
        cpswSuccessEl.style.display = 'block';
        cpswSuccessEl.style.color = 'green';
        cpswErrorMsgEl.textContent = '';
        const index = formErrors.indexOf(cpswErrorEl);
        if (index !== -1) {
            formErrors.splice(index, 1)
        }
    } 
    const checkUsername = localStorage.getItem(`test-${unameVal}`)
    if(checkUsername) {
        unameErrorEl.textContent = 'Username not available';
        unameErrorEl.display = 'block'
    }
    if (formErrors.length > 0)
    return;

    const user = {  
        firstname: fnameVal,
        surname: snameVal,
        username: unameVal,
        password: pswVal,
    }

    const userString = JSON.stringify(user)
    localStorage.setItem(`test-${unameVal}`, userString);

    successMsgEl.textContent = 'You\'ve successfully registered';

    setTimeout(() => {successMsgEl.textContent = '';
        fname.style.borderColor = 'lightBlue';
        fnameErrorEl.style.display = 'none'
        fnameSuccessEl.style.display = 'none';
        fnameSuccessEl.style.color = 'none';
        
        sname.style.borderColor = 'lightBlue';
        snameErrorEl.style.display = 'none'
        snameSuccessEl.style.display = 'none';
        snameSuccessEl.style.color = 'none';

        uname.style.borderColor = 'lightBlue';
        unameErrorEl.style.display = 'none'
        unameSuccessEl.style.display = 'none';
        unameSuccessEl.style.color = 'none';

        psw.style.borderColor = 'lightBlue';
        pswErrorEl.style.display = 'none'
        pswSuccessEl.style.display = 'none';
        pswSuccessEl.style.color = 'none';

        cpsw.style.borderColor = 'lightBlue';
        cpswErrorEl.style.display = 'none'
        cpswSuccessEl.style.display = 'none';
        cpswSuccessEl.style.color = 'none';

        fname.value = '';
        sname. value = '';
        uname.value = '';
        psw.value = '';
        cpsw.value = '';
    }, 5000)




}

function errorColor(value, input, borderColor, errorEl, style, successEl) {
    if (value === ''){
        input.style.borderColor = borderColor; 
        errorEl.style.display = style;
        errorEl.style.color = 'red';
        return true;
    } else{
        input.style.borderColor = 'green';
        errorEl.style.display = 'none'
        successEl.style.display = 'block';
        successEl.style.color = 'green';
        return false;
    }
}

function updateErrors(hasError, errorEl, errorArray) {
    if (hasError) {
        errorArray.push(errorEl);
    } else{
        const index = errorArray.indexOf(errorEl);
        if (index !== -1) {
            errorArray.splice(index, 1);
        }
    }
    return errorArray;
}