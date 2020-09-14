$(document).ready(function(){
    var split;
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

   $("#createPost").click(function(){
        createPost();
   });

   $("#editPost").click(function(){
        editPost();
   });

   $("#deletePost").click(function(){
        deletePost();
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
                    };  
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }
});