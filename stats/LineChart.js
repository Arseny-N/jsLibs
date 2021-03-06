var LineChart = function (data,options) {
			
			 var default_args = {
        		        id		: "canvas",
				axisOrigin 	: [10,10],
				barHeight 	: 100,
				barWidth 	: 350,
				barChartHeight  : 20,
        		        background	: "#F9F9F9",
				key		: "stats",        		        
        		        textFromAxisDist: [90, 40],
				scoreFromBarDist: 10,
			
				pointSize 	: 10,
				pointSizeInc 	: 15,
				pointHitSize 	: 50,
			
				font 		: { family:   'Helvetica', size:     12},
			//	ylabels		: ["text1","text2","text3"],

				barStroke 	: {stroke: 'black', width:2,linejoin:"round",opacity: 0.7},
				
				gridStroke	: {width: 1,opacity: 0.6,},
				boldGridStroke	: {width: 1,opacity: 0.9,},
				yGridStroke	: {width: 1,dasharray: "2.5,2.5", opacity: 0.6},
				yGridHitStroke	: {width: 15},
				yGridLowerStroke: {width: 2},
				chartColor	: '#0b61a4',
				chartTabs	: 20,
        		}
		        for(var index in default_args) {
                		if(typeof options[index] == "undefined")
                		        options[index] = default_args[index];
		        }	
        
		        this.id = options['id'];
		        
			this.data = data;
			this.key = options['key'];
			
			this.axisOrigin = options['axisOrigin'];
			this.barHeight = options['barHeight'];
			this.barWidth = options['barWidth'];
			this.barChartHeight = options['barChartHeight'];
			this.chartTabs = options['chartTabs'];
			this.pointSize = options['pointSize'];
			this.pointSizeInc = options['pointSizeInc'];
			this.pointHitSize = options['pointHitSize'];
			
			this.ylabels = options['ylabels'];
			this.yGridHitStroke = options['yGridHitStroke'];
			this.chartHeight = this.barHeight - this.chartTabs * 2;
			this.click = options['click'];
			
			this.textFromAxisDist = options['textFromAxisDist'];
			this.scoreFromBarDist = options['scoreFromBarDist'];
			
			
			this.font = options['font'];
			this.greenFill = options['greenFill'];
			this.redFill = options['redFill'];
			

			this.gridStroke = options['gridStroke'];
			this.yGridLowerStroke = options['yGridLowerStroke'];
			this.boldGridStroke = options['boldGridStroke'];
			this.yGridStroke = options['yGridStroke'];
			
			this.chartColor = options['chartColor'];
			
			this.chartStroke = { width: 2, color: this.chartColor};
			this.pointFill = {color: this.chartColor};
			

			
			this.numVals = Math.min(this.data.length, 10);

			this.svg = options['svg'] ? options['svg'] : 
				SVG(this.id).size(
					options['Width' ]?options['Width' ]:
					this.barWidth+this.axisOrigin[0]+80,
		     			options['Height']?options['Height']:
		     			this.barHeight+this.axisOrigin[1]+80);	
		     	console.log(options['Width' ]?options['Width' ]:
					this.barWidth+this.axisOrigin[0]+80,
		     			options['Height']?options['Height']:
		     			this.barHeight+
		     				this.axisOrigin[1]+40);		
	
		
			this.drawPoint = function (n, chart, elem) {
				var f = n*(this.barWidth/this.numVals) + this.axisOrigin[0];
				var pos = [f, elem.value=='1'?this.axisOrigin[1]+this.chartTabs : 
					      elem.value=='0'?this.axisOrigin[1]+this.barHeight/2 : 
							 this.axisOrigin[1]+this.barHeight-this.chartTabs];
				chart.push(pos);
				elem.chart = {};
				
				elem.chart.line=this.svg.line(f,pos[1],f,this.barHeight + this.axisOrigin[0]).fill('none')
						.stroke(this.yGridStroke);
				elem.chart.lowerLine=this.svg.line(f,pos[1],f,this.barHeight + this.axisOrigin[0]).fill('none')
						.stroke(this.yGridLowerStroke).opacity(0);
						
				elem.chart.hitLine=this.svg.line(f,pos[1],f,this.barHeight + this.axisOrigin[0]).fill('none')
						.stroke(this.yGridHitStroke).opacity(0);
						
				elem.chart.point = this.svg.circle(this.pointSize).center(pos[0],pos[1]).fill(this.pointFill);
				elem.chart.hitPoint = this.svg.circle(this.pointHitSize).center(pos[0],pos[1]).opacity(0);
				
				
				
				elem.chart.label=this.svg.text(function(add) {
								add.tspan(elem.label.time+" ").newLine().dy(11);
								add.tspan(elem.label.date).newLine().dy(10);
								
								}).move(f,this.axisOrigin[1]+this.barHeight)
						.rotate(45,f, this.axisOrigin[1]+this.barHeight).font(this.font).opacity(0.6);
						
//				elem.chart.textline = this.svg.line(f,this.barHeight + this.axisOrigin[0],f,this.barHeight + this.axisOrigin[0] + 90).fill('none').rotate(-45,f, this.axisOrigin[1]+this.barHeight ).stroke(this.yGridStroke);
						
				var ps = this.pointSize,psInc = this.pointSizeInc, 
				    hitS = this.yGrigHitStroke, S = this.yGrigStroke;
				
				var f_enter = function(){ 
					elem.chart.point.animate(1000, '<>', 10).size(psInc,psInc);
					elem.chart.label.animate(1, '>', 10).opacity(1); 
					elem.chart.lowerLine.animate(1000, '>', 10).opacity(0.7);
					 };
				var f_leave = function(){ 
					elem.chart.point.animate(1000, '<>', 10).size(ps,ps);
					elem.chart.label.animate(1000, '>', 10).opacity(0.6);
					elem.chart.lowerLine.animate(1000, '>', 10).opacity(0);
					};
				
				elem.chart.hitPoint.mouseenter(f_enter);	
				elem.chart.hitPoint.mouseleave(f_leave);
				if(this.click)
					elem.chart.hitPoint.click(this.click);
				elem.chart.hitLine.mouseenter(f_enter);	
				elem.chart.hitLine.mouseleave(f_leave);
				if(this.click)
					elem.chart.hitLine.click(this.click);
				
				elem.chart.label.mouseenter(f_enter);	
				elem.chart.label.mouseleave(f_leave);		
				if(this.click)
					elem.chart.label.click(this.click);
					
				elem.chart.hitPoint.remember(this.key,elem);
				elem.chart.hitLine.remember(this.key,elem);
				elem.chart.label.remember(this.key,elem);
				
				
				
				
				
				
			}
			
			this.drawChart = function () {	
				var n = 0;
				var chart = [];
				for(var index in this.data) {
					var elem = this.data[index];
					if(n > this.numVals)
						break;
					this.drawPoint(n++, chart, elem);
				}
				
				this.svg.polyline(chart).fill('none').stroke(this.chartStroke)
			}
			this.drawGrid = function () {


				this.svg.line(this.axisOrigin[0],
					      this.axisOrigin[1]+this.chartTabs,
					      this.axisOrigin[0]+this.barWidth, 
					      this.axisOrigin[1]+this.chartTabs					    
					      ).stroke(this.gridStroke)
				
				this.svg.line(this.axisOrigin[0],
					      this.axisOrigin[1]+this.barHeight/2,
					      this.axisOrigin[0]+this.barWidth, 
					      this.axisOrigin[1]+this.barHeight/2
					      ).stroke(this.boldGridStroke)
					      	      
				this.svg.line(this.axisOrigin[0],
					      this.axisOrigin[1]+this.barHeight-this.chartTabs,
					      this.axisOrigin[0]+this.barWidth, 
					      this.axisOrigin[1]+this.barHeight-this.chartTabs					    
					      ).stroke(this.gridStroke)
					      
				
				if(this.ylabels) {
					this.svg.text(this.ylabels[0])
							.cy(this.axisOrigin[1] + this.chartTabs )
							.x(this.axisOrigin[0]-this.textFromAxisDist[1]).font(this.font);
					this.svg.text(this.ylabels[1])
							.cy(this.axisOrigin[1] + this.barHeight/2 )
							.x(this.axisOrigin[0]-this.textFromAxisDist[1]).font(this.font);
					this.svg.text(this.ylabels[2])
							.cy(this.axisOrigin[1] + this.barHeight-this.chartTabs )
							.x(this.axisOrigin[0]-this.textFromAxisDist[1]).font(this.font);
				}

					
			}
			this.drawAxis = function() {
				this.svg.polyline([[this.axisOrigin[0],this.axisOrigin[1]],
					           [this.axisOrigin[0],this.barHeight + this.axisOrigin[0]],
					           [this.axisOrigin[0] + this.barWidth, this.barHeight + this.axisOrigin[0]]
					           ]
					      ).fill('none').stroke({ width: 1 });
			}
			this.remove = function () {
				$( this.id + " svg" ).remove();
			}
			this.draw = function() {
				this.drawGrid();
				this.drawChart();
				this.drawAxis();
			}
			return this;
		};
