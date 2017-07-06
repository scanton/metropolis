(function() {
  var componentName = 'welcome-page';
  var s = `
		<div class="` + componentName + ` row page-view">
      <div class="col-xs-12 main-view">
        <h1>Welcome to Metropolis</h1>
        <ul>
          <li><button class="btn btn-success" v-on:click="controller.showView('manage-projects-view')">Create a New Project</button></li>
          <li><button class="btn btn-success" v-on:click="showExistingProjects()">Load an Existing Project</button></li>
          <ul class="project-list" style="display: none;">Existing Projects:
            <li v-for="proj in projectList" v-on:click="controller.loadProject(proj)">{{ proj }}</li>
          </ul>
        </ul>
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
        projectList: model.getProjectList()
      }
    },
    methods: {
      setProjectList: function(list) {
        this.projectList = list;
      },
      showExistingProjects: function() {
        $(this.$el).find(".project-list").slideDown("fast");
      }
    }
  });
})();
