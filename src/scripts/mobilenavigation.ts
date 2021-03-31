const mobileMenu = (header: HTMLElement) => {

	const menuIcons = header.querySelectorAll('[data-menu-button]') as NodeListOf<HTMLSpanElement>;
	const nav = header.querySelector('[data-menu]') as HTMLElement;

	const toggleMenu = (e: Event & { target: Element }) => {
		const elem = e.target.parentNode;
		let sibling;

		if (elem.nextElementSibling !== null) {
			sibling = elem.nextElementSibling;
			nav.classList.remove('navigation__mobile--closed');
		} else {
			sibling = elem.previousElementSibling;
			nav.classList.add('navigation__mobile--closed');
		}

		elem.classList.remove('show');
		elem.classList.add('hide');
		sibling.classList.remove('hide');
		sibling.classList.add('show');

	}

	const init = () => {
		for (var icon of menuIcons) {
			icon.addEventListener('click', toggleMenu);
		}
	}

	return {
		init
	}

}

export default mobileMenu;