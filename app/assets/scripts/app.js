import MobileMenu from './modules/MobileMenu';
import Fade from './modules/fade';
import $ from 'jquery';
import StickyHeader from './modules/stickyHeader';
import Modal from './modules/Modal';

var mobileMenu = new MobileMenu();

new Fade($('.feature-item'), "85%");
new Fade($('.testimonial'), "60%");

var stickyHeader = new StickyHeader();

var modal = new Modal(); 