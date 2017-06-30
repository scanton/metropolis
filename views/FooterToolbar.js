(function() {
  var s = `
		<div class="footer-toolbar">
			footer toolbar
		</div>
	`;
  Vue.component('footer-toolbar', {
    created: function() {
      viewController.registerView('footer-toolbar', this);
    },
    template: s
  });
})();
