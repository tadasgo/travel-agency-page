// import css file through js with a help of webpack - for development phase
import '../styles/styles.css';
import 'lazysizes';
import Hamburger from './modules/Hamburger';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

let modal;
new Hamburger();
new StickyHeader();
new RevealOnScroll('.feature-item', 85);
new RevealOnScroll('.testimonial', 80);

// load modal only when needed
document.querySelectorAll('.open-modal').forEach((el) =>
	el.addEventListener('click', (e) => {
		e.preventDefault();
		// determine if modal was already downloaded (defined) if not load it
		if (typeof modal === 'undefined') {
			import(/* webpackChunkName: "modal" */ './modules/Modal')
				.then((file) => {
					// instantiate modal class and then load it
					modal = new file.default();
					setTimeout(() => modal.openTheModal(), 20);
				})
				.catch(() => console.log('There was a problem loading modal'));
		} else {
			modal.openTheModal();
		}
	})
);

// accept updates on the fly (hot module replacements)
// accept if it makes sense to accept...
if (module.hot) module.hot.accept();
