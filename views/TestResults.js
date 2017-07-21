(function() {
  var componentName = 'test-results';
  var s = `
		<div class="` + componentName + ` container-fluid">
      <div class="row" v-if="result && result.args">
        <div class="col-xs-12 text-center data-source">
          <h2>Results From:</h2>
          <span v-if="result.uri">{{ result.uri }}</span>
          <span v-if="!result.uri">{{ result.service.uri }} - {{ result.methodDetails.id }}</span>
        </div>
        <div class="col-xs-6">
          <h3>Sent</h3>
          <div class="args"><pre>{{ JSON.stringify(result.args, null, 2) }}</pre></div>
        </div>
        <div class="col-xs-6">
          <h3>Received</h3>
          <div class="args"><pre>{{ JSON.stringify(result.result, null, 2) }}</pre></div>
        </div>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    template: s,
    props: ['result'],
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
