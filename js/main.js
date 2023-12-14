/**    NOTIFICATION  **/
// cua so pop up
const popup = document.querySelector('.popup');
const close = document.querySelector('.close-popup')

window.onload = function(){
  setTimeout(function(){
    popup.style.display = "block"

     // Add some time delay to show popup
  },1500)
}
close.addEventListener('click',()=>{
   popup.style.display = "none"
})


let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll',()=>{
  header.classList.toggle('shadow',window.scrollY > 0);
});

menu.onclick = () =>{
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}


var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  }); 

  var swiper = new Swiper(".coming-container",{
    spaceBetween: 20,
    loop:true,
    autoplay:{
      delay:1500,
      disableOnInteraction:false,
    },
    centeredSlides:true,
    breakpoints:{
      0:{
        slidesPerView:2,
      },
      568:{
        slidesPerView:3,
      },
      768:{
        slidesPerView:4,
      },
      968:{
        slidesPerView:5,
      },
    },
  });