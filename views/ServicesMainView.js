(function() {
	var s = `
	  <div class="main-view">
			<form-add-service></form-add-service>
		</div>
	`;

	Vue.component('services-main-view', {
    created: function() {
      viewController.registerView('services-main-view', this);
    },
		template: s
	});
})();
