(function() {
  var s = '';
  s += '<li class="dropdown">';
  s += '	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span v-bind:class="dropdown.icon"></span> {{ dropdown.title }}<span class="caret"></span></a>';
  s += '	<ul class="dropdown-menu">';
  s += '		<li v-bind:role="item.type == \'line-break\' ? \'separator\' : \'\'" v-bind:class="item.type == \'line-break\' ? \'divider\' : \'\'"';
  s += ' v-for="item in dropdown.childLinks" v-bind:onclick="(item.clickHandler)"><a href="#">{{ item.title }}</a></li>';
  s += '	</ul>';
  s += '</li>';

  Vue.component('top-nav-dropdown', {
    created: function() {
      viewController.registerView('top-nav-dropdown', this);
    },
    template: s,
    props: ['dropdown']
  });
})();
