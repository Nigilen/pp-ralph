let burgerButton = document.querySelector('.button-burger');
let siteNav = document.querySelector('.nav-site');

let showMenu = function () {
  siteNav.classList.toggle('nav-site--show');
  burgerButton.classList.toggle('button-burger--open-menu');
}

burgerButton.addEventListener('click', showMenu);




// SLIDER

let rightControl = document.querySelector('.control-button-right')
let leftControl = document.querySelector('.control-button-left')
let reviewsList = document.querySelector('.reviews-list')

let param = 0

let moveLeft = function() {
  param += -653
  reviewsList.style.transform = 'translateX('+ param + 'px)';
}

rightControl.addEventListener('click', moveLeft)


let moveRight = function() {
  param += 653
  reviewsList.style.transform = 'translateX('+ param + 'px)';
}

leftControl.addEventListener('click', moveRight)


// HEDER
let header = document.querySelector('.header');
let headerContainer = header.querySelector('.header-container');

let changeMenu = function(){

  if (window.pageYOffset > 100) {
    headerContainer.classList.add('header-container--scroll')
  } else {
    headerContainer.classList.remove('header-container--scroll')
  }
}

window.addEventListener('scroll', changeMenu);
