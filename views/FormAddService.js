(function() {
	var s = `
	  <div class="panel panel-default">
	  	<div class="panel-heading">
	  		Add Service to Project
	  	</div>
	  	<div class="panel-body">
	  		<div class="form-add-service">
		  		<form class="metropolis-form">
	      		<table>
	        		<tr>
	          		<td>Service Type</td>
	          		<td><select name="service-type"><option data-label="Help Page URI">.NET REST</option><option data-label="WSDL URI">SOAP</option></select></td>
	        		</tr>
	        		<tr>
	          		<td class="uri-type-label">Help Page URI</td>
	          		<td><input type="text" name="uri" /></td>
	        		</tr>
	        		<tr>
	          		<td></td>
	          		<td><button v-on:click="formSubmit" class="btn btn-success pull-right submit-button">Add Service</button></td>
	        		</tr>
	      		</table>
	    		</form>
				</div>
			</div>
		</div>
	`;

	Vue.component('form-add-service', {
    created: function() {
      viewController.registerView('form-add-service', this);
    },
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
