import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMsg from './components/ErrorMsg'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(0)
  const blogFormRef = useRef()

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
      setErrorMessage('wrong username or password') 
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    console.log("You clicked logout!")
    setUser(null)
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(response => {
        console.log("REPONSE FROM POST:",response)
        setBlogs(blogs.concat(response))
        setSuccessMsg(`a new blog ${response.title} by ${response.author} added`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      })
  }

  const buttonAction = () => (
      <button onClick={handleClick}>
        logout
      </button>
  )

  const blogForm = () => (
    <div>
      
      <h2>blogs</h2>
      <p>{user.username} logged in { buttonAction() }</p>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm newBlog={createBlog} />
        </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}     
    </div>
  )

  return (
    <>
    <Notification message={successMsg} />
    <ErrorMsg message={errorMessage} />
      {user === null
        ? <LoginForm 
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        : blogForm()
      }
    </>
  )
}

export default App