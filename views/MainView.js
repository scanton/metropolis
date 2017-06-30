(function() {
	var s = `
		<div class="main-view">
			main-view
		</div>
	`;

	Vue.component('main-view', {
    created: function() {
      viewController.registerView('main-view', this);
    },
		template: s
	});
})();
