(function() {
  var componentName = 'loading-animation';
  var s = `
		<div class="` + componentName + `">
      <div class="loading-animation-container">
        <div class="orbiter"></div>
        <span class="glyphicon glyphicon-globe"></span>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s
  });
})();
