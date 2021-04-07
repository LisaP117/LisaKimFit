const formValidation = (form: HTMLFormElement) => {

	const setStatusMessage = (response: Response) => {
		const submitted: HTMLElement | any = form.querySelector('[data-form-submitted]');
		const errorMessage: HTMLElement | any = form.querySelector('[data-form-error]');
		const successMessage: HTMLElement | any = form.querySelector('[data-form-success]');
		const fieldsetWrap: HTMLElement | any = form.querySelector('[data-fieldset-wrap]');

		submitted.style.display = 'block';

		if (response.status === 200) {
			successMessage.style.display = 'block';
			fieldsetWrap.style.display = 'none';
		} else {
			errorMessage.style.display = 'block';
		}
	}

	async function handleSubmit(e: Event) {
		const inputfields = form.querySelectorAll('[data-input') as NodeList;
		let data = [];

		for (var input of inputfields) {
			const field = input as HTMLInputElement
			data.push({ input: field.value });
		}

		e.preventDefault();

		await fetch(form.action, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(data)
		})
		.then(setStatusMessage);
	}

	const activateSubmitButton = () => {
		const fieldsetArray = form.querySelectorAll('[data-fieldset]') as NodeList;
		const completedArray = form.querySelectorAll('.completed') as NodeList;
		const formSubmit = form.querySelector('[data-submit-button]') as HTMLInputElement;

		if (completedArray.length === fieldsetArray.length) {
			formSubmit.disabled = false;
			formSubmit.addEventListener('click', handleSubmit);
		} else {
			formSubmit.disabled = true;
		}
	}

	const errors = (error: HTMLElement, labelText: HTMLElement) => {
		error.classList.remove('hide');
		labelText.classList.remove('noError');
	}

	const success = (error: HTMLElement, labelText: HTMLElement, complete: HTMLElement, fieldset: HTMLElement) => {
		error.classList.add('hide');
		labelText.classList.add('noError');
		complete.classList.remove('hide');
		fieldset.classList.add('completed');
	}

	const validate = (e: Event) => {
		const elem = e.target as HTMLInputElement;
		const elemId = elem.id;
		const label = elem.previousElementSibling as HTMLFormElement;
		const labelText = label.querySelector('[data-label-text]') as HTMLFormElement;
		const complete = label.querySelector('[data-field-complete]') as HTMLElement;
		const error = label.querySelector('[data-field-error]') as HTMLElement;
		const fieldset = elem.parentElement as HTMLElement;

		if (elemId.indexOf("name") >-1) {
			if (elem.value.length < 3 ) {
				errors(error, labelText);
			} else {
				success(error, labelText, complete, fieldset);
			}
		}

		if (elemId.indexOf("email") > -1) {
			const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elem.value);

			if (elem.value === '' && emailTest === false) {
				errors(error, labelText);
			} else {
				success(error, labelText, complete, fieldset);
			}
		}

		if (elemId.indexOf("phone") > -1) {
			if (elem.value.length < 10) {
				errors(error, labelText);
			} else {
				success(error, labelText, complete, fieldset);
			}
		}

		if (elemId.indexOf("message") > -1) {
			if (elem.value.length < 5) {
				errors(error, labelText);
			} else {
				success(error, labelText, complete, fieldset);
			}
		}

		activateSubmitButton();

	}

	const bindValidation = () => {

		const inputfields = form.querySelectorAll('[data-input');

		for (var input of inputfields) {
			input.addEventListener('blur', validate);
		}

	}

	const init = () => {
		bindValidation();
	}

	return {
		init
	}
};

export default formValidation;