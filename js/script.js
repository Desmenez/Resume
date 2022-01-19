/*
  Main Javascript
*/

/*
  1. preloader
  2. show elements
    2.1. page loaded
    2.2. page ready
  3. slick slider
  4. to top
  5. typed text
  6. owl carousel
  7. AOS
  8. Random images
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

  // 4. to top
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $(".to-top-arrow").addClass("show");
      $(".round-menu").addClass("direction");
    } else {
      $(".to-top-arrow").removeClass("show");
      $(".round-menu").removeClass("direction");
    }
  });

  // 5. typed text
  $(".typed-title").typed({
    strings: ["Front-end developer", "2d/3d Animator", "3d Modeler"],
    typeSpeed: 40,
    backDelay: 3000,
    loop: true,
  });

  // 6. owl carousel
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

  // 7. AOS
  AOS.init({
    duration: 700,
    easing: "linear",
    mirror: true,
  });
});

// 8. Random images
let me_image = [
  "img/me/me1.webp",
  "img/me/me2.webp",
  "img/me/me3.webp",
  "img/me/me4.webp",
  "img/me/me5.webp",
];
let rand_img = Math.floor(5 * Math.random());
document.getElementById("me-img").src = me_image[rand_img];
