$(function() {
    var LEFT_BUTTON = 1;
  window.Slider = {

        setSliderButton: function (jQueryElements) {
          var BUTTON_TEMPLATE = "<div class='slide-button' id='slide-button'></div>";
          jQueryElements
            .addClass("slide")
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
                  $("#slider").mousemove(this.moveSlider);
                  startOffset = $("#slide-button").offset();
                  this.deltaX = event.pageX - startOffset.left;
                  this.deltaY = event.pageY - startOffset.top;
                  console.log(deltaX);
                  console.log(deltaY);

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
          console.log("moving");
          $("#slide-button").offset({
            left: event.pageX - this.deltaX
          });
          // We only move using the left mouse button.
        }
          
	}

});