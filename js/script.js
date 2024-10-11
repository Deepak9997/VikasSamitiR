(function ($) {
  "use strict";



  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').addClass('shadow-sm').css('top', '0px');
    } else {
      $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
    }
  });


  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });


  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000
  });


  //>>>>> banner slider script start
  var $$ = function (selector, context) {
    var context = context || document;
    var elements = context.querySelectorAll(selector);
    return [].slice.call(elements);
  };

  function _fncSliderInit($slider, options) {
    var prefix = ".fnc-";

    var $slider = $slider;
    var $slidesCont = $slider.querySelector(prefix + "slider__slides");
    var $slides = $$(prefix + "slide", $slider);
    var $controls = $$(prefix + "nav__control", $slider);
    var $controlsBgs = $$(prefix + "nav__bg", $slider);
    var $progressAS = $$(prefix + "nav__control-progress", $slider);

    var numOfSlides = $slides.length;
    var curSlide = 1;
    var sliding = false;
    var slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
    var slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

    var autoSlidingActive = false;
    var autoSlidingTO;
    var autoSlidingDelay = 5000; // default autosliding delay value
    var autoSlidingBlocked = false;

    var $activeSlide;
    var $activeControlsBg;
    var $prevControl;

    function setIDs() {
      $slides.forEach(function ($slide, index) {
        $slide.classList.add("fnc-slide-" + (index + 1));
      });

      $controls.forEach(function ($control, index) {
        $control.setAttribute("data-slide", index + 1);
        $control.classList.add("fnc-nav__control-" + (index + 1));
      });

      $controlsBgs.forEach(function ($bg, index) {
        $bg.classList.add("fnc-nav__bg-" + (index + 1));
      });
    };

    setIDs();

    function afterSlidingHandler() {
      $slider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
      $slider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

      $activeSlide.classList.remove("m--before-sliding");
      $activeControlsBg.classList.remove("m--nav-bg-before");
      $prevControl.classList.remove("m--prev-control");
      $prevControl.classList.add("m--reset-progress");
      var triggerLayout = $prevControl.offsetTop;
      $prevControl.classList.remove("m--reset-progress");

      sliding = false;
      var layoutTrigger = $slider.offsetTop;

      if (autoSlidingActive && !autoSlidingBlocked) {
        setAutoslidingTO();
      }
    };

    function performSliding(slideID) {
      if (sliding) return;
      sliding = true;
      window.clearTimeout(autoSlidingTO);
      curSlide = slideID;

      $prevControl = $slider.querySelector(".m--active-control");
      $prevControl.classList.remove("m--active-control");
      $prevControl.classList.add("m--prev-control");
      $slider.querySelector(prefix + "nav__control-" + slideID).classList.add("m--active-control");

      $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
      $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);

      $slider.querySelector(".m--active-slide").classList.add("m--previous-slide");
      $slider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

      $activeSlide.classList.add("m--before-sliding");
      $activeControlsBg.classList.add("m--nav-bg-before");

      var layoutTrigger = $activeSlide.offsetTop;

      $activeSlide.classList.add("m--active-slide");
      $activeControlsBg.classList.add("m--active-nav-bg");

      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
    };



    function controlClickHandler() {
      if (sliding) return;
      if (this.classList.contains("m--active-control")) return;
      if (options.blockASafterClick) {
        autoSlidingBlocked = true;
        $slider.classList.add("m--autosliding-blocked");
      }

      var slideID = +this.getAttribute("data-slide");

      performSliding(slideID);
    };

    $controls.forEach(function ($control) {
      $control.addEventListener("click", controlClickHandler);
    });

    function setAutoslidingTO() {
      window.clearTimeout(autoSlidingTO);
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 1;

      autoSlidingTO = setTimeout(function () {
        performSliding(curSlide);
      }, delay);
    };

    if (options.autoSliding || +options.autoSlidingDelay > 0) {
      if (options.autoSliding === false) return;

      autoSlidingActive = true;
      setAutoslidingTO();

      $slider.classList.add("m--with-autosliding");
      var triggerLayout = $slider.offsetTop;

      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      delay += slidingDelay + slidingAT;

      $progressAS.forEach(function ($progress) {
        $progress.style.transition = "transform " + (delay / 1000) + "s";
      });
    }

    $slider.querySelector(".fnc-nav__control:first-child").classList.add("m--active-control");

  };

  var fncSlider = function (sliderSelector, options) {
    var $sliders = $$(sliderSelector);

    $sliders.forEach(function ($slider) {
      _fncSliderInit($slider, options);
    });
  };

  window.fncSlider = fncSlider;

  fncSlider(".example-slider", {
    autoSlidingDelay: 4000
  });

  var $demoCont = document.querySelector(".demo-cont");

  [].slice.call(document.querySelectorAll(".fnc-slide__action-btn")).forEach(function ($btn) {
    $btn.addEventListener("click", function () {
      $demoCont.classList.toggle("credits-active");
    });
  });
  //>>>>>>> banner slider script end



  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      }
    }
  });

  // Initiate the wowjs
  new WOW().init();


  // donate (Payment)
  $(".denomination").click(function (event) {
    $(".denomination").removeClass("selected").prop('checked', false);
    $(".denomination-other input").removeClass("selected").val('');
    $(this).addClass("selected");
    $(this).children(":first").prop('checked', true);
    $("button").text('Donate $' + $(this).children(":first").val())
  });

  $(".denomination-other input").on('keypress', function (event) {
    // allow only int values
    // TODO: remove leading 0
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }

    $(".denomination").removeClass("selected").prop('checked', false);
    $(this).addClass("selected");
    $("button").text('Donate $' + $(this).val() + key);
  });



	// parallax
	$('.parallax-window').parallax();
	$('.parallax-window2').parallax();


  	      // Preloader script 
          setTimeout(function () {
            $('.inner div').addClass('done');
          
            setTimeout(function () {
              $('.inner div').addClass('page');
          
              setTimeout(function () {
              $('.pageLoad').addClass('off');
          
              $('body, html').addClass('on');
          
          
              }, 500)
            }, 500)
            }, 1500)


})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question.addEventListener('click', () => {
          // Toggle the visibility of the answer
          if (answer.style.display === "block") {
              answer.style.display = "none";
          } else {
              answer.style.display = "block";
          }
      });
  });
});
const form = document.getElementById('subscription-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const stateInput = document.getElementById('state');
  const pincodeInput = document.getElementById('pincode');
  const countrySelect = document.getElementById('country');
  
  // Email validation
  if (!validateEmail(emailInput.value)) {
    document.getElementById('email-error').innerText = 'Invalid email address';
    return false;
  }
  
  // Phone number validation
  if (!validatePhone(phoneInput.value)) {
    document.getElementById('phone-error').innerText = 'Invalid phone number';
    return false;
  }
  
  // State validation
  if (stateInput.value.trim() === '') {
    document.getElementById('state-error').innerText = 'State cannot be empty';
    return false;
  }
  
  // Pin code validation
  if (pincodeInput.value.length !== 6 || isNaN(pincodeInput.value)) {
    document.getElementById('pincode-error').innerText = 'Invalid pin code';
    return false;
  }
  
  // Country validation
  if (countrySelect.value === '') {
    document.getElementById('country-error').innerText = 'Select a country';
    return false;
  }
  
  // If all validations pass, submit the form
  form.submit();
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}



