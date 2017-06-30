(function() {
  var componentName = 'custom-modal-dialog';
	var s = `
    <div class="custom-modal-dialog">
      <custom-dialog-box></custom-dialog-box>
      <custom-modal-overlay></custom-modal-overlay>
    </div>
	`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
		template: s
	});
})();
