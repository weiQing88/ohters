import Cookies from 'js-cookie'


const userKey = 'userInfo';
const openedIndex = 'openedIndex';



export function getUser(){
	   var user = Cookies.get(userKey);
	   if(user){
	   	return JSON.parse(user)
	   }
	  return '';
  }

export function setUser(data){
        Cookies.set(userKey,JSON.stringify(data));
}

export function removeUser(){
	  Cookies.remove(userKey)
}

export function getToken(){
    var user = Cookies.get(userKey);
    if(user){
    	var userData = (JSON.parse(user))
    	return userData.token
    }
     return '';
}

export function getRole(){
	 var user =  Cookies.get(userKey);
	 if(user){
	 	 var userData = JSON.parse(user)
	 	 return userData.role
	 }
	return ''
}

export function setOpenIndex(index){
	  Cookies.set(openedIndex,index);
}

export function removeOpenIndex(index){
  Cookies.remove(openedIndex)
}

export function getOpenIndex(){
	 return Cookies.get(openedIndex) ? [Cookies.get(openedIndex)] : [];
}