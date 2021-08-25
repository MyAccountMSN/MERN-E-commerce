import React from 'react'
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';



const App =()=> {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route  path='/cart/:id?' component={CartScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
