var Getters = {
	 token : state => state.login.token,
	 id : state => state.login.id,
	 role :(state) => state.app.role,
	 routesmap : state => state.app.routes
}


export default Getters