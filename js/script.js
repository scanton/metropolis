console.info = function() {};

const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const SettingsController = require(__dirname + '/custom_modules/SettingsController.js');
const settings = new SettingsController();

const MetropolisModel = require(__dirname + '/custom_modules/MetropolisModel.js');
const model = new MetropolisModel(settings);

const ViewController = require(__dirname + '/custom_modules/ViewController.js');
const viewController = new ViewController();

const MetropolisController = require(__dirname + '/custom_modules/MetropolisController.js');
const controller = new MetropolisController(model, viewController);

require('./custom_modules/enableContextMenu.js')();

$(window).resize(function() {
	let wHeight = $(window).height();
	$(".side-bar").each(function() {
		let $sb = $(this);
		let sHeight = $sb.height();
		let sPos = $sb.offset();
		let targetHeight = wHeight - 33 - sPos.top;
		$sb.attr("style", "height: " + targetHeight + "px");
	});
	$(".main-view").each(function() {
		let $tc = $(this);
		let tHeight = $tc.height();
		let tPos = $tc.offset();
		let targetHeight = wHeight - 33 - tPos.top;
		$tc.attr("style", "height: " + targetHeight + "px");
	});
});

$(document).ready(function() {
	$(window).resize();

	controller.showModal("Sup Yo?", "<p>Work:</p><ul><li>Da Body</li></ul>", "<button>click me</button>");
});
