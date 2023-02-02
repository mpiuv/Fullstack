import {useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersBlogs from './components/UsersBlogs'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import usersService from './services/users'

import { createNotification, resetNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs, addBlog} from './reducers/blogReducer'
import {setUser} from './reducers/userReducer'
import {
  useParams,
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"


const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs( blogs.sort(byLikes) ))
    )
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
  }, [dispatch])

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      dispatch(setUser(user))
      userService.setUser(user)
      notify(`${user.name} logged in!`)
    }).catch(() => {
      notify('wrong username/password', 'alert')
    })
  }

  const logout = () => {
    dispatch(setUser(null))
    userService.clearUser()
    notify('good bye!')
  }

  const createBlog = async (blog) => {
    blogService.create(blog).then(createdBlog => {
      notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`)
      dispatch(addBlog(createdBlog))
      blogFormRef.current.toggleVisibility()
    }).catch(error => {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find(b => b.id === id)

    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs
        .filter(b => b.id!==id)
        .sort(byLikes)
      dispatch(setBlogs(updatedBlogs))
    })
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes||0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
      const updatedBlogs = blogs
        .map(b => b.id===id ? updatedBlog : b)
        .sort(byLikes)
      dispatch(setBlogs(updatedBlogs))
    })
  }

  const notify = (message, type='info') => {
    dispatch(createNotification({ message, type }))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const notification = useSelector(state => state.notes)[0]
  const blogs = useSelector(state=>state.blogs)
  const user = useSelector(state=> state.user)[0]
  const padding = {
    padding: 5
  }

const Home = () => {
  return (
  <div>
 </div>
  )
}

const Blogs = () =>{
  return (
  <div>
  <Togglable buttonLabel='new blog' ref={blogFormRef}>
  <NewBlogForm
    onCreate={createBlog}
  />
</Togglable>

<div id='blogs'>
  {blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      likeBlog={likeBlog}
      removeBlog={removeBlog}
      user={user}
    />
  )}
</div>
</div>)
}

const SingleBlog = ({blogs})=>{
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  return (<div>
    <h1>{blog.title} {blog.author}</h1>
    <div>
    <a href={blog.url}>{blog.url}</a>
    </div>
    <div>
    {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
    </div>
    <p>added by {blog.author}</p>
</div>)
}

const [users,setUsers] = useState([])

useEffect(() => {
   usersService.getAll().then(response =>setUsers(response))
  }, [])

const User = ({blogs,user})=>{
  return( 
    <tr>
      <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
      <td>{blogs}</td>
    </tr>)
}

const Users=() =>{
  return <div>
    <h2>Users</h2>
    <div id='users'>
    <table>
  <tr>
    <th></th>
    <th>blogs created</th>
  </tr>
  {users.map(user =>
    <User
      key={user.id}
      blogs={user.blogs.length}
      user={{name:user.name,id:user.id}}
    />
  )}
  </table>
</div>
 </div> 
}

  if (user === null) {
    return <>
      <Notification notification={notification} />
      <LoginForm onLogin={login} />
    </>
  }

  return (
    <div>
       <h2>blogs</h2>
      <Notification notification={notification} />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

  <Router>
  <div>
    <Link style={padding} to="/">home</Link>
    <Link style={padding} to="/blogs">blogs</Link>
    <Link style={padding} to="/users">users</Link>
  </div>

  <Routes>
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blogs/:id" element={<SingleBlog blogs={blogs}/>} />
    <Route path="/users" element={<Users />} />
    <Route path="/user/:id" element={<UsersBlogs users={users} />} />
    <Route path="/" element={<Home />} />
  </Routes>

</Router>
</div>
  )
}

export default App