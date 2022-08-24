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
      
      let closeModal = function() {
        targetModal.hide();
        targetModal.find('.input-form').val('');
        targetModal.find('.input-file-box').text('No file chosen');
        $('body').css('overflow', '');
        // $(document).unbind('click', handler);
      };

      let handler = function(e) {
        if ($(e.target).hasClass('modal')) {
          e.stopPropagation();
          closeModal();
        }
      }

      targetModal.css('display', 'flex');
      $('body').css('overflow', 'hidden');
      // $(document).bind('click', handler);

      let closeBtn = targetModal.find('.btn-close');
      closeBtn.one('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        closeModal();
      });
    })
  }
  modalInit('.modal-open');


  function fileInputInit(btn) {
    $(btn).change(function(e) {
      if(e.target.files[0]) {
        let fileName = e.target.files[0].name;
        $(this).siblings('.input-file-box').text(fileName);
      }
    });
  }
  fileInputInit('.input-file-actual');
  
  if($('.header .splide').length) {
    new Splide( '.header .splide', {
      type: 'loop',
      speed: 300,
      perMove: 1,
      arrows: true,
      pagination: false,
      breakpoints: {
        768: {
          arrows: false,
        }
      }
    
    }).mount();
  }
  
});



