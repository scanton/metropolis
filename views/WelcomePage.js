(function() {
  var componentName = 'welcome-page';
  var s = `
		<div class="` + componentName + ` row page-view">
      <div class="col-xs-12 main-view">
        <h1>Welcome to Metropolis</h1>
        <p>Metropolis is an automated test suite for .NET web services.  It supports both SOAP and REST services, allowing users to compose tests with multiple web services to fully test end-to-end functionality of a system.</p>
        <ul class="likely-actions">
          <li>
            <h2>New Project</h2>
            <p>Get started right away by creating a new project.</p>
            <p>Once you create a project, you can then add service definitions to it. Then, you can set up tests for those services.</p>
            <button class="btn btn-success pull-right" v-on:click="controller.showView('manage-projects-view')">Create a New Project</button>
            <div class="clear-fix"></div>
          </li>
          <li>
            <h2>Open Saved Project</h2>
            <ul class="project-list well">
              <h3>Saved Projects:</h3>
              <li v-for="proj in projectList" v-on:click="controller.loadProject(proj)">{{ proj }}</li>
            </ul>
          </li>
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
      }
    }
  });
})();
