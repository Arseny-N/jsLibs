var FORM = {
	options : {
		
	},
	questions : [
		{ 
			ignoreWhenCounting : true,
			text : 	'Тест на туберкулёз, позвлоляет в кратчайшие сроки диагностировать туберкулёз.',
			answers : [
				{
					text : 'Начать тест на туберкулёз',
					weight : 0,
					
				}	
			]
		},
		{ 
			text : 	'В какой стране вы находитесь?',
			answers : [
				{	
					classes : 'warn',
					text : 'Определить',
					text2 : 'Дальше',
					run : {
						func : 'ip-locate',
						res : [ 
							{ val : 'RU' ,  weight : 0, text : 'Вы находитесь в России'} 

						],
						onMatch : {
							weight : 0, text : 'Вы находитесь в %result'
						}

					},				
					weight : 2
				}
			]
		},
		{ 
			text : 	'У вас есть туберкулёз ?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					weight : 1
				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		{ 
			text : 	'Вы чуствуете себя усталым ?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					weight : 1
				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		{ 
			text : 	'У вас есть пропал аппетит ?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					weight : 1
				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		{ 
			text : 	'Вы помните ваш вес?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					passwd : true,
					input : {							
						type : 'integer',
						passwd : true,
						set : 'weight',
						text : 	'Ввебите пожалуйста ваш вес (кг)',
						range : [0, 200],
						errMsg : 'Вес не может быть больше 200кг или меньше 0кг.', 
					},
				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		{ 
			text : 	'Вы помните ваш рост?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					passwd : true,
					input : {							
						type : 'integer',
						
						set : 'height',
						text : 	'Ввебите пожалуйста ваш рост (см)',
						range : [0, 300],
						errMsg : 'Рост не может быть больше 300см или меньше 0см.',					 
					},

				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		{ 
			text : 	'Вы в сотоянии пройти тест на пульмонарную активность?',
			answers : [
				{	
					classes : 'success',
					text : 'да',		
					run : {							
						func : 'timer',
						res : [ 
							{ val : 'green' ,  weight : 0, text : 'У вас хорошие лёгкие.'} ,
							{ val : 'yellow' ,  weight : 0, text : 'Ну так, средненько.'},
							{ val : 'red' ,  weight : 0, text : 'Вы курите ?'}

						],
					},
					weight : 0
				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		{ 
			text : 	'Вам делали манту?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					input : {	
						text : 'Введите размер вашего манту (мм)',
						type : 'integer',
						range : [0, 21],
						errMsg : 'Манту не может быть больше 20 мм. или меньше 0!',
						weigth : [ { range :  [0,  5] , weight : 0 },
	  						   { range :  [5, 10] , weight : 1 },
	  						   { range :  [10,21] , weight : 2 }
						 ]
						 
					},
					weight : 2
				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		{ 
			text : 	'У вас есть возможность узмерить температуру вашего тела ?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					input : {	
						text : 'Введите вашу температуру (градусы Цельсия)',
						type : 'integer',
						range : [30, 40],
						errMsg : 'Температура не может быть больше 40 или меньше 30!',
						weigth : [ { range :  [30, 36] , weight : 0 },
	  						   { range :  [37, 38] , weight : 1 },
	  						   { range :  [39, 40] , weight : 2 }
						 ]
						 
					},
					weight : 2
				},
				{
					classes : 'alert',
					text : 'нет',
					weight : 0
				}	
			]
		},
		
		
		
	]
}
var DynForm = function(form) {
	this.questions = form.questions;
	this.index = 0;

	this.result = 0;
	this.domain = window.location.pathname;
	this.domain = 'file:///home/arseni/Documents/web/temp/dyn-form'
	this.domain = 'http://arseny-n.github.io/jsLibs/dyn-form/'
	
	this.sum = 0;
	for(var i in this.questions) {
		var q = this.questions[i];
		for( var m in q.answers) {
			var j = q.answers[m];
			this.sum += this._weight(j);
		}
		
	}
	
	self = this;
	this.once = {}
	this.once.run = {}
	this.vars = {};	
	
	this.t = {}; /* Text */	
	this.t.last = {};
	this.t.last.text = 'Завершить тест и вывести результаты.'
	this.t.last.button = 'Завершить'
	
	this.c = {}; /* Classess */
	this.c.button = 'button small'
	
	this.e = {}; /* Elements */
	this.e.root = $('.dyn-form');
	this.e.question = $('div.question-container');
	this.e.buttons = $('div.button-container');
	
	this.e.progress = {};
	this.e.progress.container = $('div.progress');
	this.e.progress.meter = $('div.progress span.meter');
	
	this.e.header = {};
	this.e.header.root = $('.header');
	this.e.header.back = $('.header span#back');
	this.e.header.current = $('.header span#current');
	this.e.header.total = $('.header span#total');
	this.e.header.current.text('0');
	this.e.header.total.text(this.questions.length);
	this.e.header.back.click(function(){
		self.prev();
	})
	this.e.header.back.attr({cursor: 'pointer'});
	
	
	this.e.alert = {};
	this.e.alert.delay = 2000;
	this.e.alert.root = $('.alert-container');
	this.e.alert.button = $('.alert-container a');
	this.e.alert.msg = $('.alert-container span');
	this.e.alert.button.click(function(){
		self.e.alert.root.slideUp();
	});
	this.e.inputs = {};
	this.e.inputs.root = $('.input-container');	
	this.e.inputs.text = $('.input-container p');
	this.e.inputs.input = $('.input-container input');
	this.e.inputs.button = $('.input-container a');
	
	this.runFuncsLookup = {
		'ip-locate' : function(cb){
			$.get("http://ipinfo.io", function(response) {
			    cb(response.country);
			}, "jsonp");
		},
		'timer' : function(cb) {

			self.e.question.html('Нажмите на кнопку "начать" и задержите дыхание,'+
					     ' когда больше не сможете задерживать его, то отпустите.  '+'<br> <span id="timer"></span>')
			var span = self.e.question.find('span#timer')
			var begin = self.button('начать', {empty:true}).slideDown();
			var again = self.button('заново');
			var proceed = self.button('дальше');
			var intervalID, interval = 10, elapsed = 0;

			begin.mousedown(function(){
				intervalID = window.setInterval(function(){
					elapsed += interval;
					span.html(elapsed/10);
				},interval);
			});
			begin.mouseup(function(){
				window.clearInterval(intervalID);
				
				begin.hide();
				proceed.show();
				again.show();
			});
			again.click(function(){
				window.clearInterval(intervalID);
				elapsed = 0;
				span.html(elapsed);
				
				begin.show();
				proceed.hide();
				again.hide();
			});
			proceed.click(function(){

				cb(elapsed > 20650  ? 'green'  : 
				   elapsed <= 10650 ? 'red' :  
				   elapsed <= 20650 ? 'yellow' : 'red' )
			})
		}
	}
	
}
DynForm.prototype.empty = function() {
	this.e.question.text('');
	this.e.buttons.text('');
	
	this.e.inputs.root.hide();
	this.e.buttons.show();
	this.e.alert.root.hide();
	this.e.inputs.input.val('');

	
}
DynForm.prototype._weight = function(a) {

	return (('weight' in a) ? a['weight'] : 0);
}
DynForm.prototype.input = function(text,cb, pass, input) {
	var self = this;
	var funcs = {}
	
	funcs.integer = function(val) {			
		if(val < input.range[0] || val >= input.range[1])  {
			self.alert(input.errMsg);
			console.error(input.errMsg)
			return true;
		}
						
		if(input.set) {
				self.vars[input.set] = val;
		} else {
			for(var j in input.weigth) {
				var w = input.weigth[j];
				if(val >= w.range[0] && val <= w.range[1]) {
					self.result += self._weight(w);
					break;			
				} 
								
			}				
		}
		return false;
	}
	if(typeof cb == 'string') 
		cb = funcs[cb];
	
	this.e.inputs.root.slideDown();
	this.e.buttons.hide();
	if (text)
		this.e.inputs.text.html(text);
		
	this.e.inputs.button.unbind('click');
	
	this.e.inputs.button.click(function(){
		console.log('simple');
		if(cb(self.e.inputs.input.val()))
			return;
	
		self.next();
		
	});
	
	if(pass) {
		this.e.inputs.input.attr('type', 'password');
		this.e.inputs.button.unbind('click');
		this.e.inputs.button.click(function(){
			var v = self.e.inputs.input.val('');
			self.e.inputs.input.attr('type', 'text');
			console.log('password');
			if( cb(v) )
				return;

			self.next();

		});
	}
	return this.e.inputs.root;
}
DynForm.prototype.alert = function(msg, nohide) {
	this.e.alert.msg.html(msg);	
	console.log('------------>' + nohide)
	if(nohide)
		this.e.alert.root.slideDown();	
	else
		this.e.alert.root.slideDown().delay(this.e.alert.delay).slideUp()
	return this.e.alert.root;
}
DynForm.prototype.button = function(text, o) {

	var n = $('<a>').addClass(this.c.button);
	if( o == undefined)
		o = {};
	if(o.classes) 
		n.addClass(o.classes);
	if(o.attrs) 
		n.attr(o.attrs)
	n.html(text);
	n.hide();
	if(o.empty) {

		this.e.buttons.text('');
	}
	
	this.e.buttons.append(n);
	return n;
}
DynForm.prototype.fill = function(quest) {

	this.e.question.html(quest.text);
	
	for(var i in quest.answers) {
		var a = quest.answers[i];
		var n = this.button(a.text, {classes:a.classes});
		
		(function(n,a,self) { n.click(function(){
			if(a.input) {
				self.e.inputs.text.html();
				self.input(a.input.text,a.input.type, a.input.passwd, a.input)
					
			} else if(a.run) {

				self.runFuncsLookup[a.run.func](function(country){

					if(self.once.run[a.run.func])         /* FIND THAT BUG */
						return;
					self.once.run[a.run.func] = true;
					
					var res;
					
					for(var i in a.run.res) 
						if(country == a.run.res[i].val)
							break;
							
				
					if(country == a.run.res[i].val)
						res = a.run.res[i];
					else
						res = a.run.onMatch;

					self.result += self._weight(res);	
					
					if(a.text2) {
						n.html(a.text2);
						self.e.question.html('<span> ' + res.text.replace('%result', country) + '</span>')
					} else {
						n.click()
					}
					
				});
				n.click(function(){

					self.next();
				})
												
			} else {
				self.result += self._weight(a);
				self.next();
			}
					
						
		}) }) (n,a,this)
				
		n.show();
	}	
}
DynForm.prototype.progress = function(p) {
	this.e.progress.meter.animate({width:p+'%'});
	return 	this.e.progress.container;
}
DynForm.prototype.redirect = function() {
	
	var r = this.result * 100 / this.sum;
	console.log('-->'+this.sum);
	var href = this.domain + '/show-result.html?result=' + Math.round(r);
	window.location.href = href;
	
	var n = $('<a>').addClass(this.c.button);
	n.attr({'href':href});
	n.html(this.t.last.button);
	this.e.buttons.append(n);
	this.e.question.text(this.t.last.text);
}
DynForm.prototype.next = function() {
	this.empty();
	if(this.index >= this.questions.length) {
		this.redirect();
		return;
	}

	 	
	this.fill(this.questions[this.index])	
	this.e.header.current.text(this.index);
	
	var p = this.progress(100 * this.index / this.questions.length)
	this.index++;
}

DynForm.prototype.prev = function() {
	this.empty();
	this.index --;
	var p =	this.progress(100 * this.index / this.questions.length);
	if(this.index < 0) 
		this.index++;

	
	
	this.fill(this.questions[this.index]);
	this.e.header.current.text(this.index);
	

}
