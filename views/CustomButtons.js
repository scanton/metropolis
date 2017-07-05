(function() {
  var componentName = 'custom-buttons';
  var s = `
		<div class="` + componentName + `">
      <button v-for="btn in buttons" v-bind:class="btn.class" v-on:click="btn.handler">{{btn.label}}</button>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    props: ['buttons'],
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
