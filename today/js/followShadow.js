var followShadow = function (options) {
	var MAGIC_NUMBER = 30;
		
	this.offX = options.sqOff ? {min:options.sqOff.min,max:options.sqOff.max,unit:options.sqOff.unit } : 
			    (options.offX ||  {min:-0.9,max: 0.9, unit: 'px'});
	this.offY = options.sqOff ? {min:options.sqOff.min,max:options.sqOff.max,unit:options.sqOff.unit } : 
			    (options.offY ||  {min:-0.9,max: 0.9, unit: 'px'});

	this.element = options.element || $('#dynShadows');
	this.blur = options.blur || '2px';
	this.color = options.color || '#111';
	this.property = options.property || 'text-shadow';
	this.invertX = options.invertX ? -1 : 1;
	this.invertY = options.invertY ? -1 : 1;
	this.inset = options.inset ? 'inset' : ' ';
	this.layers = options.layers;			
	this.updateDimensions = function() {
		this.ww = window.innerWidth;
		this.wh = window.innerHeight;
		
		this.hw = this.ww / 2;
		this.hh = this.wh / 2;
	};
	function limit(val, min, max) {
		return Math.floor(val*(max-min+1)+min);
	};
	this.updateShadow = function(x, y) {
		var string = new String();
		for(var i in this.layers) {
			var layer = this.layers[i];
			if(string.length) string += ' , ';
			string += (layer.depth * this.invertX * limit(x, this.offX.min, this.offX.max)) + this.offX.unit + ' ' +
				  (layer.depth * this.invertY * limit(y, this.offY.min, this.offY.max)) + this.offY.unit + ' ' +
				   layer.blur + ' ' +layer.color+' '+this.inset ;
		}
		
		this.element.css(this.property, string);
	};
	this.onMouseMove = function (event) {
		this.ix = (event.pageX - this.hw) / this.hw;
		this.iy = (event.pageY - this.hh) / this.hh;
		this.updateShadow(this.ix, this.iy);
	}
	this.onDeviceOrientation = function(event) {
		if (!this.desktop && event.beta !== null && event.gamma !== null) {

			this.orientationStatus = 1;

			var x = (event.beta  || 0) / MAGIC_NUMBER; //  -90 :: 90
			var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

			this.ix = x;
			this.iy = y;
		}
	}
			
	this.enable = function () {
		this.updateDimensions();
        	window.addEventListener('mousemove', this.onMouseMove);
	}
	this.disable = function () {
	       	window.removeEventListener('mousemove',this.onMouseMove);
	}
		        
	this.onMouseMove = this.onMouseMove.bind(this);
	this.onDeviceOrientation = this.onDeviceOrientation.bind(this);		        		        
        return this;
}
