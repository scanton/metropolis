(function() {
	var s = '';
	s += '<div class="main-view">';
	s += 'main-view';
	s += '</div>';

	Vue.component('main-view', {
    created: function() {
      viewController.registerView('main-view', this);
    },
		template: s
	});
})();
