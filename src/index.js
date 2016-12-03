/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* [ Vue Freeze JS ]
*   Version 0.0.1
*
*/

import Freezer from 'freezer-js'
import assign from 'lodash/assign.js'

(function(){

  var VueFreeze = {

    install(Vue,opt){


      // Check the Freezer~
      if( typeof Freezer == 'undefined' ) return console.warn('[Vue Freeze]: You Must Install Freezer.js first!')

      var plugin = this

      // Plugin Store
      if(typeof opt  == 'undefined') {
        return console.warn('[Vue Freeze]: Please Specify the store! Via Vue.use Options!')
      }
      else {
        // live update?
        var live = opt.live ? opt.live : true

        // make our store!
        var store =  new Freezer(opt.state,{live:live})

        // binding the action
        opt.action(store)
      }

      // Make a data become mutable
      var mutable = (data) => JSON.parse(JSON.stringify(data))

      // Make a mixin
      plugin.mixin = {}

      // To make the state become watchable!
      plugin.mixin.data = function(){
        return{
          state: {}
        }
      }

      // Mixin Methods For vm instance
      plugin.mixin.methods = {
        // set the vm state to new state
        updateState(old,val){
          let newState = assign({},this.state,store.get().toJS())
          this.$set('state',newState)
        }
      }

      // Mixin Created Event
      plugin.mixin.created = function() {
        var me = this

        // set global state as internal state
        me.$set('state',mutable(store.get()))

        // Make Methods
        Vue.util.defineReactive(this,'$store',store)
        Vue.util.defineReactive(this,'$action', function(eventName,arg){
          // trigger freezer event with pass the old value at the end
          store.trigger(eventName,arg,me.state)
        })

        // When Store Updated~
        me.$store.on('update', function (val) {
          // Update the state
          me.updateState(me.state,val)
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
    return window.VueFreeze = VueFreeze
  }

})();
