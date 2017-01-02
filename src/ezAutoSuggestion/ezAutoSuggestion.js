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
		return new init(selector, href);
	};
	
	var defaults = function(){
		//Default property
		this.wraper = $(".ezAutoSuggestion");
		this.suggestionList = "<div class='suggestionList'><ul class='list-group'></ul></div>";	
	};
	
	var init = function( selector, href ){
	
		defaults.call(this);
		
		//property
		this.element = $(selector);
		this.href = href;
		this.inputText = $(selector + " input[type='text']" );
		this.inputText.after(this.suggestionList);
		this.list = $(selector + " ul");
		this.choosen = selector + " li";
			
		//method	
		this.getDatas();
		this.hideList();	
		this.choose();	
	};

	init.prototype.getDatas = function(){
		var self = this;

		this.inputText.on('keyup', function(){
			if (!this.value) {
				self.element.css('overflow','hidden');
			} else {

				var inputData = this.value;
				
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
			}
		});
	};
	
	init.prototype.choose = function(){
		var self = this;
		
		$(document).delegate(this.choosen, 'click', function(e){
			
			var choosen = $(this).text();
			
			self.inputText.val(choosen);
			
			self.element.css('overflow','hidden');
			
			e.stopPropagation();
		});

		
	};
	
	init.prototype.hideList = function(){
		var self = this;

		$(document).on('touchstart click', function (){
			self.element.css('overflow','hidden');
		});
	};
	
	window.ezAutoSuggestion = ezAutoSuggestion;
	
})(jQuery);