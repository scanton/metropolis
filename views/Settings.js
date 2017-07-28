(function() {
  var componentName = 'settings';
  var s = `
		<div class="` + componentName + `">
      <h1>Settings</h1>
      <div class="current-project" v-if="settings && settings.currentProject">
        <h2>{{settings.currentProject.name}}</h2>

      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    data: function() {
      return {
        controller: controller,
        settings: controller.getSettings()
      }
    },
    methods: {
      setSettings(settings) {
        this.settings = settings;
      }
    }
  });
})();
