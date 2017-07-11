(function() {
  var componentName = 'assertion-list';
  var s = `
		<div class="` + componentName + `">
      <h2 v-if="assertions">Assertions</h2>
      <ul class="assertion-list">
        <li v-for="assert in assertions">
          {{ assert.parameter }} {{ assert.type }} {{ assert.value }}
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
            </select>
          </div>
          <div class="col-xs-3">
            <input type="text" name="value" placeholder="value" />
          </div>
          <div class="col-xs-3">
            <button class="btn btn-success add-assertion-button" v-on:click="addAssertion">Add Assertion</button>
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
      handleTypeChange: function(e) {
        let $this = $(e.target);
        let val = $this.val();
        if(val == 'is-equal' || val == 'is-greater-than' || val == 'is-less-than') {
          $this.closest(".row").find("input[name='value']").fadeIn();
        } else {
          $this.closest(".row").find("input[name='value']").fadeOut();
        }
      }
    },
    template: s,
    props: ['assertions', 'parameters', 'index'],
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
