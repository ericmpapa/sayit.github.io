var dom = (function () {
    function $(path, parent) {
        parent = parent || document;
        return parent.querySelectorAll(path);
    }

    function hasClass(el, clsName) {
        var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
        return regex.test(el.className);
    }

    function addClass(el, clsName) {
        if (!hasClass(el, clsName)) {
            el.className += " " + clsName;
        }
    }

    function removeClass(el, clsName) {
        var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
        el.className = el.className.replace(regex, " ");
    }

    function bind(element, event, handler) {
        if (typeof element == "string") {
            element = $(element)[0];
        }
        if (event == "click") {
            if (!element.hasClick) {
                element.addEventListener(event, handler, false);
                element.hasClick = true
            }
        } else element.addEventListener(event, handler, false);
    }

    function setValue(el, value) {
        el.innerHTML = value
    }

    return {
        $: $,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        setValue: setValue,
        bind: bind
    };
})();
