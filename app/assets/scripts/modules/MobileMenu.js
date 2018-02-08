import $ from 'jquery';

class MobileMenu {

    constructor() {
        // TODO => Complete writing this below spheghetti and finish it.
        // $('site-header__menu-icon').click(function(){
        //    console.log('top right icon was clicked');
        // });
        
        this.siteHeader = $('.header');
        this.menuIcon = $('.header__menu-icon');
        this.menuContent = $('.header__menu-content');
        this.events();
    }

    events() {
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu() {
        this.menuContent.toggleClass('header__menu-content--visible');
        this.siteHeader.toggleClass('header--expanded');
        this.menuIcon.toggleClass('header__menu-icon--close-x');
    }
}

export default MobileMenu;



