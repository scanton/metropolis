(function() {
  var componentName = 'import-project';
  var s = `
		<div class="` + componentName + ` row page-view no-margin">
      <div class="col-xs-12 main-view">
        <h1>Import Project</h1>
        <p>Paste project JSON data below:</p>
        <div>
          <textarea name="project-data"></textarea>
        </div>
        <button v-on:click="checkImportData" class="btn btn-success import-data-button pull-right">Import Project</button>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    props: ['buttons'],
    data: function() {
      return {
        controller: controller
      }
    },
    methods: {
      checkImportData: function(e) {
        let data;
        let val = $("textarea[name='project-data']").val();
        if(val) {
          data = $.parseJSON(val);
        }
        if(data && Array.isArray(data.services) && Array.isArray(data.tests)) {
          controller.importProject(data);
        } else {
          controller.showModal("Invalid Project Data", "This data does not appear to be a valid project JSON file.", [{
              label: "OK",
              class: "btn btn-warning",
              handler: () => {
                controller.closeModal();
              }
            }
          ]);
        }
      }
    }
  });
})();
