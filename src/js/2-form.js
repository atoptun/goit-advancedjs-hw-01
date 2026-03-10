const refs = {
  form: document.querySelector('.feedback-form'),
};

const lsKey = 'feedback-form-state';

let formData = { email: '', message: '' };

const data = localStorage.getItem(lsKey);
if (data) {
  //  && Object.values(data).every(v => v !== '')
  try {
    formData = JSON.parse(data);
    for (const el of refs.form.elements) {
      if (formData[el.name]) {
        el.value = formData[el.name];
      }
    }
  } catch {
    // silent
  }
}

const inputHandler = event => {
  const form = event.currentTarget;
  const input = event.target;
  formData[input.name] = input.value.trim();
  // for (const el of form.elements) {
  //   if (el.name) {
  //     formData[el.name] = el.value.trim();
  //   }
  // }

  localStorage.setItem(lsKey, JSON.stringify(formData));
};

const submitHandler = event => {
  event.preventDefault();

  const allFilled = Object.values(formData).every(val => val !== '');
  if (!allFilled) {
    alert('Fill please all fields');
    return;
  }

  // send
  console.log(formData);

  // clear
  formData = { email: '', message: '' };
  localStorage.removeItem(lsKey);
  refs.form.reset();
};

refs.form.addEventListener('input', inputHandler);
refs.form.addEventListener('submit', submitHandler);
