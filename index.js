import { data_img, data_text } from './data.js'


function createCarouselElements(){
  data_text.forEach((elem,i)=>{
    const item = document.createElement("div");
    item.classList.add("carousel__content");
    if(i==0){
      item.classList.add("active");
    }
    item.innerHTML =`
            <div class="carousel-item">${elem.text}
              <a href="/" class="carousel-item-link">${elem.link}</a>
            </div>`;
    document.querySelector(".carousel-inner").appendChild(item)
  })
}
createCarouselElements();

let items = document.querySelectorAll('.carousel__content');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItems(n){
currentItem = (n + items.length) % items.length;
console.log(currentItem);
}

function hideItem(direction){
console.log(items[currentItem]);
    isEnabled = false;
    items[currentItem].classList.add(direction)
    items[currentItem].addEventListener('animationend',function(){
        this.classList.remove('active', direction);
    })
}
function showItem(direction){
console.log(items[currentItem]);
    items[currentItem].classList.add('next', direction)
    items[currentItem].addEventListener('animationend',function(){
        this.classList.remove('next', direction);
        this.classList.add('active')
        isEnabled = true
    })
}

function prevItem (n){
    hideItem('to-right')
    changeCurrentItems(n-1)
    showItem('from-left')
}
function nextItem (n){
    hideItem('to-left')
    changeCurrentItems(n+1)
    showItem('from-right')
}


document.querySelector('.carousel-control-prev').addEventListener('click',function(){
  if(isEnabled){
    prevItem(currentItem)
  }
})
document.querySelector('.carousel-control-next').addEventListener('click',function(){
  clearInterval(setTime)
  if(isEnabled){
    nextItem(currentItem)
  }
})
const setTime = setInterval(()=>{
  if(isEnabled){
    nextItem(currentItem)
  }
},3000)
