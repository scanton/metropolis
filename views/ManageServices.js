(function() {
	var s = '';
  s +='  <div class="row no-margin manage-services-view page-view">';
  s +='    <div class="col-xs-4 col-sm-3 col-lg-2">';
  s +='      <services-side-bar></services-side-bar>';
  s +='    </div>';
  s +='    <div class="col-xs-8 col-sm-9 col-lg-10">';
  s +='      <services-main-view></services-main-view>';
  s +='    </div>';
  s +='  </div>';

	Vue.component('manage-services', {
    created: function() {
      viewController.registerView('manage-services', this);
    },
		template: s
	});
})();
