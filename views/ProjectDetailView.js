(function() {
  var componentName = 'project-detail-view';
	var s = `
    <div class="` + componentName + ` row page-view no-margin">
      <div class="col-xs-12 main-view">
        <service-list :project-details="projectDetails"></service-list>
        <div class="workspace">
          <playbar></playbar>
          <div class="value-container">
            <h1 class="text-center">{{ projectDetails.name }}</h1>
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

            <h1>Methods to Test <span v-if="projectDetails && projectDetails.tests && projectDetails.tests.length" class="badge">{{ projectDetails.tests.length }}</span></h1>
            <ul class="test-list">
              <li class="service-test" :class="{ active: testIndex == index, failed: hasResult(index) && !allTestsPassed(index), passed: hasResult(index) && allTestsPassed(index) }" v-for="(test, index) in projectDetails.tests" v-bind:data-index="index">
                <button class="btn btn-info pull-right button-toggle-editable" v-on:click="toggleEditable" style="display: none;"><span class="glyphicon glyphicon-cog"></span></button>
                <button class="btn btn-default pull-right btn-toggle-params" v-on:click="toggleParameters">Show Details</button>
                <button class="btn btn-default pull-right btn-toggle-params" v-on:click="toggleParameters" style="display: none;">Hide Details</button>
                <h2>
                  <span class="glyphicon glyphicon-retweet" v-if="test.remapValues || test.remapResults"></span>
                  <button v-on:click="removeTest" class="remove-test-button btn btn-danger" :data-index="index" style="display: none;">
                    <span class="glyphicon glyphicon-remove"></span>
                  </button>
                  <div class="btn-group move-test-buttons" style="display: none;">
                    <button v-on:click="moveTestUp" :data-index="index" class="btn btn-success move-test-up-button" v-if="index > 0">
                      <span class="glyphicon glyphicon-chevron-up"></span>
                    </button>
                    <button v-on:click="moveTestDown" :data-index="index" class="btn btn-success move-test-up-down" v-if="index < model.getTestCount() - 1">
                      <span class="glyphicon glyphicon-chevron-down"></span>
                    </button>
                  </div>
                  {{ test.method }} ({{ test.service }})
                </h2>

                <remap-values :index="index" :values="test.remapValues" style="display: none;"></remap-values>

                <div class="input-details" style="display: none;">
                  <form class="method-details-form">
                    <h3 v-if="test.details.parameters">SOAP Parameters</h3>
                    <table>
                      <tr v-if="test.details.parameters" v-for="param in test.details.parameters">
                        <td>
                          {{ param.name }}
                        </td>
                        <td v-html="getInput(param.name, param.type)"></td>
                        <td class="controls"></td>
                      </tr>
                    </table>
                    <h3 v-if="test.details.uriParameters">URI Parameters</h3>
                    <table>
                      <tr v-if="test.details.uriParameters" v-for="param in test.details.uriParameters">
                        <td>
                          {{ param.name }}
                        </td>
                        <td v-html="getInput(param.name, param.type)"></td>
                        <td class="controls"></td>
                      </tr>
                    </table>
                    <h3 v-if="test.details.bodyParameters">Body Parameters</h3>
                    <table>
                      <tr v-if="test.details.bodyParameters" v-for="param in test.details.bodyParameters">
                        <td>
                          {{ param.name }}
                        </td>
                        <td v-html="getInput(param.name, param.type)"></td>
                        <td class="controls"></td>
                      </tr>
                    </table>
                  </form>
                </div>

                <div class="assertions" style="display: none;">
                  <assertion-list :test="index" :assertions="test.assertions" :defaults="test.defaultValues" :parameters="test.details.resourceDescription" :index="index"></assertion-list>
                </div>
                <test-results :result="result[index]" v-if="result" style="display: none;"></test-results>

                <!--<remap-results :index="index" :results="test.remapResults" :parameters="test.details.resourceDescription" style="display: none;"></remap-results>-->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
	`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    props: {
      result: {
        type: Array,
        default: () => []
      }
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
      allTestsPassed(index) {
        let res = this.result[Number(index)];
        if(res && res.assertions && res.assertions.length) {
          let l = res.assertions.length;
          while(l--) {
            if(!res.assertions[l].passed) {
              return false;
            }
          }
        }
        return true;
      },
      hasResult(index) {
        let res = this.result[Number(index)];
        return res != undefined;
      },
      setResults(obj) {
        this.result[Number(obj.index)] = obj.data;
        this.$forceUpdate();
      },
      removeDefaultParameter(e) {
        var $this = $(e.target);
        var item = $this.closest(".row").find("input[name='parameter']").val();
        controller.showModal("Remove Default Parameter", "Are you sure you would like to delete " + item + " from Default Values?", [{
            label: "Cancel",
            class: "btn btn-default",
            handler: () => {
              controller.closeModal();
            }
          },
          {
            label: "Delete " + item,
            class: "btn btn-success",
            handler: () => {
              let index = $this.attr("data-index");
              if(!index) {
                index = $this.closest("button").attr("data-index");
              }
              if(index) {
                model.removeDefaultParameter(index);
              }
              controller.closeModal();
            }
          }
        ]);
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
        var $this = $(e.target);
        controller.showModal("Remove Test", "Are you sure you would like to delete this test?", [{
            label: "Cancel",
            class: "btn btn-default",
            handler: () => {
              controller.closeModal();
            }
          },
          {
            label: "Delete Test",
            class: "btn btn-success",
            handler: () => {
              let index = $this.attr("data-index");
              if(index === undefined) {
                $this = $this.closest("button");
                index = Number($this.attr("data-index"));
              }
              controller.removeMethodFromWorkspace(index);
              controller.closeModal();
            }
          }
        ]);
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
        let park = model.getParker(name);
        if(park) {
          return park;
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
        let h = $(window).height();
        let $activeListItem = $("ul.test-list .service-test.active");
        let $container = $(".workspace .value-container");
        let scrollPosition = $container.scrollTop();
        $container.scrollTop(0);
        let top = $activeListItem.position().top;
        $container.scrollTop(scrollPosition);
        $container.animate({
          scrollTop: top - (h - 300)
        }, 100);
      },
      toggleParameters: function(e) {
        let $this = $(e.target);
        let $parent = $this.closest("li");
        $parent.find(".btn-toggle-params").toggle();
        $parent.find(".input-details").slideToggle();
        $parent.find(".assertions").slideToggle();
        $parent.find(".remove-test-button").toggle("fast");
        $parent.find(".move-test-buttons").toggle("fast");
        $parent.find(".test-results").slideToggle();
        $parent.find(".button-toggle-editable").toggle("fast");
        if($parent.find(".remap-values").is(":visible")) {
          this.toggleEditable(e);
        }
      },
      toggleEditable: function(e) {
        let $this = $(e.target);
        let $parent = $this.closest("li");

        $parent.find(".remap-values").slideToggle();
        $parent.find(".remap-results").slideToggle();
        $parent.find(".add-assertion-container").slideToggle();
      },
      toggleDefaultValues: function(e) {
        $(".default-values-container").slideToggle();
      },
      moveTestUp(e) {
        let $this = $(e.target);
        let index = $this.attr("data-index");
        if(index === undefined) {
          $this = $this.closest("button");
          index = $this.attr("data-index");
        }
        controller.moveTestUp(index);
      },
      moveTestDown(e) {
        let $this = $(e.target);
        let index = $this.attr("data-index");
        if(index === undefined) {
          $this = $this.closest("button");
          index = $this.attr("data-index");
        }
        if(index) {
          controller.moveTestDown(index);
        }
      }
    },
    data: function() {
      return {
        controller: controller,
        model: model,
        projectDetails: '',
        testIndex: 0,
        isPaused: true
      }
    },
		template: s
	});
})();
