import React from 'react';
import { render } from 'react-dom';
import Post from '@models/post';
import logo from './assets/webpack-logo.png';
import './styles/styles.scss';
const post = new Post('Post test', logo);


const App = () => (
  <div className="container">
    <h1 className="centered">Hello</h1>
    <div className="logo">
    </div>
    <p className="code centered">{post.title}</p>
  </div>
);

render(<App />, document.getElementById('app'));

