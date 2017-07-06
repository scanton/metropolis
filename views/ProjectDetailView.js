(function() {
  var componentName = 'project-detail-view';
	var s = `
    <div class="` + componentName + ` main-view">
      <ul class="service-list">
        <li v-for="srv in projectDetails.services"><span class="glyphicon glyphicon-menu-right"></span> <span class="glyphicon" v-bind:class="{ 'glyphicon-cloud-download': srv.type == 'soap', 'glyphicon-download-alt': srv.type == 'ms-rest' }"></span> {{ srv.name }} <span class="badge">{{ srv.details.length }}</span></li>
      </ul>
    </div>
	`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    methods: {
      setProjectDetails: function(data) {
        this.projectDetails = data;
      }
    },
    data: function() {
      return {
        'projectDetails': ''
      }
    },
		template: s
	});
})();
