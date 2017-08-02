(function() {
  var componentName = 'remap-values';
  var s = `
		<div class="` + componentName + `">
      <h2>Remap Values (happens before call is made)</h2>
      <ul class="list-of-remaps">
        <li v-for="remap in values">
          {{ remap.param }} = {{ remap.value }} (parked)
        </li>
      </ul>

      <h3>Add Rempped Value</h3>
      <div class="row full-width-inputs">
        <div class="col-xs-4">
          <input type="text" name="remap-param" placeholder="param (parker)" />
        </div>
        <div class="col-xs-4">
          <input type="text" name="remap-target" placeholder="target value" />
        </div>
        <div class="col-xs-4">
          <button class="btn btn-default" :data-index="index" v-on:click="addRemap">Add Remap</button>
        </div>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    props: ["index", "values"],
    template: s,
    data: function() {
      return {
        controller: controller
      }
    },
    methods: {
      addRemap: function(e) {
        let $this = $(e.target);
        let $parent = $this.closest(".row");
        let param = $parent.find("input[name='remap-param']").val();
        let value = $parent.find("input[name='remap-target']").val();
        let index = this.index;
        if(param && value) {
          controller.addRemapValue(index, param, value);
        }
      }
    }
  });
})();
