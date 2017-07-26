(function() {
  var componentName = 'settings';
  var s = `
		<div class="` + componentName + `">
      <h1>Settings</h1>
      {{ settings }}
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    props: ['settings'],
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
