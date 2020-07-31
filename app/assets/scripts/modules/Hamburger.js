class Hamburger {
	constructor() {
		this.navToggle = document.querySelector('.site-header__nav-toggle');
		this.menuContent = document.querySelector('.site-header__nav-container');
		this.siteHeader = document.querySelector('.site-header');
		this.events();
	}

	events() {
		// when we pass function like that - 'this' keyword still point to Hamburger object, else it would direct us to element which has event listener attached to.
		this.navToggle.addEventListener('click', () => this.toggleMenu());
	}

	toggleMenu() {
		this.menuContent.classList.toggle('site-header__nav-container--active');
		this.siteHeader.classList.toggle('site-header--expanded');
		this.navToggle.classList.toggle('site-header__nav-toggle--active');
	}
}

export default Hamburger;
