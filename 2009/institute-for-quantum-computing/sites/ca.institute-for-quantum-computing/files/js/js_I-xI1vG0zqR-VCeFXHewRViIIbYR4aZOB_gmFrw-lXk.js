/**
 * @file
 */

(function ($) {
  Drupal.behaviors.jsSearch = {
    attach: function (context, settings) {
        $searchLabel = $('#uw-search-label').addClass('js');
        $searchInput = $('#uw-search-term');

        $searchLabel.click(function () {
            $searchInput.focus();
        });

        $searchInput.focus(function () {
            $searchLabel.addClass('element-invisible');
        });

        $searchInput.blur(function () {
          if (!$searchInput.val()) {
              $searchLabel.removeClass('element-invisible');
          }
        });
    }
  };
})(jQuery);
;
/**
 * @file
 */

// Window height.
(function windowHeightAssign($, window) {
  'use strict';
  $(window).load(
    function setWindowHeight() {
      var $window = $(window);
      var $windowHeight = $(window).innerHeight() / 2;
      var $headerHeight = 160;
      // Class for setting min-height to main wrap element.
      var $setHeight = 'uw-site--main';
      $('.' + $setHeight).css('min-height', $windowHeight);
    });
})(window.jQuery, window);

// splitSidebar homepage. On front pages, duplicate the sidebar. One of the
// copies always has display: none; which is shown depends on the responsive
// breakpoint.
(function homePageSidebar($, window, document) {
  'use strict';

  $(document).ready(handleDocumentReady);

  function handleDocumentReady() {
    if ($('body').hasClass('front')) {
      $('#site-sidebar-wrapper').clone().appendTo('#block-system-main');
    }
  }
})(window.jQuery, window, window.document);

// Check if ie.
(function ieCheck($, window) {
  'use strict';
  $(window).load(function isIe() {
    var ua = window.navigator.userAgent;
    var oldIe = ua.indexOf('MSIE ');
    var newIe = ua.indexOf('Trident/');
    if ((oldIe > -1) || (newIe > -1)) {
      return true;
    }
  });
})(window.jQuery, window);

// Is touch device.
(function touchCheck($, window) {
  'use strict';
  $(window).load(function is_touch_device() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  });
})(window.jQuery, window);

