import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3 from 'web3'

Vue.config.productionTip = false

// window -> Browser, escucha por el evento load
// currentProvider -> Metamask (permite comunicarse a la cadena de bloques)
window.addEventListener('load', () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    }else{
      console.warn('Not metamask detected')
    }
})

//Monta Vue en un elemento con id = app -> App.vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
