// throttle - run smth not as often, debounce - run something after some seconds after smth is finished
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
	constructor(selector, thresholdPercent) {
		this.itemsToReveal = document.querySelectorAll(selector);
		this.thresholdPercent = thresholdPercent;
		// save browser height to improve performance
		this.browserHeight = window.innerHeight;
		this.hideInitially();
		// leverage lodash throttle - 1st argument what function we want to run, 2nd - how long is a timeout. And bind 'this' so no matter where function is called 'this' still points to object
		this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
		this.events();
	}

	events() {
		// activate on scroll
		window.addEventListener('scroll', this.scrollThrottle);
		window.addEventListener(
			'resize',
			debounce(() => {
				// babysit browserHeight property and update it after browser was resized
				this.browserHeight = window.innerHeight;
			}, 300)
		);
	}

	calcCaller() {
		console.log('scroll function ran');
		this.itemsToReveal.forEach((el) => {
			// only run calculations if elements aren't yet revealed
			if (!el.isRevealed) {
				this.calculateIfScrolledTo(el);
			}
		});
	}

	calculateIfScrolledTo(el) {
		// if screen bottom is already touching section we want to reveal ONLY THEN start calculations
		if (window.scrollY + this.browserHeight > el.offsetTop) {
			console.log('Element was calculated');
			// how far into the browsers viewport the element was scrolled to
			let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;
			// reveal scrollPercent < hidden part of img
			if (scrollPercent < this.thresholdPercent) {
				el.classList.add('reveal-item--visible');
				el.isRevealed = true;
				// remove scroll eventListener after all items were removed
				if (el.lastItem) {
					window.removeEventListener('scroll', this.scrollThrottle);
				}
			}
		}
	}

	hideInitially() {
		this.itemsToReveal.forEach((el) => {
			el.classList.add('reveal-item');
			el.isRevealed = false;
		});

		// tag last item of an array of revealable items
		this.itemsToReveal[this.itemsToReveal.length - 1].lastItem = true;
	}
}

export default RevealOnScroll;
