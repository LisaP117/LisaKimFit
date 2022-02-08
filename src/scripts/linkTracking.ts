const linkTracking = (aTag: HTMLLinkElement) => {

	// const sendEvents = (e: Event) => {
	// 	const title = e.target.title as Attr;

	// 	ga('send', 'event', 'links', 'click', title);
	// }

	const bindEvent = () => {
		// aTag.addEventListener('click', sendEvents);
	}

	const init = () => {
		bindEvent();
	}

	return {
		init
	}
};

export default linkTracking;