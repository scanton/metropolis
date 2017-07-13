(function() {
  var componentName = 'assertion-list';
  var s = `
		<div class="` + componentName + `">
      <h2 v-if="assertions">Assertions</h2>
      <ul class="list-of-assertions">
        <li v-for="(assert, index) in assertions">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-3">
                {{ assert.parameter }}
              </div>
              <div class="col-xs-3">
                {{ getCasualAssertion(assert.type) }}
              </div>
              <div class="col-xs-3">
                {{ assert.value }}
              </div>
              <div class="col-xs-3 text-center">
                <button class="btn btn-danger delete-assertion-button has-tooltip"
                  data-tooltip="Remove assertion from test"
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
      <div class="add-assertion-container">
        <h3>Add Assertion</h3>
        <div class="row">
          <div class="col-xs-3">
            <select name="parameters">
              <option v-for="param in parameters">{{ param.name }}</option>
            </select>
          </div>
          <div class="col-xs-3">
            <select name="type" v-on:change="handleTypeChange">
              <option value="is-equal">is Equal ==</option>
              <option value="is-greater-than">is Greather Than ></option>
              <option value="is-less-than">is Less Than <</option>
              <option value="is-not-null">is Not Null</option>
              <option value="is-null">is Null</option>
              <option value="is-truthy">is True</option>
              <option value="is-falsey">is False</option>
              <option value="is-string">is String (not empty)</option>
              <option value="is-object">is Object</option>
              <option value="is-array">is Array</option>
              <option value="contains-value">Contains Value (object or array)</option>
              <option value="contains-index">Contains Index (object or array)</option>
              <option value="matches-regex">Matches (regex)</option>
              <option value="length-equals">Length Equals</option>
              <option value="length-greater-than">Length Greater Than</option>
              <option value="length-less-than">Length Less Than</option>
            </select>
          </div>
          <div class="col-xs-3">
            <input type="text" name="value" placeholder="value" />
          </div>
          <div class="col-xs-3">
            <button class="btn btn-success add-assertion-button" v-on:click="addAssertion">
              Add Assertion
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
        let value = $parent.find("input[name='value']").val();
        controller.addAssertion(this.index, parameter, type, value);
      },
      getCasualAssertion: function(type) {
        if(type == 'is-equal') {
          return "Equals";
        } else if(type == 'is-greater-than') {
          return "Is Greater Than"
        } else if(type == 'is-less-than') {
          return "Is Less Than";
        } else if(type == 'is-not-null') {
          return "Is Not Null";
        } else if(type == 'is-null') {
          return "Is Null";
        } else if(type == 'is-truthy') {
          return "Is True";
        } else if(type == 'is-falsey') {
          return "Is False";
        } else if(type == 'is-string') {
          return "Is String";
        } else if(type == 'is-object') {
          return "Is Object";
        } else if(type == 'is-array') {
          return "Is Array";
        } else if(type == 'contains-value') {
          return "Contains Value";
        } else if(type == 'contains-index') {
          return "Contains Index";
        } else if(type == 'matches-regex') {
          return "Matches Regular Expression"
        } else if(type == 'length-equals') {
          return "Length Equals";
        } else if(type == 'length-greater-than') {
          return "Length Greater Than";
        } else if(type == 'length-less-than') {
          return "Length Less Than";
        }
        return 'unknown';
      },
      handleTypeChange: function(e) {
        let $this = $(e.target);
        let val = $this.val();
        if(val == 'is-equal' || val == 'is-greater-than' || val == 'is-less-than') {
          $this.closest(".row").find("input[name='value']").fadeIn();
        } else {
          $this.closest(".row").find("input[name='value']").fadeOut();
        }
      },
      removeAssertion: function(e) {
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
      }
    },
    template: s,
    props: ['assertions', 'parameters', 'index', 'test'],
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
