export async function getTestUser(){
    let user = localStorage.getItem('testUser')
    if (user) {
        return JSON.parse(user)
    }
    const name = 'test-table'
    const pass = 'QONSLADJKA'
    user = await G.api.login(name, pass, 'byname').catch(console.error)
    if (!user) {
        await G.api.register(JSON.stringify({
            name,
            pass,
        }))
        user = await G.api.login(name, pass, 'byname')
    }
    localStorage.setItem('testUser', JSON.stringify(user))
    return user
}