// Add class if ie10,ie11.
(function addIeClass($, window, document) {
  'use strict';
  $(document).ready(handleDocumentReady);
  function handleDocumentReady() {
    // CONDITIONAL COMMENTS NO LONGER WORK IN IE10 need to get js or php to identify bropwser's user agent.
    if ($.browser.msie && $.browser.version == '10.0') {
      $('html').addClass('ie10');
    }
    if ($.browser.msie && $.browser.version == '11.0') {
      $('html').addClass('ie11');
    }
  }
})(window.jQuery, window, window.document);
// Checks if an image has a formatting (iamge-left, image-right) and if it is 50% of the window with
// will remove the classes and add the image-center which will center and place text underneath.
(function checkFormattingWithImages($, window, document) {
  'use strict';
  // On each window, need to check on load and on resize for images.
  $(window).on({
    // On window load.
    load:function () {
      // If the window width is less than 480, check image size and set appropriate classes if large images.
      if ($(window).width() < 480) {
        // Step through each image.
        $('.content img').each(function (index) {
          // If there are indents (image-left and image-right), check if image larger then 50%.
          if ($(this).hasClass('image-left') || $(this).hasClass('image-right')) {
            // If image is larger than 50%, add on extra class (image-full) to center and place text below.
            if ($(this).width() > ($(window).width() / 2)) {
              // If there is no class image-full add it to the image.
              if (!$(this).hasClass('image-full')) {
                $(this).addClass('image-full');
              }
            }
            // If the image is not larger than 50%, remove the class image-full.
            else {
              // If there is the class, remove it.
              if ($(this).hasClass('image-full')) {
                $(this).removeClass('image-full');
              }
            }
          }
        });
        // ISTWCMS-1963/RT#585762 comment out the below code and make sure the sidebar above news/events/blog
        // If there is a sidebar and news/events, move the sidebar below news/events.
        /* if($('.content').find('.uw-site-homepage-tabs')) {
          $("#block-uw-ct-event-front-page").append($('#site-sidebar-wrapper'));
        } */
      }
    },
    // On resize.
    resize:function () {
      // If the window width is less than 480, check image size and set appropriate classes if large images.
      if ($(window).width() < 480) {
        // Step through each image.
        $('.content img').each(function (index) {
          // If there are indents (image-left and image-right), check if image larger then 50%.
          if ($(this).hasClass('image-left') || $(this).hasClass('image-right')) {
            // If image is larger than 50%, add on extra class (image-full) to center and place text below.
            if ($(this).width() > ($(window).width() / 2)) {
              // If there is no class image-full add it to the image.
              if (!$(this).hasClass('image-full')) {
                $(this).addClass('image-full');
              }
            }
          }
        });
        // ISTWCMS-1963/RT#585762 comment out the below code and make sure the sidebar above news/events/blog
        // If there is a sidebar and news/events, move the sidebar below news/events.
        /* if($('.content').find('.uw-site-homepage-tabs')) {
          $("#block-uw-ct-event-front-page").append($('#site-sidebar-wrapper'));
        } */
      }
      // If the window is larger than 480, remove the class image-full.
      else {
        // Step through each image.
        $('.content img').each(function (index) {
          // If there are indents (image-left and image-right), check if image-full class is enabled.
          if ($(this).hasClass('image-left') || $(this).hasClass('image-right')) {
            // If the image-full class is present, remove it.
            if ($(this).hasClass('image-full')) {
              $(this).removeClass('image-full');
            }
          }
        });
      }
    }
  });
})(window.jQuery, window, window.document);
// filterTabs.
(function filterTabs($, window, document) {
  'use strict';
  $(document).ready(handleDocumentReady);
  function handleDocumentReady() {
    // Prepare RSS links for responsive.
    if ($('#site-sidebar div.rss_link').length) {
      // Create a control div at the top if one doesn't exist already.
      if (!$('#content > div.controls').length) {
        $('#content').prepend($('<div class="controls"></div>'));
      }
      // Create copy in #controls region.
      $('#site-sidebar div.rss_link').prependTo('#content > div.controls');
      // Replace text in copy.
      $('#content > div.controls div.rss_link a').html('RSS');
    }
    if ($('#site-sidebar div.feed-icon').length) {
      // Create a control div at the top if one doesn't exist already.
      if (!$('#content > div.controls').length) {
        $('#content').prepend($('<div class="controls"></div>'));
      }
      // Create copy in #controls region.
      $('#site-sidebar div.feed-icon').clone().prependTo('#content > div.controls');
    }
    // Prepare sidebar filter blocks for responsive
    // contact page adding the filter to the collapse group -- clean up in future.
    var $filter_blocks = $('#block-views-5bbe76328202cacac13375a40dd59481,#block-uw-ct-news-item-news-by-audience, #block-uw-ct-news-item-news-by-date, #block-uw-ct-person-profile-profile-by-type, #block-uw-ct-project-project-by-status, #block-uw-ct-project-project-by-audience, #block-uw-ct-project-project-by-topic, #block-views-events-with-calendar-block-1, #block-uw-ct-event-events-by-audience, #block-views-event-type-block-events-by-type, #block-views-uw-blog-recent-block-1, #block-uw-ct-blog-blog-by-audience, #block-uw-ct-blog-blog-by-date, #block-views-uw-blog-topics-block-1');
    if ($filter_blocks.length > 0) {
      if ($filter_blocks.find('.item-list ul').length > 0 || $filter_blocks.find('.item-list ol').length > 0) {
        $('#content .controls').addClass('has-filter');
        // Create a control div at the top if one doesn't exist already.
        if (!$('#content > div.controls').length) {
          $('#content').prepend($('<div class="controls"></div>'));
        }
        // Create a control element for the filters.
        $('#content > div.controls').prepend($('<div id="ct-filters"><button class="ct-filters--filter">Filter</button><div class="uw-site--modal__filter"><div class="uw-site--modal-wrap"><button class="ct-filters--close"><span class="element-invisible">CT filters close</span></button></div></div></div>'));
        // Make the ID on the filter its class, then remove the ID.
        var $filter_blocks_cleaned = $filter_blocks.clone();
        $filter_blocks_cleaned.each(function () {
          var thisid = $(this).attr('id');
          $(this).attr('id', '');
          $(this).addClass(thisid);
        });
        // Put the filters into the empty div in the control element.
        var $insertFilters = $('.uw-site--modal-wrap');
        $insertFilters.append($filter_blocks_cleaned);
      }
      else {
        $('#content .controls').addClass('no-filter');
      }
    }
    var $filter_blocks_contact = $('#block-uw-ct-contact-contacts-by-group');
    if ($filter_blocks_contact.length > 0) {
      if ($filter_blocks_contact.find('.item-list ul').length > 0 || $filter_blocks_contact.find('.item-list ol').length > 0) {
        // Add has-filter class to correct spacing when there is no filter.
        $('.toggle-contacts .expand-all').addClass('has-filter');
        $('.toggle-contacts .collapse-all').addClass('has-filter');
        $('#content > div.toggle-contacts').prepend($('<div id="ct-filters"><button class="ct-filters--filter">Filter</button><div class="uw-site--modal__filter"><div class="uw-site--modal-wrap"><button class="ct-filters--close"><span class="element-invisible">CT filters close</span></button></div></div></div>'));
        var $filter_blocks_contact_cleaned = $filter_blocks_contact.clone();
        $filter_blocks_contact_cleaned.each(function () {
          var thisid = $(this).attr('id');
          $(this).attr('id', '');
          $(this).addClass(thisid);
        });
        var $insertFilters_contact = $('.uw-site--modal-wrap');
        $insertFilters_contact.append($filter_blocks_contact_cleaned);
      }
      else {
        if (!$.trim($('#block-system-main .content').html())) {
          $('.toggle-contacts').addClass('no-content');
        }
        else {
          $('.toggle-contacts .expand-all').addClass('no-filter');
          $('.toggle-contacts .collapse-all').addClass('no-filter');
        }
      }
    }
    // Respond to the filter/close buttons being clicked.
    $('#ct-filters button').on('click', function () {
      $('#ct-filters > div').toggle();
    });
    // Initialize the timer.
    var timer = window.setTimeout(function () {}, 0);
    $(window).on('resize', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {}, 500);
    });
  }
})(window.jQuery, window, window.document);
// Home page content type grouping.
(function homepageTabs($, window, document) {
  'use strict';
  $(document).ready(handleDocumentReady);
  function handleDocumentReady() {
    var $home_page_tabs = $('h2.tab-link');
    if ($home_page_tabs.length > 1) {
      $('.front #block-system-main').after('<div class="uw-site-homepage-tabs"></div>');
      var $home_page_tabs_cleaned = $home_page_tabs.clone();
      var $insert_tabs = $('.uw-site-homepage-tabs');
      $home_page_tabs_cleaned.each(function () {
        $(this).addClass('hp-tabs');
      });
      $insert_tabs.append($home_page_tabs_cleaned);
      $('h2.tab-link:first').addClass('block_current');
      $('.block-list .item-class:first').addClass('block_current');
      $('.uw-site-homepage-tabs h2').click(function () {
        var tab_id = $(this).attr('data-block-tab');
        $('.uw-site-homepage-tabs h2').removeClass('block_current');
        $('.item-class').removeClass('block_current');
        $(this).addClass('block_current');
        $("#" + tab_id).addClass('block_current');
      });
    }
    else {
      $home_page_tabs.addClass('hp-tab');
      $('.item-class').addClass('block_current-single');
      $('.item-list ol li').addClass('block_current-single');
    }
  }
})(window.jQuery, window, window.document);
// Services page filters.
(function servicesFilters($, window, document) {
  'use strict';
  $(document).ready(handleDocumentReady);
  function handleDocumentReady() {
    var $tab_header = $('.tablike').parent(),
      $tab_like = $('.tablike'),
      $sidebar = $('#site-sidebar-wrapper'),
      $search = $('#views-exposed-form-uw-services-search-services-search'),
      // $search_button_html = '<div class="services-tab-item services-search-tab"><a id="services-search">Search</a></div>',.
      $search_display = $('.view-display-id-services_search'),
      $az_filter = $('#a-z-filter'),
      $list_item = $('.services-tab-item'),
      $service_link = $('.services-tab-item a'),
      $list_item_last = $('.tablike .services-tab-item:last-child'),
      $list_item_class = 'service-item',
      $search_display_all = $('.view-display-id-service_all_attachment');
    // Set up services search.
    if ($search.length && $tab_like.length) {
      // $tab_like.append($search_button_html).after($search);
      $tab_like.after($search);
      var timer_duration = '0';
      var timer = window.setTimeout(function () {}, timer_duration);
      timer = window.setTimeout(function () {
        var owl = $('#uw-site--services-tab');
        owl.owlCarousel({
          items : 4, // 10 items above 1000px browser width
          itemsDesktop : [1000,4], // 4 items between 1000px and 901px
          itemsDesktopSmall : [900,4], // betweem 900px and 601px
          itemsTablet: [600,3], // 2 items between 600 and 0
          itemsMobile : [320,2], // itemsMobile disabled - inherit from itemsTablet option.
          pagination:false
        });
        // Custom Navigation Events.
        $('.service-next').click(function () {
          owl.trigger('owl.next');
        });
        $('.service-prev').click(function () {
          owl.trigger('owl.prev');
        });
        $service_link.on('click', function (event) {
          var $this = $(this);
          if ($this.hasClass('clicked')) {
            $this.removeClass('clicked');
          }
          else {
            $this.addClass('clicked');
          }
        });
      }, timer_duration);
    }
    if ($search_display.length) {
      $search.show();
    }
    if ($search.length && $tab_like.length && $sidebar.length) {
      $tab_like.after($search);
    }
  }
})(window.jQuery, window, window.document);

