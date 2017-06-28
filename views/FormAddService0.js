(function() {
	var s = '';
  s += '<div class="panel panel-default">';
  s += '	<div class="panel-heading">';
  s += '		Add Service to Project';
  s += '	</div>';
  s += '	<div class="panel-body">';
  s += '		<div class="form-add-service">';
	s += '  		<form class="metropolis-form">';
  s += '    		<table>';
  s += '      		<tr>';
  s += '        		<td>Service Type</td>';
  s += '        		<td><select name="service-type"><option data-label="Help Page URI">.NET REST</option><option data-label="WSDL URI">SOAP</option></select></td>';
  s += '      		</tr>';
  s += '      		<tr>';
  s += '        		<td class="uri-type-label">Help Page URI</td>';
  s += '        		<td><input type="text" name="uri" /></td>';
  s += '      		</tr>';
  s += '      		<tr>';
  s += '        		<td></td>';
  s += '        		<td><button v-on:click="formSubmit" class="btn btn-success pull-right submit-button">Add Service</button></td>';
  s += '      		</tr>';
  s += '    		</table>';
  s += '  		</form>';
	s += '		</div>';
	s += '	</div>';
	s += '</div>';

	Vue.component('form-add-service', {
		template: s,
		methods: {
			formSubmit: function(e) {
				e.preventDefault();
				var $form = $(e.target).closest("form");
				var uri = $form.find("input[name='uri']").val();
				var type = $form.find("select[name='service-type']").val();
				controller.getServiceData(type, uri);
			}
		},
		mounted: function() {
			$(this.$el).find("select").selectmenu({
				change: function(e) {
					var $this = $(e.target);
	        var val = $this.find(":selected").attr("data-label");
	        $(".form-add-service .uri-type-label").text(val);
				}
			});
		}
	});
})();
