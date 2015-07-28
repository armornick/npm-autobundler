
require('shelljs/global')
var helper = require('./helper')

/*
* Add a startsWith method in case it doesn't exist
*/
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.lastIndexOf(str, 0) === 0
	}
}

var NpmBundler = require('./npm')
var BowerBundler = require('./bower')

function Bundler (cfg, bundles) {
	if (!cfg.$type || cfg.$type == 'npm') {
		this.impl = new NpmBundler(cfg)
	} else if (cfg.$type == 'bower') {
		this.impl = new BowerBundler(cfg)
	}

	this.zip = !!(cfg.zip)
	global.SIMULATION = !!(cfg.simulation)
	// global.SIMULATION = true // debug
	global.SIMULATION && echo('SIMULATION mode activated: nothing will be executed\n')

	this.moveToBuild(cfg)

	this.makeBundles(bundles)
}

Bundler.prototype.moveToBuild = function(cfg) {
	var buildDir = cfg.buildDir || 'build'
	helper.mkdirIfNotExist(buildDir)
	cd(buildDir)
}

Bundler.prototype.makeBundles = function(bundles) {
	for (var bundle in bundles) {
		// skip bundles starting with '!'
		if (bundle.startsWith('!')) {
			continue
		}

		echo('creating bundle: ' + bundle)
		this.makeBundle(bundle, bundles[bundle])
		echo()
	}
}

Bundler.prototype.makeBundle = function(name, packages) {
	helper.mkdirIfNotExist(name)
	cd(name)

	this.impl.build(packages)

	cd('..')
	if (this.zip) {
		helper.createZipBundle(name)
	}
}

module.exports = Bundler