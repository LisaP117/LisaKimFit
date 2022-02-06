const newsletterForm = (form: HTMLFormElement) => {

	const activateSubmitButton = () => {
		const fieldsetArray: NodeList | any = form.querySelectorAll('[data-fieldset]');
		const completedArray: NodeList | any = form.querySelectorAll('.completed');
		const formSubmit: HTMLElement | any = form.querySelector('[data-submit-button]');

		if (completedArray.length === fieldsetArray.length) {
			formSubmit.classList.remove('disabled');
			formSubmit.setAttribute('aria-disabled', 'false');
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

		activateSubmitButton();
	}

	const validate = (e: Event) => {
		const elem = e.target as HTMLInputElement;
		const label = elem.previousElementSibling as HTMLFormElement;
		const labelText = label.querySelector('[data-label-text]') as HTMLFormElement;
		const complete = label.querySelector('[data-field-complete]') as HTMLElement;
		const error = label.querySelector('[data-field-error]') as HTMLElement;
		const fieldset = elem.parentElement as HTMLElement;

		if (elem.classList.contains('mce_inline_error')) {
			errors(elem, error, labelText);
		}

		if (!elem.classList.contains('mce_inline_error')) {
			success(elem, error, labelText, complete, fieldset);
		}

	}

	const bindValidation = () => {

		const inputfields = form.querySelectorAll('[data-input]');

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

export default newsletterForm;