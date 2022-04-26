import React from 'react';
import ReactDOM from 'react-dom/client';
// related to redux
import { store } from './redux/store';
import { Provider } from 'react-redux'
// components
import Navbar from './components/navbar/Navbar'

const App = () => {

  return (
    <div className="app">
      <Navbar />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);