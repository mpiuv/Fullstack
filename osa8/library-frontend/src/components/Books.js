import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { ALL_BOOKS_BY_GENRE } from '../queries'
import { useState, useEffect } from 'react'


const Books = (props) => {
  const [getLibraryByGenre, genreResult] = useLazyQuery(ALL_BOOKS_BY_GENRE)
  const result = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data) setBooks(result.data.allBooks)
  }, [result.data])

  useEffect(() => {
    if (genreResult.data) setBooks(genreResult.data.allBooks)
  }, [genreResult.data])

  if (!props.show) {
    return null
  }

  if (genreResult.loading || result.loading )  {
    return <div>loading...</div>
  }

  const { allBooks } = result.data;

  const genreSet=new Set(allBooks.flatMap(b => b.genres))

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
          <button key={genre} onClick={() => {setSelectedGenre(genre)    
            getLibraryByGenre({ variables: { genre: selectedGenre } })}}>
            {genre}
          </button>
        ))}
        <button onClick={() => {setSelectedGenre("all genres");setBooks(allBooks)}}>all genres</button>
      </div>

      </div>
    </div>
  )
}

export default Books
