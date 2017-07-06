(function() {
  var componentName = 'project-detail-view';
	var s = `
    <div class="` + componentName + ` row page-view no-margin">
      <div class="col-xs-12 main-view">
        <ul class="service-list">
          <li v-for="srv in projectDetails.services" v-on:click="toggleMethodList">
            <span class="glyphicon glyphicon-menu-right arrow-icon"></span>
            <span class="glyphicon glyphicon-menu-down arrow-icon" style="display: none;"></span>
            <span class="glyphicon" v-bind:class="{ 'glyphicon-cloud-download': srv.type == 'soap', 'glyphicon-download-alt': srv.type == 'ms-rest' }"></span>
            {{ srv.name }}
            <span class="badge" v-if="srv.details.length">{{ srv.details.length }}</span>
            <ul class="method-list" style="display: none;">
              <li v-for="detail in srv.details" v-on:click="addMethodToWorkspace" v-bind:data-service-name="srv.name">{{ detail.id }}</li>
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
    methods: {
      setProjectDetails: function(data) {
        this.projectDetails = data;
      },
      toggleMethodList: function(e) {
        let $this = $(e.target);
        $this.find(".method-list").slideToggle();
        $this.find(".arrow-icon").toggle();
      },
      addMethodToWorkspace: function(e) {
        let $this = $(e.target);
        controller.addMethodToWorkspace($this.attr("data-service-name"), $this.text());
      }
    },
    data: function() {
      return {
        controller: controller,
        'projectDetails': ''
      }
    },
		template: s
	});
})();
