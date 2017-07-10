(function() {
  var componentName = 'project-detail-view';
	var s = `
    <div class="` + componentName + ` row page-view no-margin">
      <div class="col-xs-12 main-view">
        <ul class="service-list">
          <li v-for="srv in projectDetails.services" v-on:click="toggleMethodList" class="activate-mouse-hover">
            <span class="glyphicon glyphicon-menu-right arrow-icon"></span>
            <span class="glyphicon glyphicon-menu-down arrow-icon" style="display: none;"></span>
            <span class="glyphicon" v-bind:class="{ 'glyphicon-cloud-download': srv.type == 'soap', 'glyphicon-download-alt': srv.type == 'ms-rest' }"></span>
            {{ srv.name }}
            <span class="badge" v-if="srv.details && srv.details.length">{{ srv.details.length }}</span>
            <ul class="method-list" style="display: none;">
              <li class="has-tooltip" data-tooltip="click to add a test" v-for="detail in srv.details" v-on:click="addMethodToWorkspace" v-bind:data-service-name="srv.name">{{ detail.id }}</li>
            </ul>
          </li>
        </ul>
        <div class="workspace">
          <playbar></playbar>
          <div class="default-values">
            <button class="btn btn-default pull-right btn-toggle-parker">Show Default Values</button>
            <h2>Default Values</h2>
            <div class="parker-values">
            </div>
          </div>
          <h1>Methods to Test</h1>
          <ul class="test-list">
            <li class="service-test" v-for="test in projectDetails.tests">

              <button class="btn btn-default pull-right btn-toggle-params" v-on:click="toggleParameters">Show Parameters</button>
              <button class="btn btn-default pull-right btn-toggle-params" v-on:click="toggleParameters" style="display: none;">Hide Parameters</button>

              <h2>{{ test.method }} ({{ test.service }})</h2>
              <div class="input-details" style="display: none;">
                <form class="method-details-form">
                  <h3 v-if="test.details.parameters">SOAP Parameters</h3>
                  <table>
                    <tr v-if="test.details.parameters" v-for="param in test.details.parameters">
                      <td>
                        {{ param.name }}
                      </td>
                      <td v-html="getInput(param.name, param.type)"></td>
                    </tr>
                  </table>

                  <h3 v-if="test.details.uriParameters">URI Parameters</h3>
                  <table>
                    <tr v-if="test.details.uriParameters" v-for="param in test.details.uriParameters">
                      <td>
                        {{ param.name }}
                      </td>
                      <td v-html="getInput(param.name, param.type)"></td>
                    </tr>
                  </table>

                  <h3 v-if="test.details.bodyParameters">Body Parameters</h3>
                  <table>
                    <tr v-if="test.details.bodyParameters" v-for="param in test.details.bodyParameters">
                      <td>
                        {{ param.name }}
                      </td>
                      <td v-html="getInput(param.name, param.type)"></td>
                    </tr>
                  </table>
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
	`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    methods: {
      getInput(name, type) {
        if(type == 'xs:int' || type == 'integer' || type == 'decimal number' || type == 'xs:int') {
          return '<input name="' + name + '" type="number" value="0" />';
        } else if(type == 'boolean') {
          return '<input name="' + name + '" type="checkbox" />';
        }
        return '<input name="' + name + '" type="text" />';
      },
      setProjectDetails: function(data) {
        this.projectDetails = data;
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
      toggleParameters: function(e) {
        let $this = $(e.target);
        let $parent = $this.closest("li");
        $parent.find(".btn-toggle-params").toggle();
        $parent.find(".input-details").slideToggle();
      },
      addMethodToWorkspace: function(e) {
        let $this = $(e.target);
        controller.addMethodToWorkspace($this.attr("data-service-name"), $this.text());
      }
    },
    data: function() {
      return {
        controller: controller,
        'projectDetails': '',
      }
    },
		template: s
	});
})();
