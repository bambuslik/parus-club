//section promo start
const mobBurgerBtnElement = document.querySelector('.mob-burger');
const mobMenuElement = document.querySelector('.nav__list');

mobBurgerBtnElement.addEventListener('click', (event) => {
  mobBurgerBtnElement.classList.toggle('mob-burger_active');
  mobMenuElement.classList.toggle('nav__list_mob-active');
});

//scroll nav
let hashTagActive = "";
$(".scroll").on("click touchstart", function (event) {
  if (hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
    event.preventDefault();
    //calculate destination place
    let dest = 0;
    if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
      dest = $(document).height() - $(window).height();
    } else {
      dest = $(this.hash).offset().top;
    }
    //go to destination
    $('html,body').animate({
      scrollTop: dest
    }, 1000, 'swing');
    hashTagActive = this.hash;
  }
});

$(document).ready(function () {
  $("input[name='phone']").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    let formData = new FormData(this);

    $.ajax({
      url: "sendmail.php",
      type: 'POST',
      data: formData,
      beforeSend: function () {
        // $(".loader").addClass("on");
      },
      success: function (data) {

      },
      cache: false,
      contentType: false,
      processData: false
    })
        .done(function (data) {

          // $(".loader").removeClass("on");
          $.fancybox.close();
          $.fancybox.open({
            src: "#popup-thanks"
          });

          // ym(35100805, 'reachGoal', 'form-submitted');
          // dataLayer.push({'event': 'form-submit'});
          console.log('form-submitted');
        });
  });
});

//section promo end

//section-programs start
const programsItemElements = document.querySelectorAll('.programs-item__overlay');

Array.from(programsItemElements).forEach((element) => {
  element.addEventListener('mouseover', (event) => {
    const rootElement = event.target.closest('.programs-item');
    //change bg
    rootElement.classList.remove('programs-item_normal');
    rootElement.classList.add('programs-item_hover');
    //change ico
    const icoElement = rootElement.querySelector('.programs-item__ico');
    const icoSrc = rootElement.querySelector('.programs-item__ico').getAttribute('src').slice(0, -4);
    icoElement.setAttribute('src', `${icoSrc}_hover.svg`);
    //change title
    const titleElement = rootElement.querySelector('.programs-item__title_normal');
    titleElement.classList.remove('programs-item__title_normal');
    titleElement.classList.add('programs-item__title_hover');
  });

  element.addEventListener('mouseout', (event) => {
    const rootElement = event.target.closest('.programs-item');
    //change bg
    rootElement.classList.remove('programs-item_hover');
    rootElement.classList.add('programs-item_normal');
    //change ico
    const icoElement = rootElement.querySelector('.programs-item__ico');
    const icoSrc = rootElement.querySelector('.programs-item__ico').getAttribute('src').slice(0, -10);
    icoElement.setAttribute('src', `${icoSrc}.svg`);
    //change title
    const titleElement = rootElement.querySelector('.programs-item__title_hover');
    titleElement.classList.remove('programs-item__title_hover');
    titleElement.classList.add('programs-item__title_normal');
  });
});
//section-programs end

//section-faq start
const faqItemElements = document.querySelectorAll('.faq-list-item');

Array.from(faqItemElements).forEach((element) => {
  element.addEventListener('click', () => {
    element.classList.toggle('faq-list-item_active');
    element.querySelector('.faq-list-item__answer').classList.toggle('faq-list-item__answer_active');
  });

});
//section-faq end

//section-results start
const resultsSlider = tns({
  container: '.results-slider',
  items: 1,
  gutter: 30,
  nav: false,
  controls: false,
  mouseDrag: true,
  responsive: {
    540: {
      // edgePadding: 20,
      // gutter: 30,
      items: 1
    },
    768: {
      items: 2
    },
    900: {
      // gutter: 30,
      items: 3
    }
  }
});

const resultsSliderActiveSlideNumberElement = document.querySelector('.section-results__slider-active-slide-number');
const resultsSliderSlidesCountElement = document.querySelector('.section-results__slider-slides-count');
const resultsSliderPrevButtonElement = document.querySelector('.section-results__slider-prev');
const resultsSliderNextButtonElement = document.querySelector('.section-results__slider-next');

function setActiveSlideNumber(sliderElement, destinationElement) {
  resultsSliderInfo = sliderElement.getInfo();
  console.log(
    // resultsSliderInfo
  );
  destinationElement.textContent = resultsSliderInfo.displayIndex;
}

//info from slider method
let resultsSliderInfo = resultsSlider.getInfo();
resultsSliderSlidesCountElement.textContent = resultsSliderInfo.slideCount;

//set event listener on slider change
resultsSlider.events.on('indexChanged', () => {
  setActiveSlideNumber(resultsSlider, resultsSliderActiveSlideNumberElement);
});

resultsSliderPrevButtonElement.addEventListener('click', () => {
  resultsSlider.goTo('prev');
});
resultsSliderNextButtonElement.addEventListener('click', () => {
  resultsSlider.goTo('next');
});
//section-results end

//section-workers start
const workersSlider = tns({
  container: '.workers-slider',
  items: 1,
  // gutter: 30,
  nav: false,
  controls: false,
  mouseDrag: true,
  responsive: {
    640: {
      // edgePadding: 20,
      // gutter: 30,
      // items: 1
    },
    700: {
      // gutter: 30
      // gutter: 30,
    },
    900: {
      // gutter: 30,
      // items: 3
    }
  }
});

let workersSliderInfo = workersSlider.getInfo();

