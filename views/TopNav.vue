(function() {
	var s = '';
	s += '<nav class="navbar navbar-inverse">';
	s += '	<div class="container-fluid">';
	s += '		<div class="navbar-header">';
	s += '			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".metropolis-navbar-collapse-0" aria-expanded="false">';
	s += '				<span class="sr-only">Toggle navigation</span>';
	s += '				<span class="icon-bar"></span>';
	s += '				<span class="icon-bar"></span>';
	s += '				<span class="icon-bar"></span>';
	s += '			</button>';
	s += '		</div>';
	s += '		<div class="collapse navbar-collapse metropolis-navbar-collapse-0">';
	s += '			<ul class="nav navbar-nav">';
	s += '				<li class="active media-option-link option-link" data-target=""><a href="#"><span class="glyphicon glyphicon-cloud-download"></span> Services</a></li>';
	s += '				<li class="media-option-link option-link" data-target=""><a href="#"><span class="glyphicon glyphicon-ok"></span> Unit Tests</a></li>';
	s += '				<li class="media-option-link option-link" data-target=""><a href="#"><span class="glyphicon glyphicon-file"></span> Generate API</a></li>';
	s += '			</ul>';
	s += '			<ul class="nav navbar-nav navbar-right">';
	s += '				<li class="refresh-browser-link"><a href="#" v-on:click="refresh"><span class="glyphicon glyphicon-refresh"></span> Refresh</a></li>';
	s += '				<li class="toggle-dev-tools-link"><a href="#" v-on:click="toggleDevTools"><span class="glyphicon glyphicon-wrench"></span> Dev Tools</a></li>';
	s += '				<li class="settings-link"><a href="#" v-on:click="toggleSettings"><span class="glyphicon glyphicon-cog"></span> Settings</a></li>';
	s += '			</ul>';
	s += '		</div>';
	s += '	</div>';
	s += '</nav>';

	new Vue({
		el: 'top-nav',
		methods: {
			refresh: function() {
				location.reload();
			},
			toggleDevTools: function() {
				remote.getCurrentWindow().toggleDevTools();
			},
			toggleSettings: function() {
				console.log("toggle settings");
			}
		},
		template: s
	});
})();