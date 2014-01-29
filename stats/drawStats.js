function drawStats(options) {
			function toggleHide() {
				var icon = $(this);
				icon.parents('.chartContainer').find(".chart-body").toggle('fast');			
				if(icon.hasClass("chart-arrow-up")) {
					icon.removeClass("chart-arrow-up");
					icon.addClass("chart-arrow-down");
				} else {
					icon.removeClass("chart-arrow-down");
					icon.addClass("chart-arrow-up");
				}
			}
			
		
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

			var append_elem = $(options.appendSelector);
			for(var index in options.vDataBar) {
				var bar = options.vDataBar[index];
				
				
				console.log('Drawing: '+bar.id);
				
				elem = $('#'+bar.id)
				if(bar.append || elem.length == 0 ) {
					var title = bar.title ? '<div class="chart-title" ><span>'+bar.title+
								'</span><div class="chart-arrow" > </div></div>' : '';
					
					append_elem.append('<tr><td class="chartContainer '+bar.tdClass+
									 '">'+title+'<div class="chart-body" id="'+bar.id+
									 '"></div></td></tr>' );
					
					elem = $('#'+bar.id);
					elem.parents('.chartContainer').find('.chart-arrow')
						.addClass('chart-arrow-up');
					
						
				}
				for(var dataIndex in bar.data) {
					var barData = bar.data[dataIndex];
					barChartOptions.id = bar.id +'-'+index+'-'+dataIndex;
					elem.append('<div id='+barChartOptions.id+'></div>');
//				
					new BarChartVertical(barData, barChartOptions).draw();	
				}

				if(bar.hide) 
					toggleHide.apply($('#'+bar.id).parents('.chartContainer').find('.chart-title div'));
			}
						
			$(".chart-title div").each(function() {
				$(this).click(toggleHide);
			}
		);
		}
