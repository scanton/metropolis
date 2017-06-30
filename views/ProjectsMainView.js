(function() {
	var s = `
	  <div class="main-view">
	    <form-add-project></form-add-project>
		</div>
	`;

	Vue.component('projects-main-view', {
    created: function() {
      viewController.registerView('projects-main-view', this);
    },
		template: s
	});
})();
