const resizeHeader = (header: HTMLElement) => {
	const addHeaderClass = () => {

		const scrollval = window.pageYOffset;

		if (scrollval > 85 && !header.classList.contains('isScrolled')) {
			header.classList.add('isScrolled');
		}

		if (scrollval < 85 && header.classList.contains('isScrolled')) {
			header.classList.remove('isScrolled');
		}

	}

	const init = () => {
		window.addEventListener('scroll', addHeaderClass);
	}

	return {
		init
	}
};

export default resizeHeader;