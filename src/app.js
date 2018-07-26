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
// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);
// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit);


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
    let idValue = document.getElementById('id').value;
    let data = {
        title: titleValue,
        body: bodyValue
    };

    // validate inputs
    if ( titleValue === '' || bodyValue === '' ) {
        ui.showAlert('Please fill in fields', 'alert alert-danger');
    } else {
        // check if post ID presents
        if (idValue === '') {
            // id is not there -> this is post creation
            http.post(urlAPI, data)
                .then(data => {
                    ui.showAlert('Post added', 'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));
        } else {
            //update the post
            http.put(`${urlAPI}/${idValue}`, data)
                .then(data => {
                    ui.showAlert('Post updated', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
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

// Enable edit state
function enableEdit(e){
    let parentEl = e.target.parentElement;
    if ( parentEl.classList.contains('edit') ) {
        // 'dataset' is a native property of an element that contains the data attributes
        // alternative - parentEl.getAttribute('data-id') - more cross browser solution (older)
        let id = parentEl.dataset.id;
        let title = parentEl.previousElementSibling.previousElementSibling.textContent;
        let body = parentEl.previousElementSibling.textContent;
        const data = {
            id,
            title,
            body
        }
        // fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}

function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
    e.preventDefault();
}
