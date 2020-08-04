// import css file through js with a help of webpack - for development phase
import '../styles/styles.css';
import Hamburger from './modules/Hamburger';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

// accept updates on the fly (hot module replacements)
// accept if it makes sense to accept...
if (module.hot) module.hot.accept();

const hamburger = new Hamburger();
const stickyHeader = new StickyHeader();
new RevealOnScroll('.feature-item', 80);
new RevealOnScroll('.testimonial', 70);
new Modal();
