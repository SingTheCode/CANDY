var PythonShell = require('python-shell');

var options = {
	mode: 'text',
	pythonPath: '',
	pythonOpthons: ['-u'],
	csripPath: '',
	args: ['value1', 'value2', 'value3']
};

var myVar = setInterval(myTimer, 5000);
myTimer();

function myTimer() {
PythonShell.run('post.py', options, function (err, results) {
	if (err) throw err;
	console.log('results: %j', results);
});
}


