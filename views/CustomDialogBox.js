(function() {
  var componentName = 'custom-dialog-box';
	var s = `
    <div class="` + componentName + ` panel panel-default">
      <div class="panel-heading">Panel Heading</div>
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
