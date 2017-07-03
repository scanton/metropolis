(function() {
  var componentName = 'custom-dialog-box';
	var s = `
    <div class="` + componentName + ` panel panel-default">
      <h3 class="panel-heading">Panel Heading</h3>
      <div class="panel-body"></div>
    </div>
	`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
		template: s
	});
})();
