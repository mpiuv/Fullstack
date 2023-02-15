import {useState, useEffect, useRef } from 'react'

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
import { Container } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Button
} from '@mui/material'

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

<TableContainer component={Paper}>
  <Table>
    <TableBody>
      {blogs.map(blog =>
         <TableRow key={blog.id}>
             <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
             </TableCell>
             <TableCell>
                {blog.author}
             </TableCell>
         </TableRow>
  )}
   </TableBody>
  </Table>
</TableContainer>
</div>)
}

const SingleBlog = ({blogs})=>{
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    let blog1 = {...blog}
    blog1.comments= [...blog.comments,comment]

    blogService.updateComment(id,blog1).then((response) => {
      let updatedBlogs = blogs
        .filter(b => b.id!==id)
        .sort(byLikes)
      updatedBlogs=[...updatedBlogs,response]
      dispatch(setBlogs(updatedBlogs))
    })
    setComment('')
  }

  const id = useParams().id
  let blog = blogs.find(n => n.id === id)
  if (blog==={}) return (null)
  return (<div>
    <h1>{blog.title} {blog.author}</h1>
    <div>
    <a href={blog.url}>{blog.url}</a>
    </div>
    <div>
    {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
    </div>
    <p>added by {blog.author}</p>
    <h2>comments</h2>
    <form onSubmit={handleSubmit}>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id='comment'
          />
        </div>
        <button id='create-button' type='submit'>
          add comment
        </button>
    </form>
    <ul>
    {blog.comments.map(c =>
      <li key={c}>
        {c}
      </li>
    )}
    </ul>
</div>)
}

const [users,setUsers] = useState([])

useEffect(() => {
   usersService.getAll().then(response =>setUsers(response))
  }, [])

const User = ({blogs,user})=>{
  return( 
    <TableRow key={user.id}>
      <TableCell><Link to={`/user/${user.id}`}>{user.name}</Link></TableCell>
      <TableCell>{blogs}</TableCell>
    </TableRow>)
}

const Users=() =>{
  return <div>
    <h2>Users</h2>
    <div id='users'>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow key={1}>
              <TableCell></TableCell> <TableCell>blogs created</TableCell>
          </TableRow>
  
  {users.map(user =>
    <User
      key={user.id}
      blogs={user.blogs.length}
      user={{name:user.name,id:user.id}}
    />
  )}
  </TableBody>
  </Table>
  </TableContainer>
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
    <Container>
       <h2>blogs</h2>
      <Notification notification={notification} />
  <Router>

  <AppBar position="static">
  <Toolbar>
    <Button color="inherit" component={Link} to="/">
      home
    </Button>
    <Button color="inherit" component={Link} to="/blogs">
      blogs
    </Button>
    <Button color="inherit" component={Link} to="/users">
      users
    </Button>   
            <em>{user.name} logged in</em> <button onClick={logout}>logout</button>
  </Toolbar>
  </AppBar>

  <Routes>
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blogs/:id" element={<SingleBlog blogs={blogs}/>} />
    <Route path="/users" element={<Users />} />
    <Route path="/user/:id" element={<UsersBlogs users={users} />} />
    <Route path="/" element={<Home />} />
  </Routes>

</Router>
</Container>
  )
}

export default App