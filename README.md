# Portable Node Package Bundle

This is an application to locally gather npm modules to be used in a portable Node install, with an option to use [npmbox](https://github.com/arei/npmbox).

When doing `npm update -g` on a portable install, it breaks npm when it tries to upgrade itself since there is only the global configuration for npm. In a non-portable node install, any npm upgrades would be installed to the user's home directory.

> (**Later Note**: this only happened because the original Node Portable set the npm directory to the main node directory and is easily solved by changing the node prefix.)

The directory where the node modules are bundled contains a dummy `package.json` file, which easily allows you to see which versions have been installed.

To transfer the packages installed in this project, transfer the `.bin` directory to the root of the portable Node install, replacing the `..` with `node_modules` in the cmd files, and the rest of the `node_modules` directory to said directory in the portable Node install.

The bundler also supports the installation of Bower packages. When there are conflicts in the dependency versions, the latest will automatically be selected. (Bower is run with the `-F` argument.)

If the `7za` executable is available on the PATH, the `-z` parameter can be set to automatically create a 7z archive from the directory where the packages are installed.

## Executable options

    -s, --simulation   don't execute commands                            [boolean]
    -i, --no-install   don't perform npm installation                    [boolean]
    -m, --monolith     execute npm install as single command (bigger chance of
                     failure)                                          [boolean]
    -b, --npmbox       execute npmbox command                            [boolean]
    -f, --config-file  set bundle file to read (top dir or config directory)
                                                          [default: "conf.json"]
    -o, --output-dir   set build directory                      [default: "build"]
    -z, --zip          create a 7z file from the bundle directory        [boolean]
    -h, --help         Show help                                         [boolean]



## Configuration File Options

The configuration file for autobundler is standard json. By default, autobundler will look for `conf.json`.

In the configuration file, the key denotes the directory in which the files will be saved. The value should be an array with a list of packages to be installed.

Starting a bundle name with `!` will automatically exclude it from being installed.

The configuration file can specify the type of packages to install via the `"$type"` key, which can be set to `npm` or `bower` to specify the respective package manager. If no type key is set, the bundler defaults to 


### Example configuration file

	{
		"js-libraries": ["commander", "underscore"],

		"css-preprocessors": ["less", "stylus", "sass"],

		"!will-not-be-crated": ["harp"]
	}

### Example Bower configuration file

    {
        "$type": "bower",

        "bower-packages-to-install": ["backbone","backbone.layoutmanager","jquery"]
    }



## API Documentation

The bundler can also be used as a library. The main bundler code is in `lib/bundler.js`, which exports the Bundler class.

The Bundler takes two arguments: a configuration object, and a map with the bundle names and a list of packages. After instantiating the Bundler, all the magic happens by itself.

The possible configuration keys are:

* *$type*: whether to install npm or bower packages. defaults to npm.
* *zip*: whether to make 7z packages with 7za. defaults to false.
* *simulation*: whether to skip the actual execution of the commands. defaults to false.
* *buildDir*: directory in which to create the bundles. defaults to 'build'.
* *install*: whether to perform npm installation. only applies to $type npm. defaults to false.
* *npmbox*: whether to perform npmbox command. only applies to $type npm. defaults to false.
* *monolith*: whether to perform npm installation in a single command. has proven unreliable but might be useful. only applies to $type npm. defaults to false.

### Example Usage

    var Bundler = require('./lib/bundler')

    var cfg = { install: true, zip: true, buildDir: 'other-directory' }
    var bundles = {
        "some-libraries": ['underscore','jquery','moment'],
        "!wont-be-executed": ['harp']
    }

    var b = new Bundler(cfg, bundles)


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