# Portable Node Package Bundle

This is an application to locally gather npm modules to be used in a portable Node install, with an option to use [npmbox](https://github.com/arei/npmbox).

When doing `npm update -g` on a portable install, it breaks npm when it tries to upgrade itself since there is only the global configuration for npm. In a non-portable node install, any npm upgrades would be installed to the user's home directory.

The directory where the node modules are bundled contains a dummy `package.json` file, which easily allows you to see which versions have been installed.

To transfer the packages installed in this project, transfer the `.bin` directory to the root of the portable Node install, replacing the `..` with `node_modules` in the cmd files, and the rest of the `node_modules` directory to said directory in the portable Node install.


## Executable options

    -h, --help                 output usage information
    -V, --version              output the version number
    -b, --npmbox               Execute the npmbox commands
    -n, --no-install           Don't execute the npm commands
    -s, --simulation           Only output the commands, don't execute them.
    -f, --conf [input-file]    Use the given configuration file. Default: conf.json
    -o, --output [output-dir]  Use the given build directory. Default: build



## Configuration File Options

The configuration file for autobundler is standard json. By default, autobundler will look for `conf.json`.

In the configuration file, the key denotes the directory in which the files will be saved. The value should be an array with a list of packages to be installed.

Starting a bundle name with `!` will automatically exclude it from being installed.

### Example configuration file

	{
		"js-libraries": ["commander", "underscore"],

		"css-preprocessors": ["less", "stylus", "sass"],

		"!will-not-be-crated": ["harp"]
	}


## zip-files.js

An added program to bundle the directories with the packages into 7z archives. For this to work, make sure the 7za executable is available. On Windows, put the executable in the build directory. If you changed your build directory location, you need to change the setting in the source file as it is currently hardcoded.


## API Documentation

The `bundle` module (which shouldn't actually be used by itself) exports a single function with the following signature: `makeBundle (options, config)`.

The `config` argument is simply the imported json file. See above for the specifications.

The `options` argument tells the bundler what to do. No defaults are created in the function itself so the object must be complete before being passed to the function. The following arguments are supported:

* `buildDir`: The root directory where the packages will be installed. Required.
* `npm`: Flags whether or not to do the local npm install. Optional.
* `npmbox`: Flags whether or not to fetch the package using [npmbox](https://github.com/arei/npmbox). Optional.
* `simulation`: Flags whether the bundler should only output the commands it would use. If this flag is set, the commands are *not* executed. Optional.


## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>