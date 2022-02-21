const overlayPopup = (overlay: HTMLElement) => {

	// const closeOverlay = () => {
	// 	const closeButton = overlay.querySelector('.close') as HTMLElement;
	// 	let ts = Math.round(new Date().getTime() / 1000);
	// 	let tsTomorrow = ts - (24 * 3600);
		
	// 	closeButton.addEventListener('click', () => {
	// 		overlay.classList.remove('show');
	// 		document.cookie='popup=shown;expires='+tsTomorrow;
	// 	});
	// }

	// const showOverlay = (e: any) => {
	// 	if(e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
	// 		overlay.classList.add('show');
	// 	}
	// 	closeOverlay();
	// }

	// const getCookie = (cname: any) => {
	// 	let name = cname + "=";
	// 	let decodedCookie = decodeURIComponent(document.cookie);
	// 	let ca = decodedCookie.split(';');
	// 	for(let i = 0; i <ca.length; i++) {
	// 		let c = ca[i];
	// 		while (c.charAt(0) == ' ') {
	// 			c = c.substring(1);
	// 		}
	// 		if (c.indexOf(name) == 0) {
	// 			return c.substring(name.length, c.length);
	// 		}
	// 	}
	// 	return "";
	// }

	// const bindEvent = () => {
	// 	document.addEventListener("mouseout", function(e: any) {
	// 		e = e ? e : window.event;
	// 		let from = e.relatedTarget || e.toElement;
	// 		if (!from || from.nodeName == "HTML") {
	// 			showOverlay(e);
	// 		}
	// 	});
	// }

	const init = () => {
		// const checkCookie = getCookie("popup");
		// if(checkCookie === undefined) {
		// 	bindEvent();
		// }
	}

	return {
		init
	}
};

export default overlayPopup;