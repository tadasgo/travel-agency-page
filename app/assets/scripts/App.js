// import css file through js with a help of webpack - for development phase
import '../styles/styles.css';
import Hamburger from './modules/Hamburger';
import RevealOnScroll from './modules/RevealOnScroll';

// accept updates on the fly (hot module replacements)
// accept if it makes sense to accept...
if (module.hot) module.hot.accept();

new Hamburger();
new RevealOnScroll('.feature-item', 80);
new RevealOnScroll('.testimonial', 70);
