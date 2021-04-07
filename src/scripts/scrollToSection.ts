const scrollTo = (links: HTMLElement) => {

	const scrollTo = (e: Event) => {
		const elem = e.target as HTMLElement;
		const section = document.querySelector("#" + elem.dataset.link);
		
		if (section !== null ){
			section.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest"
			});
		}

	}

	const init = () => {
		links.addEventListener('click', scrollTo);
	}

	return {
		init
	}
}


export default scrollTo;