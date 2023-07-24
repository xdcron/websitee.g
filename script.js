///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector('.nav')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// button scroll to

btnScrollTo.addEventListener("click", function (e) {
  // const s1coords = header.getBoundingClientRect;

  // console.log(e.target.getBoundingClientRect());

  // console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset}
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////

//  PAGE NAVIGATION

/* document.querySelectorAll('.nav__link').forEach(function(el) {
  el.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
}); */

// 1. Add event listener to common parent element
// 2. Determine which element originated he event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // MATCHING STRATEGY
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  // Guard clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Active tab content
    document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade animation
function handleHover(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target; 
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img')
  
    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
   }
}

//  passing an "argument" into handler
 nav.addEventListener('mouseover', handleHover.bind(0.5))
 nav.addEventListener('mouseout', handleHover.bind(1))

 // Sticky navigaton
//  const initialCords = section1.getBoundingClientRect()

//  window.addEventListener('scroll', function(e) {
//   if(window.scrollY > initialCords){
//    nav.classList.add('sticky')
//   } else{
//     nav.classList.remove('sticky')
//   }
//  });

// Intersection observer API for sticky nav
function obsCallBack(entries, observer) {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
    }
  }
  )
  
};
 const obsOptions = {
  root:null,
  threshold: [0, 0.2]
 }

const observer = new IntersectionObserver(obsCallBack, obsOptions);

observer.observe(section1)
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

function stickyNav(entries) {
const [entry] = entries;
if(!entry.isIntersecting){
  nav.classList.add('sticky')
}else{
  nav.classList.remove('sticky')
}
}
;

// Reveal section
const allSections = document.querySelectorAll('.section')
function revealSection(entries, observer){
const [entry] = entries;
if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
 observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
threshold: 0.15
})

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
});

// Lazy loading

const allTargetImgs = document.querySelectorAll('img[data-src]');

function loading(entries, observer) {
const [entry] = entries;
if(!entry.isIntersecting) return;

// Replace the src with data-src
entry.target.src = entry.target.dataset.src;

entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loading, {
  threshold: 0,
  rootMargin: '200px'
});
allTargetImgs.forEach(img => {
  imgObserver.observe(img)
});

// Slider

function slider() {


const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnleft = document.querySelector('.slider__btn--left');
let curSlide = 0;
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');

// Functions
function createDots() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  });
};

function activateDot(slide) {
  const btn = document.querySelectorAll('.dots__dot');
  btn.forEach(b => b.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

function goToSlide(slide) {
  slides.forEach((s, i) => {
    // 0 100 200 300
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  });
};

function nextSlide(){
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else{
    curSlide++
  }
   goToSlide(curSlide);
   activateDot(curSlide);
};

function prevSlide() {
  if(curSlide < 1){
    curSlide = maxSlide - 1;
  }else{
    curSlide--
  }
goToSlide(curSlide);
activateDot(curSlide);
};

function init(){
  createDots();
  activateDot(0);
  goToSlide(0);
};

init();
// Event handlers
btnRight.addEventListener('click', nextSlide);
btnleft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight') nextSlide();
  if(e.key === 'ArrowLeft') prevSlide();  
});
dotContainer.addEventListener('click',function (e) {
   if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
   }
 }
);};
slider()

///////////////////////



const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent =
  "We use cookies for improved functionality and analytics.";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);
// header.insertAdjacentElement('beforeend', message)
// header.prepend(message.cloneNode(true))

// delete element

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.parentElement.removeChild(message);
    message.remove();
  });

// STYLES

message.style.backgroundColor = "#37383d";
// message.style.width = '120%';

// // rbg (255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());


