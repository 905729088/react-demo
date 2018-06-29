import React from 'react'
const AuthContext = React.createContext({
    isAuthenticated: 'false',
    sid: '',
    user: null, //null
    login: () => {},
    logout: () => {},
})

export default AuthContext