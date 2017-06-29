(function() {
	var s = '';
  s += '<div class="panel panel-default">';
  s += '	<div class="panel-heading">';
  s += '		Add Project';
  s += '	</div>';
  s += '	<div class="panel-body">';
  s += '		<div class="form-add-project">';
	s += '  		<form class="metropolis-form">';
  s += '    		<table>';
  s += '      		<tr>';
  s += '        		<td>Project Name</td>';
  s += '        		<td><input type="text" name="name" /></td>';
  s += '      		</tr>';
  s += '      		<tr>';
  s += '        		<td></td>';
  s += '        		<td><button v-on:click="formSubmit" class="btn btn-success pull-right submit-button">Add Project</button></td>';
  s += '      		</tr>';
  s += '    		</table>';
  s += '  		</form>';
	s += '		</div>';
	s += '		<div class="description">';
	s += '			<p>All Metropolis sessions begin by either creating or loading a project.  Projects keep your service configurations and unit tests packaged together to make it easy to switch between proejcts or save your work so you can come back to it later.</p>'
	s += '		</div>';
	s += '	</div>';
	s += '</div>';

	Vue.component('form-add-project', {
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
