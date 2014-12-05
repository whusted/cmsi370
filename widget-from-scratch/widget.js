$(function() {
  window.Slider = {
        setSliderButton: function (jQueryElements) {
          var BUTTON_TEMPLATE = "<div class='slide-button' id='slide-button'></div>";
          jQueryElements
            .addClass("slide")
            .append(BUTTON_TEMPLATE)
            .mousedown(this.trackDrag)
            
            // We conclude drawing on either a mouseup or a mouseleave.
            .mouseup(this.endDrag)
            .mouseleave(this.endDrag);
        },

        trackDrag: function (event) {
          
        }
	}

});