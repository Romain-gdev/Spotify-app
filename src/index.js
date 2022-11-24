import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PageAccueil from './pages/PageAccueil'
import PageAlbums from './pages/PageAlbums'
import PageInfo from './pages/PageAlbumInfo'


/**
 * Creation des routes de l'application
 * { PageAccueil } L'accueil de notre page
 * { PageAlbums } Les albums a de l'artiste recherché
 * { PageAlbumInfo } Les informations de l'album sur lequel on a cliqué
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageAccueil/>}>
          <Route path='/search' element={<PageAlbums />}/>
          <Route path='/search/*' element={<PageInfo />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
