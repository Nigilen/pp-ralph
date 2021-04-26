let burgerButton = document.querySelector('.button-burger');
let siteNav = document.querySelector('.nav-site');

let showMenu = function () {
  siteNav.classList.toggle('nav-site--show');
  burgerButton.classList.toggle('button-burger--open-menu');
}

burgerButton.addEventListener('click', showMenu);