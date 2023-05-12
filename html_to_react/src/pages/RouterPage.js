import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Productlanding from './Productlanding';

export default function RouterPage() {
  return (
    <div>
        <Router>
            <Routes>
    <Route path="/" exact element={<Home/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path='/products' element={<Productlanding/>}/>
            </Routes>
        </Router>
      
    </div>
  )
}
