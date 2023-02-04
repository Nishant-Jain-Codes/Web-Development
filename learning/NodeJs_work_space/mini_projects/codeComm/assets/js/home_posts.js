
{
    //TODOcomplete comment ajax
    //TODOwork on inconsistency in post deletion and cotenant deletion 
    //method to submit the form data for new post using AJAX
    let setUpPosts = function(){
        let allPosts = $(' .single-post-container')
        for(let post of allPosts){
            deletePost($(`${post.id}> .delete-post`),post);
        }
    }

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
                    createComment(' .new-comment-form',newPost);
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
                    <form action="/comments/create" id="new-comment-form-${post._id}" data-post_id="${post._id}" method="POST">
                        <textarea  name="content" placeholder="comment here" required></textarea>
                        <input type="hidden" name="post" value="${post._id}" >
                        <input type="submit" value="Add Comment">
                    </form>
                </div>
                <div class="post-comments" id="all-comments-${post._id}">
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
    //method to submit the form data for new comment using AJAX
    let createComment = function(post){
        let post_id = $(post).data('post_id');
        let newCommentForm = $(`#new-comment-form-${post_id}`)
        newCommentForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $(`#all-comments-${post._id}>ul`).prepend(newComment);
                    deleteComment($(' .delete-comment',newComment));
                    console.log('success',data);
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create a comment in DOM
    let newCommentDom = function(comment){
        return $(`
        <li class="single-comment-container" id="comment-${comment._id}">
            <div class="comment-data">
                <div class="commentDelete-userInfo">
                    <h1>
                        ${comment.user.name}   
                    </h1>
                    <a class="delete-comment" href="/comments/destroy/${comment._id}">
                        <i class="fa-solid fa-delete-left"></i>
                    </a>
                </div>
                <p class="comment-content">
                    ${comment.content}
                </p>
            </div>
        </li>
        `);
    }
    //method to delete a comment from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();
            $ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.comment_id}`).remove();
                },
                error : function(error){
                    console.log('error in deleting data using ajax',error);
                }
            });
        });
    }
    setUpPosts();
    createComment();
    createPost();
}