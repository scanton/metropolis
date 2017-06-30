(function() {
	var s = `
  	<div class="side-bar">
			services side bar
		</div>
	`;

	Vue.component('services-side-bar', {
    created: function() {
      viewController.registerView('services-side-bar', this);
    },
		template: s
	});
})();
