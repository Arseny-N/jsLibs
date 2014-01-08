$(function () {

	
 	$(window).stellar();
 	function getRandomInt(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	function randomColor() {
			var colors = ['#f06', '#f22'];
			return colors[getRandomInt(0, colors.length-1)];
			
	}
	function draw_text_logo(options) {
		function validate(o, elem,def) {
			return o && o[elem] ? o[elem]: def;
		}
		this.stop_blink = function () {			
			window.clearTimeout(this.timerId);
			this.circle.stroke(this.logo_stroke);
			this.text.font(this.logo_font);
			
		}
		this.toggle_blink = function () {
			if(this.const_blinking) {
				this.stop_blink();
				this.const_blinking = false;
			} else { 
			
				this.blink();
				this.const_blinking = true;
			}
		}
		
		this.blink = function () {
			this.circle.stroke({color:this.colors[getRandomInt(0, this.colors.length-1)]});
			this.text.font({fill:this.colors[getRandomInt(0, this.colors.length-1)]});
			
			this.timerId = window.setTimeout(this.blink, getRandomInt(this.minDelay, this.maxDelay));
		}
		
		this.blink = this.blink.bind(this);
		this.stop_blink = this.stop_blink.bind(this);
		this.toggle_blink = this.toggle_blink.bind(this);
		
		this.minDelay = validate(options, 'minDelay', 30);
		this.maxDelay = validate(options, 'maxDelay', 40);
		this.const_blinking = false;

	 	this.logo = $('#logo');
		this.height = logo.height();
		this.width = logo.width();		
		this.colors = validate(options, 'colors', ['#f00','#0f0'])
		this.logo_draw = SVG("logo").size("100%","100%");
		this.logo_stroke = { color: validate(options,"stroke","#1f6"),  width: 20 };
		this.logo_font = {fill: validate(options,"fill","#1f6"), size:  Math.min(width, height)-logo_stroke.width-60,
		 anchor:   'middle', leading:  '1em'
		 };
	 	

		
		this.circle = logo_draw.circle(Math.min(width,height)-logo_stroke.width)
				.center(width/2, height/2).stroke(logo_stroke);
		this.text = logo_draw.text(validate(options,"text",'霎')).font(logo_font).center(logo.width()/2, logo.height()/2);
		
		this.logo_draw.mouseenter(this.blink);
		this.logo_draw.mouseleave(this.stop_blink);
		this.logo_draw.click(this.toggle_blink)
		
	}
	var color = randomColor();
	draw_text_logo({
		   colors: ['#f46',  '#1f6', '#16f', '#f92'],
		   fill:color,
		   stroke:color,
		   text: '霎'
	});	
	
	var links = $('.navigation').find('li')
	slide = $('.slide');
	button = $('.button');
	mywindow = $(window);
	htmlbody = $('html,body');

	var stripe = new  followShadow( { element: $("#stripe #stripe-text").eq(0),invertX: true, invertY: true, 
					offX : {min:-1.01,max: 1.01, unit: 'px'},
					offY : {min:-1.01,max: 1.01, unit: 'px'},
					layers: [
						{depth: 1, blur: '0px', color: '#999' },
						{depth: 0.9, blur: '0px', color: '#999' },
						{depth: 0.8, blur: '0px', color: '#999' },
						{depth: 0.7, blur: '0px', color: '#999' },
						{depth: 0.6, blur: '0px', color: '#999' },
						{depth: 0.5, blur: '0px', color: '#999' },
						{depth: 0.4, blur: '0px', color: '#999' },
						{depth: 0.3, blur: '0px', color: '#999' },
						{depth: 0.2, blur: '0px', color: '#999' },
						{depth: 0.1, blur: '19px', color: '#999' },

					]}).enable();
	function goToByScroll(dataslide) {
	        htmlbody.animate({scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top}, 2000, 'easeInOutQuint');
	}

	button.click(function (e) {
        	e.preventDefault();
        	dataslide = $(this).attr('data-slide');
        	goToByScroll(dataslide);

	});
	
	$( ".group-list-entry" ).on( "click",  function(){$(this).find('.member-info').toggle('slow'	)});
});
