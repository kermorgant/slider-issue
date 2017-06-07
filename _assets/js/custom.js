/*
 * Template Name: Unify - Responsive Bootstrap Template
 * Author: @htmlstream
 * Website: http://htmlstream.com
 */

var App = function() {
    // We extend jQuery by method hasAttr
    $.fn.hasAttr = function(name) {
	return this.attr(name) !== undefined;
    };

    // Bootstrap
    function handleBootstrap() {
	/* Bootstrap Carousel */
	jQuery('.carousel').carousel({
	    interval: 15000,
	    pause: 'hover'
	});

	/* Tooltips */
	jQuery('.tooltips').tooltip();
	jQuery('.tooltips-show').tooltip('show');
	jQuery('.tooltips-hide').tooltip('hide');
	jQuery('.tooltips-toggle').tooltip('toggle');
	jQuery('.tooltips-destroy').tooltip('destroy');

	/* Popovers */
	jQuery('.popovers').popover();
	jQuery('.popovers-show').popover('show');
	jQuery('.popovers-hide').popover('hide');
	jQuery('.popovers-toggle').popover('toggle');
	jQuery('.popovers-destroy').popover('destroy');
    }

    // Equal Height Columns
    function handleEqualHeightColumns() {
	var EqualHeightColumns = function () {
	    $('.equal-height-columns').each(function() {
		heights = [];
		$('.equal-height-column', this).each(function() {
		    $(this).removeAttr('style');
		    heights.push($(this).height()); // Write column's heights to the array
		});
		$('.equal-height-column', this).height(Math.max.apply(Math, heights)); // Find and set max
	    });
	}

	EqualHeightColumns();
	$(window).resize(function() {
	    EqualHeightColumns();
	});
	$(window).load(function() {
	    EqualHeightColumns();
	});
    }

    // Equal Height Image-Columns
    function handleEqualHeightColumns__Images() {
	var EqualHeightColumns__Images = function () {
	    $('.equal-height-columns-v2').each(function() {
		var heights = [];
		$('.equal-height-column-v2', this).each(function() {
		    $(this).removeAttr('style');
		    heights.push($(this).height()); // Write column's heights to the array
		});
		$('.equal-height-column-v2', this).height(Math.max.apply(Math, heights)); // Find and set max

		$('.equal-height-column-v2', this).each(function() {
		    if ($(this).hasAttr('data-image-src')) {
			$(this).css('background', 'url('+$(this).attr('data-image-src')+') no-repeat scroll 50% 0 / cover');
		    }
		});
	    });
	}
	$('.equal-height-columns-v2').ready(function() {
            EqualHeightColumns__Images();
	    $('.owl2-carousel-v1').ready(function() {
		EqualHeightColumns__Images();
		handleValignMiddle();
	    });
	});
	$(window).resize(function() {
	    EqualHeightColumns__Images();
	});
    }

    // Full Screen
    var handleFullscreen = function() {
	var WindowHeight = $(window).height();
	var HeaderHeight = 0;

	if ($(document.body).hasClass('promo-padding-top')) {
	    HeaderHeight = $('.header').height();
	} else {
	    HeaderHeight = 0;
	}

	$('.fullheight').css('height', WindowHeight - HeaderHeight);

	$(window).resize(function() {
	    var WindowHeight = $(window).height();
	    $('.fullheight').css('height', WindowHeight - HeaderHeight);
	});
    }

    // Align Middle
    var handleValignMiddle = function() {
	$(document).ready(function() {
	    $('.valign__middle').each(function() {
		$(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2);
	    });
	});
	$(window).resize(function() {
	    $('.valign__middle').each(function() {
		$(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2);
	    });
	});
    }

    // Header
    // Fixed Header
    function handleHeader() {
	if (jQuery(window).scrollTop() > 100) {
	    jQuery('.header-fixed .header-sticky').addClass('header-fixed-shrink');
	}
	jQuery(window).scroll(function() {
	    if (jQuery(window).scrollTop() > 100) {
		jQuery('.header-fixed .header-sticky').addClass('header-fixed-shrink');
	    } else {
		jQuery('.header-fixed .header-sticky').removeClass('header-fixed-shrink');
	    }
	});
    }

    // Search Box (Header)
    function handleSearch() {
	jQuery('.search').on("click", function () {
	    if(jQuery('.search-btn').hasClass('fa-search')){
		jQuery('.search-open').fadeIn(500);
		jQuery('.search-btn').removeClass('fa-search');
		jQuery('.search-btn').addClass('fa-times');
	    } else {
		jQuery('.search-open').fadeOut(500);
		jQuery('.search-btn').addClass('fa-search');
		jQuery('.search-btn').removeClass('fa-times');
	    }
	});
    }

    // Search Box v2 (Header v8)
    function handleSearchV2() {
	jQuery(".blog-topbar .search-btn").on("click", function() {
	    if (jQuery(".topbar-search-block").hasClass("topbar-search-visible")) {
		jQuery(".topbar-search-block").slideUp();
		jQuery(".topbar-search-block").removeClass("topbar-search-visible");
	    } else {
		jQuery(".topbar-search-block").slideDown();
		jQuery(".topbar-search-block").addClass("topbar-search-visible");
	    }
	});
	jQuery(".blog-topbar .search-close").on("click", function() {
	    jQuery(".topbar-search-block").slideUp();
	    jQuery(".topbar-search-block").removeClass("topbar-search-visible");
	});
	jQuery(window).scroll(function() {
	    var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
	    if (!isiPhone) {
		jQuery(".topbar-search-block").slideUp();
		jQuery(".topbar-search-block").removeClass("topbar-search-visible");
	    }
	});
    }



    // TopBar (Header v8)
    function handleTopBar() {
	jQuery(".topbar-toggler").on("click", function() {
	    if (jQuery(".topbar-toggler").hasClass("topbar-list-visible")) {
		jQuery(".topbar-menu").slideUp();
		jQuery(this).removeClass("topbar-list-visible");
	    } else {
		jQuery(".topbar-menu").slideDown();
		jQuery(this).addClass("topbar-list-visible");
	    }
	});
    }

    // TopBar SubMenu (Header v8)
    function handleTopBarSubMenu() {
	jQuery(".topbar-list > li").on("click", function(e) {
	    if (jQuery(this).children("ul").hasClass("topbar-dropdown")) {
		if (jQuery(this).children("ul").hasClass("topbar-dropdown-visible")) {
		    jQuery(this).children(".topbar-dropdown").slideUp();
		    jQuery(this).children(".topbar-dropdown").removeClass("topbar-dropdown-visible");
		} else {
		    jQuery(this).children(".topbar-dropdown").slideDown();
		    jQuery(this).children(".topbar-dropdown").addClass("topbar-dropdown-visible");
		}
	    }
	    //e.preventDefault();
	});
    }

    return {
	init: function() {
	    handleBootstrap();
	    handleEqualHeightColumns();
	    handleEqualHeightColumns__Images();
	    handleFullscreen();
	    handleValignMiddle();
	    handleSearch();
            handleSearchV2();
	   // handleHeader();
            handleTopBar();
            handleTopBarSubMenu();
	},

	initCounter: function() {
	    jQuery('.counter').counterUp({
		delay: 10,
		time: 1000
	    });
	},

	initParallaxBg: function() {
	    $(window).load(function() {
		jQuery('.parallaxBg').parallax('50%', 0.4);
		jQuery('.parallaxBg1').parallax('50%', 0.2);
	    });
	},

	initParallaxBg2: function() {
	    $(window).load(function() {
		jQuery('.parallaxBg').parallax('50%', '50%');
	    });
	},
    };
}();

window.App = App;

App.init();
