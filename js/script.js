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
const controller = new MetropolisController(model, viewController, settings);

const stripObservers = function(obj) {
	return JSON.parse(JSON.stringify(obj, null, 4));
}

require('./custom_modules/enableContextMenu.js')();

$(window).resize(function() {
	let wHeight = $(window).height();

	$(".side-bar").each(function() {
		let $sb = $(this);
		let sHeight = $sb.height();
		let sPos = $sb.offset();
		let targetHeight = wHeight - 40 - sPos.top;
		$sb.attr("style", "height: " + targetHeight + "px");
	});
	$(".main-view").each(function() {
		let $tc = $(this);
		let tHeight = $tc.height();
		let tPos = $tc.offset();
		let targetHeight = wHeight - 40 - tPos.top;
		$tc.attr("style", "height: " + targetHeight + "px");
		$tc.find(".value-container").attr("style", "height: " + (targetHeight - 33)  + "px");
	});
}).mousemove(function(e) {
	controller.updateMousePosition(e.clientX, e.clientY);
});


$(document).ready(function() {
	$(window).resize();
}).on("mouseover", ".has-tooltip", function() {
	controller.showTooltip($(this).attr("data-tooltip"));
}).on("mouseout", ".has-tooltip", function() {
	controller.hideTooltip();
});
