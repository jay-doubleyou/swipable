swipable
========

Let any DOM element trigger a swipe(left|right|up|down) event.

Dependencies
------------
* none

Events
------
* swipe
* swipeleft
* swiperight
* swipeup
* swipedown

The generic **swipe** event is triggered always, it holds the swipe direction with in the detail property of the event.


Usage
-----

Include the swipable.js script:

```
    <script src="swipable.js"></script>

    <style type="text/css">
    	#slider {
        	background-color: #999999;
        }
    </style>

    <div id="slider">swipe here</div>
    
    <script type="text/javascript">

        var slider = new Swipable(document.getElementById('slider'));

        slider.addEventListener('swiperight', function() {
           console.log('swiped right');
        }, false);

        slider.addEventListener('swipeleft', function() {
           console.log('swiped left');
        }, false);    
        
        slider.addEventListener('swipeup', function() {
           console.log('swiped up');
        }, false);        
        
        slider.addEventListener('swipedown', function() {
           console.log('swiped down');
        }, false);
        
        slider.addEventListener('swipe', function(event) {
           console.log('swiped to the ', e.detail.direction);
        }, false);        
        
    </script>
```

swipeable.js is distributed under the [MIT License](http://opensource.org/licenses/MIT).
