(function( $ ) {
  $.fn.handleimage = function(options) {


    var settings = $.extend({
      'expand':       24,
      'offComp':      12,
      'image':        this,
      'cursor':       'move'
    }, options );

    settings.offComp = Math.floor(settings.expand / 2);
    settings.expand = settings.offComp * 2;


    this.on('mouseenter', settings.image, function(event) {
      $(this).css('cursor', settings.cursor);
    
    }).on('mousedown', settings.image, function(event) {
      var pOffset = $(this).offset();
      var element_x = event.pageX - pOffset.left;
      var element_y = event.pageY - pOffset.top;

      $(this).addClass('draggable').parents().on('mousemove', function(event) {
        $('.draggable').offset({
          top: event.pageY - element_y,
          left: event.pageX - element_x
        }).on('mouseup', function() {
            $(this).removeClass('draggable');
          });
        });

      event.preventDefault();

    }).on('mouseup', function() {
      $('.draggable').removeClass('draggable');

    }).on('mousewheel', settings.image, function(event) {

      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      
      var pOffset = $(this).offset();
      var clickOffset = {
                      'top':  event.pageY,
                      'left': event.pageX
                    };

      if(event.deltaY == 1) {
        $(this).width('+=' + settings.expand ).height('+=' + settings.expand );
        $(this).offset({
          'left':  pOffset.left - settings.offComp,
          'top':  pOffset.top - settings.offComp
        });

      } else {
        $(this).width('-=' + settings.expand ).height('-=' + settings.expand );
        $(this).offset({
          'left':  pOffset.left + settings.offComp,
          'top':  pOffset.top + settings.offComp
        });
      }

      /*
      var y_off = pageY - $(this).offset().top;
      var x_off = event.pageX - $(this).offset().left;
      
      var img_h = $(this).height() / 2;
      var img_w = $(this).width() / 2;

      console.log('Clicked:\n\tTop: ' + event.pageY + '\n\tLeft: ' + event.pageX);
      console.log('Image:\n\tTop: ' + $(this).offset().top + '\n\tLeft: ' + $(this).offset().left);
      
      console.log('Image Offset:\n\tTop: ' + (event.pageY - $(this).offset().top) + '\n\tLeft: ' + (event.pageX - $(this).offset().left) );
      console.log('Image Dimensions: Height: ' + img_h + ' Width: ' + img_w );
      */
    
    });

  };

}( jQuery ));
