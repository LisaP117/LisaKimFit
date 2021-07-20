const scrollTo = (links: HTMLElement) => {

	const scrollTo = (e: Event) => {
		const elem = e.target as HTMLAnchorElement;
		const elemTarget = elem.getAttribute('href');
		const section = document.querySelector(`${elemTarget}`) as HTMLElement;
		
		if (section !== null ){
			section.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest"
			});

			setTimeout(() => {
				window.location.hash = `${elemTarget}`;
			}, 700);
		}

		e.preventDefault();

	}

	const init = () => {
		links.addEventListener('click', scrollTo);
	}

	return {
		init
	}
}


export default scrollTo;