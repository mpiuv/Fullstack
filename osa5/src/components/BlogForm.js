const BlogForm = ({
    addBlog,
    handleTitleChange,
    handleAuthorChange,
    handleURLChange,
    newTitle,
    newAuthor,
    newURL
   }) => {
   return (
     <div>
       <form onSubmit={addBlog}>
      <div>
      Title:<input
        value={newTitle}
        onChange={handleTitleChange}
      />
      </div>
      <div>
      Author:<input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      </div>
      <div>
      URL:<input
        value={newURL}
        onChange={handleURLChange}
      />
      </div>
      <button type="submit">create</button>
     </form>
     </div>
   )
 }
 
 export default BlogForm