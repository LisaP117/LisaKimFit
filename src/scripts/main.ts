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
	import(/* webpackChunkName: "navigation" */ 'Src/scripts/mobilenavigation')
		.then(module => initModule(module, element))
		.catch(err => console.error(`Error in: Navigation - ${err}`));
}, document.querySelectorAll('[data-component="navigation"]'));

export { };