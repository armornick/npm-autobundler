var sh = require('shelljs'),
	test = sh.test, cd = sh.cd, 
	exec = sh.exec, listdir = sh.ls,
	program = require('commander');


var DEFAULT_BUILD_DIR = 'build';

program
	.version("0.1.0")
	.option('-d, --directory [dir]', 'directory filled with directories to zip', DEFAULT_BUILD_DIR)
	.parse(process.argv);

if (test('-d', program.directory)) {

	console.log("moving to "+program.directory);
	cd(program.directory);

	// if (!sh.which('7za')) throw "7-zip archiver not found";

	listdir(".").forEach(function (file) {
		
		if (test('-d', file)) {

			var filename = file+".7z";

			if (test('-f', filename)) return;

			console.log("attempting to compress directory: "+file);
			
			exec("7za a "+filename+" "+file+" -mx9");

		};

	});

};