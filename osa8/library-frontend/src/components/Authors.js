import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const AUTHOR_AND_BOOK_COUNT = gql`
  query {
    allAuthors  {
      name
      born
      bookCount 
    }
  }
`

const EDIT_AUTHOR = gql`
mutation   editAuthorAge($name: String!, $setBornTo: Int!){
  editAuthor(name:$name, setBornTo: $setBornTo){
    name,
    born
  }
} 
`


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(AUTHOR_AND_BOOK_COUNT)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  
  const submit = async (event) => {
//    event.preventDefault()
    if(name==='') setName(authors[0].name)
    editAuthor({ variables: { name, setBornTo: parseInt(born,10) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
                {authors.map(author =>
                  <option key={author.name} value={author.name}>{author.name}</option>
                )}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
