import { data_img, data_text, data_categories } from './data.js'


function createCarouselElementsText() {
  data_text.forEach((elem, i) => {
    const item = document.createElement("div");
    item.classList.add("carousel__content");
    if (i == 0) {
      item.classList.add("active");
    }
    item.innerHTML = `
            <div class="carousel-item">${elem.text}
              <a href="/" class="carousel-item-link">${elem.link}</a>
            </div>`;
    document.querySelector(".carousel-inner").appendChild(item)
  })
}
createCarouselElementsText();
const itemsImg = document.querySelectorAll('.carousel__item')

function createCarouselElementsImg() {
  itemsImg.forEach((elem, i) => {
    console.log(i);
    elem.setAttribute('data-img', i)
    elem.style.backgroundImage = `url(${data_img[i].scrMob})`;
  })
}
function createCarouselElementsImgButton() {
  data_img.forEach((_, i) => {
    const item = document.createElement("button");
    item.classList.add("button-indicator");
    if (i == 0) {
      item.classList.add("active");
    }
    item.setAttribute('data-active', i)
    document.querySelector(".carousel__indicators").appendChild(item)
  })
}
createCarouselElementsImgButton()
createCarouselElementsImg();
const buttonActive = document.querySelectorAll('.button-indicator')
function removeActive(items){
  items.forEach((el)=>{
el.classList.remove('active')
  })
}
// console.log(buttonActive);

let itemsText = document.querySelectorAll('.carousel__content');
let currentItemText = 0;
let isEnabledText = true;

function changeCurrentItems(n) {
  currentItemText = (n + itemsText.length) % itemsText.length;
}

function hideItem(direction) {
  isEnabledText = false;
  itemsText[currentItemText].classList.add(direction)
  itemsText[currentItemText].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  })
}
function showItem(direction) {
  itemsText[currentItemText].classList.add('next', direction)
  itemsText[currentItemText].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active')
    isEnabledText = true
  })
}

function prevItem(n) {
  hideItem('to-right')
  changeCurrentItems(n - 1)
  showItem('from-left')
}
function nextItem(n) {
  hideItem('to-left')
  changeCurrentItems(n + 1)
  showItem('from-right')
}


document.querySelector('.carousel-control-prev').addEventListener('click', function () {
  if (isEnabledText) {
    prevItem(currentItemText)
  }
})
document.querySelector('.carousel-control-next').addEventListener('click', function () {
  clearInterval(setTime)
  if (isEnabledText) {
    nextItem(currentItemText)
  }
})
const setTime = setInterval(() => {
  if (isEnabledText) {
    nextItem(currentItemText)
  }
}, 3000)

const BTN_RIGHT = document.querySelector('.button--next');
const BTN_LEFT = document.querySelector('.button--prev');
const CAROUSEL = document.querySelector('.carousel__container')
// //движение карусели
const move_left = () => {
  CAROUSEL.classList.add('transition_left')
  //на время анимации отключить кнопки для этого создаём функцию 
  BTN_RIGHT.removeEventListener('click', move_right);
  BTN_LEFT.removeEventListener('click', move_left)
}
const move_right = () => {
  CAROUSEL.classList.add('transition_right')
  //на время анимации отключить кнопки для этого содаём функцию 
  BTN_LEFT.removeEventListener('click', move_left)
  BTN_RIGHT.removeEventListener('click', move_right)
}

BTN_LEFT.addEventListener('click', move_left)
BTN_RIGHT.addEventListener('click', move_right)

