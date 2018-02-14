import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        this.lazyImages = $('lazyload');
        this.siteHeader = $('.header');
        this.headerTriggerEl = $('.hero__h1');
        this.createHeaderWaypoint();
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoints();
        this.addSmoothScrolling(); 
        this.refreshWayPoints();
    }

    refreshWayPoints() {
        this.lazyImages.on('load', function() {
            Waypoint.refreshAll(); 
        });
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll(); 
    }

    createHeaderWaypoint() {
        var that = this;

        new Waypoint({
            element: this.headerTriggerEl[0],
            handler: function () {
                that.siteHeader.toggleClass('header--dark');
            }
        });
    }

    createPageSectionWaypoints() {
        var that = this;
        console.log(this);
        this.pageSections.each(function () {
            var currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "down") {
                        var matchingHeaderLink = currentPageSection.getAttribute('data-menu-link');
                        that.headerLinks.removeClass('active-link');
                        $(matchingHeaderLink).addClass('active-link');
                    }
                },
                offset: "18%"
            });

            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "up") {
                        var matchingHeaderLink = currentPageSection.getAttribute('data-menu-link');
                        that.headerLinks.removeClass('active-link');
                        $(matchingHeaderLink).addClass('active-link');
                    }
                },
                offset: "-40%"
            });
        });

    }
}

export default StickyHeader; 