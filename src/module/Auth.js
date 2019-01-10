class Auth {
    static authenticateToken(token) {
        localStorage.setItem('token', token)
    }
    static isUserAuthenticated(){
        return localStorage.getItem('token') !== null;
    }
    static deauthenticateToken(){
        localStorage.removeItem('token')
    }
    static getToken(){
        return localStorage.getItem('token')
    }
    static storeUserInfo(username, id){
        localStorage.setItem('username', username)
        localStorage.setItem('id', id)
    }
    static getUsername(){
        return localStorage.getItem('username')
    }
    static getUserId(){
        return localStorage.getItem('id')
    }
    static removeUserObj(){
        localStorage.removeItem('username')
        localStorage.removeItem('id')
    }

}
export default Auth
