(function() {
	var s = `
	  <div class="panel panel-default">
	  	<div class="panel-heading">
	  		Add Project
	  	</div>
	  	<div class="panel-body">
	  		<div class="form-add-project">
		  		<form class="metropolis-form">
	      		<table>
	        		<tr>
	          		<td>Project Name</td>
	          		<td><input type="text" name="name" /></td>
	        		</tr>
	        		<tr>
	          		<td></td>
	          		<td><button v-on:click="formSubmit" class="btn btn-success pull-right submit-button">Add Project</button></td>
	        		</tr>
	      		</table>
	    		</form>
				</div>
				<div class="description">
					<p>All Metropolis sessions begin by either creating or loading a project.  Projects keep your service configurations and unit tests packaged together to make it easy to switch between proejcts or save your work so you can come back to it later.</p>
				</div>
			</div>
	</div>
	`;

	Vue.component('form-add-project', {
    created: function() {
      viewController.registerView('form-add-project', this);
    },
		template: s,
		methods: {
			formSubmit: function(e) {
				e.preventDefault();
				var $form = $(e.target).closest("form");
				var val = $form.find("input[name='name']").val();
				controller.addProject(val);
			}
		}
	});
})();
