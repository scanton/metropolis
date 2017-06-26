(function() {
	var s = '';
	s += '<div class="side-bar">';
	s += 'side bar';
	s += '</div>';

	new Vue({
		el: 'side-bar',
		template: s
	});
})();