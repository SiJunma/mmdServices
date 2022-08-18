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
  
});

