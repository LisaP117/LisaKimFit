const formValidation = (form: HTMLFormElement) => {

	const parentEl: HTMLElement | any = form.parentNode;
	const submitted: HTMLElement | any = parentEl.querySelector('[data-form-submitted]');
	const errorMessage: HTMLElement | any = submitted.querySelector('[data-form-error]');
	const successMessage: HTMLElement | any = submitted.querySelector('[data-form-success]');

	const closeStatusMessages = () => {
		errorMessage.style.display = 'none';
		submitted.style.display = 'none';
		errorMessage.setAttribute('aria-hidden', 'true');
		submitted.setAttribute('aria-hidden', 'true');
	}

	const closeErrorMessage = (errorMessage: HTMLElement) => {
		const closeButton: HTMLButtonElement | any = errorMessage.querySelector('[data-button="close"]');
		closeButton.addEventListener('click', closeStatusMessages);
	}

	const setStatusMessage = (response: Response) => {
		submitted.style.display = 'block';
		submitted.setAttribute('aria-hidden', 'false');
		if (response.status === 200) {
			successMessage.style.display = 'flex';
			form.style.display = 'none';
			submitted.classList.add('submitted');
		} else {
			errorMessage.style.display = 'flex';
			errorMessage.setAttribute('aria-hidden', 'false');
			closeErrorMessage(errorMessage);
		}
	}

	async function handleSubmit(e: Event) {
		const inputfields = form.querySelectorAll('[data-input]') as NodeList;
		const formData: any = new FormData(form);
		const url: string | any = form.getAttribute('action');
		let bodyText;
		let data = [];

		for (var input of inputfields) {
			const field = input as HTMLInputElement
			data.push({ input: field.value })
		}

		e.preventDefault();

		await fetch(url, {
			method: form.method,
			headers: { 
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT',
				'Access-Control-Allow-Origin': 'https://lisakimfit.com/',
				'Access-Control-Max-Age': '600',
				'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: bodyText
		})
		.then(setStatusMessage)
		.catch(setStatusMessage)
	}

	const activateSubmitButton = () => {
		const fieldsetArray: NodeList | any = form.querySelectorAll('[data-fieldset]');
		const completedArray: NodeList | any = form.querySelectorAll('.completed');
		const formSubmit: HTMLElement | any = form.querySelector('[data-submit-button]');

		if (completedArray.length === fieldsetArray.length) {
			formSubmit.classList.remove('disabled');
			formSubmit.setAttribute('aria-disabled', 'false');
			formSubmit.addEventListener('click', handleSubmit);
		} else {
			formSubmit.classList.add('disabled');
			formSubmit.setAttribute('aria-disabled', 'true');
		}
	}

	const errors = (elem: HTMLInputElement, error: HTMLElement, labelText: HTMLElement) => {
		error.classList.remove('hide');
		labelText.classList.remove('noError');
		error.setAttribute('aria-hidden', 'false');
		elem.setAttribute('aria-invalid', 'true');
	}

	const success = (elem: HTMLInputElement, error: HTMLElement, labelText: HTMLElement, complete: HTMLElement, fieldset: HTMLElement) => {
		error.classList.add('hide');
		error.setAttribute('aria-hidden', 'true');
		labelText.classList.add('noError');
		complete.classList.remove('hide');
		complete.setAttribute('aria-hidden', 'false');
		fieldset.classList.add('completed');
		elem.setAttribute('aria-invalid', 'false');
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
				errors(elem, error, labelText);
			} else {
				success(elem, error, labelText, complete, fieldset);
			}
		}

		if (elemId.indexOf("email") > -1 || elemId.indexOf("mce-EMAIL") > -1) {
			const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elem.value);
			if (emailTest === false) {
				errors(elem, error, labelText);
			} else {
				success(elem, error, labelText, complete, fieldset);
			}
		}

		if (elemId.indexOf("phone") > -1) {
			if (elem.value.length < 10) {
				errors(elem, error, labelText);
			} else {
				success(elem, error, labelText, complete, fieldset);
			}
		}

		if (elemId.indexOf("message") > -1) {
			if (elem.value.length < 5) {
				errors(elem, error, labelText);
			} else {
				success(elem, error, labelText, complete, fieldset);
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