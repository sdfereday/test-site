// src/models/Post.js
let m = require("mithril");
let ObjectHelpers = require("../helpers/ObjectHelpers");
let StringHelpers = require("../helpers/StringHelpers");
let ArrayHelpers = require("../helpers/ArrayHelpers");
let PostData = [];

let Post = {
    list: [],
    current: {},
    filterByTag: function(tag) {
        Post.list = Post.list.filter(function (post) {
            let tags = ArrayHelpers.stringToArray(post.tags);
            return tags.some(function(item){
                return item.length > 0 && item.toLowerCase() === tag.toLowerCase();
            });
        });
    },
    resetFilters: function() {
        Post.list = PostData;
    },
    loadPosts: function() {
        
        if(Post.list.length > 0)
            return;

        return m.request({
            method: "GET",
            url: "https://sd-blog-c1b48.firebaseio.com/posts.json"
        })
        .then(function(snap) {

            for(let key in snap) {
                Post.list.push(snap[key]);
            }

            PostData = Post.list.sort((x, y) => ArrayHelpers.sort(x.date, y.date));
            Post.list = PostData;

        });

    },
    loadPost: function(guid) {
        
        // Should load a post if none available (try at least)
        Post.current = Post.list.find(x => x.guid === guid);
        
        if(!Post.current) {
            Post.current = {};
            return m.request({
                method: "GET",
                url: 'https://sd-blog-c1b48.firebaseio.com/posts.json?orderBy="guid"&equalTo="' + guid + '"&print=pretty' 
            })
            .then(function(snap) {
                Post.current = ObjectHelpers.firstInObject(snap);
            });
        }
            

    }
};

module.exports = Post;