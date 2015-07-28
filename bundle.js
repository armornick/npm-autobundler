require('shelljs/global')
var path = require('path')
var Bundler = require('./lib/bundler')

// Constants to configure default behavior
var DEFAULT_BUILD_DIR = 'build', // default build directory name
	DEFAULT_CONFIG_FILE = 'conf.json' // default configuration file name

var argv = require('yargs')
	.boolean('s').alias('s','simulation').describe('s', "don't execute commands")
	.boolean('i').alias('i', 'no-install').describe('i', "don't perform npm installation")
	.boolean('m').alias('m', 'monolith').describe('m', 'execute npm install as single command (bigger chance of failure)')
	.boolean('b').alias('b', 'npmbox').describe('b', 'execute npmbox command')
	.default('f',DEFAULT_CONFIG_FILE).nargs('f', 1).alias('f', 'config-file').describe('f', 'set bundle file to read (top dir or conf directory)')
	.default('o',DEFAULT_BUILD_DIR).nargs('o', 1).alias('o', 'output-dir').describe('o', 'set build directory')
	.boolean('z').alias('z', 'zip').describe('z', 'create a 7z file from the bundle directory')
	.help('h').alias('h','help')
	.argv


// Create the options object
var cfg = {}

// load the options
cfg.install = !(argv.noInstall)
cfg.npmbox = argv.npmbox
cfg.monolith = argv.monolith
cfg.zip = argv.zip
cfg.simulation = argv.simulation
cfg.buildDir = argv.outputDir

// load bundle file
var bundles = {}

if (test('-f', argv.configFile)) {
	bundles = JSON.parse(cat(argv.configFile))
} else if (test('-f', path.join('conf', argv.configFile))) {
	bundles = JSON.parse(cat(path.join('conf', argv.configFile)))
} else {
	echo('could not read bundle file')
	exit(-1)
}

cfg.$type = bundles.$type || 'npm'
delete bundles.$type

if (argv._.length > 0) {
	var allBundles = bundles; bundles = {}

	argv._.forEach(function (bundle) {
		// console.log(bundle);
		var bundleSpec = allBundles[bundle] || allBundles[bundle+'-bundle'] || allBundles['!'+bundle] || allBundles['!'+bundle+'-bundle']
		if (bundleSpec) { bundles[bundle] = bundleSpec }
	})
}

var b = new Bundler(cfg, bundles)