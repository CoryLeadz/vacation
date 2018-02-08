import $ from 'jquery';

class MobileMenu {

    constructor() {

        //Stopped around the 10:00min mark 

        // $('site-header__menu-icon').click(function(){
        //    console.log('top right icon was clicked');
        // });
        

        this.menuIcon = $('.header__menu-icon');
        this.events();
    }

    events() {
        this.menuIcon.click(this.toggleTheMenu);
    }

    toggleTheMenu() {
        console.log('toggle menu');
    }
}

export default MobileMenu;



