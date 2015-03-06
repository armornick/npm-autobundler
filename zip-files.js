var sh = require('shelljs'),
	test = sh.test, cd = sh.cd, listdir = sh.ls,
	exec = sh.exec;


var DEFAULT_BUILD_DIR = 'build';


if (test('-d', DEFAULT_BUILD_DIR)) {

	cd(DEFAULT_BUILD_DIR);

	listdir(".").forEach(function (file) {
		
		if (test('-d', file)) {

			var filename = file+".7z";

			if (test('-f', filename)) return;

			console.log("attempting to compress directory: "+file);
			
			exec("7za a "+filename+" "+file+" -mx9");

		};

	});

};