(function() {
	var componentName = 'projects-side-bar';
	var s = `
	  <div class="side-bar ` + componentName + `">
		  <h1>{{ title }}</h1>
		  <ul class="project-list">
		  	<li v-for="project in projects" v-on:click="openProject">{{ project }}</li>
		  </ul>
		</div>
	`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
		template: s,
    data: () => {
      return {
        title: "Projects",
        projects: []
      };
    },
    methods: {
      setProjectList: function(list) {
        this.projects = list;
      },
			openProject: function(e) {
				e.preventDefault();
				let val = $(e.target).text();
				controller.loadProject(val);
			}
    }
	});
})();
