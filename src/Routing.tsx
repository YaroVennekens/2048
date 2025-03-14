import {FunctionComponent} from 'react'
import {Route, Routes} from 'react-router-dom'


import Index from './pages/Index'


const Routing: FunctionComponent = () => {
  return (
    <Routes>
        <Route path="/" element={<Index />} />
    </Routes>
  )
}

export default Routing