(function() {
  var componentName = 'project-detail-view';
	var s = `
    <div class="` + componentName + ` row page-view no-margin">
      <div class="col-xs-12 main-view">
        <service-list :project-details="projectDetails"></service-list>
        <div class="workspace">
          <playbar></playbar>
          <div class="default-values">
            <button class="btn btn-default pull-right btn-toggle-parker" v-on:click="toggleDefaultValues">Toggle Details</button>
            <h2>Default Values <span class="badge">{{ getPropCount(projectDetails.defaultValues) }}</span></h2>
            <div class="default-values-container" style="display: none;">
              <ul class="default-values-list">
                <li v-for="(item, index) in projectDetails.defaultValues">
                  <div class="row">
                    <div class="col-xs-5">
                      <input :value="index" name="parameter" v-on:change="updateDefaultParameter" />
                    </div>
                    <div class="col-xs-5">
                      <input :value="item" name="value" v-on:change="updateDefaultParameter" />
                    </div>
                    <div class="col-xs-2 text-center">
                      <button class="btn btn-danger has-tooltip" data-tooltip="Remove default value" :data-index="index" v-on:click="removeDefaultParameter">
                        <span class="glyphicon glyphicon-remove"></span>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
              <h3>Add Default Value</h3>
              <div class="container-fluid">
                <div class="add-default-value-container row">
                  <div class="col-xs-4">
                    <input type="text" name="parameter" placeholder="parameter" />
                  </div>
                  <div class="col-xs-4">
                    <input type="text" name="value" placeholder="value" />
                  </div>
                  <div class="col-xs-4">
                    <button class="btn btn-success add-value-button" v-on:click="addDefaultValue">Add Default</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1>Methods to Test</h1>
          <ul class="test-list">
            <li class="service-test" :class="{ active: testIndex == index }" v-for="(test, index) in projectDetails.tests" v-bind:data-index="index">
              <button class="btn btn-default pull-right btn-toggle-params" v-on:click="toggleParameters">Show Details</button>
              <button class="btn btn-default pull-right btn-toggle-params" v-on:click="toggleParameters" style="display: none;">Hide Details</button>
              <h2>
                <button v-on:click="removeTest" class="remove-test-button btn btn-danger" :data-index="index" style="display: none;">
                  <span class="glyphicon glyphicon-remove"></span>
                </button>
                {{ test.method }} ({{ test.service }})
              </h2>
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
              <div class="assertions" style="display: none;">
                <assertion-list :test="index" :assertions="test.assertions" :defaults="test.defaultValues" :parameters="test.details.resourceDescription" :index="index"></assertion-list>
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
      addDefaultValue(e) {
        let $this = $(e.target);
        let $row = $this.closest(".row");
        let param = $row.find("input[name='parameter']").val();
        let val = $row.find("input[name='value']").val();
        if(param && val) {
          model.addDefaultParameter(param, val);
          $row.find("input[name='value']").val('');
          $row.find("input[name='value']").val('');
        }
      },
      removeDefaultParameter(e) {
        let $this = $(e.target);
        let index = $this.attr("data-index");
        if(!index) {
          index = $this.closest("button").attr("data-index");
        }
        if(index) {
          model.removeDefaultParameter(index);
        }
        controller.hideTooltip();
      },
      updateDefaultParameter(e) {
        let $this = $(e.target);
        let $row = $this.closest(".row");
        let param = $row.find("input[name='parameter']").val();
        let val = $row.find("input[name='value']").val();
        model.updateDefaultParameter(param, val);
      },
      removeTest(e) {
        let $this = $(e.target);
        let index = $this.attr("data-index");
        if(!index) {
          $this = $this.closest("button");
          let index = $this.attr("data-index");
        }
        controller.removeMethodFromWorkspace(index);
      },
      getInput(name, type) {
        if(type == 'xs:int' || type == 'integer' || type == 'decimal number' || type == 'xs:int') {
          return '<input name="' + name + '" type="number" value="' + this.getDefaultValue(name, type) + '" />';
        } else if(type == 'boolean') {
          return '<input name="' + name + '" type="checkbox" ' + this.getDefaultValue(name, type) + ' />';
        }
        return '<input name="' + name + '" type="text" value="' + this.getDefaultValue(name, type) + '" />';
      },
      getDefaultValue: function(name, type) {
        if(this.projectDetails && this.projectDetails.defaultValues && this.projectDetails.defaultValues[name]) {
          if(type == 'boolean') {
            return 'checked="checked"';
          }
          return this.projectDetails.defaultValues[name];
        }
        if(type == 'xs:int' || type == 'integer' || type == 'decimal number' || type == 'xs:int') {
          return 0;
        }
        return '';
      },
      getPropCount: function(data) {
        let count = 0;
        for(let i in data) {
          ++count;
        }
        return count;
      },
      setProjectDetails: function(data) {
        this.projectDetails = data;
      },
      setTestIndex: function(index) {
        this.testIndex = index;
      },
      toggleParameters: function(e) {
        let $this = $(e.target);
        let $parent = $this.closest("li");
        $parent.find(".btn-toggle-params").toggle();
        $parent.find(".input-details").slideToggle();
        $parent.find(".assertions").slideToggle();
        $parent.find(".remove-test-button").toggle("fast");
      },
      toggleDefaultValues: function(e) {
        $(".default-values-container").slideToggle();
      }
    },
    data: function() {
      return {
        controller: controller,
        projectDetails: '',
        testIndex: 0,
        isPaused: true
      }
    },
		template: s
	});
})();
