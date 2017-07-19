(function() {
  var componentName = 'service-list';
  var s = `
		<ul class="` + componentName + `">
      <li>
        <button v-on:click="showAddServiceDialog" class="btn btn-default add-service-button">
          <span class="glyphicon glyphicon-plus"></span>
          Add Service
        </button>
      </li>
      <li v-for="srv in projectDetails.services" v-on:click="toggleMethodList" class="activate-mouse-hover">
        <span class="glyphicon glyphicon-menu-right arrow-icon"></span>
        <span class="glyphicon glyphicon-menu-down arrow-icon" style="display: none;"></span>
        <span class="glyphicon" v-bind:class="{ 'glyphicon-cloud-download': srv.type == 'soap', 'glyphicon-download-alt': srv.type == 'ms-rest' }"></span>
        {{ srv.name }}
        <span class="badge" v-if="getServiceDetails(srv.name) && getServiceDetails(srv.name).length">{{ getServiceDetails(srv.name).length }}</span>
        <ul class="method-list" style="display: none;">
          <li
            class="has-tooltip"
            :class="{'has-test': controller.hasTest(detail.id)}"
            data-tooltip="click to add a test"
            v-for="detail in getServiceDetails(srv.name)"
            v-on:click="addMethodToWorkspace"
            v-bind:data-service-name="srv.name">
              <span class="glyphicon glyphicon-ok" v-if="controller.hasTest(detail.id)"></span>
              {{ detail.id }}
          </li>
        </ul>
      </li>
		</ul>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    methods: {
      addMethodToWorkspace: function(e) {
        let $this = $(e.target);
        controller.addMethodToWorkspace($this.attr("data-service-name"), $this.text());
      },
      toggleMethodList: function(e) {
        let $this = $(e.target);
        $this.find(".method-list").slideToggle();
        $this.find(".arrow-icon").toggle();
        if($this.find(".glyphicon-menu-right").is(":visible")) {
          $this.addClass("activate-mouse-hover");
        } else {
          $this.removeClass("activate-mouse-hover");
        }
      },
      getServiceDetails: function(name) {
        let det = stripObservers(this.serviceDetails);
        name = name.trim();
        return det[name];
      },
      setServiceDetails: function(data) {
        this.serviceDetails = data;
        this.$forceUpdate();
      },
      showAddServiceDialog() {
        console.log("show add service dialog");
      }
    },
    template: s,
    props: ['projectDetails'],
    data: function() {
      return {
        controller: controller,
        serviceDetails: {}
      }
    }
  });
})();
