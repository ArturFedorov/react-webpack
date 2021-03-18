import Post from '@models/post';
import React from 'react';
import './styles/styles.scss';
import logo from './assets/webpack-logo.png';
import start from './babel';

const post = new Post('Hello', logo);

console.log(post.toString());
console.log(process.env.NODE_ENV);
