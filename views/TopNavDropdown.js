(function() {
  var s = `
  <li class="dropdown">
  	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span v-bind:class="dropdown.icon"></span> {{ dropdown.title }}<span class="caret"></span></a>
  	<ul class="dropdown-menu">
  		<li v-bind:role="item.type == \'line-break\' ? \'separator\' : \'\'" v-bind:class="item.type == \'line-break\' ? \'divider\' : \'\'"
   v-for="item in dropdown.childLinks" v-bind:onclick="(item.clickHandler)"><a href="#">{{ item.title }}</a></li>
  	</ul>
  </li>
  `;

  Vue.component('top-nav-dropdown', {
    created: function() {
      viewController.registerView('top-nav-dropdown', this);
    },
    template: s,
    props: ['dropdown']
  });
})();
