<template>
<div class="hello">
    <h1>This is the Posts List</h1>
    <ul>
        <li v-for="post in posts" :key="post._id" class="post-item">
            {{ post.content }} -> {{ post.user.name  }}
        </li>
    </ul>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'PostsList',
    data(){
        return {
            posts:[]
        }
    },
    mounted(){
        axios.get('http://localhost:8000/api/v1/posts').then(Response=>{
            this.posts = Response.data.posts;
        });
    }
}
</script>

<style scoped>
h1{
    font-size: 5vh;
    color: orangered;
}
li {
    font-size: 3vh;
    color: blue;
}
ul{
    list-style-type: none;
}
</style>
