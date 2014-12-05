$(function() {
    var LEFT_BUTTON = 1;
    var SLIDER_WIDTH = 450;
  window.Slider = {

        setSliderButton: function (jQueryElements) {
          var BUTTON_TEMPLATE = "<div class='slide-button' id='slide-button'></div>";
          jQueryElements
            .addClass("slide")
            .css("width", SLIDER_WIDTH + "px")
            .append(BUTTON_TEMPLATE)
            .mousedown(this.trackDrag)
            .mousemove(this.moveSlider)
            
            // We conclude drawing on either a mouseup or a mouseleave.
            .mouseup(this.endDrag);
        },

        trackDrag: function (event) {
          if (event.which === LEFT_BUTTON) {
              // Take note of the box's current (global) location.
              var deltaX,
                  deltaY,
                  startOffset;
              if (event.target.id === "slide-button") {
                startOffset = $("#slide-button").offset();
                this.deltaX = event.pageX - startOffset.left;
                // Eat up the event so that the drawing area does not
                // deal with it.
                event.stopPropagation();

              }
              
          }
        },

        endDrag: function (event) {
          console.log("Done dragging");
        },

        moveSlider: function (event) {
          var sliderLeft = $("#slider").offset().left;
          if (event.which === LEFT_BUTTON) {
            // Keep slider button on slider
            if (event.pageX < sliderLeft + SLIDER_WIDTH && event.pageX > sliderLeft) {
              $("#slide-button").offset({
                left: event.pageX - this.deltaX
              });
            }
          }
        }
          
	}

});