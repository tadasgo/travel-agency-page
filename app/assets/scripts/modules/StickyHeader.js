import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {
	constructor() {
		this.siteHeader = document.querySelector('.site-header');
		this.scrollThrottle = throttle(this.runOnScroll, 200).bind(this);
		this.pageSections = document.querySelectorAll('.page-section');
		this.browserHeight = window.innerHeight;
		this.previousScrollY = window.scrollY;
		this.events();
	}

	events() {
		window.addEventListener('scroll', this.scrollThrottle);
		window.addEventListener(
			'resize',
			debounce(() => {
				// babysit browserHeight property and update it after browser was resized
				this.browserHeight = window.innerHeight;
			}, 300)
		);
	}

	runOnScroll() {
		this.determineScrollDirection();

		// if we scrolled more than x from the top of the browser window add --dark, else remove
		if (window.scrollY > 60) {
			this.siteHeader.classList.add('site-header--dark');
		} else {
			this.siteHeader.classList.remove('site-header--dark');
		}

		// run calculation to see if sections where scrolled to
		this.pageSections.forEach((el) => this.calcSection(el));
	}

	// determine if we are scrollinng up or down
	determineScrollDirection() {
		if (window.scrollY > this.previousScrollY) {
			this.scrollDirection = 'down';
		} else {
			this.scrollDirection = 'up';
		}

		this.previousScrollY = window.scrollY;
	}

	calcSection(el) {
		// only calculate if viewport is between sections top && bottom
		if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
			let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;

			// see if we scrolled far enough to consider section as main
			if ((scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection === 'down') || (scrollPercent < 33 && this.scrollDirection === 'up')) {
				// get data- attribute
				let matchingLink = el.getAttribute('data-matching-link');
				// remove is-current-link class from scrolled past elements
				document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach((el) => el.classList.remove('is-current-link'));
				document.querySelector(matchingLink).classList.add('is-current-link');
			}
		}
	}
}

export default StickyHeader;
