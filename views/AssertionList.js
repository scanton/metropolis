(function() {
  var componentName = 'assertion-list';
  var s = `
		<div class="` + componentName + `">
      <h2 v-if="assertions">Expectations</h2>
      <ul class="list-of-assertions">
        <li v-for="(assert, index) in assertions">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-3">
                {{ assert.parameter }}
              </div>
              <div class="col-xs-3">
                {{ assert.type }}
              </div>
              <div class="col-xs-3">
                {{ assert.value }}
              </div>
              <div class="col-xs-3 text-center">
                <button class="btn btn-danger delete-assertion-button has-tooltip"
                  data-tooltip="Remove expectation from test"
                  :data-test-index="test"
                  :data-assertion-index="index"
                  v-on:click="removeAssertion">
                  <span class="glyphicon glyphicon-remove"></span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="add-assertion-container" style="display: none;">
        <h3>Add Expectation</h3>
        <div class="row">
          <div class="col-xs-2 column">
            <select name="parameters">
              <option v-for="param in parameters">{{ param.name }}</option>
            </select>
          </div>
          <div class="col-xs-2 column">
            <select name="type" v-on:change="handleTypeChange">
              <option v-for="expect in expectations" :value="expect.assertionType">{{ expect.assertionName }}</option>
            </select>
          </div>
          <div class="col-xs-2 column">
            <input class="inputs-0" v-if="inputs && inputs[0]" type="text" :name="inputs[0].type" :placeholder="inputs[0].name" />
          </div>
          <div class="col-xs-2 column">
            <input class="inputs-1" v-if="inputs && inputs[1]" type="text" :name="inputs[1].type" :placeholder="inputs[1].name" />
          </div>
          <div class="col-xs-2 column">
            <input class="inputs-2" v-if="inputs && inputs[2]" type="text" :name="inputs[2].type" :placeholder="inputs[2].name" />
          </div>
          <div class="col-xs-2 column">
            <button class="btn btn-default add-assertion-button" v-on:click="addAssertion">
              Add Expectation
            </button>
          </div>
        </div>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    methods: {
      addAssertion: function(e) {
        let $this = $(e.target);
        let $parent = $this.closest(".row");
        let parameter = $parent.find("select[name='parameters']").val();
        let type = $parent.find("select[name='type']").val();
        let val0 = $parent.find("input.inputs-0").val();
        let val1 = $parent.find("input.inputs-1").val();
        let val2 = $parent.find("input.inputs-2").val();
        let values = [];
        if(val0) values.push(val0);
        if(val1) values.push(val1);
        if(val2) values.push(val2);
        controller.addAssertion(this.index, parameter, type, values);
      },
      handleTypeChange: function(e) {
        let $this = $(e.target);
        let val = $this.val();
        let exp = controller.getExpectationDetails(val);
        this.inputs = exp.values;
      },
      removeAssertion: function(e) {
        controller.showModal("Remove Expectation", "Are you sure you would like to remove this expectation?", [{
            label: "Cancel",
            class: "btn btn-default",
            handler: () => {
              controller.closeModal();
            }
          },
          {
            label: "Remove Expectation",
            class: "btn btn-success",
            handler: () => {
              let $this = $(e.target);
              let testIndex = $this.attr("data-test-index");
              if(!testIndex) {
                testIndex = $this.closest("button").attr("data-test-index");
              }
              let assertionIndex = $this.attr("data-assertion-index");
              if(!assertionIndex) {
                assertionIndex = $this.closest("button").attr("data-assertion-index");
              }
              controller.removeAssertion(testIndex, assertionIndex);
              controller.closeModal();
            }
          }]);
        controller.hideTooltip();
      }
    },
    template: s,
    props: ['assertions', 'parameters', 'index', 'test'],
    data: function() {
      return {
        controller: controller,
        expectations: model.getExpectations(),
        inputs: [{
          "name": "instance",
          "type": "instance"
        }],
        result: []
      }
    }
  });
})();
