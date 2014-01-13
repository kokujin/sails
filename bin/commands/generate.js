/**
 * `sails generate`
 *
 * Generate module(s) for the app in our working directory.
 * Internally, uses ejs for rendering the various module templates.
 *
 * @param {Object} options
 *	 {String} appPath		- path to sails app
 *	 {String} module		- e.g. 'controller' or 'model'
 *	 {String} path			- path to output directory
 *	 {String} id			- the module identity, e.g. 'user'
 *	 {String} globalID		- override for global identity (automatically generated by default)
 *	 {String} ext			- file extension for new module (Defaults to .js)
 *	 {Array} actions		- the array of action names (for controllers only)
 *	 {String} attributes	- the array of attribute name/type pairs (for models only)
 *
 * @param {Object} handlers
 *	{Function} * - different callbacks than may be triggered
 */

module.exports = function ( options ) {
	var log = this.logger;
	var config = this.config;

	var entity = options.module;

	if (!entity) { throw new Error(); }

	// TODO: Look up generator entity in config and grab the module name
	// for now:
	var module = 'sails-generate-' + entity;

	var Generator;
	try {
		Generator = require(module);
	}
	catch (e) { throw e; }

	generate(Generator, options, {
		error: function (err) { log.error(err); },
		success: function (output) { log.info('ok!'); },
		notSailsApp: function () { log.error('Not a sails app.'); },
		alreadyExists: function () {
			
			// Log custom message if override is defined
			if (options.logStatusOverrides && options.logStatusOverrides.alreadyExists) {
				return options.logStatusOverrides.alreadyExists(options, log);
			}

			CLIController.error(options.globalID + ' already exists!');
		}
	});
};
