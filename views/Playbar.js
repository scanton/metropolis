(function() {
  var componentName = 'playbar';
  var s = `
		<div class="` + componentName + `">
      <div class="btn-group" role="group">
        <button class="btn btn-default left-button""><span class="glyphicon glyphicon-fast-backward"></span></button>
        <button class="btn btn-default left-button"><span class="glyphicon glyphicon-step-backward"></span></button>
        <button class="btn btn-default major-button"><span class="glyphicon glyphicon-play"></span></button>
        <button class="btn btn-default major-button" style="display: none;"><span class="glyphicon glyphicon-pause"></span></button>
        <button class="btn btn-default right-button" ><span class="glyphicon glyphicon-step-forward"></span></button>
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
