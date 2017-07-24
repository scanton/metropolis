(function() {
  var s = `
		<div class="footer-toolbar" :class="{success: this.status == 'success', failed: this.status == 'failed'}">
	   <span class="pull-right" v-if="this.status">
      {{ this.assertionCount }} expectations in {{ this.successCount + this.failCount }} tests | {{ this.successCount }} successful tests | {{ this.failCount }} failed.
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
        this.$forceUpdate();
      },
      resetStatus: function() {
        this.status = this.successCount = this.failCount = this.assertionCount = null;
        this.$forceUpdate();
      }
    },
    template: s
  });
})();
