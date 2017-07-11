(function() {
  var componentName = 'assertion-list';
  var s = `
		<div class="` + componentName + `">
      <div class="add-assertion-container">
        <h3>Add Assertion</h3>
        <select name="parameters">
          <option v-for="param in parameters">{{ param.name }}</option>
        </select>
        <select name="type">
          <option>is Not Null != null</option>
          <option>is Null == null</option>
          <option>is Truthy == true || 'true'</option>
          <option>is Falsey == false || []</option>
          <option>is Equal ===</option>
          <option>is Greather Than ></option>
          <option>is Less Than <</option>
          <option>is String</option>
          <option>is Array</option>
        </select>
        <input type="text" name="value" placeholder="value" />
        <button class="btn btn-success add-assertion-button">Add</button>
      </div>
      <h2 v-if="assertions">Assertions</h2>
      <ul class="assertion-list">
        <li v-for="assert in assertions">
          {{ assert.parameter }} {{ assert.type }} {{ assert.value }}
        </li>
      </ul>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    props: ['assertions', 'parameters'],
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
