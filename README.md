Ez Auto Suggestion JS Plugin
==============================

##Demo
[DEMO](http://okprinting.com.au/EzAutoSuggestion/index.php)

##Dependencies
jquery-3.1.1 & Bootstrap v3.3.6

##Usage
Create a div and wrap input text insdie it. (For user easy to move input text around, I decided not use to javascript to created div wrapper around).

```html
<script type="text/javascript" src="src/ezAutoSuggestion/ezAutoSuggestion.js"></script>
<link rel="stylesheet" href="src/ezAutoSuggestion/ezAutoSuggestion.css" />

<div id="mySuggestion" class="ezAutoSuggestion"><input type="text" /></div>
```

Add wrapper class into bday function. (Make sure you add window.onload or jQuery $(document).ready or add javascript under html elements)

```javascript
window.onload = function(){
	ezAutoSuggestion('#mySuggestion', 'data.php'); //wrapper id, backend post file
};
```

##License
This work is licensed under a [MIT License](http://opensource.org/licenses/MIT).

##Author
This Javascript plugin was written by Benjamin Wong benjamin-w@hotmail.com
