var fuzzData = function () {
		var f = function(){
			return Math.floor(Math.random() *100)%3 -1;
		}
		var f2 = function(){
			return Math.floor(Math.random() *100);
		}
		var f3 = function(){
			return Math.floor(Math.random() *200);
		}
		
		var dataLine = function() { return [
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),		
		  	 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},
			{'label': {'time': '23:45:26', 'date':'24.12.2013'} ,'value': (f)(),
			 'taskCode' : (f3)(), 'userAnswer':(f3)(), 'rightAnswer': (f3)()},]; };

		var m,n,
		dataEntry = {
			


			'subVals': [ { 'label':{	'time': '23:45:26',
							'date':'24.12.2013'
						} ,
					'value': (f)(),
					'taskCode' : (f3)(),
					'userAnswer':(f3)(), 
					'rightAnswer': (f3)()
				   }], 
			
			'numSuccSolvedTasks' : 90,
			'numSolvedTasks' : 100,
			'totalNumTasks':  (f3)(),
			'numIgnTasks' : (f3)() ,

			
			'labelplus':'Description of this...', 			
			'label': 'B1' ,
			'value': (f2)(), /* functions in json ?! */
		};
			
		
		this.dataBar = [
//			dataEntry,
			{'label': 'B1' ,'labelplus':'Description of this...', 'value': (f2)(), 'subVals': (dataLine)() , 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 
			{'label': 'B2' ,'labelplus':'Description of this...','value': (f2)(), 'subVals': (dataLine)(), 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 
			{'label': 'B4' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
 			{'label': 'B5' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)(), 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B6' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B7' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B8' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B9' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B10' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B11' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B12' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B13' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B14' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B15' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'B16' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)() ,
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			 {'label': 'C1' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)(), 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			  {'label': 'C2' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)(), 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			  {'label': 'C3' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)(), 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			  {'label': 'C4' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)(), 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			  {'label': 'C5' ,'labelplus':'Description of this...','value': (f2)(),'subVals': (dataLine)(), 
			 'numSuccSolvedTasks' : m = (f3)(),'numUnSuccSolvedTasks': n = (f3)(),'numSolvedTasks' : m+n,
			 'totalNumTasks':  (f3)(),'numIgnTasks' : (f3)() },
			];
			return this;
};