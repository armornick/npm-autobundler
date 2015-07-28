
var helper = require('./helper')

function BowerBundler (cfg) {
	helper.ensureBin('bower')
}

BowerBundler.prototype.build = function(packages) {
	if (test('-d', 'bower_components')) {
		echo('bundle already exists')
		return
	}

	var pkgList = packages.join(' ')
	var cmd = "bower install -F " + pkgList
	helper.executeAndLog(cmd)
}

module.exports = BowerBundler