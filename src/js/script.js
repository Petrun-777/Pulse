$(document).ready(function(){
  $('ul.catalog-tabs').on('click', 'li:not(.catalog-tab-active)', function() {
    $(this)
      .addClass('catalog-tab-active').siblings().removeClass('catalog-tab-active')
      .closest('div.container').find('div.catalog-content').removeClass
      ('catalog-content-active').eq($(this).index()).addClass
      ('catalog-content-active');
  });
  
  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item-content').eq(i).toggleClass('catalog-item-content-active');
        $('.catalog-item-list').eq(i).toggleClass('catalog-item-list-active');
      })
    });
  };

  toggleSlide('.catalog-item-link');
  toggleSlide('.catalog-item-back');


  //modal-window
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  });
  $('.modal-close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  $('.button-mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal-descr').text($('.catalog-item-subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  });

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name:  {
          required: "Будь ласка, введіть своє ім'я",
          minlength: jQuery.validator.format("Мінімальна кількість символів {0}")
        },
        phone: "Будь ласка, введіть свій номер телефону",
        email: {
          required: "Нам потрібна ваша електронна адреса, щоб зв'язатися з вами",
          email: "Ваша електронна адреса має бути у форматі name@domain.com"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=phone]').mask("(+380) 999-99-99-99");

  $('form').submit(function (e){
    e.preventDefault();

    if(!$(this).valid()) {
      return;
    };

    $.ajax({
      type: "POST",
      url: "/mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn(slow);
      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  new WOW().init();
});

$(document).ready(function(){
  $('.carousel-inner').slick({
    // speed: 1000,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.jpg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.jpg"></button>',
    responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows: false,
          }
        }
      ]
  });
  
  $('.carousel-inner').slick({
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    fadeSpeed: 1000
  });
});