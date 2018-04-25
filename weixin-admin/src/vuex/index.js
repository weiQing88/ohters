import Vue from 'vue'
import Vuex from 'vuex'

import Getters from './getters.js'
import logModule from './modules/log.js'
import appModule from './modules/app.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	 modules : {
	 	login : logModule,
	 	app : appModule
	 },
  getters : Getters
})


export default store