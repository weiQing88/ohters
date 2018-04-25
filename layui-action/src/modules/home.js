layui.define(function(exports){
 
  console.log('i must do something to prove that i am right.')

  var littleGift = {
  	    aAction : function(){
  	    	console.log('A action')
  	    },
  	    bAction : function(){
  	    	 console.log('B action')
  	    }
  };

  exports('home',littleGift)
})