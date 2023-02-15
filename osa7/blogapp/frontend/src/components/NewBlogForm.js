import { useState } from 'react'
import {TextField,Button} from '@mui/material'
const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
        <div>
          <TextField label="title" />
        </div>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title'
            placeholder='title of the blog'
          />
        </div>
        <div>
        <div>
          <TextField label="author" />
        </div>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author'
            placeholder='author of the blog'
          />
        </div>
        <div>
        <div>
          <TextField label="url" />
        </div>
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url'
            placeholder='url of the blog'
          />
        </div>
        <Button variant="contained" color="primary" id='create-butto' type='submit'>
          create
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm