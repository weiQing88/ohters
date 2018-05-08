require.config({
	 baseUrl : './',
	 waitSeconds: 15, // 定 15秒
	 urlArgs: "v="+"1.9.0",
	 paths: {
	 	 'jquery' : 'libs/jquery.min',
	 	 'turn' : 'libs/turn.min',
	 	 'modernizr' : 'libs/modernizr.min'
	 },
	 shim: {
	 	 'modernizr' : {
	 	 	  exports : 'Modernizr'
	 	 },
	 	 'turn' : {
	 	 	 deps : ['jquery'],
	 	 	 exports : '$.fn.turn'
	 	 }
	 }
});
