
var helper = require('./helper')
var util = require('util')

function NpmBundler (cfg) {
	helper.ensureBin('npm')

	this.doNpm = cfg.install

	if (cfg.npmbox) {
		helper.ensureBin('npmbox')
		this.npmbox = true
	}

	if (cfg.monolith) {
		this.monolith = true
	}
}

NpmBundler.prototype.build = function(packages) {
	if (this.doNpm) {
		if (this.monolith) {
			makeNpmMonolith()
		} else {
			makeNpmSingular()
		}
	}

	if (this.npmbox) {
		makeNpmbox()
	}
}

function makeNpmSingular (packages) {
	if (test('-d', 'node_modules')) {
		echo('bundle already exists')
		return
	}

	function installPackage (pkg) {
		var cmd = util.format("npm install --save %s", pkg);
		helper.executeAndLog(cmd)
	}

	helper.makePackageJson()
	packages.forEach(installPackage);
}

function makeNpmMonolith (packages) {
	if (test('-d', 'node_modules')) {
		echo('bundle already exists')
		return
	}
	
	helper.makePackageJson()
	var cmd = util.format("npm install --save %s", packages.join(" "));
	helper.executeAndLog(cmd)
}

function makeNpmbox (packages) {
	var cmd = util.format("npmbox %s", packages.join(" "));
	helper.executeAndLog(cmd)
}

module.exports = NpmBundler