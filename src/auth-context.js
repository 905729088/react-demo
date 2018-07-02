import React from 'react'
const AuthContext = React.createContext({
    isAuthenticated: 'false',
    ppp:'dsajhd',
    login: () => {},
    logout: () => {},
})

export default AuthContext