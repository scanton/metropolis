(function() {
	var s = '';
	s += '<div class="side-bar">';
	s += 'side bar';
	s += '</div>';

	Vue.component('side-bar', {
    created: function() {
      viewController.registerView('side-bar', this);
    },
		template: s
	});
})();
