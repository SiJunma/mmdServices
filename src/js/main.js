$( document ).ready(function() {
  
  function mobileMenu() {
    $('#burgerBtn').on('click', function(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      if(!$('#mobileMenu').hasClass('opened')) {
        $('#mobileMenu').addClass('opened');
        $('#burgerBtn').addClass('opened');
        $(document).bind('click', handler);
      } 
      else if($('#mobileMenu').hasClass('opened')) {
        $('#mobileMenu').removeClass('opened');
        $('#burgerBtn').removeClass('opened');
        $(document).unbind('click', handler);
      }
    });

    let handler = function(e) {
      if ($(e.target).closest("#mobileMenu").length === 0 && $(e.target).closest("#burgerBtn").length === 0) {
        e.stopPropagation();
        $('#mobileMenu').removeClass('opened');
        $('#burgerBtn').removeClass('opened');
        $(document).unbind('click', handler);
      }
    }
  }
  mobileMenu();

    
  function modalInit(btn) {
    $(btn).on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      let targetModal = $($( this ).attr('data-target'));
      targetModal.css('display', 'flex');
      $('body').css('overflow', 'hidden');

      function closeModalBtn(btn) {
        $(btn).on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          $( '.modal' ).hide();
          $( '.modal' ).find('.input-form').val('');
          $( '.modal' ).find('.input-file-actual').val('');
          $( '.modal' ).find('.input-file-box').text('No file chosen');
          $('body').css('overflow', '');
        });
      }
      closeModalBtn('.btn-close');
      closeModalBtn('.submit-close');
      closeModalBtn('.apply-close');
    })
  }
  modalInit('.modal-open');


  function fileInputInit(btn) {
    $(btn).change(function(e) {
      if(e.target.files[0]) {
        let fileName = e.target.files[0].name;
        $(this).closest('.btn-file__siblings').find('.input-file-box').text(fileName);
      }
    });
  }
  fileInputInit('.input-file-actual');
  
  // Header Slider
  if($('.header .splide').length) {
    new Splide( '.header .splide', {
      type: 'loop',
      speed: 300,
      perMove: 1,
      arrows: true,
      pagination: false,
      autoplay: true,
      interval: 5000,
      breakpoints: {
        768: {
          arrows: false,
        }
      }
    
    }).mount();
  }

  /*Dropdown Menu*/
  $('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
  });
  $('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
  });
  $('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
  });
  /*End Dropdown Menu*/


  /*Submit scenario*/
  function submitWindow(modalId) {
    $(modalId).find('.apply-form').hide();
    $(modalId).find('.modal-header').hide();

    let stage = 'SUCCESS'; /*scenario for checking form*/

    $(modalId).find('.modal-body').append('<div id="submitResponse"></div>')

    if(stage == 'PROCESS') {
      $(modalId).find('#submitResponse').html('<img class="spinner" src="img/spinner-icon-0.webp" alt="Loading">');
    }; 
    if(stage == 'SUCCESS') {
      $(modalId).find('#submitResponse').html('<p>Form has been submitted successfully!</p><button class="btn submit-close" type="button">Close</button>');
    }; 
    if (stage == 'FAILED') {
      $(modalId).find('#submitResponse').html('<p>Something went wrong. Try again later.</p><button class="btn btn-close" type="button">Close</button>');
    };

    submitClose('.submit-close');
  };
  /*End Submit scenario*/

  

  function checkIn(input) {
    input.addClass('ion-select');
    input.prop( "checked", true );
  }

  function checkOut(input) {
    input.removeClass('ion-select');
    input.prop( "checked", false );
  }
  
  if($('.filters-group input.ion-select:not(.ion-all)').length > 0) {
    checkOut($('.filters-group input.ion-all.ion-select'));
  }

  $('label.checkbox').on('click', function(e) {
    e.preventDefault();

    if($(this).closest('.filters-group').length > 0) {
      return;
    } else {
      if(!$(this).find('input').hasClass('ion-select')) {
        checkIn($(this).find('input'));
      } else {
        checkOut($(this).find('input'));
      }
    }
  });

  $('.filters-group label').on('click', function(e) {
    e.preventDefault();

      if(!$(this).find('input').hasClass('ion-select') && $(this).find('input').hasClass('ion-all')) {
        
        checkOut($(this).closest('.filters-group').find('input.ion-select'));
        checkIn($(this).find('input'));

      } else if (!$(this).find('input').hasClass('ion-select') && !$(this).find('input').hasClass('ion-all')) {

        checkIn($(this).find('input'));
        checkOut($(this).closest('.filters-group').find('input.ion-select.ion-all'));

      } else if($(this).find('input').hasClass('ion-select') && $(this).find('input').hasClass('ion-all')) {

      } else if($(this).find('input').hasClass('ion-select') && !$(this).find('input').hasClass('ion-all')) {
        checkOut($(this).find('input'));
        checkOut($(this).closest('.filters-group').find('input.ion-select.ion-all'));
      }
  });
});




          
