(function() {
  var componentName = 'custom-buttons';
  var s = `
		<div class="` + componentName + `">
      <button class="btn btn-default btn-cancel" v-on:click="controller.closeModal()">cancel</button>
			<button class="btn btn-info">custom buttons</button>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    data: function() {
      return {controller: controller}
    }
  });
})();
