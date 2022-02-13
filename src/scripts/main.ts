if ('loading' in HTMLImageElement.prototype) {
  const images: Array<HTMLImageElement> = Array.from(document.querySelectorAll('img.lazyload'));
  const sources: Array<HTMLSourceElement> = Array.from(document.querySelectorAll('[data-srcset'));

  images.forEach((img: HTMLImageElement) => {
    img.srcset = img.dataset.srcset as string;
    img.classList.remove('lazyload');
  });

  sources.forEach((source: HTMLSourceElement) => {
    source.srcset = source.dataset.srcset as string;
  });
} else {
  import('lazysizes');
}

const html: HTMLElement | null = document.querySelector('html');

if (html) html.className = 'js';

function initModule(module: any, element: any = null) {
  module.default(element).init();
}

function observe(callback: Function, elements: NodeList) {
  const config = {
    rootMargin: '200px 0px',
    threshold: 0.01
  };

  if (elements.length > 0) {
    const collection: Array<any> = Array.from(elements);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Are we in viewport?
        if (entry.intersectionRatio > 0) {
          // Stop watching and load the script
          observer.unobserve(entry.target);
          callback(entry.target);
        }
      });
    }, config);

    collection.forEach(element => observer.observe(element));
  }
}

observe((element: HTMLElement) => {
	import(/* webpackChunkName: "mobile slide out menu" */ 'Src/scripts/mobilenavigation')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Navigation - ${err}`));
}, document.querySelectorAll('[data-component="header"]'));

observe((element: HTMLElement) => {
	import(/* webpackChunkName: "resize header on scroll" */ 'Src/scripts/resizeHeaderOnScroll')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Header - ${err}`));
}, document.querySelectorAll('[data-component="header"]'));

observe((element: HTMLElement) => {
	import(/* webpackChunkName: "scroll to section" */ 'Src/scripts/scrollToSection')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Scroll to section - ${err}`));
}, document.querySelectorAll('li[data-link]'));

observe((element: HTMLElement) => {
	import(/* webpackChunkName: "form validation" */ 'Src/scripts/formValidation')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Forms - ${err}`));
}, document.querySelectorAll('[data-component="form"]'));

observe((element: HTMLElement) => {
	import(/* webpackChunkName: "form validation" */ 'Src/scripts/newsletterForm')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Forms - ${err}`));
}, document.querySelectorAll('[data-component="ns__form"]'));

observe((element: HTMLElement) => {
	import(/* webpackChunkName: "scroll to form" */ 'Src/scripts/scrollToForm')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Scroll to form - ${err}`));
}, document.querySelectorAll('[data-contact-button]'));

observe((element: HTMLElement) => {
	import(/* webpackChunkName: "scroll to form" */ 'Src/scripts/linkTracking')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Scroll to form - ${err}`));
}, document.querySelectorAll('a[data-link]'));

// observe((element: HTMLElement) => {
// 	import(/* webpackChunkName: "scroll to form" */ 'Src/scripts/showOverlayOnLeave')
// 		.then(module => initModule(module, element))
// 		.catch(err => console.error(`Error in: Scroll to form - ${err}`));
// }, document.querySelectorAll('[data-form-overlay]'));

export { };