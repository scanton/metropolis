(function() {
	var s = '';
	s += '<div class="container-fluid no-pad">';
	s += '	<div class="row no-margin">';
	s += '		<div class="col-xs-4 col-sm-3 col-lg-2">';
	s += '			<side-bar></side-bar>';
	s += '		</div>';
	s += '		<div class="col-xs-8 col-sm-9 col-lg-10">';
	s += '			<main-view></main-view>';
	s += '		</div>';
	s += '	</div>';
	s += '	<footer-toolbar></footer-toolbar>';
	s += '</div>';

	Vue.component('services-view', {
		template: s
	});
})();