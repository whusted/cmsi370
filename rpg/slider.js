$(function() {
  $.fn.slider = function() {
    var LEFT_BUTTON = 1;
    var SLIDER_WIDTH = 500;
    var INCREMENT_BY = SLIDER_WIDTH / 100;
    Slider = {
          // Begin value arbitrarily at 1
          sliderValue: 1,

          setSliderButton: function (jQueryElements) {
            var BUTTON_TEMPLATE = "<div class='slide-button'>" + this.sliderValue + "</div>";
            jQueryElements
              .addClass("slide")
              .css("width", SLIDER_WIDTH + "px")
              .append(BUTTON_TEMPLATE)
              .mousedown(this.trackDrag)
              .mousemove(this.moveSlider);
          },

          trackDrag: function (event) {
            var sliderLeft = $("#slider").offset().left;
            console.log(sliderLeft);
            
            if (event.which === LEFT_BUTTON) {
                // Take note of the current (global) location.
                var deltaX,
                    deltaY,
                    startOffset;

              startOffset = $(".slide-button").offset();
              if (event.target.className === "slide-button") { 
                this.deltaX = event.pageX - startOffset.left;
              } else if (event.target.id === "slider") {
                $(".slide-button").offset({
                  left: event.pageX
                });
                this.sliderValue = Math.floor( ($(".slide-button").offset().left - sliderLeft) / INCREMENT_BY) + 4;
                $(".slide-button").text(this.sliderValue);
              }
                event.stopPropagation();
            }
          },

          withinBounds: function (e, offset) {
            return (e.pageX < offset + SLIDER_WIDTH && e.pageX > offset);
          },

          moveSlider: function (event) {
            this.sliderLeft = $("#slider").offset().left;
            if (event.which === LEFT_BUTTON) {
              // Keep slider button on slider
              console.log(this.sliderLeft);
              if (Slider.withinBounds(event, this.sliderLeft)) {
                $(".slide-button").offset({
                  left: event.pageX - this.deltaX
                });
                this.sliderValue = Math.floor( ($(".slide-button").offset().left - this.sliderLeft) / INCREMENT_BY) + 4;
                $(".slide-button").text(this.sliderValue);
              }
              event.stopPropagation();
            }
          }
            
    }

    Slider.setSliderButton(this);

  };
});