const scrollToForm = (button: HTMLButtonElement) => {

	const scrollTo = () => {
		const section = document.querySelector('#contact');
		
		if (section !== null ){
			section.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest"
			});

			//ga('send', 'event', 'scroll to', 'click', 'contact form');
		}

	}

	const init = () => {
		button.addEventListener('click', scrollTo);
	}

	return {
		init
	}
}


export default scrollToForm;