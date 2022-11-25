import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PageAccueil from './pages/PageAccueil'
import PageAlbums from './pages/PageAlbums'
import PageInfo from './pages/PageAlbumInfo'
import { Provider } from 'react-redux'
import store from './store'


/**
 * Routes of the App
 * { PageAccueil } Home Page
 * { PageAlbums } Albums of searched Artist
 * { PageAlbumInfo } Tracks of selected Album
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageAccueil/>}>
          <Route path='/search' element={<PageAlbums />}/>
          <Route path='/search/*' element={<PageInfo />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
