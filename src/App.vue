<template>
  <div id="app" v-route-change>
    <router-view></router-view>
  </div>
</template>

<script>
import {router} from './routing';
import {store} from './store/index';
import {lodash} from './common';
// var get = require('lodash.get');

export default {
  name: 'app',
  // mixins: [lodash],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  directives: {
    'route-change': {
      bind(el, binding, vnode) {
        // const links = store.getters.getPageData ? store.getters.getPageData.content.header.links : [];
        const links = lodash(store.getters.getPageData, 'content.header.links', []);
      },
      componentUpdated() {
        const links = lodash(store.getters.getPageData, 'content.header.links', []);
        // const links = store.getters.getPageData ? store.getters.getPageData.content.header.links : [];        
        const route = router.currentRoute.path;
        let currentIndex;
        links.forEach((link, index) => {
          if (route.indexOf(link.route) > -1) {
            currentIndex = index;
            }
        });
        if (route.indexOf('login') === -1) {
          const bar = document.querySelector('.bottom-bar') ? document.querySelector('.bottom-bar') : null;
          const displacement = currentIndex*100;
          bar.style['transform'] = `translateX(${displacement}%)`;
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