//slider elements
const workersSliderActiveSlideNumberElement = document.querySelector('.section-workers__slider-active-slide-number');
const workersSliderSlidesCountElement = document.querySelector('.section-workers__slider-slides-count');
const workersSliderPrevButtonElement = document.querySelector('.section-workers__slider-prev');
const workersSliderNextButtonElement = document.querySelector('.section-workers__slider-next');

//change person info
const workerNameElement = document.querySelector('.section-workers__name');
const workerExperienceElement = document.querySelector('.worker-experience__number');
const workerPositionElement = document.querySelector('.section-workers__position');
const workerProgressElement = document.querySelector('.section-workers__progress');
const workerMottoElement = document.querySelector('.section-workers__motto');

function changeWorkerInfo(sliderElement) {
  const slideNumber = (sliderElement.getInfo().displayIndex - 1);

  workerNameElement.innerHTML = workers[slideNumber].name;
  workerExperienceElement.innerHTML = workers[slideNumber].experience;
  workerPositionElement.innerHTML = workers[slideNumber].position;
  workerProgressElement.innerHTML = workers[slideNumber].progress;
  workerMottoElement.innerHTML = workers[slideNumber].motto;
}

//info from slider method
workersSliderSlidesCountElement.textContent = workersSliderInfo.slideCount;

//set event listener on slider change
workersSlider.events.on('indexChanged', () => {
  setActiveSlideNumber(workersSlider, workersSliderActiveSlideNumberElement);
  changeWorkerInfo(workersSlider);
});

workersSliderPrevButtonElement.addEventListener('click', () => {
  workersSlider.goTo('prev');
});
workersSliderNextButtonElement.addEventListener('click', () => {
  workersSlider.goTo('next');
});
//section-workers end

// section-gallery start
// if mobile use slider for mobile
let gallerySlider;
if (document.body.clientWidth <= 748) {
  gallerySlider = tns({
    container: '.gallery-slider_mobile',
    items: 1,
    nav: false,
    controls: false,
    mouseDrag: true,
    responsive: {
      640: {
        // edgePadding: 20,
        // gutter: 30,
        // items: 1
      },
      700: {
        // gutter: 30
        // gutter: 30,
      },
      900: {
        // gutter: 30,
        // items: 3
      }
    }
  });
} else {
  gallerySlider = tns({
    container: '.gallery-slider_desktop',
    items: 1,
    nav: false,
    controls: false,
    mouseDrag: true,
    responsive: {
      640: {
        // edgePadding: 20,
        // gutter: 30,
        // items: 1
      },
      700: {
        // gutter: 30
        // gutter: 30,
      },
      900: {
        // gutter: 30,
        // items: 3
      }
    }
  });
}

let gallerySliderInfo = gallerySlider.getInfo();

//slider elements
const gallerySliderActiveSlideNumberElement = document.querySelector('.section-gallery__slider-active-slide-number');
const gallerySliderSlidesCountElement = document.querySelector('.section-gallery__slider-slides-count');
const gallerySliderPrevButtonElement = document.querySelector('.section-gallery__slider-prev');
const gallerySliderNextButtonElement = document.querySelector('.section-gallery__slider-next');

//info from slider method
gallerySliderSlidesCountElement.textContent = gallerySliderInfo.slideCount;

//set event listener on slider change
gallerySlider.events.on('indexChanged', () => {
  setActiveSlideNumber(gallerySlider, gallerySliderActiveSlideNumberElement);
});

gallerySliderPrevButtonElement.addEventListener('click', () => {
  gallerySlider.goTo('prev');
});
gallerySliderNextButtonElement.addEventListener('click', () => {
  gallerySlider.goTo('next');
});

$('.fancybox-gallery').fancybox({
  backFocus: false
});
// section-gallery end

//map start
let myMap;

function initMap() {
  myMap = new ymaps.Map("map", {
    center: [59.942079, 30.367261],
    zoom: 16,
    controls: ["zoomControl", "typeSelector"]
  });
  myMap.behaviors.disable('scrollZoom');

  function createMarker(content, lat, lng) {
    myPlacemark = new ymaps.Placemark([lat, lng], {
      hintContent: '',
      balloonContent: ''
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/map-marker.svg',
      iconImageSize: [60, 83],
      iconImageOffset: [-60 / 2, -83]
    });
    myMap.geoObjects.add(myPlacemark);
  }

  createMarker('', 59.942079, 30.367261);
}

let mapsShown = 0;

function showMap() {
  $.getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU', function (data, textStatus, jqxhr) {
    ymaps.ready(initMap);
  });
}

$(document).ready(function () {
  $(window).scroll(function () {
    if (!mapsShown) {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 2000) {
        showMap();
        mapsShown = 1;
      }
    }
  });
});
//map end

//if mob
if (document.body.clientWidth <= 936) {
  document.querySelector('.section-contacts__mob-policy-place').append(document.querySelector('.section-contacts__logo'));
  document.querySelector('.section-contacts__mob-policy-place').append(document.querySelector('.section-contacts__bottom-line'));
}

//popups start
$(".get-popup-callback").click(function (event) {
  event.preventDefault();
  $.fancybox.open({
    src: "#popup-callback",
    touch: false
  })
});

$(".get-popup-order-card").click(function (event) {
  event.preventDefault();
  $.fancybox.open({
    src: "#popup-order-card",
    touch: false
  })
});

$(".programs-item").click(function (event) {
  event.preventDefault();
  $.fancybox.open({
    src: "#popup-program",
    touch: false
  })
});

// $(".section-contacts__policy-link").click(function (event) {
//   event.preventDefault();
//   $.fancybox.open({
//     src: "#popup-policy",
//     touch: false
//   })
// });


//popups end



















