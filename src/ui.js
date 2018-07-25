class UI {
    constructor() {
        this.post = document.getElementById('posts');
        this.titleInput = document.getElementById('title');
        this.bodyInput = document.getElementById('body');
        this.idInput = document.getElementById('id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
        // this.alertMsgEl =  document.querySelector('.form-end');
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


        // remove alert after 2 sec
        setTimeout(() => {
            this.clearAlert();
        }, 2000);

    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFileds() {
        this.bodyInput.value = '';
        this.titleInput.value = '';
    }
}

export const ui = new UI();
