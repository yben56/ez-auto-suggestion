/*
The MIT License (MIT)

 * Copyright (c) 2016 Benjamin Wong, benjamin-w@hotmail.com
 * https://github.com/yben56/ez-auto-suggestion
 * Dependencies - jquery-3.1.1, Bootstrap v3.3.6

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
	'use strict';
	
	var ezAutoSuggestion = function( selector, href ){
		new init(selector, href).getData().choose().hideList();
	};
		
	var init = function( selector, href ){		
		//property
		this.element = $(selector);
		this.href = href;
		this.inputText = $(selector + " input[type='text']" );
		
		this.inputText.after("<div class='suggestionList'><ul class='list-group'></ul></div>");
		this.list = $(selector + " ul");
		this.choosen = selector + " li";

		return this;
	};
	
	init.prototype.getData = function(){
		var self		= this,
			inputData	= "",
			keyIndex	= 0,
			upDown		= false,
			valid		= false			
		;
		
		var delay = (function(){
			var timer = 0;
			
			return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
			};
		})();

		this.inputText.on('keyup paste', function(e){
			var thisValue = this.value.trim();
			
			delay(function(){
				if (!thisValue) {
					inputData = "";
					self.element.css('overflow','hidden');
				} else {
					if (
						inputData != thisValue && (
							(e.keyCode > 47 && e.keyCode < 58)   || // number keys
							(e.keyCode > 64 && e.keyCode < 91)   || // letter keys
							(e.keyCode > 95 && e.keyCode < 112)  || // numpad keys
							(e.keyCode > 185 && e.keyCode < 193) || // ;=,-./` (in order)
							(e.keyCode > 218 && e.keyCode < 223) || // [\]' (in order)
							e.keyCode == 32						 || // speace key
							e.keyCode == 8							// delete key
						)
					) {
						inputData = thisValue;
		
						$.post(self.href, { search: inputData } ).then(function(fromResolve){
						
							var fromResolve = $.parseJSON(fromResolve);
							
							var data = "";
							for(var i = 0; i < fromResolve.length; i++ ) {
								data += "<li class='list-group-item'>" + fromResolve[i] + "</li>";	
							}
		
							self.list.html(data);
							self.element.css('overflow','visible');
							
						}).catch(function(fromReject){
							console.log(fromReject);
						});
					} else {
						if (e.keyCode == 13) {
							self.element.css('overflow','hidden');
							//can add post
						} else {
							var maxKeyIndex	= self.list.children().length - 1; //detect how many data send back
							
							self.element.css('overflow','visible');
		
							if (e.keyCode === 38) {
								--keyIndex;
								
								if (keyIndex < 0) {
									keyIndex = maxKeyIndex;	
								}
								
								self.list.children().removeClass('hover');
								$(self.list.children()[keyIndex]).addClass('hover');
								
								self.inputText.val( $(self.list.children()[keyIndex]).text() );
								
								upDown = true;
							} else if(e.keyCode === 40) {
								if (upDown == true) { ++keyIndex; }
								
								if (keyIndex > maxKeyIndex) {
									keyIndex = 0;	
								}
								
								self.list.children().removeClass('hover');
								$(self.list.children()[keyIndex]).addClass('hover');
								
								self.inputText.val( $(self.list.children()[keyIndex]).text() );
								
								upDown = true;
							}
						}
					}
				}
			}, 150);
		});
		
		return self;
	};
	
	init.prototype.hideList = function(){
		var self = this;
		
		$(document).on('touchstart click', function (){
			self.element.css('overflow','hidden');
		});
		
		return self;
	};
	
	init.prototype.choose = function(){
		var self = this;
		
		$(document).delegate(this.choosen, 'click', function(e){
			
			var choosen = $(this).text();
			
			self.inputText.val(choosen);
			
			self.element.css('overflow','hidden');
			
			e.stopPropagation();
		});
		
		return self;
	};
	
	window.ezAutoSuggestion = ezAutoSuggestion;
	
})(jQuery);
