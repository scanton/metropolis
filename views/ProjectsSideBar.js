(function() {
	var s = '';
  s += '<div class="side-bar projects-side-bar">';
  s += '<h1>{{ title }}</h1>';
  s += '<ul class="project-list">';
  s += '<li v-for="project in projects" v-on:click="openProject">{{ project }}</li>'
  s += '</ul>';
	s += '</div>';

	Vue.component('projects-side-bar', {
    created: function() {
      viewController.registerView('projects-side-bar', this);
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
