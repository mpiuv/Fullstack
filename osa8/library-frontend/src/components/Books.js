import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {pollInterval: 2000})
  const [selectedGenre, setSelectedGenre] = useState(null)
  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const genreSet=new Set(books.flatMap(b => b.genres))

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{selectedGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
          .filter(b => (selectedGenre !== null ? b.genres.includes(selectedGenre) : b))
          .map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <div>
        {[...genreSet].map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>

      </div>
    </div>
  )
}

export default Books
