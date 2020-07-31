// import css file through js with a help of webpack - for development phase
import '../styles/styles.css';
import Hamburger from './modules/Hamburger';

// accept updates on the fly (hot module replacements)
// accept if it makes sense to accept...
if (module.hot) module.hot.accept();

const hamburger = new Hamburger();
