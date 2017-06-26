const remote = require('electron').remote;
const {dialog} = require('electron').remote;

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
	
});