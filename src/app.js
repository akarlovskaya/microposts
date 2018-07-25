// import ES2015 Module
import {http} from './http'; // use './ because this module outside of /node_modules'
import {ui} from './ui';

// Define vars
const urlAPI = 'http://localhost:3000/posts';

// Event listeners
// Get posts when DOM is ready (not wait for the page load), so the handler can lookup DOM nodes, initialize the interface)
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);
// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);


// getting data from back-end API
function getPosts() {
    http.get(urlAPI)
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}
// submit new post
function submitPost(){
    let titleValue = document.getElementById('title').value;
    let bodyValue = document.getElementById('body').value;

    let data = {
        title: titleValue,
        body: bodyValue
    };

    http.post(urlAPI, data)
        .then(data => {
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearFileds();
            getPosts();
        })
        .catch(err => console.log(err));
}

// delete post
function deletePost(e) {
    let parentEl = e.target.parentElement;
    //get parent <a> tag with class .delete
    if ( parentEl.classList.contains('delete') ) {
        // get custom attr value with ID
        let postId = parentEl.getAttribute('data-id');
        http.delete(urlAPI + '/' + postId)
            .then(data => {
                ui.showAlert(data, 'alert alert-danger');
                getPosts();
            })
            .catch(err => console.log(err));
    }
    e.preventDefault();
}
