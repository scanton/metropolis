(function() {
	var s = '';
  s += '<div class="side-bar">';
	s += 'services side bar';
	s += '</div>';

	Vue.component('services-side-bar', {
    created: function() {
      viewController.registerView('services-side-bar', this);
    },
		template: s
	});
})();
