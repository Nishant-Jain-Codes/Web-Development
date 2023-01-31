{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost =  newPostDom(data.data.post);
                    $('#all-posts>ul').prepend(newPost);
                    deletePost($(' .delete-post'),newPost); //(class name , from what object it belong)
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`
        <li class="single-post-container"  id="post-${post._id}">
        <div class="post-data">
            <div class="postDelete-userInfo">
                <h1>${post.user.name}</h1>  
                <a class="delete-post" href="/posts/destroy/${post._id}">
                    <i class="fa-regular fa-rectangle-xmark"></i>
                </a>
            </div>  
            <p class="post-content">${post.content}</p>
        </div>
        <div class="post-comments-container">
                <div class="create-comment">
                    <form action="/comments/create" method="POST">
                        <textarea  name="content" placeholder="comment here" required></textarea>
                        <input type="hidden" name="post" value="${post._id}" >
                        <input type="submit" value="Add Comment">
                    </form>
                </div>
                <div class="post-comments">
                    <ul>

                    </ul>
                </div>
        </div>
       
    </li>
        `);
    }
    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log('error in deleting data using ajax',error);
                }
            });
        });
    }




    createPost();
}