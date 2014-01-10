var BarChartVertical = function (data,options) {
		
		 var default_args = {
       		        id		: "canvas",
			axisOrigin 	: [30,25],
			barHeight 	: 100,
			barWidth 	: 30,
			barChartHeight  : 20,
			barChartWidth   : 15,
       		        background	: "#F9F9F9",
       		        
       		        textFromAxisDist: [30, 25],
			scoreFromBarDist: 10,
			key		: 'bar',

			font 		: { family:   'Helvetica'},
			
			greenFill 	: {color:'#42E73A', opacity: 0.8},
			redFill 	: {color:'#f03', opacity: 0.6},
			barStroke 	: {stroke: 'black', width:1.5,linejoin:"round",opacity: 0.7},
			gridStroke	: {width: 1,opacity: 0.6,},
			borderStroke	: {width: 1,dasharray: "5,5", opacity: 0.6},				
			
			axis_prec 	: 25,
       		}
	        for(var index in default_args) {
               		if(typeof options[index] == "undefined")
               		        options[index] = default_args[index];
	        }	
       
	        this.id = options['id'];
	        
		this.data = data;
		this.getValue = options['getValue'];
		
		this.axisOrigin = options['axisOrigin'];
		this.barHeight = options['barHeight'];
		this.barWidth = options['barWidth'];
		this.barChartHeight = options['barChartHeight'];
		this.barChartWidth = options['barChartWidth'];
		this.click = options['click']
	
		this.textFromAxisDist = options['textFromAxisDist'];
		this.scoreFromBarDist = options['scoreFromBarDist'];
		
		
		this.font = options['font'];
		this.greenFill = options['greenFill'];
		this.redFill = options['redFill'];
	
		this.key = options['key'];
		this.barStroke = options['barStroke'];
		this.gridStroke = options['gridStroke'];
		this.borderStroke = options['borderStroke'];
			
		this.axis_prec = options['axis_prec'];
		
		this.numBars = this.data.length;
		
		this.svg = options['svg'] ? options['svg'] : 
			SVG(this.id).size(
				options['Width' ]?options['Width' ]:
				this.barWidth*this.numBars+this.axisOrigin[0]+40,
	     			options['Height']?options['Height']:
	     			this.barHeight+
	     				this.axisOrigin[1]+40);			

		this.drawBar = function(bar, n) {
			bar.chart = {};
			
//			var cY = this.axisOrigin[1]+(this.barHeight)*(n-0.5);
			var cX = this.axisOrigin[0]+(this.barWidth)*(n-0.5);
			var f_enter = function(){ bar.chart.masterHit.animate(1000, '<>', 10).opacity(0.4);};
			var f_leave = function(){ bar.chart.masterHit.animate(1000, '<>', 10).opacity(0);};
						
			bar.chart.masterHit = this.svg.rect( this.barWidth,this.barHeight).opacity(0)
				.y(this.axisOrigin[1]).cx(cX).remember(this.key,bar).mouseenter(f_enter).mouseleave(f_leave);		
				
			bar.chart.red = this.svg.rect(this.barChartWidth, this.barHeight).fill(this.redFill)
				.y(this.axisOrigin[1]).cx(cX).remember(this.key,bar).mouseenter(f_enter).mouseleave(f_leave);
			var greenVal = (bar.value/100)*this.barHeight;
			bar.chart.green = this.svg.rect((this.barChartWidth), greenVal).fill(this.greenFill)
				.y(this.axisOrigin[1]+this.barHeight-greenVal).cx(cX).remember(this.key,bar).mouseenter(f_enter).mouseleave(f_leave);

			this.svg.text(bar.label).font(this.font).y(this.axisOrigin[0] + this.barHeight + this.scoreFromBarDist).cx(cX);
			this.svg.text(bar.value + '%').font(this.font).y(this.axisOrigin[0] + this.textFromAxisDist).cx(cX);
			this.svg.line(this.axisOrigin[0]+this.barWidth*n, 
				      this.axisOrigin[1],
				      this.barWidth*n+this.axisOrigin[0],
				      this.barHeight+this.axisOrigin[1]).stroke(this.borderStroke);
								 
			
			this.svg.polyline([ [cX-this.barChartWidth/2,this.axisOrigin[1]], 
					    [cX-this.barChartWidth/2,this.axisOrigin[1]+this.barHeight],
					    [cX+this.barChartWidth/2,this.axisOrigin[1]+this.barHeight],
					    [cX+this.barChartWidth/2,this.axisOrigin[1]]] ).fill('none').stroke(this.barStroke);
				

			

			if(this.click) {
			        bar.chart.masterHit.click(this.click);
			        bar.chart.red.click(this.click);	
			        bar.chart.green.click(this.click);
			}					    		
		}
		this.drawBars = function() {
			var n = 1;
			for(var index in this.data) {
				var elem = this.data[index];
				this.drawBar(elem, n++);
			}
		}
	
		this.drawGrid = function () {
			var k = (this.barHeight*this.axis_prec)/100;
			for(i=0; i<=this.barHeight; i+= k ) {
				
				this.svg.line(this.axisOrigin[0] ,
					      this.axisOrigin[1]+ i,
					      this.axisOrigin[0] + this.barWidth*this.numBars, 
					      this.axisOrigin[1] + i).stroke(this.gridStroke)
				this.svg.text(""+((i/k)*this.axis_prec)+"%")
					.x(this.barWidth*this.numBars+this.axisOrigin[0]+5)
					.cy(this.axisOrigin[1] + i).font(this.font);
				
					
					
			}
		}
		this.drawAxis = function() {

			this.svg.line(this.axisOrigin[0]+this.barWidth*this.numBars,this.axisOrigin[1],
				      this.axisOrigin[0]+this.barWidth*this.numBars, this.barHeight + this.axisOrigin[1]
				      ).stroke({ width: 1 });
			this.svg.line(this.axisOrigin[0],this.axisOrigin[1]+this.barHeight,
				      this.barWidth*this.numBars+this.axisOrigin[0]+1, this.axisOrigin[1]+this.barHeight).stroke({ width: 1 });
		}
		this.remove = function () {
			$( this.id + " svg" ).remove();
		}
		this.draw = function() {
			this.drawGrid();
			this.drawBars();
			this.drawAxis();
		}
		return this;
	};
