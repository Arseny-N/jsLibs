function drawStats(options) {
			function fillInData(info) {
				$("#heading").html(info.label + " "+info.labelplus);
				$("#line-info span").html("21");
				
				$("#info span").eq(0).html(info.numSolvedTasks);		
				$("#info span").eq(1).html(info.totalNumTasks);
				$("#info span").eq(2).html(info.numSuccSolvedTasks);
				$("#info span").eq(3).html(info.numUnSuccSolvedTasks);
				$("#info span").eq(4).html(info.numIgnTasks);
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
			var B2 = new BarChart(options.dataBar, barChartOptions).draw();
		}
