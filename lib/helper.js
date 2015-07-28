
var helper = module.exports = {}

helper.ensureBin = function (app) {
	// detect if bower is present
	if (!which(app)) {
		echo(app+' not found: aborting execution')
		exit(-1)
	}
}

helper.mkdirIfNotExist = function (dir) {
	if (!test('-d', dir)) {
		mkdir(dir)
	}
}

helper.createZipBundle = function (name) {
	if (which('7za')) {
		var filename = name + '.7z'
		echo('compressing bundle: ' + filename)
		if (!global.SIMULATION) { 
			exec("7za a "+filename+" "+name+" -mx9")
		}
	}
}

helper.executeAndLog = function (cmd) {
	echo(cmd)
	if (!global.SIMULATION) {
		exec(cmd).output.toEnd('install.log')
	}
}

helper.makePackageJson = function () {
	'{ "name": "dummy", "version": "0.0.0", "description": "dummy" }'.to('package.json')
}