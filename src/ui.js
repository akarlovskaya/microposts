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
        let output = '';

        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `
        });
        this.post.innerHTML = output;
    }

    showAlert(msg, cssClass) {
        this.clearAlert();
        // create new div element
        const alertDiv = document.createElement('div');
        // add class
        alertDiv.className = cssClass;
        // Add text
        // alertDiv.innerHTML = `<span>${msg}</span>`;
        alertDiv.appendChild(document.createTextNode(msg));
        // get parent
        const postsContainer = document.querySelector('.postsContainer');
        // add div before posts
        postsContainer.insertBefore(alertDiv, this.post);


        // remove alert after 3 sec
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.bodyInput.value = '';
        this.titleInput.value = '';
    }

    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Clear ID hidden value
    clearIdInput() {
        this.idInput.value = '';
    }

    // Change Form State
    changeFormState(type) {
        if ( type === 'edit' ) {
            this.postSubmit.textContent = 'Submit Edit';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            // add Cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));
            // button.textContent = 'Cancel Edit'; - use it to update existing el
            const cardFormEl = document.querySelector('.card-form');
            const formEndEl = document.querySelector('.form-end');
            cardFormEl.insertBefore(button, formEndEl);
        } else {
            this.postSubmit.textContent = 'Add post';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            // Remove cancel button
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // clear ID from hidden field
            this.clearIdInput();
            this.clearFields();
        }
    }
}

export const ui = new UI();
