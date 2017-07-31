(function() {
  var componentName = 'remap-values';
  var s = `
		<div class="` + componentName + `">
      <h2>Remap Values</h2>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
