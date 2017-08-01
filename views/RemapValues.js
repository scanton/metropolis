(function() {
  var componentName = 'remap-values';
  var s = `
		<div class="` + componentName + `">
      <h2>Remap Values (happens before call is made)</h2>
      <h3>Add Rempped Value</h3>
      <ul class="list-of-remaps">
      </ul>
      <div class="row">
        <div class="col-xs-4">
          <input type="text" name="remap-param" placeholder="param (parker)" />
        </div>
        <div class="col-xs-4">
          <input type="text" name="remap-target" placeholder="target value" />
        </div>
        <div class="col-xs-4">
          <button class="btn btn-success">Add Remap</button>
        </div>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();