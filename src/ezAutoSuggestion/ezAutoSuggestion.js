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
