(function() {
  var componentName = 'playbar';
  var s = `
		<div class="` + componentName + `">
      <div class="btn-group" role="group">
        <button class="btn btn-default left-button" v-on:click="handleFastBack"><span class="glyphicon glyphicon-fast-backward"></span></button>
        <button class="btn btn-default left-button" v-on:click="handleStepBack"><span class="glyphicon glyphicon-step-backward"></span></button>
        <button class="btn btn-default major-button" v-on:click="handlePlay"><span class="glyphicon glyphicon-play"></span></button>
        <button class="btn btn-default major-button" style="display: none;" v-on:click="handlePause"><span class="glyphicon glyphicon-pause"></span></button>
        <button class="btn btn-default right-button" v-on:click="handleStepForward" ><span class="glyphicon glyphicon-step-forward"></span></button>
      </div>
		</div>
	`;
  Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    methods: {
      handleFastBack: function(e) {
        controller.resetTestIndex();
      },
      handleStepBack: function(e) {
        controller.stepBackTestIndex();
      },
      handlePlay: function(e) {
        controller.playTest();
      },
      handlePause: function(e) {
        controller.pauseTest();
      },
      handleStepForward: function(e) {
        controller.stepForwardTestIndex();
      }
    },
    template: s,
    data: function() {
      return {
        controller: controller
      }
    }
  });
})();
