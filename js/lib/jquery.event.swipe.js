// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity
(function(module) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], module);
    } else {
        // Browser globals
        module(jQuery);
    }
})(function(jQuery, undefined) {
    var add = jQuery.event.add,
            remove = jQuery.event.remove,
            // Just sugar, so we can have arguments in the same order as
            // add and remove.
            trigger = function(node, type, data) {
                jQuery.event.trigger(type, data, node);
            },
            settings = {
                // Ratio of distance over target finger must travel to be
                // considered a swipe.
                threshold: 0.4,
                // Faster fingers can travel shorter distances to be considered
                // swipes. 'sensitivity' controls how much. Bigger is shorter.
                sensitivity: 6
            };

    function moveend(e) {
        var w, h, event;

        w = e.currentTarget.offsetWidth;
        h = e.currentTarget.offsetHeight;

        // Copy over some useful properties from the move event
        event = {
            distX: e.distX,
            distY: e.distY,
            velocityX: e.velocityX,
            velocityY: e.velocityY,
            finger: e.finger
        };

        // Find out which of the four directions was swiped
        if (e.distX > e.distY) {
            if (e.distX > -e.distY) {
                if (e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
                    event.type = 'swiperight';
                    trigger(e.currentTarget, event);
                }
            }
            else {
                if (-e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
                    event.type = 'swipeup';
                    trigger(e.currentTarget, event);
                }
            }
        }
        else {
            if (e.distX > -e.distY) {
                if (e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
                    event.type = 'swipedown';
                    trigger(e.currentTarget, event);
                }
            }
            else {
                if (-e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
                    event.type = 'swipeleft';
                    trigger(e.currentTarget, event);
                }
            }
        }
    }

    function getData(node) {
        var data = jQuery.data(node, 'event_swipe');
        if (!data) {
            data = {count: 0};
            jQuery.data(node, 'event_swipe', data);
        }
        return data;
}
            jQuery.event.special.swipe =
            jQuery.event.special.swipeleft =
            jQuery.event.special.swiperight =
            jQuery.event.special.swipeup =
            jQuery.event.special.swipedown = {
                setup: function(data, namespaces, eventHandle) {
                    var data = getData(this);
                    // If another swipe event is already setup, don't setup again.
                    if (data.count++ > 0) {
                        return;
                    }
                    add(this, 'moveend', moveend);
                    return true;
                },
                teardown: function() {
                    var data = getData(this);
                    // If another swipe event is still setup, don't teardown.
                    if (--data.count > 0) {
                        return;
                    }
                    remove(this, 'moveend', moveend);

                    return true;
                },
                settings: settings
            };
});
(function(jQuery, undefined) {
                jQuery(document).ready(function() {
                    var wrap = jQuery('.slides_wrap'),
                            slides = wrap.find('.img_slide'),
                            active = slides.filter('.active'),
                            i = slides.index(active),
                            width = wrap.width();

                    // Listen for swipe events on slides, and use a custom 'activate'
                    // event to add and remove the class 'active' to the previous
                    // or next slide, and to keep the index up-to-date. The class
                    // 'active' uses CSS transitions to make the slide move.

                    slides

                            .on('swipeleft', function(e) {
                                if (i === slides.length - 1) {
                                    return;
                                }
                                slides.eq(i + 1).trigger('activate');
                            })
                            .on('swiperight', function(e) {
                                if (i === 0) {
                                    return;
                                }
                                slides.eq(i - 1).trigger('activate');
                            })

                            .on('activate', function(e) {
                                slides.eq(i).removeClass('active');
                                jQuery(e.target).addClass('active');
                                // Update the active slide index
                                i = slides.index(e.target);
                            })

                            // The code below handles what happens before any swipe event is triggered.
                            // It makes the slides demo on this page work nicely, but really doesn't
                            // have much to do with demonstrating the swipe events themselves. For more
                            // on move events see:
                            //
                            // http://stephband.info/jquery.event.move

                            .on('movestart', function(e) {
                                // If the movestart heads off in a upwards or downwards
                                // direction, prevent it so that the browser scrolls normally.
                                if ((e.distX > e.distY && e.distX < -e.distY) ||
                                        (e.distX < e.distY && e.distX > -e.distY)) {
                                    e.preventDefault();
                                    return;
                                }

                                // To allow the slide to keep step with the finger,
                                // temporarily disable transitions.
                                wrap.addClass('notransition');
                            })

                            .on('move', function(e) {
                                var left = 100 * e.distX / width;
                                // Move slides with the finger
                                if (e.distX < 0) {
                                    if (slides[i + 1]) {
                                        slides[i].style.left = left + '%';
                                        slides[i + 1].style.left = (left + 100) + '%';
                                    }
                                    else {
                                        slides[i].style.left = left / 4 + '%';
                                    }
                                }
                                if (e.distX > 0) {
                                    if (slides[i - 1]) {
                                        slides[i].style.left = left + '%';
                                        slides[i - 1].style.left = (left - 100) + '%';
                                    }
                                    else {
                                        slides[i].style.left = left / 5 + '%';
                                    }
                                }
                            })

                            .on('moveend', function(e) {
                                wrap.removeClass('notransition');
                                slides[i].style.left = '';
                                if (slides[i + 1]) {
                                    slides[i + 1].style.left = '';
                                }
                                if (slides[i - 1]) {
                                    slides[i - 1].style.left = '';
                                }
                            });
                    // Make the buttons work, too. Hijack the id stored in the href and use
                    // it to activate the slide.
                    jQuery(document)
                            .on('click', '.slide_button', function(e) {
                                var href = e.currentTarget.hash;

                                jQuery(href).trigger('activate');

                                e.preventDefault();
                            });
                });
            })(jQuery);
