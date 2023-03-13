// TODO ! understand the oops way of implementing this solution
// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment', newComment));

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // CHANGE :: show the count of zero likes on this comment
        return $(`<li class="single-comment-container" id="comment-${ comment._id }">
        <div class="comment-data">
            <div class="commentDelete-userInfo">
                <h1>
                    ${comment.user.name}    
                </h1>
                <div class="comment-likes-deleteComment">
                    
                        <a href="/likes/toggle/?id=${ comment._id }&type=Comment" class = "toggle-like-button" data-likes="${ comment.likes.length } ">
                            <div class="comment-likes">
                                <p>0</p>
                                <i class="fa-regular fa-thumbs-up"></i>
                            </div>
                        </a>
                    
                    <a class="delete-comment" href="/comments/destroy/${ comment._id }">
                        <i class="fa-solid fa-delete-left"></i>
                    </a>
  
            </div>
            <p class="comment-content">
                ${comment.content}
            </p>
        </div>
        
    </li>`);

    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}
