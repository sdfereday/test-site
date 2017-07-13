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

module.exports = ArrayHelpers;