import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setCount(count + 1)
    console.log("USE EFFECT count:", count)
    if (user) {
      blogService.getAll().then(blogs => setBlogs( blogs ))
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log("USER-TOKEN:", user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('Wrong credentials') //setErrorMessage is not defined here!!
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 5000)
      alert('Wrong credentials')
    }
  }
  
  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    console.log("You clicked logout!")
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>    
    </div>
  )

  const buttonAction = () => (
      <button onClick={handleClick}>
        logout
      </button>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in { buttonAction() }</p>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}     
    </div>
  )

  return (
    <>
      {user === null
        ? loginForm()
        : blogForm()
      }
    </>
  )
}

export default App