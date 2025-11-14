// Basic JavaScript validation for Name, Email, Mobile
(function(){
  const form = document.getElementById('regForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const mobileInput = document.getElementById('mobile');
  const msgBox = document.getElementById('formMsg');

  function showError(input, message){
    const help = document.getElementById(input.id + 'Help');
    if(help){ help.textContent = message; }
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input){
    const help = document.getElementById(input.id + 'Help');
    if(help){ help.textContent = ''; }
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
  }

  function validateName(){
    const value = nameInput.value.trim();
    if(!value){
      showError(nameInput, 'Name is required.');
      return false;
    }
    // Letters and spaces, at least 2 characters
    if(!/^[A-Za-z ]{2,}$/.test(value)){
      showError(nameInput, 'Use letters and spaces only (min 2 characters).');
      return false;
    }
    clearError(nameInput);
    return true;
  }

  function validateEmail(){
    const value = emailInput.value.trim();
    if(!value){
      showError(emailInput, 'Email is required.');
      return false;
    }
    // Simple email check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if(!emailOk){
      showError(emailInput, 'Enter a valid email like name@example.com');
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validateMobile(){
    const raw = mobileInput.value;
    const digits = raw.replace(/\D/g, ''); // keep digits only
    if(digits.length === 0){
      showError(mobileInput, 'Mobile number is required.');
      return false;
    }
    if(digits.length !== 10){
      showError(mobileInput, 'Enter exactly 10 digits (e.g., 9876543210).');
      return false;
    }
    clearError(mobileInput);
    return true;
  }

  // Clear errors as user types
  nameInput.addEventListener('input', () => clearError(nameInput));
  emailInput.addEventListener('input', () => clearError(emailInput));
  mobileInput.addEventListener('input', () => clearError(mobileInput));

  form.addEventListener('submit', function(e){
    e.preventDefault();
    msgBox.style.display = 'none';
    msgBox.className = 'alert';

    const okName = validateName();
    const okEmail = validateEmail();
    const okMobile = validateMobile();

    if(okName && okEmail && okMobile){
      msgBox.textContent = 'Registration successful! (demo)';
      msgBox.classList.add('success');
      msgBox.style.display = 'block';
      form.reset();
    } else {
      msgBox.textContent = 'Please fix the errors above and try again.';
      msgBox.classList.add('error');
      msgBox.style.display = 'block';
    }
  });
})();
