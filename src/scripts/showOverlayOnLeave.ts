const showOverlayOnLeave = (dataForm: HTMLElement) => {

	const showOverlay = (e: Event) => {
		//console.log(e, e.target)
		// if(e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
		// 	alert('yes');
		// }
	}

	// const addEvent = (obj: any, evt: Event, fn: Function) => {
  //   if (obj.addEventListener) {
  //       obj.addEventListener(evt, fn, false);
  //   }
  //   else if (obj.attachEvent) {
  //       obj.attachEvent("on" + evt, fn);
  //   }
	// }

	const bindEvent = () => {
		// addEvent(document, "mouseout", function(e: any) {
		// 	e = e ? e : window.event;
		// 	var from = e.relatedTarget || e.toElement;
		// 	if (!from || from.nodeName == "HTML") {
		// 		showOverlay(e);
		// 	}
		// });
	}

	const init = () => {
		bindEvent();
	}

	return {
		init
	}
};

export default showOverlayOnLeave;