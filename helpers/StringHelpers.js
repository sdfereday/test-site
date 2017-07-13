class StringHelpers {

    static truncate(n, useWordBoundary, endCap) {
        endCap = endCap ? endCap : "...";
        if (this.length <= n) { return this; }
        var subString = this.substr(0, n - 1);
        return (useWordBoundary ?
            subString.substr(0, subString.lastIndexOf(' ')) :
            subString) + endCap;
    };

}

module.exports = StringHelpers;