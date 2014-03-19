swipable
========

Let any DOM element trigger a swipe(left|right|up|down) event.

Dependencies
------------
* none

Events
------

* swipeleft
* swiperight
* swipeup
* swipedown


Usage
-----

Include the swipable.js script:

```
    <script src="swipable.js"></script>

    <div id="slider">
        <ul>
            <li>...</li>
            ...
        </ul>
    </div>
    
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
        
    </script>
```
