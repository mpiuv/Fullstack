import {useParams} from "react-router-dom"

const UsersBlogs=({users}) =>{
    const id = useParams().id
    const user = users.find(n => n.id === id)
    return (
      <div>
        <h2>{user.name}</h2>
        <h1>added blogs</h1>
        <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}> {blog.title}</li>
      )}
    </ul>
      </div>
    )
  
  }

  export default UsersBlogs