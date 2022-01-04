/*
  [JS Index]
  
  ---
  
  Template Name: Runex - One Page Portfolio Template
  Author:  ex-nihilo
  Version: 1.0
*/

/*
  1. preloader
  2. show elements
    2.1. page loaded
    2.2. page ready
  3. slick slider
  4. navigation
  5. animate elements
  6. YouTube player
  7. typed text
  8. owl carousel
  9. form
*/

$(function () {
  "use strict";

  $(window).on("load", function () {
    // 1. preloader
    $("#preloader").fadeOut(600);
    $(".preloader-bg").delay(400).fadeOut(600);

    // 2. show elements
    // 2.1. page loaded
    setTimeout(function () {
      $("body").addClass("page-loaded");
    }, 400);
    // 2.2. page ready
    $("body").addClass("page-ready");

    // 3. slick slider
    $(".slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: ".home-img-container",
      pauseOnHover: true,
      speed: 800,
      variableWidth: true,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 8000,
    });
    $(".home-img-container").slick({
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".slider",
      dots: false,
      pauseOnHover: true,
      speed: 600,
      variableWidth: true,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 8000,
    });
  });

  // 4. navigation
  $(".page-scroll").on("click", function (e) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 0,
        },
        1500,
        "easeInOutExpo"
      );
    e.preventDefault();
  });
  $(".navigation-fire, nav.navigation-menu a").on("click", function () {
    if ($("nav.navigation-menu").hasClass("show")) {
      $("nav.navigation-menu").removeClass("show");
    } else {
      $("nav.navigation-menu").addClass("show");
    }
  });

  // 5. animate elements
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $(".to-top-arrow").addClass("show");
      $(".round-menu").addClass("direction");
    } else {
      $(".to-top-arrow").removeClass("show");
      $(".round-menu").removeClass("direction");
    }
  });

  // 6. YouTube player
  // $("#bgndVideo").YTPlayer();

  // 7. typed text
  $(".typed-title").typed({
    strings: ["Front-end developer", "2d/3d Animator", "3d Modeler"],
    typeSpeed: 40,
    backDelay: 3000,
    loop: true,
  });

  // 8. owl carousel
  $("#owl-carousel-team").owlCarousel({
    loop: false,
    center: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    nav: true,
    navText: [
      "<i class='ion-chevron-left'></i>",
      "<i class='ion-chevron-right'></i>",
    ],
    navContainer: ".owl-nav-custom-team",
    responsive: {
      0: {
        items: 1,
        margin: 25,
      },
      768: {
        items: 1,
        margin: 50,
      },
      980: {
        items: 1,
        margin: 50,
      },
      1240: {
        items: 2,
        margin: 50,
      },
      2560: {
        items: 3,
        margin: 50,
      },
    },
  });
  $("#owl-carousel-works").owlCarousel({
    loop: false,
    center: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    nav: true,
    navText: [
      "<i class='ion-chevron-left'></i>",
      "<i class='ion-chevron-right'></i>",
    ],
    navContainer: ".owl-nav-custom-works",
    responsive: {
      0: {
        items: 1,
        margin: 25,
      },
      768: {
        items: 1,
        margin: 50,
      },
      980: {
        items: 1,
        margin: 50,
      },
      1240: {
        items: 2,
        margin: 50,
      },
    },
  });
  $("#owl-carousel-news").owlCarousel({
    loop: true,
    center: false,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    smartSpeed: 450,
    nav: false,
    nav: true,
    navText: [
      "<i class='ion-chevron-left'></i>",
      "<i class='ion-chevron-right'></i>",
    ],
    navContainer: ".owl-nav-custom-news",
    responsive: {
      0: {
        items: 1,
        margin: 25,
      },
      768: {
        items: 1,
        margin: 50,
      },
      980: {
        items: 1,
        margin: 50,
      },
      1240: {
        items: 2,
        margin: 50,
      },
    },
  });
  $("#owl-carousel-news-1").owlCarousel({
    loop: false,
    center: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    nav: true,
    navText: [
      "<i class='ion-chevron-left'></i>",
      "<i class='ion-chevron-right'></i>",
    ],
    navContainer: ".owl-nav-custom-news-all.owl-nav-custom-news-1",
    responsive: {
      0: {
        items: 1,
        margin: 25,
      },
      768: {
        items: 1,
        margin: 50,
      },
      980: {
        items: 1,
        margin: 50,
      },
      1240: {
        items: 2,
        margin: 50,
      },
    },
  });
  $("#owl-carousel-news-2").owlCarousel({
    loop: false,
    center: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    nav: true,
    navText: [
      "<i class='ion-chevron-left'></i>",
      "<i class='ion-chevron-right'></i>",
    ],
    navContainer: ".owl-nav-custom-news-all.owl-nav-custom-news-2",
    responsive: {
      0: {
        items: 1,
        margin: 25,
      },
      768: {
        items: 1,
        margin: 50,
      },
      980: {
        items: 1,
        margin: 50,
      },
      1240: {
        items: 2,
        margin: 50,
      },
    },
  });
  $("#owl-carousel-news-3").owlCarousel({
    loop: false,
    center: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    nav: true,
    navText: [
      "<i class='ion-chevron-left'></i>",
      "<i class='ion-chevron-right'></i>",
    ],
    navContainer: ".owl-nav-custom-news-all.owl-nav-custom-news-3",
    responsive: {
      0: {
        items: 1,
        margin: 25,
      },
      768: {
        items: 1,
        margin: 50,
      },
      980: {
        items: 1,
        margin: 50,
      },
      1240: {
        items: 2,
        margin: 50,
      },
    },
  });
  $("#owl-carousel-news-4").owlCarousel({
    loop: false,
    center: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    nav: true,
    navText: [
      "<i class='ion-chevron-left'></i>",
      "<i class='ion-chevron-right'></i>",
    ],
    navContainer: ".owl-nav-custom-news-all.owl-nav-custom-news-4",
    responsive: {
      0: {
        items: 1,
        margin: 25,
      },
      768: {
        items: 1,
        margin: 50,
      },
      980: {
        items: 1,
        margin: 50,
      },
      1240: {
        items: 2,
        margin: 50,
      },
    },
  });

  // 9. form
  $("form#form").on("submit", function () {
    $("form#form .error").remove();
    var s = !1;
    if (
      ($(".requiredField").each(function () {
        if ("" === jQuery.trim($(this).val()))
          $(this).prev("label").text(),
            $(this)
              .parent()
              .append('<span class="error">This field is required</span>'),
            $(this).addClass("inputError"),
            (s = !0);
        else if ($(this).hasClass("email")) {
          var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          r.test(jQuery.trim($(this).val())) ||
            ($(this).prev("label").text(),
            $(this)
              .parent()
              .append('<span class="error">Invalid email address</span>'),
            $(this).addClass("inputError"),
            (s = !0));
        }
      }),
      !s)
    ) {
      $("form#form input.submit").fadeOut("normal", function () {
        $(this).parent().append("");
      });
      var r = $(this).serialize();
      $.post($(this).attr("action"), r, function () {
        $("form#form").slideUp("fast", function () {
          $(this).before(
            '<div class="success">Your email was sent successfully.</div>'
          );
        });
      });
    }
    return !1;
  });

  //AOS
  AOS.init({
    duration: 700,
    easing: "linear",
    mirror: true,
  });

  //Parallax
});

// Random images
let me_image = [
  "img/me/me1.webp",
  "img/me/me2.webp",
  "img/me/me3.webp",
  "img/me/me4.webp",
  "img/me/me5.webp",
];
let rand_img = Math.floor(5 * Math.random());
document.getElementById("me-img").src = me_image[rand_img];
