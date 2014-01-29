var BarChartOne = function (data,options) {
	var default_args = {
     		elem : undefined,
     		fill :{color:'#009', opacity: 0.9},
     		stroke :{width:9, color:'#00f', opacity: 0.8},
     		fill_bg :{color:'#009', opacity: 0.3},
     		font : {family:   'Helvetica', size:     '0.5em'}
     		
	}
        for(var index in default_args) {
		if(typeof options[index] == "undefined")
		        options[index] = default_args[index];
        }	
	this.elem = options['elem'];
	this.fill = options['fill'];
	this.click = options['click'];
	this.font = options['font'];
	this.stroke = options['stroke'];
	this.fill_bg = options['fill_bg'];
	console.dir(this.elem);
	this.draw = SVG(this.elem.get(0)).size('102%','100%');

	this.height = this.elem.height();
	this.width = this.elem.width();
	
	console.dir(this.draw)
	this.drawBar = function(data) {

		this.draw.rect( this.width,this.height).fill(this.fill_bg).move(0,0).click(this.click);
		this.draw.rect( this.width,this.height*data.percent).fill(this.fill).x(0).y(this.height*(1-data.percent)+1).click(this.click);
		//this.draw.text(''+(data.percent*100)+'%').cx(this.width/2).y(this.height*data.percent).font(this.font)
		//this.draw.line(0,this.height-20,this.height-2, this.width ).stroke({ width: 1 });
		
	}
	this.drawBar(data);

	return this;
};
var BarChartOneDiv = function (data,options) {
	var default_args = {
     		elem : undefined,
     		fill :{color:'#009', opacity: 0.9},
     		stroke :{width:9, color:'#00f', opacity: 0.8},
     		fill_bg :{color:'#009', opacity: 0.3},
     		font : {family:   'Helvetica', size:     '0.5em'}
     		
	}
        for(var index in default_args) {
		if(typeof options[index] == "undefined")
		        options[index] = default_args[index];
        }	
	this.elem = options['elem'];
	this.fill = options['fill'];
	this.click = options['click'];
	this.font = options['font'];
	this.stroke = options['stroke'];
	this.fill_bg = options['fill_bg'];
	console.dir(this.elem);

	this.height = this.elem.height();
	this.width = this.elem.width();
	

	this.drawBar = function(data) {

		//this.draw.text(''+(data.percent*100)+'%').cx(this.width/2).y(this.height*data.percent).font(this.font)
		//this.draw.line(0,this.height-20,this.height-2, this.width ).stroke({ width: 1 });
		
	}
	this.drawBar(data);

	return this;
};
