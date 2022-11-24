import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [blogCreateVisible, setBlogCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token) 
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

  if (user === null) {
    return (
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
  }

  const logout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUsername('')
    setPassword('')
    setUser(null)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    setBlogCreateVisible(false)
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL
    }
    try {
      await blogService.create(blogObject)
      setBlogs( await blogService.getAll())
      setNewTitle(' ')
      setNewAuthor(' ')
      setNewURL(' ')
      setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
    } catch (exception){
      setErrorMessage(""+exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
   }

   const blogForm = () => {
    const hideWhenVisible = { display: blogCreateVisible ? 'none' : '' }
    const showWhenVisible = { display: blogCreateVisible ? '' : 'none' }
    return (
    <div>
    <div style={hideWhenVisible}>
      <button onClick={() => setBlogCreateVisible(true)}>Create blog</button>
    </div>
    <div style={showWhenVisible}>
      <BlogForm
       addBlog={addBlog}
       handleTitleChange={handleTitleChange}
       handleAuthorChange={handleAuthorChange}
       handleURLChange={handleURLChange}
       newTitle={newTitle}
       newAuthor={newAuthor}
       newURL={newURL}
      />
      <button onClick={() => setBlogCreateVisible(false)}>cancel</button>
    </div>
  </div>
)
   }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.username} logged in 
        <button type="submit" onClick={logout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
