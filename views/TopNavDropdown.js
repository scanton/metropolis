(function() {
	var s = '';
	s += '<li class="dropdown">';
	s += '	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-globe"></span> Metropolis <span class="caret"></span></a>';
	s += '	<ul class="dropdown-menu">';
	s += '		<li><a href="#">New Project</a></li>';
	s += '		<li><a href="#">Load Project</a></li>';
	s += '		<li><a href="#">Save Project</a></li>';
	s += '		<li><a href="#">Save Project As...</a></li>';
	s += '		<li role="separator" class="divider"></li>';
	s += '		<li><a href="#">Preferences</a></li>';
	s += '	</ul>';
	s += '</li>';

	Vue.component('top-nav-dropdown', {
		template: s
	});
})();