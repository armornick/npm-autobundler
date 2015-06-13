
/*
* Module imports
*/
var fs = require('fs'),
	exec = require('child_process').exec,
	execSync = require('shelljs').exec,
	util = require('util'),
	path = require('path');

/*
* Add a startsWith method in case it doesn't exist
*/
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.lastIndexOf(str, 0) === 0
  };
}


/*
* Automatically generate a dummy package.json file to fool npm into doing a local install
*/
function makePackageJson () {
	fs.writeFileSync("package.json", '{ "name": "dummy", "version": "0.0.0", "description": "dummy" }'); 
}

/*
* Fetch packages with NpmBox
* options holds whether this is a simulation (in which case it outputs the command)
*/
function doNpmBox (options, packages) {
	var cmd = util.format("npmbox %s", packages.join(" "));
	
	if (options.simulation) {
		console.log(cmd);
	} else {
		// exec(cmd, function (error, stdout, stderr) {
		// 	console.log(stdout);
		// 	if (error) { 
		// 		console.log(error);
		// 		throw error;
		// 	}
		// });
		execSync(cmd);
	};
}

/*
* Do a local install of a list of packages with npm
* options holds whether this is a simulation (in which case it outputs the command)
*/
function doNpmInstall (options, packages) {
	var cmd = util.format("npm install --save %s", packages.join(" "));

	if (options.simulation) {
		console.log(cmd);
	} else {
		makePackageJson();
		execSync(cmd);
	};
}

function doNpmInstall2 (options, packages) {
	
	if (options.simulation) { doNpmInstall(options, packages) };

	function installPackage (pkg) {
		var cmd = util.format("npm install --save %s", pkg);
		execSync(cmd);
	}

	makePackageJson();
	packages.forEach(installPackage);

}

/*
* Locally install given list of packages
* options holds which package managers are used to install the pacakges
*/
function doInstallPackages (options, packages) {
	console.log(util.format("installing packages: %s", packages.join(", ")));

	if (options.npmbox) {
		doNpmBox(options, packages);
	}

	if (options.npm) {
		doNpmInstall2(options, packages);
	}
}

/*
* Create directory and install packages
* options holds the buildDir to get the root output directory
*/
function makeDirAndInstallPackages (options, dirName, packages) {
	fs.mkdir(path.join(options.buildDir, dirName), function (error) {
		if (error && error.code != 'EEXIST') throw error;

		var directory = path.join(options.buildDir, dirName);
		console.log(util.format("moving to directory %s", directory));

		process.chdir(directory);
		doInstallPackages(options, packages);
	});
}

/*
* The main function which bundles the given packages
*/
function makeBundle (options, config) {
	fs.mkdir(options.buildDir, function (error) {
		if (error && error.code != 'EEXIST') throw error;

		for (var key in config) {

			if (!key.startsWith("!")) {
				var packages = config[key];
				makeDirAndInstallPackages(options, key, packages);
			}
		}
	});
}

/*
* Export makeBundle function
*/
module.exports = makeBundle;