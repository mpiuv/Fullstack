import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [blogVisibleState, setBlogVisibleState] = useState(false)
  const [liked, setLiked] =useState(0)
  const [, updateState] = useState();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleView = () => {
    setBlogVisibleState(true);
  }

  const handleHide = () => {
    setBlogVisibleState(false);
  }

  const handleLike = () => {
    if(blog.likes===undefined)
      blog.likes=1
    else 
      blog.likes=blog.likes+1
    const newBlog={
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id 
    }
    blogService.update(blog.id, newBlog)
    // Palauttaa blog-objektin eri muodossa, joten heitä roskiin
    updateState({})
  }

  if(blogVisibleState) {

    return (
      <div style={blogStyle}>
        <div>
        {blog.title} {blog.author} <button onClick={handleHide}> hide </button>
        </div>
        <div> {blog.url}<div/>
        <div>likes {blog.likes} <button onClick={handleLike}> like </button></div>
        <div>{blog.user.name}</div>
        </div>

    </div>)

  }else 
    return (
      <div style={blogStyle}>
        <div>
        {blog.title} {blog.author} <button onClick={handleView}> view </button>
        </div>  
    </div>)
}

export default Blog
