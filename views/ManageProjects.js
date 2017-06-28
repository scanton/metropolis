(function() {
	var s = '';
  s +='  <div class="row no-margin manage-projects-view page-view">';
  s +='    <div class="col-xs-4 col-sm-3 col-lg-2">';
  s +='      <projects-side-bar></projects-side-bar>';
  s +='    </div>';
  s +='    <div class="col-xs-8 col-sm-9 col-lg-10">';
  s +='      <projects-main-view></projects-main-view>';
  s +='    </div>';
  s +='  </div>';

	Vue.component('manage-projects', {
		template: s
	});
})();
