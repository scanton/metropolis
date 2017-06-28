(function() {
	var s = '';
  s += '<div class="main-view">';
	s += '<form-add-service></form-add-service>';
	s += '</div>';

	Vue.component('services-main-view', {
		template: s
	});
})();
