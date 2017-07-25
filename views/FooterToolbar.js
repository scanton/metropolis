(function() {
  var s = `
		<div class="footer-toolbar" :class="{success: this.status == 'success', failed: this.status == 'failed'}">
	   <span class="pull-right" v-if="this.status">
      {{ this.assertionCount }} expectations in {{ this.testCount }} tests | {{ this.successCount }} successful tests | {{ this.failCount }} failed.
     </span>
		</div>
	`;
  Vue.component('footer-toolbar', {
    created: function() {
      viewController.registerView('footer-toolbar', this);
    },
    methods: {
      setStatus: function(data) {
        this.status = data.status;
        this.successCount = data.successCount;
        this.failCount = data.failCount;
        this.assertionCount = data.assertionCount;
        this.testCount = data.testCount;
        this.$forceUpdate();
      },
      resetStatus: function() {
        this.testCount = this.status = this.successCount = this.failCount = this.assertionCount = null;
        this.$forceUpdate();
      }
    },
    template: s
  });
})();
