jQuery(function() {
	videobgparallax();
	initMobileNav();
	initSlickCarousel();
	initCustomForms();
});

//fixed header
jQuery(window).scroll(function(){
	var sticky = jQuery('.header'),
		scroll = jQuery(window).scrollTop();
  
	if (scroll >= 1) jQuery('body').addClass('fixed-header');
	else jQuery('body').removeClass('fixed-header');
  }).scroll();

// initialize custom form elements
function initCustomForms() {
	jcf.replaceAll('.holder-uploads');
}

	//Anchor scroll Tabs \ Form
	var height_tabs = 80 + jQuery('#transformation-capabilities .title').innerHeight() + jQuery('.header').innerHeight();
	jQuery(".anchor-link[href^='#']").click(function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('cta-link-anchor')){
			var position = jQuery(jQuery(this).attr("href")).offset().top;
			jQuery(".contact-form").fadeIn("slow");
		}else{
			var position = jQuery(jQuery(this).attr("href")).offset().top - height_tabs;
		}
		console.log(height_tabs)
		jQuery("body, html").animate({
			scrollTop: position
		},1000 );
	});

	//Open\close form
	jQuery('.contact-holder .toggle-form-link').click(function(open_form){
		open_form.preventDefault();
		jQuery(this).parents('.contact-holder').siblings('.contact-form').slideToggle( "slow" );
	});
	jQuery('.contact-form .contact-form-close').click(function(){
		jQuery(this).parent().slideUp( "slow" );
	});

	//Page-contact-form focus
	jQuery('.holder-contact-form input, .holder-contact-form select').focus(function(){
		jQuery('label').removeClass('active-focus');
		jQuery(this).parents('label').addClass('active-focus');
	});
	jQuery(document).mouseup(function(input_focus){
		if (jQuery('.holder-contact-form .wpcf7-form').has(input_focus.target).length === 0){
			jQuery('label').removeClass('active-focus');
		}
	});

	// Menu desktop
	if (screen.width > 1024) {
		var header_height =  jQuery('.header').height(),
		socials_height =  jQuery('.header > .container > .socials').outerHeight(),
		maxHeight_drop = 0;

		jQuery('.drop-holder').each(function(){
			var thisH = jQuery(this).outerHeight();
			if (thisH > maxHeight_drop){
				maxHeight_drop = thisH;
			}
		});
		var finish_height_header = maxHeight_drop + header_height + socials_height;
		jQuery('.header-navigation .menu-item-has-children>a').click(function(menu_drop){
			menu_drop.preventDefault();
			jQuery('.header').css('height','auto');
			jQuery('.header-navigation .menu-item-has-children>a').unbind(menu_drop.preventDefault());
			if(jQuery('body').hasClass('fixed-header')){
				jQuery('.header').height(finish_height_header + 72);
			}else{
				jQuery('.header').height(finish_height_header);
			}
			jQuery('body').addClass('active-menu-drop');
		});
		jQuery(document).mouseup(function(header_menu_click){
			if (jQuery('.header').has(!header_menu_click.target).length === 0){
				jQuery('.header').css('height','auto');
				jQuery('body').removeClass('active-menu-drop');
			}
		});
		jQuery('.btn-close-menu').click(function(){
			jQuery('.header').css('height','auto');
			jQuery('body').removeClass('active-menu-drop');
		})
	}

function videobgparallax() {
	jQuery('.cta-video').backgroundVideo({
		$videoWrap: jQuery('.video-wrap-cta-video')
	});

	jQuery('.add-parallax > .video-wrap > .bg-video-parallax').backgroundVideo({
		$videoWrap: jQuery('.add-parallax > .video-wrap')
	});

	jQuery('.add-parallax > .content-holder > .hodler-bg-video-single > .bg-video-single').backgroundVideo({
		$videoWrap: jQuery('.add-parallax > .content-holder > .hodler-bg-video-single')
	});

	jQuery('.bg-video-holder-bg').backgroundVideo({
		$videoWrap: jQuery('.holder-bg-video-tab')
	});

	jQuery('.bg-video-popup').backgroundVideo({
		$videoWrap: jQuery('.holder-bg-video-popup')
	});

	jQuery('.bg-video-info-list').backgroundVideo({
		$videoWrap: jQuery('.holder-video-info-list')
	});

	jQuery('.bg-video-join-banner').backgroundVideo({
		$videoWrap: jQuery('.holder-join-banner')
	});
};

if (jQuery('.page-header-video-preloader').length && Cookies.get('video-preloader-cookies') == null){
	var video_preloader = jQuery('.page-header-video-preloader').attr('data-duration');
	jQuery('.page-header .page-header-carousel').addClass('video-preloader-true')
	jQuery('.page-header-video-preloader').fadeIn("slow");
	window.setTimeout(function(){
        jQuery('body').addClass('finsihed-preloader');
		jQuery('.page-header-video-preloader').fadeOut("slow");
		jQuery('.page-header-carousel').fadeIn("slow");
		jQuery(function() {
			initSlickCarouselMain();
		});
		Cookies.set('video-preloader-cookies', '1');
    },video_preloader  );
}else{
	jQuery(function() {
		initSlickCarouselMain();
	});
}


// slick init
var slider_quotes = jQuery('.quotes-carousel').attr('data-speed'),
slider_page_header = jQuery('.page-header-carousel').attr('data-speed')
function initSlickCarouselMain() {
	var slider_page_header_css = slider_page_header / 1000;
	jQuery('.arrow-active').css('animation-duration', slider_page_header_css+ 's');

	jQuery('.carousel-slides').slick({
		slidesToScroll: 1,
		rows: 0,
		arrows: false,
		fade: true,
		pauseOnHover:false,
		cssEase: 'ease-in-out',
		asNavFor: '.carousel-pagination',
		autoplay: true,
		autoplaySpeed: slider_page_header,
	});
	jQuery('.carousel-pagination').slick({
		slidesToShow: 4,
		asNavFor: '.carousel-slides',
		focusOnSelect: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	  });
}
function initSlickCarousel() {
	jQuery('.quotes-carousel').slick({
		slidesToScroll: 1,
		rows: 0,
		arrows: false,
		autoplay: true,
		autoplaySpeed: slider_quotes,
	});
}

// tabs
jQuery('.tabs-nav-item').click(function () {
	var id = jQuery(this).attr('data-tab'),
		content = jQuery('.tabs-content-item[data-tab="' + id + '"]');

	jQuery('.tabs-nav-item.active').removeClass('active');
	jQuery(this).addClass('active');

	jQuery('.tabs-content-item.active').removeClass('active');
	content.addClass('active');
});

// tabs activate via anchor links
jQuery('.page-header-anchor-links a').click(function () {
	var element_click_id = jQuery(this).attr('href'),
		element_target = jQuery(element_click_id);

	if (element_target.is('[data-tab]')) {
		element_target.click();
	}
});

// accordion
jQuery('.accordion-item').on('click', '.accordion-item-head', function () {
	var content = jQuery(this).next('.accordion-item-content');

	jQuery(this).parent().toggleClass('active');
	content.slideToggle();
});

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener'
	});
}

// Download form success
if (jQuery('.dp-success').length) {
	initFormMessage();
}

function initFormMessage() {
	var e = document.querySelector(".wpcf7");

	try {
		e.addEventListener('wpcf7mailsent', function (e) {
			jQuery('.dp-holder').addClass('dp-successful');
			jQuery('.dp-form').hide();
			jQuery('.dp-success').show();
		}, !1);
	} catch (error) {
		console.error(error);
	}
}