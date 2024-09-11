import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <Link to='/' className='pokedex-heading'><h1 >PokeDex</h1></Link>
      <CustomRoutes />
    </>
  )
}

export default App
