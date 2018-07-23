// import ES2015 Module
import {http} from './http'; // use './ because this module outside of /node_modules'
import {ui} from './ui';

// Define vars
const urlAPI = 'http://localhost:3000/posts';

// Event listeners
// Get posts when DOM is ready (not wait for the page load), so the handler can lookup DOM nodes, initialize the interface)
document.addEventListener('DOMContentLoaded', getPosts);

// getting data from back-end API

function getPosts() {
    http.get(urlAPI)
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}
