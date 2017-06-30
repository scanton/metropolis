(function() {
  var componentName = 'custom-modal-overlay';
	var s = `<div class="` + componentName + `"></div>`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
		template: s
	});
})();
