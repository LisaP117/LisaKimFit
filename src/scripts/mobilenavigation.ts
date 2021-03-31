const mobileMenu = (header: HTMLElement) => {

	const menuIcons = header.querySelectorAll('[data-menu-button]') as NodeListOf<HTMLSpanElement>;
	const nav = header.querySelector('[data-menu]') as HTMLElement;

	const toggleMenu = (e: Event) => {
		const elem = e.target as HTMLElement;
    const parentNode = elem.parentNode as HTMLElement;
    
		let sibling;

		if (parentNode.nextElementSibling !== null) {
			sibling = parentNode.nextElementSibling;
			nav.classList.remove('navigation__mobile--closed');
		} else {
			sibling = parentNode.previousElementSibling;
			nav.classList.add('navigation__mobile--closed');
		}

		parentNode.classList.remove('show');
		parentNode.classList.add('hide');

    if (sibling) {
      sibling.classList.add('show');
      sibling.classList.remove('hide');
    }
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