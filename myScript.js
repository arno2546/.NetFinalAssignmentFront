$(document).ready(function(){
    var split;
    var splitComment;
    loadSelectPosts();
    $("#getPosts").click(function(){
        getAllPosts();
    });

    $("#editPostSelect").change(function(){
        split=$("#editPostSelect").val().split("--");
        $("#editPostTitle").val(split[1]);
    });

    $("#deletePostSelect").change(function(){
    split=$("#deletePostSelect").val().split("--");
    });

    $("#commentPostSelect").change(function(){
        split=$("#commentPostSelect").val().split("--");
    });

    $("#createCommentPostSelect").change(function(){
        split=$("#createCommentPostSelect").val().split("--");
    });

    $("#editCommentPostSelect").change(function(){
        split=$("#editCommentPostSelect").val().split("--");
        loadSelectedPostComments();
    });

    $("#deleteCommentPostSelect").change(function(){
        split=$("#deleteCommentPostSelect").val().split("--");
        loadSelectedPostComments();
    });

    $("#commentSelect").change(function(){
        splitComment=$("#commentSelect").val().split("--");
    });

    $("#deleteCommentSelect").change(function(){
        splitComment=$("#deleteCommentSelect").val().split("--");
    });

    $("#createPost").click(function(){
        createPost();
    });

    $("#editPost").click(function(){
        editPost();
    });

    $("#deletePost").click(function(){
        deletePost();
    });

    $("#getComments").click(function(){
        getAllComments();
    });

    $("#createComment").click(function(){
        createComment();
    });

    $("#editComment").click(function(){
        editComment();
    });

    $("#deleteComment").click(function(){
        deleteComment();
    });
   function getAllPosts(){
        $.ajax({
            url: "https://localhost:44313/api/posts",           
            method:"get",
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    for(var i = 0; i<data.length;i++){
                        str+="<tr><td>"+data[i].PostId +"</td><td>"+data[i].PostTitle +"</td><td>"+data[i].PostText+"</td><tr>";
                        $("#posts").html(str);
                    };  
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function createPost(){
        $.ajax({
            url: "https://localhost:44313/api/posts",           
            method:"post",
            headers:{
                contentType:"application.json"
            },
            data:{
                PostTitle:$("#postTitle").val(),
                PostText:$("#postText").val()
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==201){
                    $("#postCreateMsg").html("Post Successfuly Created");
                    $("#postTitle").val("");
                    $("#postText").val("");
                    getAllPosts();
                    loadSelectPosts();
                }
                else{
                    $("#postCreateMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }

    function editPost(){
        $.ajax({
            url: "https://localhost:44313/api/posts/"+split[0],           
            method:"put",
            headers:{
                contentType:"application.json"
            },
            data:{
                PostTitle:$("#editPostTitle").val(),
                PostText:$("#editPostText").val()
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    $("#postEditMsg").html("Post Successfuly Updated");
                    $("#editPostTitle").val("");
                    $("#editPostText").val("");
                    getAllPosts();
                    loadSelectPosts();
                }
                else{
                    $("#postCreateMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }

    function deletePost(){
        $.ajax({
            url: "https://localhost:44313/api/posts/"+split[0],           
            method:"delete",
            headers:{
                contentType:"application.json"
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==204){
                    $("#postDeleteMsg").html("Post Successfuly Deleted");
                    getAllPosts();
                    loadSelectPosts();
                }
                else{
                    $("#postDeleteMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function loadSelectPosts(){
        $.ajax({
            url: "https://localhost:44313/api/posts",           
            method:"get",
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    for(var i = 0; i<data.length;i++){
                        str+="<option>"+data[i].PostId +"--"+data[i].PostTitle+"</option>";
                        $("#editPostSelect").html(str);
                        $("#deletePostSelect").html(str);
                        $("#commentPostSelect").html(str);
                        $("#createCommentPostSelect").html(str);
                        $("#editCommentPostSelect").html(str);
                        $("#deleteCommentPostSelect").html(str);
                    };  
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function loadSelectedPostComments() {
        $.ajax({
            url: "https://localhost:44313/api/posts/"+split[0]+"/comments",
            method:"get",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    for(var i=0;i<data.length;i++){
                        str+="<option>"+data[i].CommentId+"--"+data[i].CommentText+"</option>";
                        $("#commentSelect").html(str);
                        $("#deleteCommentSelect").html(str);
                    };
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function getAllComments(){
        $.ajax({
            url: "https://localhost:44313/api/posts/"+split[0]+"/comments",           
            method:"get",
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    $("#Comments").html(str);
                    for(var i = 0; i<data.length;i++){
                        str+="<tr><td>"+data[i].CommentId +"</td><td>"+data[i].CommentText+"</td><td>"+data[i].PostId+"</td><tr>";
                        $("#Comments").html(str);
                    };  
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                    console.log(url);
                }
            }
        });
    }

    function createComment(){
        $.ajax({
            url: "https://localhost:44313/api/posts/"+split[0]+"/comments",           
            method:"post",
            headers:{
                contentType:"application.json"
            },
            data:{
                CommentText:$("#commentText").val()
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    $("#commentCreateMsg").html("Comment Successfuly Posted");
                    $("#commentText").val("");
                    getAllPosts();
                    loadSelectPosts();
                    getAllComments();
                    console.log(url);
                }
                else{
                    $("#commentCreateMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }

    function editComment(){
        $.ajax({
            url: "https://localhost:44313/api/posts/"+split[0]+"/comments/"+splitComment[0],           
            method:"put",
            headers:{
                contentType:"application.json"
            },
            data:{
                CommentText:$("#editCommentText").val()
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    $("#commentEditMsg").html("Comment Successfuly Updated");
                    $("#editCommentText").val("");
                    loadSelectPosts();
                    loadSelectedPostComments();
                    getAllComments();
                }
                else{
                    $("#commentEditMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }

    function deleteComment(){
        $.ajax({
            url: "https://localhost:44313/api/posts/"+split[0]+"/comments/"+splitComment[0],           
            method:"delete",
            headers:{
                contentType:"application.json"
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==204){
                    $("#commentDeleteMsg").html("Comment Successfuly Deleted");
                    loadSelectPosts();
                    loadSelectedPostComments();
                    getAllComments();
                }
                else{
                    $("#commentDeleteMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }
});