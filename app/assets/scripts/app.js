import MobileMenu from './modules/MobileMenu';
import Fade from './modules/fade';
import $ from 'jquery';

var mobileMenu = new MobileMenu();

new Fade($('.feature-item'), "85%");
new Fade($('.testimonial'), "60%");
