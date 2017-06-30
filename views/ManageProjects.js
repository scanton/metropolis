(function() {
	var s = `
    <div class="row no-margin manage-projects-view page-view">
      <div class="col-xs-4 col-sm-3 col-lg-2">
        <projects-side-bar></projects-side-bar>
      </div>
      <div class="col-xs-8 col-sm-9 col-lg-10">
        <projects-main-view></projects-main-view>
      </div>
    </div>
	`;

	Vue.component('manage-projects', {
    created: function() {
      viewController.registerView('manage-projects', this);
    },
		template: s
	});
})();