let currentItemImg = 0;
let AllItemImg = data_img.length;
// //слушаем конец анимации
CAROUSEL.addEventListener('animationend', (animationEvent) => {//добавляем в функцию аргумент событие

  let changedItem; //переменная меняется в зависимости от направления
  if (animationEvent.animationName === 'move_left') {
    CAROUSEL.classList.remove('transition_left')
    const ITEM_LEFT = document.querySelector('#item_left')
    changedItem = ITEM_LEFT.getAttribute('data-img')
    let leftItem;
    let rightItem;
    // to main section
    const ITEM_ACTIVE = document.querySelector('#item_active')
    ITEM_ACTIVE.style.backgroundImage = `url(${data_img[changedItem].scrMob})`;
    ITEM_ACTIVE.setAttribute('data-img', changedItem)
    removeActive(buttonActive)
    document.querySelector(`[data-active="${changedItem}"]`).classList.add('active')
    currentItemImg = changedItem;
    // to right section
    if (+changedItem + 1 > AllItemImg - 1) {
      rightItem = 0
    } else {
      rightItem = +changedItem + 1
    }
    const ITEM_RIGHT = document.querySelector('#item_right')
    ITEM_RIGHT.style.backgroundImage = `url(${data_img[rightItem].scrMob})`;
    ITEM_RIGHT.setAttribute('data-img', rightItem)
    // to left section
    changedItem--
    if (changedItem < 0) {
      leftItem = AllItemImg - 1
    } else {
      leftItem = changedItem
    }
    ITEM_LEFT.style.backgroundImage = `url(${data_img[leftItem].scrMob})`
    ITEM_LEFT.setAttribute('data-img', leftItem)

  } else {
    CAROUSEL.classList.remove('transition_right')
    const ITEM_RIGHT = document.querySelector('#item_right')
    changedItem = ITEM_RIGHT.getAttribute('data-img')

    const ITEM_LEFT = document.querySelector('#item_left')
    let leftItem;
    let rightItem;
    
    // to main section
    const ITEM_ACTIVE = document.querySelector('#item_active')
    ITEM_ACTIVE.style.backgroundImage = `url(${data_img[changedItem].scrMob})`;
    ITEM_ACTIVE.setAttribute('data-img', changedItem)
    currentItemImg = changedItem;


    if (changedItem-1 < 0) {
      leftItem = AllItemImg - 1
    } else {
      leftItem = changedItem -1
    }

    ITEM_LEFT.style.backgroundImage = `url(${data_img[leftItem].scrMob})`
    ITEM_LEFT.setAttribute('data-img', leftItem)
    // to right section
    changedItem++
    if (+changedItem > AllItemImg - 1) {
      rightItem = 0;
    } else {
      rightItem = +changedItem;
    }
    ITEM_RIGHT.style.backgroundImage = `url(${data_img[rightItem].scrMob})`;
    ITEM_RIGHT.setAttribute('data-img', rightItem)

  }

  //возвращаем слушание события для кнопок
  BTN_RIGHT.addEventListener('click', move_right)
  BTN_LEFT.addEventListener('click', move_left)
})

// burger-menu
const BURGER_BTN = document.querySelector('.svgIcon__menuClose');
BURGER_BTN.addEventListener('click',()=>{
document.querySelector('.header__menu').classList.toggle('active');
document.querySelector('.blackout').classList.toggle('active');

})
document.querySelector('.blackout').addEventListener('click',()=>{
document.querySelector('.header__menu').classList.toggle('active');
document.querySelector('.blackout').classList.toggle('active');
})
document.querySelector('.cross').addEventListener('click',()=>{
document.querySelector('.header__menu').classList.toggle('active');
document.querySelector('.blackout').classList.toggle('active');
})

let nav = document.querySelectorAll('.navigation__category')

function createBurgerSubCategories(categoryNum, category) {
  const item = document.createElement("div");
  for (let index = 0; index < nav.length; index++) {
    nav[index].classList.add('navigation__category-hide')
  }
  item.classList.add("subBurger");
  item.innerHTML = `
    
  <div class="categories-name">
  <img src="./assets/img/svg/arrow-sm-left-svgrepo-com.svg" alt="arrow" class="categories-name-img"> ${category}</div>
            <ul class="navigation__categories-subBurger">
            </ul>`;
            document.querySelector(".menu__wrapper").appendChild(item)

for(let item in data_categories[categoryNum].mainName){
  const li = document.createElement("li");
  li.classList.add("navigation__category-subBurger");
  li.innerHTML = `
            <span class="navigation__categories-subBurger">${data_categories[0].mainName[item]}
            </span>`;
  document.querySelector(".navigation__categories-subBurger").appendChild(li)
}

for(let item in data_categories[categoryNum].Category){
  const li = document.createElement("li");
  li.classList.add("navigation__category-subBurger");
  li.innerHTML = `
            <span class="navigation__categories-subBurger">${data_categories[0].Category[item]}
            </span>`;
  document.querySelector(".navigation__categories-subBurger").appendChild(li)
}

}
document.querySelector(".bras").addEventListener('click',(e)=>{
e.target.textContent
  createBurgerSubCategories(0,e.target.textContent);
  setTimeout(()=>{

    document.querySelector(".subBurger").classList.toggle('active')
  },100)
})

document.querySelector(".menu__wrapper").addEventListener('click',(e)=>{
  if (e.target.className === 'categories-name'||e.target.className === 'categories-name-img') {
    document.querySelector(".subBurger").classList.toggle('active')
    for (let index = 0; index < nav.length; index++) {
      nav[index].classList.remove('navigation__category-hide')
    }
  }
})
 