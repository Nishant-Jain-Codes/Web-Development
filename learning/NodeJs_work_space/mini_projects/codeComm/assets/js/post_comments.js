
    // !ajax not working properly for comments as well as posts
    // after server restarts the ajax property turns useless for old posts
    // comment summit is returning an array of content from the comment box of all the posts since we selected the create comment class and not a unique id
    //! solving of these bugs is necessary

{ 
 //method to submit the form data for new comment using AJAX
    let createComment = function(){
        let newCommentForm = $(`.new-comment-form`);
        newCommentForm.submit(function(event){
            console.log('comment sumission clicked');
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $(`#all-comments-${data.data.post_id}>ul`).prepend(newComment);
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
    createComment();
}
