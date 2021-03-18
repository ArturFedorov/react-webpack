import Post from '@/models/Post';
import './styles/styles.css';
import logo from './assets/webpack-logo.png';

const post = new Post('Hello', logo);

console.log(post.toString());
