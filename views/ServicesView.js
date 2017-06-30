(function() {
	var s = `
		<div class="container-fluid no-pad">
			<div class="row no-margin">
				<div class="col-xs-4 col-sm-3 col-lg-2">
					<side-bar></side-bar>
				</div>
				<div class="col-xs-8 col-sm-9 col-lg-10">
					<main-view></main-view>
				</div>
			</div>
			<footer-toolbar></footer-toolbar>
		</div>
	`;

	Vue.component('services-view', {
    created: function() {
      viewController.registerView('services-view', this);
    },
		template: s
	});
})();
