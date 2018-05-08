/*

*现在window下挂载已个 class 超级父类，这个类有个静态扩展方法（extend），
*扩展方法接受一个对象作为参数，然后在内部对参数进行遍历，把属性和方法 赋值给 class 类的实例。最后，创建一个构造函数，
*并将class 实例对象赋值给新构造函数的原型对象上，和 class上的静态扩展方法赋值给，新构造函数做静态方法
*@method class 
*@method extend 
*@param{object}
*/


(function(){

  var initializing = false, 
      fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  // 超级父类
  this.Class = function(){ this.name = '超类'};

  Class.extend = function(prop) {

    var _super = this.prototype;    // ===> window.class 

    initializing = true;

    var prototype = new this();    // ===> new window.class()

    initializing = false;

   
    for (var name in prop) {

      prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn){

          return function() {

            var tmp = this._super;  

             console.log(this);
           
            this._super = _super[name];
            var ret = fn.apply(this, arguments);  

            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) : prop[name];
    }
   

    function Class() {
	      // initializing = false ,取反等于 true
	      if (!initializing && this.init )
	             this.init.apply(this, arguments);  // 当实例化以后，this 指向了本身执行环境,这行代码就是：如果init存在，就执行初始化。

      }
   
    Class.prototype = prototype;    // 实例过的超类实例  prototype instanceof window.Class   ===> true

    Class.prototype.constructor = Class;   // Class == > function Class 这个函数，其实就是构筑函数

    Class.extend = arguments.callee;  // arguments.callee   === > window.Class.extend
   
    return Class;

  };


  

})();


/*
var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
}); 

 
var Ninja = Person.extend({
  init: function(){
    this._super( false );
  },
  dance: function(){
    // Call the inherited version of dance()
    return this._super();
  },
  swingSword: function(){
    return true;
  }
});
*/

//var p = new Person(true);
 //p.dance(); => true
 
//var n = new Ninja();
 //n.dance();  => false
//n.swingSword();  => true
