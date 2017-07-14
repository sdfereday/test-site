/// Mithril https://mithril.js.org/simple-application.html
/// https://webpack.js.org/guides/getting-started/#basic-setup
let m = require("mithril"); // Will load when compiled via npm modules and webpack

let postList = require("./views/PostList");
let postDetail = require("./views/PostDetail");
let postModel = require('./models/Post');
let defaultLocation = "/archive";

let routeActions = {
    resetPosts: function(){
        postModel.resetFilters();
        return postList;
    }
};

let routes = {
    "./":  {
        onmatch: routeActions.resetPosts
    },
    "/":  {
        onmatch: routeActions.resetPosts
    },
    "/archive": {
        onmatch: routeActions.resetPosts
    },
    "/archive:tag": postList,
    "/posts/:guid": postDetail
};

m.route(document.querySelector('.m-content'), defaultLocation, routes);
m.render(document.querySelector('.heading'), m("a", { href: "./", oncreate: m.route.link }, "DevNoodle Blog"));