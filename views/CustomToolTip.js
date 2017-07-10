(function() {
  var componentName = 'custom-tool-tip';
	var s = `<div class="` + componentName + ` hide">
    Tooltip
  </div>`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
		template: s
	});
})();
