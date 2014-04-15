var FORM = {
	options : {
		
	},
	questions : [
		{ 
			ignoreWhenCounting : true,
			text : 	'Тест на туберкулёз, позвлоляет в течении 30 секунд диагностировать туберкулёз.',
			answers : [
				{
					text : 'Начать тест на туберкулёз',
					weight : 0
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
						'func' : 'ip-locate',
						res : [ 
							{ val : 'R-U' ,  weight : 2, text : 'Вы находитесь в России'} 

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
			text : 	'Вам делали манту?',
			answers : [
				{	
					classes : 'success',
					text : 'да',
					input : {	
						text : 'Введите размер вашего манту.',
						type : 'integer',
						range : [0, 20],
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
		
		
		
	]
}
var DynForm = function(form) {
	this.questions = form.questions;
	this.index = 0;

	this.result = 0;
	this.domain = window.location.pathname;
	this.domain = 'file:///home/arseni/Documents/web/temp/dyn-form'
	this.domain = 'http://arseny-n.github.io/jsLibs/dyn-form/'

	self = this;
	this.once = {}
	
	this.t = {}; /* Text */	
	this.t.last = {};
	this.t.last.text = 'Завершить тест и вывести результаты.'
	this.t.last.button = 'Завершить'
	
	this.c = {}; /* Classess */
	this.c.button = 'button small'
	
	this.e = {}; /* Elements */
	this.e.root = $('.dyn-form');
	this.e.question = $('.question-container');
	this.e.buttons = $('.button-container');
	
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
			    console.log(response.ip, response.country);
			    cb(response.country);
			}, "jsonp");
		}
	}
	
}
DynForm.prototype.empty = function() {
	this.e.question.text('');
	this.e.buttons.text('');
	
	this.e.inputs.root.hide();
	this.e.alert.root.hide();
	this.e.inputs.input.val('');

	
}
DynForm.prototype._weight = function(a) {
	console.dir(a)
	return (('weight' in a) ? a['weight'] : 0);
}
DynForm.prototype.alert = function(msg) {
	this.e.alert.msg.html(msg);	
	this.e.alert.root.slideDown().delay(this.e.alert.delay).slideUp();	
}
DynForm.prototype.fill = function(quest) {

	this.e.question.text(quest.text);
	
	for(var i in quest.answers) {
		var a = quest.answers[i];
		var n = $('<a>').addClass(this.c.button);
		if(a.classes) 
			n.addClass(a.classes);
		n.attr({href:'#'})
		n.html(a.text);
		
		(function(n,a,self) { n.click(function(){
			if(a.input) {
				self.e.inputs.root.slideDown();
				self.e.inputs.text.html(a.input.text);
				self.e.inputs.button.click(function(){
					var val = self.e.inputs.input.val();
					if(val < a.input.range[0] || val >= a.input.range[1])  {
						self.alert(a.input.errMsg);
						return;
					}
						
					
					for(var j in a.input.weigth) {
						var w = a.input.weigth[j];
						if(val >= w.range[0] && val <= w.range[1]) {
							self.result += self._weight(w);

							break;			
						} 
							
					}				
					self.next();
				})
					
			} else if(a.run) {

				self.runFuncsLookup[a.run.func](function(country){
				
					if(self.once.run)         /* FIND THAT BUG */
						return;
					self.once.run = true;
					
					var res;
					
					for(var i in a.run.res) 
						if(country == a.run.res[i].val)
							break;
							
				
					if(country == a.run.res[i].val)
						res = a.run.res[i];
					else
						res = a.run.onMatch;
					console.dir(a.run);
					self.result += self._weight(res);	
					
					n.html(a.text2);
					self.e.question.html('<span> ' + res.text.replace('%result', country) + '</span>')
					
				});
				n.click(function(){
					console.log('Here');
					self.next();
				})
												
			} else{
				self.result += self._weight(a);
				self.next();
			}
					
						
		}) }) (n,a,this)
				
		this.e.buttons.append(n);
	}	
}
DynForm.prototype.redirect = function() {
	var sum = 0;
	for(var i in this.questions) {
		var q = this.questions[i];
		for( var m in q.answers) {
			var j = q.answers[m];
			sum += j.weight;
		}
		
	}
	var r = this.result * 100 / sum;
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

	this.fill(this.questions[this.index++])	
}