// Local footer.
(function localFooterOpen($, window, document) {
  'use strict';
  $(document).ready(openFooter);
  function openFooter() {
    var $localFooter = $('uw-site-footer2'),
      $localFooterHeight = $localFooter.outerHeight(true);
    $('#contact-toggle').click(function () {
      // $( '.uw-site-footer2' ).toggleClass('open-site-footer');.
      $('.uw-site-footer').toggleClass('site-footer-toggle open-site-footer');
    });
  }
})(window.jQuery, window, window.document);
// Top button.
(function topButton($, window, document) {
  'use strict';
  $(document).ready(scrollToTop);
  function scrollToTop() {
    $('.uw-top-button').click(function () {
      $("html, body").animate({ scrollTop: 0 }, 300);
      return false;
    });
  }
})(window.jQuery, window, window.document);
// Set up share link.
(function shareLinks($, window, document) {
  'use strict';
  $(document).ready(handleDocumentReady);
  function handleDocumentReady() {
    var $socialLinks = $('#block-uw-social-media-sharing-social-media-block');
    if ($socialLinks.length) {
      $socialLinks.prependTo($('.uw-section-share'));
    }
    $('.uw-footer-social-button').on('click', function () {
      $('.uw-section-share').slideToggle('fast');
      return false;
    });
  }
})(window.jQuery, window, window.document);
// Menu CLick.
(function labelClick($, window, document) {
  'use strict';
  $(document).ready(handleDocumentReady);
  function setFocusToTextBox(){
          document.getElementById("CheckboxSwitchE1L").focus();
  }
  function handleDocumentReady() {
    $('[for="CheckboxSwitchE1"]').on('keydown', function (e) {
    var code = e.which;
      if ((code === 13) || (code === 32)) {
      $(this).click();
      setFocusToTextBox();
      }
    });
   }
})(window.jQuery, window, window.document);
;
