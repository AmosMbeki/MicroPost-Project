import { http } from './http';
import { ui } from './ui';

// Get posts on loading the DOM
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add submit
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete click event
document.querySelector('#posts').addEventListener('click', deletePost);

// Edit state event listener
document.querySelector('#posts').addEventListener('click', enableEdit);

function getPosts(){
    http.get('http://localhost:3000/posts').then(data=>ui.showPosts(data)).catch(err=>console.log(err));

}

function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
        title,
        body
    }

    // Post creation
    http.post('http://localhost:3000/posts', data).then(data => {
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        getPosts();
    }).catch(err => console.log(err));
}

function deletePost(e){
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`).then(data => {
                ui.showAlert('Post Removed', 'alert alert-success');
                getPosts();
            }).catch(err => console.log(err));
        }
    }
}

function enableEdit(e){

    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
    
        const data = {
            id,
            title, 
            body
        }
    
        // Fill form with current post
        ui.fillForm(data);
    
    }
   
    e.preventDefault();
}

