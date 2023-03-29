import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import {GET_FAVORITE_GENRE} from '../queries'
import { useState } from 'react'

const Recommend = ({show, username}) => {
  const result = useQuery(ALL_BOOKS, {pollInterval: 2000})
  const result1= useQuery(GET_FAVORITE_GENRE, { variables: { username }})
  if (!show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const favoriteGenre=result1.data.getFavoriteGenre.value

  return (
    <div>
      <h2>books</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
          .filter(b => (favoriteGenre !== null ? b.genres.includes(favoriteGenre) : b))
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

      </div>
    </div>
  )
}

export default Recommend
