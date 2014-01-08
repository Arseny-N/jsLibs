var BarChart = function (data,options) {
		
		 var default_args = {
       		        id		: "canvas",
			axisOrigin 	: [30,30],
			barHeight 	: 50,
			barWidth 	: 300,
			barChartHeight  : 20,
       		        background	: "#F9F9F9",
       		        
       		        textFromAxisDist: [30, 25],
			scoreFromBarDist: 10,
			key		: 'bar',

			font 		: { family:   'Helvetica', size:     14},
			
			greenFill 	: {color:'#42E73A', opacity: 0.8},
			redFill 	: {color:'#f03', opacity: 0.6},
			barStroke 	: {stroke: 'black', width:2,linejoin:"round",opacity: 0.7},
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
		this.click = options['click']
		console.dir(this.click);
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
				this.barWidth+this.axisOrigin[0]+40,
	     			options['Height']?options['Height']:
	     			this.barHeight*this.numBars+
	     				this.axisOrigin[1]+40);			

		this.drawBar = function(bar, n) {
			bar.chart = {};
			
			
			/* Drawing */
			
			bar.chart.masterHit = this.svg.rect(this.barWidth, this.barHeight).opacity(0);
						
			bar.chart.red = this.svg.rect(this.barWidth, this.barChartHeight);
			bar.chart.red.fill(this.redFill);				
			bar.chart.green = this.svg.rect((bar.value/100)*(this.barWidth), this.barChartHeight);
			bar.chart.green.fill(this.greenFill);//.data('bar', bar);

		


			bar.chart.label = this.svg.text(bar.label).font(this.font);
			bar.chart.valueString = this.svg.text(bar.value + '%').font(this.font);
			bar.chart.border = this.svg.line(this.axisOrigin[0],
							 this.barHeight*n+this.axisOrigin[1],
							 this.axisOrigin[0]+this.barWidth, 
								 (this.barHeight)*n+this.axisOrigin[1]).stroke(this.borderStroke);
								 
				/* Addin extra functionability */
				

				/* Positioning */
			bar.chart.masterHit.x(this.axisOrigin[0]);				
			bar.chart.green.x(this.axisOrigin[0]);
			bar.chart.label.x(this.axisOrigin[0] - this.textFromAxisDist[0]);
			bar.chart.red.x(this.axisOrigin[0]);
 			bar.chart.valueString.x(this.axisOrigin[0] + this.barWidth + this.scoreFromBarDist);
 				
			var cY = this.axisOrigin[1]+(this.barHeight)*(n-0.5);
			bar.chart.masterHit.cy(cY);;
			bar.chart.red.cy(cY);
			bar.chart.green.cy(cY);
			bar.chart.label.cy(cY);
			bar.chart.valueString.cy(cY);
			bar.chart.barStroke = this.svg.polyline([ [this.axisOrigin[0],cY-this.barChartHeight/2], 
								       [this.axisOrigin[0]+this.barWidth,cY-this.barChartHeight/2],
								       [this.axisOrigin[0]+this.barWidth,cY+this.barChartHeight/2],
								       [this.axisOrigin[0],cY+this.barChartHeight/2]] ).
								       fill('none').stroke(this.barStroke);
				
			var f_enter = function(){ bar.chart.masterHit.animate(1000, '<>', 10).opacity(0.4);};
			var f_leave = function(){ bar.chart.masterHit.animate(1000, '<>', 10).opacity(0);};
			
			bar.chart.masterHit.mouseenter(f_enter);	
			bar.chart.masterHit.mouseleave(f_leave);
			if(this.click)		
			        bar.chart.masterHit.click(this.click);
					        	
			bar.chart.red.mouseenter(f_enter);	
			bar.chart.red.mouseleave(f_leave);
			if(this.click)	
			        bar.chart.red.click(this.click);	
							        
			bar.chart.green.mouseenter(f_enter);	
			bar.chart.green.mouseleave(f_leave);	
			if(this.click)	
			        bar.chart.green.click(this.click);					
			
			
			
						       
			bar.chart.masterHit.remember(this.key,bar);
			bar.chart.red.remember(this.key,bar);
			bar.chart.green.remember(this.key,bar);
			
			}
			this.drawBars = function() {
				var n = 1;
				for(var index in this.data) {
					var elem = this.data[index];
					this.drawBar(elem, n++);
				}
			}
	
			this.drawGrid = function () {
				var k = (this.barWidth*this.axis_prec)/100;
				for(i=0; i<=this.barWidth; i+= k ) {
					this.svg.line(this.axisOrigin[0] + i,
						      this.axisOrigin[1],
						      this.axisOrigin[0] + i, 
						      this.barHeight*this.numBars + this.axisOrigin[1] 
						      ).stroke(this.gridStroke)
					this.svg.text(""+((i/k)*this.axis_prec)+"%")
						.y(this.axisOrigin[1]-this.textFromAxisDist[1])
						.cx(this.axisOrigin[0] + i).font(this.font);
					
					
					
				}
			}
			this.drawAxis = function() {
				this.svg.line(this.axisOrigin[0],this.axisOrigin[1],
					      this.axisOrigin[0], this.barHeight*this.numBars + this.axisOrigin[1]+12 
					      ).stroke({ width: 1 });
				this.svg.line(this.axisOrigin[0],this.axisOrigin[1],
					      this.barWidth+this.axisOrigin[0]+12, this.axisOrigin[1]).stroke({ width: 1 });
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
