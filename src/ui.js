class UI {
    constructor() {
        this.post = document.getElementById('posts');
        this.titleInput = document.getElementById('title');
        this.bodyInput = document.getElementById('body');
        this.idInput = document.getElementById('id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }
    // method displays posts on UI
    showPosts(posts){
        console.log(posts);
    }
}

export const ui = new UI();
