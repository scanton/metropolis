(function() {
  var componentName = 'playbar';
  var s = `
		<div class="` + componentName + `" :class="{paused: paused}">
      <div class="btn-group" role="group">
        <button class="btn btn-default left-button button-fast-rewind" v-on:click="handleFastBack"><span class="glyphicon glyphicon-fast-backward"></span></button>
        <button class="btn btn-default left-button button-step-back" v-on:click="handleStepBack"><span class="glyphicon glyphicon-step-backward"></span></button>
        <button class="btn btn-default major-button button-play" v-on:click="handlePlay"><span class="glyphicon glyphicon-play"></span></button>
        <button class="btn btn-default major-button button-pause" v-on:click="handlePause"><span class="glyphicon glyphicon-pause"></span></button>
        <button class="btn btn-default right-button button-step-forward" v-on:click="handleStepForward" ><span class="glyphicon glyphicon-step-forward"></span></button>
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
      },
      setPaused: function(isPaused) {
        this.paused = isPaused;
      }
    },
    template: s,
    data: function() {
      return {
        controller: controller,
        paused: true
      }
    }
  });
})();
