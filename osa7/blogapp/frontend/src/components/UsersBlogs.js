import {useParams} from "react-router-dom"
import {TableContainer,TableBody,Table,TableRow,TableCell, Paper} from '@mui/material'
const UsersBlogs=({users}) =>{
    const id = useParams().id
    const user = users.find(n => n.id === id)
    return (
      <div>
        <h2>{user.name}</h2>
        <h1>added blogs</h1>
        <TableContainer component={Paper}>
        <Table>
        <TableBody>
        {user.blogs.map(blog =>
          <TableRow key={blog.id}> <TableCell>{blog.title}</TableCell></TableRow>
      )}
    </TableBody>
    </Table>
    </TableContainer>
      </div>
    )
  
  }

  export default UsersBlogs