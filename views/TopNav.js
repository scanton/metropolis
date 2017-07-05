(function() {
  var s = `
    <nav class="navbar navbar-inverse">
    	<div class="container-fluid">
    		<div class="navbar-header">
    			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".metropolis-navbar-collapse-0" aria-expanded="false">
    				<span class="sr-only">Toggle navigation</span>
    				<span class="icon-bar"></span>
    				<span class="icon-bar"></span>
    				<span class="icon-bar"></span>
    			</button>
    		</div>
    		<div class="collapse navbar-collapse metropolis-navbar-collapse-0">
    			<ul class="nav navbar-nav">
    				<top-nav-dropdown v-bind:dropdown="dropDown1"></top-nav-dropdown>
            <!--
    				<li onclick="controller.showView(\'manage-services-view\')" class="media-option-link option-link" data-target=""><a href="#"><span class="glyphicon glyphicon-cloud-download"></span> Services</a></li>
    				<li onclick="controller.showView(\'Unit Tests\')" class="media-option-link option-link" data-target=""><a href="#"><span class="glyphicon glyphicon-ok"></span> Unit Tests</a></li>
    				<li onclick="controller.showView(\'Generate API\')" class="media-option-link option-link" data-target=""><a href="#"><span class="glyphicon glyphicon-file"></span> Generate API</a></li>
            -->
    			</ul>
    			<ul class="nav navbar-nav navbar-right">
    				<li class="refresh-browser-link"><a href="#" v-on:click="refresh"><span class="glyphicon glyphicon-refresh"></span> Refresh</a></li>
    				<li class="toggle-dev-tools-link"><a href="#" v-on:click="toggleDevTools"><span class="glyphicon glyphicon-wrench"></span> Dev Tools</a></li>
    				<li class="settings-link"><a href="#" v-on:click="toggleSettings"><span class="glyphicon glyphicon-cog"></span> Settings</a></li>
    			</ul>
    		</div>
    	</div>
    </nav>
  `;

  Vue.component('top-nav', {
    created: function() {
      viewController.registerView('top-nav', this);
    },
    template: s,
    data: function() {
      return {
        title: 'Metropolis',
        dropDown1: {
          title: 'Metropolis',
          icon: 'glyphicon glyphicon-globe',
          childLinks: [{
              title: 'About Metropolis',
              clickHandler: 'controller.showView("About Metropolis")'
            },
            {
              type: 'line-break'
            },
            {
              title: 'New Project',
              clickHandler: 'controller.createNewProject()'
            },
            {
              title: 'Open Project...',
              clickHandler: 'controller.openProject()'
            },
            {
              type: 'line-break'
            },
            {
              title: 'Preferences',
              clickHandler: 'controller.showView("Preferences")'
            }
          ]
        }
      }
    },
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
    }
  });
})();