const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevButton = document.querySelector('.testimonial-prev');
const nextButton = document.querySelector('.testimonial-next');
let currentIndex = 0;

testimonialItems.forEach((item, index) => {
  item.dataset.index = index;
});

prevButton.addEventListener('click', () => {
  testimonialItems[currentIndex].classList.remove('active-testimonial');
  currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
  testimonialItems[currentIndex].classList.add('active-testimonial');
});

nextButton.addEventListener('click', () => {
  testimonialItems[currentIndex].classList.remove('active-testimonial');
  currentIndex = (currentIndex + 1) % testimonialItems.length;
  testimonialItems[currentIndex].classList.add('active-testimonial');
});

// Auto-animate
setInterval(() => {
  nextButton.click();
}, 2000);



const text = document.getElementById('animated-text');
const textContent = 'VSR NGO is a non-profit organization dedicated to promoting sustainable community development and social welfare in the Rankuna region. Established with a mission to uplift marginalized groups, we focus on areas such as education, healthcare, women\'s empowerment, and environmental conservation. Our projects are designed to address the unique needs of local communities, providing access to vital resources and opportunities for growth. Through collaborative efforts with volunteers, donors, and local partners, we have successfully impacted numerous lives, ensuring a brighter future for the underprivileged. At VSR NGO, we believe that real change begins with grassroots initiatives, and we are committed to fostering a society where everyone has the opportunity to thrive. Join us in our mission to make a difference and build a better tomorrow for Rankuna and beyond.';

const words = textContent.split(' ');
let wordIndex = 0;

function animateText() {
  if (wordIndex < words.length) {
    text.innerHTML += words[wordIndex] + ' ';
    wordIndex++;
    setTimeout(animateText, 50); // adjust speed here
  }
}


