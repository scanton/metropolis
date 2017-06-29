(function() {
	var s = '';
	s += '<div class="footer-toolbar">';
	s += 'footer toolbar';
	s += '</div>';

	Vue.component('footer-toolbar', {
    created: function() {
      viewController.registerView('footer-toolbar', this);
    },
		template: s
	});
})();
