// src/models/Post.js
var m = require("mithril");
var Post = {
    list: [],
    loadPosts: function() {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users",
            withCredentials: true,
        })
        .then(function(result) {
            Post.list = result.data;
        })
    }
};

module.exports = Post;