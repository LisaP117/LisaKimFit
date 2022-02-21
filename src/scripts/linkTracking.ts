// declare const Window: any;

const linkTracking = (aTag: HTMLLinkElement) => {

	const sendEvents = (e: any) => {
		const title = e.target.title as Attr;
		//Window.gtag('send', 'event', 'links', 'click', title);
	}

	const bindEvent = () => {
		aTag.addEventListener('click', sendEvents);
	}

	const init = () => {
		bindEvent();
	}

	return {
		init
	}
};

export default linkTracking;