function drawStats(options) {
			function fillInData(info) {
				$("#heading").html(info.label + " "+info.labelplus);
				$("#line-info span").html("21");
				
				$("#info span").eq(0).html(info.numSolvedTasks);		
				$("#info span").eq(1).html(info.totalNumTasks);
				$("#info span").eq(2).html(info.numSuccSolvedTasks);
				$("#info span").eq(3).html(info.numUnSuccSolvedTasks);
				$("#task-info").hide();
		
			
			}
			function fillInTaskData(info) {
				$("#task-info span").eq(0).html(info.label.date +" в 	"+info.label.time);
				$("#task-info span").eq(1).html(info.taskCode); // HREF ????
				$("#task-info span").eq(2).html(info.userAnswer);
				$("#task-info span").eq(3).html(info.rightAnswer);
				$("#task-info span").eq(4).html(info.value == "0" ? "не решено" : 
							info.value == "1" ? "решено" : "решено не верно");
			}		
			/*function fillInVariants(variants) {
				function fillInVariant(v) {
					
				}
				
				for(var index in variants.list) {
					var v = variants.list[index];
					fillInVariant(v);
				}
			}*/
			var showTaskInfo = function () {
				fillInTaskData(this.remember('stats'));			
				$("#task-info").show();
			}	
			var showInfo = function () {
				var stats = this.remember('bar');
				$( "#line svg" ).remove();
				var B = new LineChart(stats.subVals, lineChartOptions).draw();
				fillInData(stats);
			};
		
			var lineChartOptions = options && options.lineChartOptions ? options.lineChartOptions :
			{
				id: 'line', key:'stats', 
				getValue: function (entry) { return entry.numSolved ? entry.numSuccSolved * 100 / entry.numSolved:0; }, 
			};
			var barChartOptions = options && options.barChartOptions ? options.barChartOptions :
			{
				id: 'bars', key:'bar' 
			};
			barChartOptions.click = showInfo;
			lineChartOptions.click = showTaskInfo;
			

		 	var B = new LineChart(options.dataLine, lineChartOptions).draw();
		 	if(!options.vertical) {
				var B2 = new BarChart(options.dataBar, barChartOptions).draw();
				return;
			}
			for(var index in options.vDataBar) {
				var bar = options.vDataBar[index];
				
				
				console.log('Drawing: '+bar.id);
				
				elem = $('#'+bar.id)
				if(bar.append || elem.length == 0 ) {
					var title = bar.title ? '<div class="chart-title" ><span>'+bar.title+
								'</span><div class="chart-arrow-'
								+'up'+'"> </div></div>' : '';
					
					$(options.appendSelector).append('<tr><td class="'+bar.tdClass+
									 '">'+title+'<div class="chart-body" id="'+bar.id+
									 '"></div></td></tr>' );
					elem = $('#'+bar.id);
					
						
				}
				for(var dataIndex in bar.data) {
					var barData = bar.data[dataIndex];
					barChartOptions.id = bar.id +'-'+index+'-'+dataIndex;
					elem.append('<div id='+barChartOptions.id+'></div>');
//				
					new BarChartVertical(barData, barChartOptions).draw();	
				}

				
			}
						
			$(".chart-title div").each(function() {
				$(this).click(function() {
					$(this).parents('.chartContainer').find(".chart-body").toggle('fast');
					$(this).toggleClass(function(index, elemClass)
						{console.log(elemClass);return elemClass == 'chart-arrow-up'? 'chart-arrow-down':'chart-arrow-up'});
					console.dir($(this).parents('.chartContainer').find(".chart-body"));
				});
			}
		);
		}
