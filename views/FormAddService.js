(function() {
	var s = '';
  s += '<div class="form-add-service">';
	s += '  <form>';
  s += '    <table>';
  s += '      <tr>';
  s += '        <td>Service Type</td>';
  s += '        <td><select v-on:change="onServiceChange" name="service-type"><option data-label="Help Page URI">.NET REST</option><option data-label="WSDL URI">.NET SOAP</option></select></td>';
  s += '      </tr>';
  s += '      <tr>';
  s += '        <td class="uri-type-label">Help Page URI</td>';
  s += '        <td><input type="text" name="uri" /></td>';
  s += '      </tr>';
  s += '    </table>';
  s += '  </form>';
	s += '</div>';

	Vue.component('form-add-service', {
		template: s,
    methods: {
      onServiceChange: function(e) {
        var $this = $(e.target);
        var val = $this.find(":selected").attr("data-label");
        $(".form-add-service .uri-type-label").text(val);
      }
    }
	});
})();
