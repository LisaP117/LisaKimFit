const MailerLite = require('mailerlite-api-v2-node').default
const mailerLite = new MailerLite('1ddc232129343a09f2a98a764fc22d62');

const formValidation = (form: HTMLFormElement) => {

	const parentEl: HTMLFormElement | any = form.parentNode;
	const submitted: HTMLElement | any = parentEl.querySelector('[data-form-submitted]');
	const errorMessage: HTMLElement | any = submitted.querySelector('[data-form-error]');
	const successMessage: HTMLElement | any = submitted.querySelector('[data-form-success]');

	const closeStatusMessages = (e: Event) => {
		errorMessage.style.display = 'none';
		submitted.style.display = 'none';
		e.preventDefault();
	}

	const closeErrorMessage = (errorMessage: HTMLElement) => {
		const closeButton: HTMLButtonElement | any = errorMessage.querySelector('[data-button="close"]');
		closeButton.addEventListener('click', closeStatusMessages);
	}

	const setStatusMessage = (response: Response) => {
		submitted.style.display = 'block';

		if (response.status === 200) {
			successMessage.style.display = 'flex';
			form.style.display = 'none';
		} else {
			errorMessage.style.display = 'flex';
			closeErrorMessage(errorMessage);
		}
	}

	async function handleSubmit(e: Event) {
		const inputfields = form.querySelectorAll('[data-input') as NodeList;
		let data = [];

		for (var input of inputfields) {
			const field = input as HTMLInputElement

			if (field.name === 'fields[name]') {
				data.push({ name : field.value });
			}
			if (field.name === 'fields[email]') {
				data.push({ email: field.value });
			}
			if (field.name !== 'fields[email]' && field.name !== 'fields[name]'){
				data.push({ input: field.value })
			}	
		}
		
		await fetch(form.action, {
			method: form.method,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: JSON.stringify(data)
		})
			.then(setStatusMessage)
			.catch(setStatusMessage)

		e.preventDefault();
	}

	const activateSubmitButton = () => {
		const fieldsetArray: NodeList | any = form.querySelectorAll('[data-fieldset]');
		const completedArray: NodeList | any = form.querySelectorAll('.completed');
		const formSubmit: HTMLInputElement | any = form.querySelector('[data-submit-button]');

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