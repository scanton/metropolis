(function() {
  var componentName = 'remap-results';
  var s = `
		<div class="` + componentName + `">
      <h2>Remap Results (happens after call is made)</h2>
      <ul class="list-of-remaps">
        <li v-for="remap in results">
          {{ remap.param }} = {{ remap.result }}
        </li>
      </ul>

      <h3>Add Rempped Result</h3>
      <div class="row full-width-inputs">
        <div class="col-xs-4">
          <input type="text" name="remap-param" placeholder="param (parker)" />
        </div>
        <div class="col-xs-4">
          <select name="parameters">
            <option v-for="param in parameters">{{ param.name }}</option>
          </select>
        </div>
        <div class="col-xs-4">
          <button class="btn btn-default" v-on:click="addRemap">Add Remap</button>
        </div>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    props: ["parameters", "index", "results"],
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
        let value = $parent.find("select[name='parameters']").val();
        let index = this.index;
        console.log(value, index, param);
        if(param && value) {
          controller.addRemapResult(index, param, value);
        }
      }
    }
  });
})();
