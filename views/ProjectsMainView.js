(function() {
	var s = '';
  s += '<div class="main-view">';
  s += '  <form-add-project></form-add-project>';
	s += '</div>';

	Vue.component('projects-main-view', {
    created: function() {
      viewController.registerView('projects-main-view', this);
    },
		template: s
	});
})();
