var hamburgerWrapper = document.getElementById("hamburgerWrapper");
var mobileMenuBackground = document.getElementById("mobileMenuBackground");
var menuUlWrapper = document.getElementById("menuUlWrapper");
let pageScrollPosY = window.scrollY;
const navWrapper = document.querySelector(".page-nav");
const navWrapperHeight = navWrapper.offsetHeight;
const heroWrapper = document.querySelector(".hero");
const heroHeight = heroWrapper.offsetHeight;
const navLogo = document.querySelector(".page-nav_logo");

const addNavBackgroundOnScroll = () =>
  navWrapper.classList.add("page-nav--black");
const removeNavBackgroundOnScroll = () =>
  navWrapper.classList.remove("page-nav--black");
const showLogoOnScroll = () =>
  navLogo.classList.add("page-nav_logo--show", "page-nav_logo--hidden");
const hideLogoOnScroll = () =>
  navLogo.classList.remove("page-nav_logo--show", "page-nav_logo--hidden");

window.addEventListener("scroll", function() {
  pageScrollPosY = window.scrollY;
  if (pageScrollPosY >= navWrapperHeight) {
    addNavBackgroundOnScroll();
  } else {
    removeNavBackgroundOnScroll();
  }
  if (pageScrollPosY >= heroHeight - navWrapperHeight) {
    showLogoOnScroll();
  } else {
    hideLogoOnScroll();
  }
});

// Mobile Navigation Hambuger Icon Click
hamburgerWrapper.addEventListener("click", function() {
  // If icon is open state then remove open state class
  if (this.classList.contains("open_hamburger")) {
    hamburgerWrapper.classList.remove("open_hamburger");
    mobileMenuBackground.classList.remove("hamburger_circle_open");
    menuUlWrapper.classList.remove("page-nav_ul-open");
    // If icon is closed state then add open state class
  } else {
    hamburgerWrapper.classList.add("open_hamburger");
    mobileMenuBackground.classList.add("hamburger_circle_open");
    menuUlWrapper.classList.add("page-nav_ul-open");
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    hamburgerWrapper.classList.remove("open_hamburger");
    mobileMenuBackground.classList.remove("hamburger_circle_open");
    menuUlWrapper.classList.remove("page-nav_ul-open");
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Cache selectors
var lastId,
  topMenu = $("#top-menu"),
  topMenuHeight = topMenu.outerHeight() + 85,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Bind to scroll
$(window).scroll(function() {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop) return this;
  });
  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .parent()
      .removeClass("active")
      .end()
      .filter("[href='#" + id + "']")
      .parent()
      .addClass("active");
  }
});
