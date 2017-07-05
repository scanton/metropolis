(function() {
  var componentName = 'custom-dialog-box';
	var s = `
    <div class="` + componentName + ` panel panel-default">
      <h3 class="panel-heading">{{ headline }}</h3>
      <div class="panel-body" v-html="body"></div>
      <custom-buttons v-bind:buttons="buttons" class="pull-right"></custom-buttons>
    </div>
	`;

	Vue.component(componentName, {
    created: function() {
      viewController.registerView(componentName, this);
    },
    methods: {
      setHeadline: function(str) {
        this.headline = str;
      },
      setBody: function(str) {
        this.body = str;
      },
      setButtons: function(btns) {
        this.buttons = btns;
      }
    },
    data: function() {
      return {
        'headline': '',
        'body': '',
        'buttons': ''
      }
    },
		template: s
	});
})();
