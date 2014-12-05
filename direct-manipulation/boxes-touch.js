$(function() {
    var boxCache = {};
    window.BoxesTouch = {
        /**
         * Sets up the given jQuery collection as the drawing area(s).
         */
        setDrawingArea: function (jQueryElements) {
            // Set up any pre-existing box elements for touch behavior.
            jQueryElements
                .addClass("drawing-area")
                
                // Event handler setup must be low-level because jQuery
                // doesn't relay touch-specific event properties.
                .each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMake, false)
                    element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                    element.addEventListener("touchend", BoxesTouch.endDrag, false);
                })

                .find("div.box").each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });
        },

        startMake: function (event) {
            $.each(event.changedTouches, function(index, touch) {
                var boxTemplate = '<div class="box"></div>';
                var cacheEnter = {};
                boxCache[touch.identifier] = cacheEnter;

                cacheEnter.initialX = touch.pageX;
                cacheEnter.initialY = touch.pageY;

                var createdBox = $(boxTemplate).css({
                        width: "0px",
                        height: "0px",
                        left: touch.pageX + "px",
                        top: touch.pageY + "px"
                    });
                $("#drawing-area").append(createdBox);
                cacheEnter.creation = $("div div:last-child");
                $("#drawing-area").find("div.box").each(function (index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                });
            });
            event.stopPropagation();
        },

        /**
         * Tracks a box as it is rubberbanded or moved across the drawing area.
         */
        trackDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {

                // Dimensions and details of box
                if (touch.target.movingBox) {
                    var parentOfBox = $(touch.target.movingBox).parent(),
                        parentWidth = parentOfBox.width(),
                        parentHeight = parentOfBox.height();
                        parentLeft = parentOfBox.offset().left,
                        parentTop = parentOfBox.offset().top,
                        parentRight = parentLeft + parentWidth,
                        parentBottom = parentTop + parentHeight;
                    
                    // Reposition the object.
                    touch.target.movingBox.offset({
                        left: touch.pageX - touch.target.deltaX,
                        top: touch.pageY - touch.target.deltaY
                    });

                    // Check if outside drawing area and should be deleted
                    var newX = touch.pageX - touch.target.deltaX;
                    var newY = touch.pageY - touch.target.deltaY;

                    if (newX > parentRight || newX < parentLeft || newY > parentBottom || newY < parentTop) {
                        touch.target.movingBox.addClass("delete-highlight");
                        touch.target.movingBox.addClass("shake");
                    }
                    
                    // Check if came back into drawing area
                    if (newX <= parentRight && newY <= parentBottom && newX >= parentLeft && newY >= parentTop) {
                        touch.target.movingBox.removeClass("delete-highlight");
                        touch.target.movingBox.removeClass("shake");
                    }
                    
                }


                var calculateY = function () {
                    if (touch.pageY < cacheEnter.initialY) {
                        createTop = touch.pageY;
                        createHeight = cacheEnter.initialY - touch.pageY;
                    } else {
                        createTop = cacheEnter.initialY;
                        createHeight = touch.pageY - cacheEnter.initialY;
                    }
                }

                var cacheEnter = boxCache[touch.identifier];
                if (cacheEnter && cacheEnter.creation) {
                    var createLeft, createTop, createWidth, createHeight;

                    if (touch.pageX < cacheEnter.initialX) {
                        createLeft = touch.pageX;
                        createWidth = cacheEnter.initialX - touch.pageX;
                        calculateY();
                    } else {
                        createLeft = cacheEnter.initialX;
                        createWidth = touch.pageX - cacheEnter.initialX;
                        calculateY();
                    }

                    cacheEnter.creation
                        .offset({
                            left: createLeft,
                            top: createTop
                        })
                        .width(createWidth)
                        .height(createHeight);
                }
            });
            
            // Don't do any touch scrolling.
            event.preventDefault();
        },

        /**
         * Concludes a drawing or moving sequence.
         */
        endDrag: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                if (touch.target.movingBox) {
                    // Change state to "not-moving-anything" by clearing out
                    // touch.target.movingBox.
                    touch.target.movingBox = null;
                }

                // Arbitrary minimum widths and heights for box creation
                var minHeight = 25;
                var minWidth = 25;

                var cacheEnter = boxCache[touch.identifier];
                if (cacheEnter && cacheEnter.creation) {
                    var $creation = $(cacheEnter.creation);
                    if ($creation.height() < minHeight ||  $creation.width() < minWidth) {
                        $creation.remove();
                    }
                }
            });
        },

        /**
         * Indicates that an element is unhighlighted.
         */
        unhighlight: function () {
            $(this).removeClass("box-highlight");
            if ($(this).hasClass("delete-highlight")) {
                $(this).remove();
            }
        },

        /**
         * Begins a box move sequence.
         */
        startMove: function (event) {
            $.each(event.changedTouches, function (index, touch) {
                // Highlight the element.
                $(touch.target).addClass("box-highlight");

                // Take note of the box's current (global) location.
                var jThis = $(touch.target),
                    startOffset = jThis.offset();

                // Set the drawing area's state to indicate that it is
                // in the middle of a move.
                touch.target.movingBox = jThis;
                touch.target.deltaX = touch.pageX - startOffset.left;
                touch.target.deltaY = touch.pageY - startOffset.top;
            });

            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
        }

    };
});