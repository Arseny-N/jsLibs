var blinkingShadow = function (shadows) {
	var timerId;
		
	function getRandomInt(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	function randomDelay(s) {
		return getRandomInt(s.delay.min,s.delay.max)
	}
	function randomColor(s) {
		return s.colors[getRandomInt(0, s.colors.length-1)];
	}		
			
	function shadowBlink(shadows) {								
		var offsetX = getRandomInt(shadows.offsetX.min,shadows.offsetX.max) + shadows.offsetX.unit;
		var offsetY = getRandomInt(shadows.offsetY.min,shadows.offsetY.max) + shadows.offsetY.unit;

		shadows.element.css(shadows.property, offsetX + ' '+ offsetY + ' '+shadows.blur + ' ' + 
					 randomColor(shadows));	
		timerId = window.setTimeout(shadowBlink, randomDelay(shadows),shadows);
	}

	this.start = function () {		
		timerId = window.setTimeout(shadowBlink, randomDelay(shadows),shadows);
	}

	this.stop = function() {
		window.clearTimeout(timerId);
		shadows.element.css(shadows.property, shadows.oldPropertyValue);
	}
	var constBlink = false;
	this.toggle = function() {		
		if(constBlink) {
			shadows.funcs.stop();
			constBlink = false;
		} else {
			shadows.funcs.start();
			constBlink = true;
		}
	}
	this.bind_mouse = function() {
		shadows.element.mouseenter(this.start);		
		shadows.element.mouseleave(this.stop);
			
		shadows.element.click(this.toggle);
	}
	shadows.funcs = this;
	shadows.oldPropertyValue = shadows.element.css(shadows.property)
	if(shadows.startBlink)
		this.startShadowBlink();
}
		
		

