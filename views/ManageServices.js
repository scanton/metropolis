(function() {
	var s = `
    <div class="row no-margin manage-services-view page-view">
      <div class="col-xs-4 col-sm-3 col-lg-2">
        <services-side-bar></services-side-bar>
      </div>
      <div class="col-xs-8 col-sm-9 col-lg-10">
        <services-main-view></services-main-view>
      </div>
    </div>
	`;

	Vue.component('manage-services', {
    created: function() {
      viewController.registerView('manage-services', this);
    },
		template: s
	});
})();
