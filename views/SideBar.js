(function() {
	var s = `
		<div class="side-bar">
			side bar
		</div>
	`;

	Vue.component('side-bar', {
    created: function() {
      viewController.registerView('side-bar', this);
    },
		template: s
	});
})();
