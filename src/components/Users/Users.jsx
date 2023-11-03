import { useEffect, useState } from "react"
import "./user.scss"


export const Users = () => {
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('loading')


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos')
      const dataParseJson = await response.json()

      await new Promise(resolve => setTimeout(resolve, 2000))
      const slicedData = dataParseJson.slice(0, 100)
      setData(slicedData)
      setStatus('loaded')

    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const inputHandler = (event) => {
    setInput(event.target.value)
  }

  const photoFilter = data.filter(photo => photo.title.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className="container">
        <div className="notes">
            <div className="notes__top">
              <h1 className="notes__title">Фото</h1>
              <input type="text"
                className="notes__input"
                value={input}
                onChange={inputHandler}
                placeholder="Поиск..."
              />
             </div>
            <ul className="notes__list">
              {status === 'loading' ? ( <p className="loading">Loading...</p> ) :
               status === 'error' ? ( <p style={ {color: 'red'} }>{error}</p> ) :
               photoFilter.map((user) => (
                <li className="notes__item" >
                  <picture className="notes__picture"><img src={user.url} alt={user.title} className="notes__image"/></picture>
                  <p className="notes__wrapper-title">{user.title}</p>
                </li>
               ))}

            </ul>
        </div>
    </div>
  )
}