/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* [ Vue Freeze JS ]
*   Version 1.0.0
*
*/
import Freezer from './freezer.min.js'

(function(){

	var VueFreeze = {

		install(Vue,opt){


			// Check the Freezer
			if( typeof Freezer == 'undefined' ) console.warn('[Vue Freeze]: You Must Install Freezer.js firs!')

			var plugin = this

			// Plugin Store
      if(typeof opt  == 'undefined') {
        console.warn('[Vue Freeze]: Please Specify the store! Via Vue.use Options!')
        return false
      }
			else {
        // live update?
        var live = opt.live ? opt.live : true
        // make our store!
        var store =  new Freezer(opt.state,{live:live})
				// binding the store
        opt.action(store)
      }

			// Make a mixin
			plugin.mixin = {}

			// Mixin Methods For vm instance
			plugin.mixin.methods = {
				// For mutable data
				mutable(data){
					return JSON.parse(JSON.stringify(data))
				},

				// set the vm $state to new state
		    updateState(old,val){
					this.$set('$state',store.get())
		    }
			}

			// Mixin Created Event
			plugin.mixin.created = function() {
        var me = this

				// Make Methods
				Vue.util.defineReactive(this,'$store',store)
				Vue.util.defineReactive(this,'$state',store.get())
		    Vue.util.defineReactive(this,'$action', function(eventName,args){
					// trigger freeze event with pass the old value at the end
					store.trigger(eventName,args,me.$state)
				})

				// When Store Updated~
		    this.$store.on('update', function (val) {
					// Update the state
		      me.updateState(me.$state,val)
		    })
			}

			// Merge mixin to VM via vue options
			Vue.options = Vue.util.mergeOptions(Vue.options, plugin.mixin)

		} // install()


	} // VueFreeze


	// If support node / ES6 module
	if( typeof module === 'object' && module.exports ){
		module.exports = VueFreeze
	}
	// if using require js
	if (typeof define === 'function' && define.amd) {
		define(() => { return VueFreeze })
	}
	// if script loaded by script tag in HTML file
	if (typeof window !== undefined) {
		window.VueFreeze = VueFreeze
	}

})();
