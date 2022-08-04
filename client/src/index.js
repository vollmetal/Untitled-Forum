import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Login from './components/Login';
import PostList from './components/PostList';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './stores/store'
import ProfilePage from './components/ProfilePage';
import NewPostMenu from './components/NewPostMenu';
import PostView from './components/PostView';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <BaseLayout>
        <Routes>
          <Route path='/' element = {<PostList />}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/profile' element = {<ProfilePage/>}/>
          <Route path='/new-post-menu' element = {<NewPostMenu/>}/>
          <Route path='/post-view' element = {<PostView/>}/>
        </Routes>
      </BaseLayout>
    </Provider>
      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
