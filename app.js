(function () {
    
    /// Helpers
    class ArrayHelpers {

        static shuffle(a) {
            for (let i = a.length; i; i--) {
                let j = Math.floor(Math.random() * i);
                [a[i - 1], a[j]] = [a[j], a[i - 1]];
            }
            return a;
        }

        static sort(a, b, type) {
            type = type ? type : "desc";
            return type === "desc" ? b - a : a - b;
        }

        static objToArray(obj) {
            return Object.keys(obj).map(function (e) {
                return [Number(e), obj[e]];
            });
        }

    }

    /// - Global class setup for apps
    /// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
    /// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
    // Mixin maker
    let mix = (superclass) => new MixinBuilder(superclass);

    class MixinBuilder {

        constructor(superclass) {
            this.superclass = superclass;
        }

        // (spread operator, will pass everything from 0 to n)
        with(...mixins) {
            return mixins.reduce((c, mixin) => mixin(c), this.superclass);
        }

    }

    // Mixins
    let Collection = (superclass) => class extends superclass {

        get(id) {
            return this.data.find(x => x.id === id);
        }

        add(data) {
            this.data.push(data);
        }

        set(id, prop, val) {
            let d = this.Get(id);
            if (d && d[prop]) d[prop] = val;
        }

    };

    // External markdown formatting (needs more research as this would be better as a helper)
    // https://github.com/showdownjs/showdown
    // https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
    let Formatter = new showdown.Converter();

    /// - Custom stuff for individual app
    // Some base class for handling post collections
    class PostCollective {

        constructor() {
            this.data = ko.observableArray();
            this.formatter = new showdown.Converter();
        }

        addPost(data) {
            this.add(new Post(data));
            return this;
        }

        addPosts(data) {
            for (let i = 0; i < data.length; i++) {
                this.addPost(data[i]);
            }
            return this;
        }

        sortByDate(type) {
            this.data.sort((a, b) => ArrayHelpers.sort(a.date(), b.date(), type));
            return this;
        }

    }

    // A nice post class (knockoutjs enabled)
    class Post {

        constructor(data) {
            this.guid = data.guid;
            this.title = data.title;
            this.body = data.body;
            this.formattedBody = (function () {
                //return Formatter.makeHtml(this.body());
            });
            this.date = data.date;
            //this.tags = tags;
            //this.category = category;
            // For routing in data
            this.url = "/" + data.title;
        }

    }

    // Some amazing post collection class (you might not want your 'fetcher' being used by the posts however, it looks a little strange)
    class Posts extends mix(PostCollective).with(Collection) {
        // I have access to both the prototypal method above, and the other 'useful' bits in the mixins <3
    }

    // Make it happen
    let thePosts = new Posts();

    /// Mithril https://mithril.js.org/simple-application.html
    /// https://webpack.js.org/guides/getting-started/#basic-setup
    var m = require("mithril"); // Will load when compiled via npm modules and webpack

    var postList = require("./views/PostList");
    var postDetail = require("./views/PostDetail");

    m.route(document.querySelector('.m-content'), "/archive", {
        "/archive" : postList,
        "/posts/:guid": postDetail
    });

})();