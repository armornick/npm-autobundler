
// Module imports
var bundle = require("./bundler.js"),
	path = require("path"),
	readFile = require("shelljs").cat,
	program = require("commander");

// Constants to configure default behavior
var DEFAULT_BUILD_DIR = 'build', // default build directory name
	DEFAULT_CONFIG_FILE = 'conf.json'; // default configuration file name


// Use Commander.js for the argument parsing
program
	.version("0.1.0")
	.option("-b, --npmbox", "Execute the npmbox commands")
	.option("-n, --no-install", "Don't execute the npm commands")
	.option("-s, --simulation", "Only output the commands, don't execute them.")
	.option("-f, --conf [input-file]", "Use the given configuration file. Default: "+DEFAULT_CONFIG_FILE, DEFAULT_CONFIG_FILE)
	.option("-o, --output [output-dir]", "Use the given build directory. Default: "+DEFAULT_BUILD_DIR, DEFAULT_BUILD_DIR)
	.parse(process.argv);


// Create the options object
var options = {};

// load the options
options.npm = program.install;
options.npmbox = program.npmbox;
options.simulation = program.simulation;

// load the root build directory into the options object
options.buildDir = path.join(process.cwd(), program.output);

// load the configuration file
var config = JSON.parse(readFile(program.conf));

// check whether we have bundles specified
if (program.args.length > 0) {

	var fullConf = config; config = {};

	program.args.forEach(function (bundle) {
		// console.log(bundle);
		var bundleSpec = fullConf[bundle] || fullConf[bundle+'-bundle'] || fullConf['!'+bundle] || fullConf['!'+bundle+'-bundle'];
		if (bundleSpec) { config[bundle] = bundleSpec; };
	});

};

// console.log(options); // for debugging purposes
// console.log(config); // for debugging purposes

// start the bundling
bundle(options, config);