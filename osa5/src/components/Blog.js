import { useState } from 'react'

const Blog = ({blog}) => {
  const [blogVisibleState, setBlogVisibleState] = useState(new Map())

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleView = () => {
    setBlogVisibleState(map => new Map(map.set(blog.id, true)));
  }

  const handleHide = () => {
    let bl= new Map(blogVisibleState) 
    bl.delete(blog.id)
    setBlogVisibleState(bl);
  }

  const handleLike = () => {}

  if(blogVisibleState.get(blog.id)) {

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

//const MapStateComponent = () => {
//  const [mapState, setMapState] = useState(new Map());

//  const updateMap = (key, value) => {
//    setMapState(map => new Map(map.set(key, value)));
//  }

  // ...
//}