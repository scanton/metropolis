(function() {
  var s = '';
  s += '<li class="dropdown">';
  s += '	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span v-bind:class="dropdown.icon"></span> {{ dropdown.title }}<span class="caret"></span></a>';
  s += '	<ul class="dropdown-menu">';
  s += '		<li v-bind:role="item.type == \'line-break\' ? \'separator\' : \'\'" v-bind:class="item.type == \'line-break\' ? \'divider\' : \'\'"';
  s += ' v-for="item in dropdown.childLinks" v-bind:onclick="item.clickHandler"><a href="#">{{ item.title }}</a></li>';

//  s += '		<li><a href="#">About Metropolis</a></li>';
//  s += '		<li role="separator" class="divider"></li>';
//  s += '		<li><a href="#">New Project</a></li>';
//  s += '		<li><a href="#">Load Project</a></li>';
//  s += '		<li><a href="#">Save Project</a></li>';
//  s += '		<li><a href="#">Save Project As...</a></li>';
//  s += '		<li role="separator" class="divider"></li>';
//  s += '		<li><a href="#">Preferences</a></li>';
  s += '	</ul>';
  s += '</li>';

  Vue.component('top-nav-dropdown', {
    template: s,
    props: ['dropdown']
  });
})();
