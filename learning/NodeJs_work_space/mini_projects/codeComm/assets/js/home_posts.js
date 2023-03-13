
{
 
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
                    new PostComments(data.data.post._id);
                    new ToggleLike($(' .toggle-like-button', newPost));
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
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
            <div class="post-likes-deletePost">    
                <a href="/likes/toggle/?id=${post._id}&type=Post" class = "toggle-like-button" data-likes="0">
                    <div class="post-likes">
                        <p>0</p>
                        <i class="fa-regular fa-thumbs-up"></i>
                    </div>
                </a>
                <div>
                    <a class="delete-post" href="/posts/destroy/${post._id}">
                        <i class="fa-regular fa-rectangle-xmark"></i>
                    </a>
                </div>      
            </div>
        </div>
        <div class="post-comments-container">
                <div class="create-comment">
                    <form action="/comments/create" id="post-${ post._id }-comments-form" method="POST">
                        <textarea  name="content" placeholder="comment here" required></textarea>
                        <input type="hidden" name="post" value="${post._id}" >
                        <input type="submit" value="Add Comment">
                    </form>
                </div>
                <div class="post-comments" id="all-comments-${post._id}">
                    <ul id="post-comments-${ post._id }">

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
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log('error in deleting data using ajax',error);
                }
            });
        });
    }
    // 
    let convertPostsToAjax = function(){
        $('#all-posts>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post', self);
            deletePost(deleteButton);
            let postId = self.prop('id').split("-")[1]; //id="post-${post._id}"
            new PostComments(postId);
        })
    }
    convertPostsToAjax();
    createPost();
}