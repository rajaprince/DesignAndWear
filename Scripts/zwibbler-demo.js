/**
   Zwibbler

   Copyright 2013 Hanov Solutions Inc. All Rights Reserved. This software is
   NOT open source. For licensing information, contact the author.

   steve.hanov@gmail.com

   @license
 */
(function () {
    "use strict";
    var n;

    function aa(a, b, c, d, e) {
        this.Ra = a || "transparent";
        this.left = b || 0;
        this.top = c || 0;
        this.right = d || 0;
        this.bottom = e || 0;
        this.zIndex = 1;
        this.insertBefore = null
    }
    aa.prototype.hide = function () {
        this.$.remove()
    };
    aa.prototype.show = function (a) {
        this.$ = $("<div>");
        this.$.css("position", "fixed");
        this.$.css("background", this.Ra);
        this.$.css("opacity", "0.25");
        this.$.css("left", "" + this.left + "px");
        this.$.css("top", "" + this.top + "px");
        this.$.css("right", "" + this.right + "px");
        this.$.css("bottom", "" + this.bottom + "px");
        this.$.css("display", "none");
        this.$.click(function (b) {
            a(b)
        });
        this.insertBefore ? (this.$.css("z-index", "" + this.zIndex), $(this.$).before(this.insertBefore)) : (this.$.css("z-index", "" + this.zIndex), $("body").append(this.$));
        this.$.fadeIn("normal")
    };
    var ba;
    try {
        ba = Function("return this")()
    } catch (ca) {
        ba = window
    }
    var da = {},
        ea = [];

    function s(a, b) {
        !1 === b && (da[a] = !0);
        return function (b) {
            var d = arguments,
                e = [],
                f = d[0];
            if (!da[a]) {
                var g = f.split("%s");
                e.push(g[0]);
                for (f = 1; f < g.length; f++) f - 1 >= d.length - 1 ? e.push("<too few args>") : "string" === typeof d[f] || "number" === typeof d[f] ? e.push(d[f]) : void 0 === d[f] ? e.push("(undefined)") : null === d[f] ? e.push("(null)") : e.push(JSON.stringify(d[f])), e.push(g[f]);
                d = e.join("");
                for (f = 0; f < ea.length; f++) ea[f](a, d)
            }
        }
    }

    function fa(a) {
        ea.push(a)
    }
    "console" in ba || (ba.console = {
        log: function () {
            for (var a = [], b = 0; b < arguments.length; b++) 
                try {
                    a.push(JSON.stringify(arguments[b]))
                } catch (c) {
                    a.push(c.toString())
                }
            for (b = 0; b < ea.length; b++)
                ea[b]("Console", a.join(""))
        }
    }, ba.console.error = ba.console.log);
    var $;
    $ = function () {
        function a() {
            this.length = 0
        }
        function b(a, b, c) {
            a = a.getElementsByTagName(c);
            for (c = 0; c < a.length; c++) b[c] = a[c];
            b.length = a.length
        }
        function c(c) {
            var d = /#(.*)$/,
                e = /\.(.*)$/,
                f = /^<\s*([a-zA-Z0-9]+).*>$/,
                g = /^([A-Za-z]+)$/,
                q = new a,
                r;
            try {
                r = ("object" === typeof HTMLElement ? c instanceof HTMLElement : "object" === typeof c && 1 === c.nodeType && "string" === typeof c.nodeName || 3 === c.nodeType) || c === window || c === document || c === document.body || c instanceof Element
            } catch (v) {
                r = !1
            }
            if (r) q[0] = c, q.length = 1;
            else {
                if (c instanceof a) return c;
                if (null !== (d = d.exec(c))) c = document.getElementById(d[1]), null !== c && (q[0] = c, q.length = 1);
                else if (null !== (d = f.exec(c))) q[0] = document.createElement(d[1]), q.length = 1;
                else if (null !== (d = e.exec(c))) {
                    c = document.Af(d[1]);
                    for (e = 0; e < c.length; e++) q[e] = c[e];
                    q.length = c.length
                } else if (null !== (d = g.exec(c))) b(document, q, d[1]);
                else throw console.log(c), "Error: can't parse selector: " + c + " (" + c.nodeType;
            }
            return q
        }
        s("JQUERY");
        var d, e = /\s+/,
            f = /^[\s\xA0]+/,
            g = /[\s\xA0]+$/;
        a.prototype = {
            hide: function () {
                for (var a = 0; a < this.length; a++) this[a].style.display = "none";
                return this
            },
            show: function () {
                for (var a = 0; a < this.length; a++) this[a].style.display = "block";
                return this
            },
            append: function (a) {
                a = c(a);
                if (0 < this.length) for (var b = 0; b < a.length; b++) this[0].appendChild(a[b]);
                return this
            },
            prepend: function (a) {
                a = c(a);
                0 < this.length && this[0].insertBefore(a[0], this[0].firstChild);
                return this
            },
            after: function (a) {
                a = c(a);
                0 < this.length && 0 < a.length && this[0].parentNode.insertBefore(a[0], this[0]);
                return this
            },
            before: function (a) {
                a = c(a);
                0 < this.length && 0 < a.length && a[0].parentNode.insertBefore(this[0], a[0]);
                return this
            },
            remove: function () {
                for (var a = 0; a < this.length; a++) this[a].parentNode && this[a].parentNode.removeChild(this[a]);
                return this
            },
            empty: function () {
                for (var a = 0; a < this.length; a++) for (; null !== this[a].firstChild;) this[a].removeChild(this[a].firstChild);
                return this
            },
            text: function (a) {
                if (0 < this.length) {
                    for (; null !== this[0].firstChild;) this[0].removeChild(this[0].firstChild);
                    this[0].appendChild(document.createTextNode(a))
                }
                return this
            },
            trigger: function (a) {
                this.each(function (b) {
                    var c;
                    document.createEventObject ? (c = document.createEventObject(), b.fireEvent("on" + a, c)) : (c = document.createEvent("HTMLEvents"), c.initEvent(a, !0, !0), b.dispatchEvent(c))
                })
            },
            width: function () {
                if (0 < this.length) {
                    if (1 === arguments.length) {
                        for (var a = 0; a < this.length; a++) this[a].style.width = "" + arguments[0] + "px";
                        return this
                    }
                    return this[0] === window ? this[0].innerWidth || document.documentElement.clientWidth : this[0].clientWidth
                }
                return 0
            },
            height: function () {
                if (0 < this.length) {
                    if (1 === arguments.length) {
                        for (var a = 0; a < this.length; a++) this[a].style.height = "" + arguments[0] + "px";
                        return this
                    }
                    return this[0] === window ? this[0].innerHeight || document.documentElement.clientHeight : this[0].clientHeight
                }
                return 0
            },
            outerWidth: function () {
                return 0 < this.length ? this[0].offsetWidth : 0
            },
            outerHeight: function () {
                return 0 < this.length ? this[0].offsetHeight : 0
            },
            offset: function () {
                if (0 < this.length) {
                    var a = this[0].getBoundingClientRect(),
                        b = 0,
                        c = 0;
                    "pageYOffset" in window ? (b = window.pageXOffset, c = window.pageYOffset) : (b = document.body.scrollLeft, c = document.body.scrollTop);
                    return {
                        top: a.top + c,
                        left: a.left + b
                    }
                }
                return {
                    left: 0,
                    top: 0
                }
            },
            html: function (a) {
                for (var b = 0; b < this.length; b++) this[b].innerHTML = a;
                return this
            },
            clone: function () {
                return this.length ? c(this[0].cloneNode(!0)) : new a
            },
            find: function (c) {
                var d = new a;
                this.length && b(this[0], d, c);
                return d
            },
            attr: function (a, b) {
                if (2 === arguments.length) {
                    for (var c = 0; c < this.length; c++) this[c].setAttribute(a, b);
                    return this
                }
                return 0 < this.length ? this[0].getAttribute(a) : ""
            },
            removeAttr: function (a) {
                for (var b = 0; b < this.length; b++) this[b].removeAttribute(a);
                return this
            },
            replaceWith: function (a) {
                this.length && this[0].parentNode.replaceChild(a[0], this[0]);
                return this
            },
            addClass: function (a) {
                if (a && "string" === typeof a) for (var b = (a || "").split(e), c = 0, f = this.length; c < f; c++) {
                    var g = this[c];
                    if (1 === g.nodeType) if (g.className) {
                        for (var q = " " + g.className + " ", r = g.className, v = 0, w = b.length; v < w; v++) 0 > q.indexOf(" " + b[v] + " ") && (r += " " + b[v]);
                        g.className = d.trim(r)
                    } else g.className = a
                }
                return this
            },
            each: function (a) {
                for (var b = 0; b < this.length; b++) a(this[b])
            },
            focus: function () {
                0 < this.length && this[0].focus();
                return this
            },
            blur: function () {
                0 < this.length && this[0].blur();
                return this
            },
            submit: function () {
                for (var a = 0; a < this.length; a++) this[a].submit();
                return this
            },
            css: function (a, b) {
                var c = a.split("-");
                a = c[0];
                for (var d = 1; d < c.length; d++) a += c[d].substr(0, 1).toUpperCase() + c[d].substr(1);
                if (2 === arguments.length) {
                    for (d = 0; d < this.length; d++) this[d].style[a] = "" + b;
                    return this
                }
                return this[0].currentStyle ? this[0].currentStyle[a] : window.getComputedStyle ? window.getComputedStyle(this[0], null)[a] : this[0].style[a]
            },
            on: function (a, b) {
                window.addEventListener ? this.each(function (c) {
                    b.of = function (a) {
                        a.originalEvent = a;
                        "which" in a || (a.which = a.button);
                        return b.call(c, a)
                    };
                    c.addEventListener(a, b.of, !1)
                }) : this.each(function (c) {
                    c.attachEvent("on" + a, function (a) {
                        a.originalEvent = a;
                        a.which = a.button;
                        a.pageX = a.clientX;
                        a.pageY = a.clientY;
                        a.preventDefault = function () {
                            a.returnValue = !1
                        };
                        a.stopPropagation = function () {
                            a.cancelBubble = !0
                        };
                        return b.call(c, a)
                    })
                });
                return this
            },
            bind: function (a, b) {
                return this.on(a, b)
            },
            keydown: function (a) {
                return this.on("keydown", a)
            },
            mousedown: function (a) {
                return this.on("mousedown", a)
            },
            mouseup: function (a) {
                return this.on("mouseup", a)
            },
            mousemove: function (a) {
                return this.on("mousemove", a)
            },
            click: function (a) {
                return this.on("click", a)
            },
            dblclick: function (a) {
                return this.on("dblclick", a)
            },
            mouseenter: function (a) {
                return this.on("mouseover", a)
            },
            mouseleave: function (a) {
                return this.on("mouseout", a)
            },
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b)
            },
            change: function (a) {
                return this.on("change", a)
            },
            resize: function (a) {
                return this.on("resize", a)
            },
            fadeIn: function () {
                for (var a = 0; a < this.length; a++) this[a].style.display = "block";
                return this
            }
        };
        d = function (a) {
            return c(a)
        };
        d.trim = function (a) {
            return null === a ? "" : a.toString().replace(f, "").replace(g, "")
        };
        d.ajax = function (a) {
            var b = a.url || "",
                c = a.type || "GET",
                e = a.success ||
            function () {}, f = a.error ||
            function () {};
            a = a.data || "";
            var g = "",
                r;
            try {
                r = new XMLHttpRequest
            } catch (v) {
                try {
                    r = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (w) {
                    try {
                        r = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (C) {
                        f(null, "", null)
                    }
                }
            }
            if ("object" === typeof a) for (var y in a) Object.hasOwnProperty.call(a, y) && (g.length && (g += "&"), g += encodeURIComponent(y), g += "=", g += encodeURIComponent(a[y]));
            "GET" === c && (b += "?" + g, g = "");
            r.open(c, b, !0);
            r.onreadystatechange = function () {
                if (4 === r.readyState) if (200 === r.status) {
                    var a = r.responseText;
                    if (0 === r.getResponseHeader("content-type").indexOf("application/json")) try {
                        a = d.parseJSON(a)
                    } catch (b) {}
                    e(a, "", r)
                } else f(r, "", null)
            };
            "POST" === c && r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            r.send(g);
            return r
        };
        document.Af = function (a) {
            var b = [],
                c, d;
            c = a.split(/\s+/);
            for (a = 0; a < c.length; a++) d = c[a].replace(/([\/\\\^$*+?.()|\[\]{}])/g, "\\$1"), b.push(RegExp("(^|\\s)" + d + "(\\s|$)"));
            var e = document.getElementsByTagName("*"),
                f = [];
            a = 0;
            for (d = e.length; a < d; a++) {
                var g = e[a],
                    v = !0;
                for (c = 0; c < b.length; c++) if (!b[c].test(g.className)) {
                    v = !1;
                    break
                }
                v && f.push(g)
            }
            return f
        };
        d.parseJSON = function (a) {
            return window.JSON ? window.JSON.parse(a) : eval("(" + a + ")")
        };
        d.extend = function (a) {
            for (var b = arguments[0], c = 1; c < arguments.length; c++) {
                var d = arguments[c],
                    e;
                for (e in d) d.hasOwnProperty(e) && (b[e] = d[e])
            }
            return b
        };
        d.fn = a.prototype;
        return d
    }();
    var ga = s("MISC");

    function ha(a) {
        var b = document.createElement("canvas");
        a.appendChild(b);
        "G_vmlCanvasManager" in window && (ga("Emulating canvas in IE"), G_vmlCanvasManager.initElement(b), $(b).bind("selectstart", function (a) {
            ga("Cancelled selectstart on canvas");
            a.stopPropagation();
            a.preventDefault()
        }));
        return b
    }
    var ia = /MSIE ([0-9]{1,}[\.0-9]{0,})/;

    function ja() {
        var a;
        a = -1;
        if ("Microsoft Internet Explorer" === navigator.appName) {
            var b = ia.exec(navigator.userAgent);
            null !== b && (a = parseFloat(b[1]))
        }
        ga("IE version is %s", a);
        return 0 <= a && 9 > a
    }
    function ka(a) {
        for (var b = 0; a;) try {
            var c = parseInt($(a).css("z-index"), 10);
            c && (b = Math.max(b, c));
            a = a.parentNode
        } catch (d) {
            break
        }
        return b
    };
    var la = s("Cookies");

    function ma(a) {
        this.Ba(a)
    }
    ma.prototype = {
        log: s("Layout"),
        Ba: function (a) {
            this.Qb = a.itemSize || 100;
            this.Od = a.algorithm || "wrap";
            this.Ne = a.gravity || "down";
            this.Ee = !1 !== a.resize;
            "down" === this.Ne ? (this.offsetWidth = "offsetWidth", this.offsetHeight = "offsetHeight", this.width = "width", this.height = "height", this.top = "top", this.left = "left", this.clientWidth = "clientWidth", this.clientHeight = "clientHeight") : "up" === this.Ne ? (this.offsetWidth = "offsetWidth", this.offsetHeight = "offsetHeight", this.width = "width", this.height = "height", this.top = "bottom", this.left = "left", this.clientWidth = "clientWidth", this.clientHeight = "clientHeight") : (this.offsetWidth = "offsetHeight", this.offsetHeight = "offsetWidth", this.width = "height", this.height = "width", this.top = "left", this.left = "top", this.clientWidth = "clientHeight", this.clientHeight = "clientWidth")
        },
        pd: function (a) {
            "absolute" !== window.getComputedStyle(a, null).getPropertyValue("position") && (a.style.position = "relative");
            for (var b = 0; b < a.children.length; b++) a.children[b].style.position = "absolute";
            if ("wrap" === this.Od) for (var b = a[this.clientWidth], c = 0, d = 0, e = 0, f = 0; f < a.children.length; f++) {
                var g = a.children[f];
                na(this, g, this.Qb);
                var h = g[this.offsetWidth],
                    k = g[this.offsetHeight];
                window.console.log(c, d, h, e);
                c + h > b ? 0 === c ? (oa(this, g, c, d), d += k) : (d += e, c = 0, oa(this, g, c, d), e = k) : (oa(this, g, c, d), c += h, e = Math.max(e, k))
            } else if ("mason" === this.Od) if (e = a[this.clientWidth], d = c = 0, 0 >= e) this.log("Skipping layout; width is <= 0");
            else {
                this.log("Laying out to width %s", e);
                b = Math.round(e / this.Qb);
                this.Qb = e / b;
                e = [];
                for (f = 0; f < b; f++) e.push(0);
                for (f = 0; f < a.children.length; f++) {
                    g = a.children[f];
                    na(this, g, this.Qb);
                    h = g[this.offsetHeight];
                    k = 0;
                    for (c = 1; c < b; c++) e[c] < e[k] && (k = c);
                    c = k * this.Qb;
                    d = e[k];
                    oa(this, g, c, d);
                    e[k] += h
                }
            } else if ("perfect" === this.Od) {
                b = a[this.clientWidth];
                c = h = 0;
                d = [];
                for (e = h = 0; e < a.children.length; e++) {
                    f = a.children[e];
                    pa(this, f, this.Qb);
                    g = f[this.offsetWidth];
                    if (h + g > b) if (0 === d.length) {
                        oa(this, f, 0, c);
                        na(this, f, b);
                        c += f[this.offsetHeight];
                        continue
                    } else {
                        for (var l = b / h, m = h = 0; m < d.length; m++) k = d[m], pa(this, k, this.Qb * l), oa(this, k, h, c), h += k[this.offsetWidth];
                        c += this.Qb * l;
                        h = 0;
                        d.length = 0
                    }
                    d.push(f);
                    h += g
                }
                for (e = h = 0; e < d.length; e++) k = d[e], oa(this, k, h, c), h += k[this.offsetWidth]
            }
        }
    };

    function oa(a, b, c, d) {
        b.style[a.top] = d + "px";
        b.style[a.left] = c + "px"
    }
    function pa(a, b, c) {
        if (a.Ee) {
            var d = b[a.offsetWidth],
                e = b[a.offsetHeight];
            b.style[a.height] = "" + c + "px";
            b.style[a.width] = "" + c / e * d + "px"
        }
    }
    function na(a, b, c) {
        if (a.Ee) {
            var d = b[a.offsetWidth],
                e = b[a.offsetHeight];
            b.style[a.width] = "" + c + "px";
            b.style[a.height] = "" + c / d * e + "px"
        }
    };

    function qa() {}
    qa.prototype = {
        log: s("MJAX"),
        load: function (a) {
            var b, c, d = this;
            c = $("<script>").attr("type", "text/x-mathjax-config");
            c.text("MathJax.Hub.Config({\n   extensions: [\"mml2jax.js\"],\n   mml2jax: { \n   },\n   jax: ['input/MathML', 'output/SVG']\n});");
            $(document.body).append(c);
            c = $("<script>").attr("type", "text/javascript");
            c.attr("src", "http://cdn.mathjax.org/mathjax/latest/MathJax.js?delayStartupUntil=loaded");
            $(document.body).append(c);
            this.log("Loading mathjax");
            b = setInterval(function () {
                if ("MathJax" in window) return d.log("MathJax finished loading."), clearInterval(b), window.MathJax.Hub.Startup.onload(), a && a(), MathJax.Hub.Startup.signal.Interest(function (a) {
                    return d.log("%s", a)
                })
            }, 500)
        }
    };

    function ra(a, b, c) {
        var d, e;
        d = window.MathJax.Hub.queue;
        e = $("<div>").html(b);
        e.css("position", "absolute");
        e.css("z-index", "10000");
        e.css("background", "#cccccc");
        e.css("display", "block");
        $(document.body).append(e);
        d.Push(["Typeset", window.MathJax.Hub, e[0]]);
        d.Push(function () {
            var b, d, h, k, l, m, p, q, r, v, w, C, y;
            d = e.find("svg");
            if (0 === d.length) a.log("Failed to render MJax -- no SVG found"), e.css("display", "none"), c && c(null);
            else {
                k = d[0].getBoundingClientRect();
                r = 2 * k.width;
                k = 2 * k.height;
                q = d.find("use");
                C = 0;
                for (y = q.length; C < y; C++) b = q[C], b = $(b), l = b.attr("href"), v = b.attr("x") || 0, w = b.attr("y") || 0, h = b.attr("transform") || "", a.log("USE HREF=%s x=%s y=%s... cloning", l, v, w), l = $(l).clone().removeAttr("id"), h = "" !== h ? h + (",translate(" + v + "," + w + ")") : "translate(" + v + "," + w + ")", l.attr("transform", h), b.replaceWith(l);
                h = document.createElement("svg");
                w = d[0].childNodes;
                q = 0;
                for (v = w.length; q < v; q++) b = w[q], h.appendChild(b.cloneNode(!0));
                d.attr("id", "hello");
                d = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" ' + ('viewBox="' + d[0].getAttribute("viewBox") + '" ');
                d = d + ('width="' + r + '" ') + ('height="' + k + '" ');
                d += ">";
                d += h.innerHTML;
                d += "</svg>";
                e.remove();
                d = "data:image/svg+xml," + encodeURIComponent(d);
                p = new Image;
                p.src = d;
                p = $(p);
                p.css("position", "absolute");
                p.css("z-index", "10000");
                p.css("top", "100px");
                p.css("width", "" + r + "px");
                p.css("height", "" + k + "px");
                p.css("visibility", "hidden");
                $(document.body).append(p);
                a.log("img loaded: %s", p[0].complete);
                m = setInterval(function () {
                    a.log("img loaded: %s", p[0].complete);
                    if (p[0].complete && (clearInterval(m), c)) return c(p[0])
                }, 100)
            }
        })
    };

    function sa(a, b, c, d) {
        this.Uf = a;
        this.Qa = b;
        this.Rd = c;
        this.data = d;
        this.id = "-1"
    }
    sa.prototype = {
        log: s("TRANS"),
        rename: function (a) {
            for (var b = 0; b < this.Qa.length; b++) this.Qa[b].rename(a)
        }
    };

    function ta(a, b) {
        this.Ba(a, b)
    }
    ta.prototype = {
        Ba: function (a, b) {
            this.da = b;
            this.ig = !0
        },
        ha: function (a) {
            a.moveTo(this.da.x, this.da.y)
        },
        Ec: function () {
            return null
        },
        Ob: function () {
            return {
                x: 1,
                y: 0
            }
        }
    };

    function ua(a, b, c, d, e) {
        this.Ba(a, b, c, d, e)
    }
    ua.prototype = {
        Ba: function (a, b, c, d, e) {
            this.da = b;
            this.ma = a;
            this.Hf = !0;
            this.Ub = e;
            this.lf = d;
            c.next();
            this.yd = c.next();
            this.zd = c.next();
            this.moveTo = this.kc = null;
            this.va()
        },
        log: s("LINE"),
        va: function () {
            var a = va(this.ma.da.x, this.ma.da.y, this.da.x, this.da.y);
            this.Cc = this.length = a;
            var b = this.ma.da.clone();
            if (this.ma.Hf && this.Ub) {
                this.Ub = Math.min(this.Ub, a / 2, this.ma.length / 2);
                a = t(this.ma.da.x, this.ma.da.y, this.da.x, this.da.y);
                b.x += a.x * this.Ub;
                b.y += a.y * this.Ub;
                var a = this.ma,
                    c = this.Ub,
                    d = t(a.sb.x, a.sb.y, a.da.x, a.da.y),
                    e = a.da.clone();
                e.x -= d.x * c;
                e.y -= d.y * c;
                a.kc = e;
                a.Cc -= c;
                c = a.Cc / 10 * a.lf;
                10 < c && (c = 10);
                var d = a.sb.x,
                    f = a.sb.y,
                    g = e.x,
                    h = e.y,
                    d = d + c,
                    f = f + c;
                a.La = new u(d + a.yd * (g + c - d), f + a.yd * (h + c - f));
                d = a.sb.x - c;
                g = e.x - c;
                f = a.sb.y - c;
                h = e.y - c;
                a.Sa = new u(d + a.zd * (g - d), f + a.zd * (h - f));
                this.Cc -= this.Ub
            }
            this.sb = b;
            null === this.kc && (this.kc = this.da);
            a = this.Cc / 10 * this.lf;
            10 < a && (a = 10);
            e = b.x;
            c = b.y;
            d = this.da.x;
            f = this.da.y;
            e += a;
            c += a;
            this.La = new u(e + this.yd * (d + a - e), c + this.yd * (f + a - c));
            e = b.x - a;
            d = this.da.x - a;
            c = b.y - a;
            f = this.da.y - a;
            this.Sa = new u(e + this.zd * (d - e), c + this.zd * (f - c))
        },
        Ed: function (a) {
            this.ma = a;
            this.va();
            this.ma.kc && (this.moveTo = this.ma.kc)
        },
        ha: function (a) {
            this.Ub && (this.moveTo && a.moveTo(this.moveTo.x, this.moveTo.y), a.quadraticCurveTo(this.ma.da.x, this.ma.da.y, this.sb.x, this.sb.y));
            a.bezierCurveTo(this.La.x, this.La.y, this.Sa.x, this.Sa.y, this.kc.x, this.kc.y)
        },
        Ec: function () {
            return this.ma ? t(this.ma.da.x, this.ma.da.y, this.La.x, this.La.y) : null
        },
        Ob: function () {
            return t(this.Sa.x, this.Sa.y, this.da.x, this.da.y)
        }
    };

    function wa(a, b, c) {
        this.Ba(a, b, c)
    }
    wa.prototype = {
        Ba: function (a, b, c) {
            this.da = b;
            this.ma = a;
            this.mf = c;
            var d = va(a.da.x, a.da.y, b.x, b.y);
            d || (d = 1);
            var e = (b.x - a.da.x) / d,
                f = (b.y - a.da.y) / d;
            this.Sa = new u(b.x - d * c * e, b.y - d * c * f);
            if (b = a.Sa) {
                var g = t(a.ma.da.x, a.ma.da.y, a.da.x, a.da.y),
                    h = va(a.ma.da.x, a.ma.da.y, a.da.x, a.da.y),
                    e = 0.5 * (e + g.x),
                    f = 0.5 * (f + g.y);
                b.x = a.da.x - h * c * e;
                b.y = a.da.y - h * c * f
            }
            this.La = new u(a.da.x + d * c * e, a.da.y + d * c * f);
            this.length = d
        },
        Ed: function (a) {
            this.ma = a;
            var b = a.Sa,
                c = (this.da.x - a.da.x) / this.length,
                d = (this.da.y - a.da.y) / this.length,
                e = this.mf;
            if (b) {
                var f = t(a.ma.da.x, a.ma.da.y, a.da.x, a.da.y),
                    g = va(a.ma.da.x, a.ma.da.y, a.da.x, a.da.y),
                    c = 0.5 * (c + f.x),
                    d = 0.5 * (d + f.y);
                b.x = a.da.x - g * e * c;
                b.y = a.da.y - g * e * d
            }
            this.La = new u(a.da.x + this.length * e * c, a.da.y + this.length * e * d)
        },
        ha: function (a) {
            a.bezierCurveTo(this.La.x, this.La.y, this.Sa.x, this.Sa.y, this.da.x, this.da.y)
        },
        Ec: function () {
            return this.ma ? t(this.ma.da.x, this.ma.da.y, this.La.x, this.La.y) : null
        },
        Ob: function () {
            return 0 < this.mf ? t(this.Sa.x, this.Sa.y, this.da.x, this.da.y) : t(this.ma.da.x, this.ma.da.y, this.da.x, this.da.y)
        }
    };

    function xa(a, b, c) {
        this.Ba(a, b, c)
    }
    xa.prototype = {
        Ba: function (a, b, c) {
            this.control = b;
            this.da = c
        },
        ha: function (a) {
            a.quadraticCurveTo(this.control.x, this.control.y, this.da.x, this.da.y)
        },
        Ec: function () {
            return this.ma ? t(this.ma.da.x, this.ma.da.y, this.control.x, this.control.y) : null
        },
        Ob: function () {
            return t(this.control.x, this.control.y, this.da.x, this.da.y)
        }
    };

    function ya(a, b, c, d) {
        this.Ba(a, b, c, d)
    }
    ya.prototype = {
        Ba: function (a, b, c, d) {
            this.control = b;
            this.da = c;
            this.Xf = d
        },
        ha: function (a) {
            a.arcTo(this.control.x, this.control.y, this.da.x, this.da.y, this.Xf)
        }
    };

    function za(a, b, c, d) {
        this.Ba(a, b, c, d)
    }
    za.prototype = {
        Ba: function (a, b, c, d) {
            this.La = b;
            this.Sa = c;
            this.da = d;
            this.ma = a
        },
        ha: function (a) {
            a.bezierCurveTo(this.La.x, this.La.y, this.Sa.x, this.Sa.y, this.da.x, this.da.y)
        },
        Ec: function () {
            return this.ma ? t(this.ma.da.x, this.ma.da.y, this.La.x, this.La.y) : null
        },
        Ob: function () {
            return t(this.Sa.x, this.Sa.y, this.da.x, this.da.y)
        }
    };

    function Aa(a, b, c, d, e) {
        this.Ba(a, b, c, d, e)
    }
    Aa.prototype = {
        log: s("SEGMENT"),
        Ba: function (a, b, c, d, e) {
            this.ma = a;
            this.gd = b;
            e *= 2;
            var f = 2 * d.next() - 1;
            d.next();
            d = this.ma.Ob();
            if (!this.ma.ig && d) {
                var g = va(a.da.x, a.da.y, b.x, b.y);
                this.La = new u(a.da.x + 0.5522847498 * d.x * g, a.da.y + 0.5522847498 * d.y * g)
            } else this.La = new u(a.da.x + 0.5522847498 * (b.x - a.da.x), a.da.y + 0.5522847498 * (b.y - a.da.y));
            this.Sa = new u(c.x - 0.5522847498 * (c.x - b.x) * (1 - f * e), c.y - 0.5522847498 * (c.y - b.y) * (1 - f * e));
            this.da = c
        },
        Ed: function (a) {
            this.ma = a;
            var b = this.ma.Ob();
            if (b) {
                var c = va(a.da.x, a.da.y, this.gd.x, this.gd.y);
                this.La = new u(a.da.x + 0.5522847498 * b.x * c, a.da.y + 0.5522847498 * b.y * c)
            } else this.La = new u(a.da.x + 0.5522847498 * (this.gd.x - this.ma.da.x), a.da.y + 0.5522847498 * (this.gd.y - this.ma.da.y))
        },
        ha: function (a) {
            a.bezierCurveTo(this.La.x, this.La.y, this.Sa.x, this.Sa.y, this.da.x, this.da.y)
        },
        Ec: function () {
            return this.ma ? t(this.ma.da.x, this.ma.da.y, this.La.x, this.La.y) : null
        },
        Ob: function () {
            return t(this.Sa.x, this.Sa.y, this.da.x, this.da.y)
        }
    };
    var x = [],
        Ba = null,
        Ca = s("ImageLoader");

    function Da() {
        var a = [];
        Ca("Timeout running... %s images remaining", x.length);
        for (var b = 0; b < x.length; b++) x[b].complete ? x[b].fn(x[b], x[b].Yc) : 5E3 > x[b].Hd ? (x[b].Hd += 250, a.push(x[b])) : x[b].fn(x[b], x[b].Yc);
        x = a;
        x.length ? setTimeout(Da, 250) : (Ca("Timeout Stopped"), Ba = !1)
    }

    function Ea(a, b) {
        function c() {
            Ca("LoadFn called. complete=%s", d.complete);
            if (d.complete) for (var a = 0; a < x.length; a++) {
                if (x[a] === d) {
                    x.splice(a, 1);
                    b(d, d.Yc);
                    break
                }
            } else Ba || (Ba = !0, setTimeout(Da, 250), d.Hd = 250)
        }
        var d = document.createElement("img");
        x.push(d);
        d.fn = b;
        d.Yc = a;
        d.Hd = 0;
        d.addEventListener ? (d.addEventListener("load", function () {
            c()
        }, !1), d.addEventListener("error", function () {
            Ca("Error loading %s", a);
            b(null, d.Yc)
        }, !1)) : (d.attachEvent("onload", function () {
            c()
        }), d.attachEvent("onerror", function () {
            Ca("Error loading %s", a);
            b(null, d.Yc)
        }));
        d.src = a
    };

    function Fa() {}
    Fa.prototype = {
        log: s("ServerRenderer"),
        start: function () {},
        $d: function (a, b, c) {
            var d = document.createElement("form"),
                e = document.createElement("input"),
                f = document.createElement("input");
            document.body.appendChild(d);
            d.appendChild(e);
            d.appendChild(f);
            if (c) {
                var g = document.createElement("input");
                g.type = "hidden";
                g.name = "filename";
                g.value = c;
                d.appendChild(g)
            }
            d.method = "post";
            d.action = "http://zwibbler.com/server.cgi";
            e.type = "hidden";
            e.name = "type";
            e.value = b;
            f.type = "hidden";
            f.name = "document";
            f.value = a.save("zwibbler3");
            d.submit();
            document.body.removeChild(d)
        }
    };

    function Ga(a) {
        this.code = "en";
        if ("string" === typeof a) {
            a = a.split("\n");
            for (var b = /^([ \t]*)([^:]+):([^:]+):(.*)/, c = {}, d = 0; d < a.length; d++) {
                var e = b.exec(a[d]);
                if (e) {
                    var f = e[2],
                        g = e[3],
                        e = e[4];
                    f in c || (c[f] = {});
                    g in c[f] && this.log("Warning: Replacing %s:%s", f, g);
                    c[f][g] = e
                }
            }
            a = c
        }
        this.data = a
    }
    Ga.prototype = {
        log: s("LANGUAGE"),
        fn: function () {
            var a = this;
            return function (b, c) {
                return Ha(a, arguments)
            }
        },
        get: function (a, b) {
            return Ha(this, arguments)
        }
    };

    function Ha(a, b) {
        var c = b[0],
            d = "<not translated:" + c + ">";
        a.code in a.data && c in a.data[a.code] && (d = a.data[a.code][c]);
        for (c = 1; c < b.length; c++) d = d.replace("^" + c, b[c]);
        return d
    }
    function Ia(a, b) {
        a.code = b
    };

    function z() {
        this.td = !1;
        this.Ha = {}
    }
    z.prototype = {
        log: s("EventEmitter"),
        emit: function (a, b) {
            var c, d = this;
            this.Ha || (this.Ha = {});
            c = Array.prototype.slice.call(arguments, 1);
            setTimeout(function () {
                var b, f, g, h;
                if (a in d.Ha) for (h = d.Ha[a], f = 0, g = h.length; f < g; f++) b = h[f], d.td || d.log("Emit %s", a), b.apply(null, c)
            }, 0);
            return this
        },
        Je: function (a, b) {
            var c;
            this.Ha || (this.Ha = {});
            c = Array.prototype.slice.call(arguments, 1);
            var d, e, f, g;
            if (a in this.Ha) for (g = this.Ha[a], e = 0, f = g.length; e < f; e++) d = g[e], this.td || this.log("Emit %s", a), d.apply(null, c);
            return this
        },
        on: function (a, b) {
            this.Ha || (this.Ha = {});
            this.bind(a, b);
            return this
        },
        bind: function (a, b) {
            a in this.Ha ? this.Ha[a].push(b) : this.Ha[a] = [b];
            return b
        }
    };

    function Ja(a) {
        var b = this;
        z.call(this);
        this.$ = $(a);
        this.$.css("position", "absolute");
        this.$.css("top", "0");
        this.$.css("bottom", "0");
        this.$.css("width", "160px");
        this.$.css("left", "50px");
        this.$.css("background", "#888");
        this.$.css("overflow-y", "scroll");
        this.$.css("text-align", "center");
        a = $("<input>").attr("type", "button").attr("value", "Add Page");
        this.$.append(a);
        a.click(function () {
            b.rb.Cd(b.rb.Oc(b.rb.xc() + 1))
        });
        a = $("<input>").attr("type", "button").attr("value", "Delete Page");
        this.$.append(a);
        a.click(function () {
            b.rb.Ie(b.rb.xc())
        });
        this.xb = [];
        this.enabled = !1
    }
    Ja.prototype = {
        log: s("PageSelector"),
        lb: function (a) {
            this.log("Set page %s", a);
            this.page < this.xb.length && $(this.xb[this.page]).css("border-color", "transparent");
            this.page = a;
            this.page < this.xb.length && $(this.xb[this.page]).css("border-color", "#9fb3e7")
        }
    };

    function Ka(a, b) {
        var c = ha(a.$[0]);
        $(c).css("margin-left", "10px");
        $(c).css("margin-right", "10px");
        $(c).css("margin-top", "5px");
        $(c).css("margin-bottom", "5px");
        $(c).css("border-width", "3px");
        a.log("Make canvas for page %s, currentPage is %s", b, a.page);
        b === a.page ? $(c).css("border-color", "#9fb3e7") : $(c).css("border-color", "transparent");
        $(c).css("border-style", "solid");
        a.xb.push(c);
        c.page = b;
        $(c).click(function () {
            a.emit("goto-page", c.page)
        });
        return c
    }

    function La(a) {
        a.log("Regenerate page views.");
        var b = a.$[0].clientWidth - 20 - 6,
            c = a.rb.dc(),
            d = a.rb.Me();
        d.x = 0;
        d.y = 0;
        for (var e = b / d.width * d.height, f = 0; f < c; f++) {
            var g;
            g = f === a.xb.length ? Ka(a, f) : a.xb[f];
            g.width = b;
            g.height = e;
            g = g.getContext("2d");
            g.save();
            g.fillStyle = "#ffffff";
            g.fillRect(0, 0, b, e);
            g.scale(b / d.width, b / d.width);
            a.rb.ha(g, {
                page: f
            });
            g.restore()
        }
        for (; f < a.xb.length; f++) $(a.xb[f]).remove();
        a.xb.length = c
    }

    function Ma(a, b) {
        var c = null;
        a.rb = b;
        b.on("document-changed", function () {
            null === c && a.enabled && (c = setTimeout(function () {
                La(a);
                a.lb(a.rb.xc());
                c = null
            }, 100))
        });
        b.on("set-page", function (b) {
            a.lb(b)
        })
    }
    function Na(a, b) {
        a.enabled = b;
        a.enabled && a.rb && setTimeout(function () {
            La(a)
        }, 10)
    }
    Ja.prototype = $.extend({}, z.prototype, Ja.prototype);

    function Oa() {
        z.apply(this, arguments);
        this.queue = [];
        this.$b = !1;
        this.he = null
    }
    Oa.prototype = {
        log: s("FORMAT", !0),
        add: function (a, b, c, d, e) {
            var f, g, h, k;
            k = this.queue;
            g = 0;
            for (h = k.length; g < h; g++) f = k[g], f.type === b && f.ja === a && (f.Xc = !0);
            this.log("Request URL %s", c);
            this.queue.push({
                ja: a,
                type: b,
                url: c,
                Tf: d,
                Td: e,
                Xc: !1
            });
            Pa(this)
        },
        re: function (a) {
            this.he = a;
            Pa(this)
        }
    };

    function Qa(a, b) {
        a.$b = !0;
        a.log("Processing request for item %s url=%s", b.ja.id, b.url);
        0 === b.type.indexOf("image") ? Ea(b.url, function (c, d) {
            null !== c ? (a.log("Image request completed for item %s url %s", b.ja.id, d), b.Td(c, d)) : a.log("Image request failed for url %s", d);
            a.$b = !1;
            b.Xc = !0;
            Pa(a)
        }) : 0 === b.type.indexOf("math") ? null === a.he ? a.$b = !1 : ra(a.he, b.url, function (c) {
            a.log("MathJax request completed for item %s", b.ja.id);
            b.Td(c, b.url);
            a.$b = !1;
            b.Xc = !0;
            Pa(a)
        }) : $.ajax({
            url: b.url,
            data: b.Tf,
            dataType: "json",
            success: function (c) {
                b.Xc || (a.log("Request completed for item %s", b.ja.id), b.Td(c), a.emit("reformat", b.ja), a.$b = !1, a.queue.shift(), Pa(a))
            },
            error: function (b, d, e) {
                a.log("Error: %s %s", d, e);
                a.$b = !1;
                a.queue.shift();
                Pa(a)
            }
        })
    }
    function Pa(a) {
        for (var b = 0; !a.$b && b < a.queue.length;) a.queue[b].Xc ? a.queue.shift() : (Qa(a, a.queue[0]), b += 1)
    }
    Oa.prototype = $.extend({}, z.prototype, Oa.prototype);

    function Ra(a) {
        z.call(this);
        this.$ = a;
        a.css("display", "none");
        this.duration = 200;
        this.right = !0;
        a: {
            a = (document.body || document.documentElement).style;
            for (var b = "transition", c = ["Moz", "Webkit", "Khtml", "O", "ms"], b = b.charAt(0).toUpperCase() + b.substr(1), d = 0; d < c.length; d++) if ("string" === typeof a[c[d] + b]) {
                Sa = c[d];
                a = !0;
                break a
            }
            a = !1
        }
        this.cd = a;
        this.prefix = Sa;
        this.Mc = null;
        this.cd && (a = this.$.outerWidth(), this.css("TransitionProperty", "transform"), this.css("Transform", "translate(" + a + "px,0)"))
    }
    var Sa;
    Ra.prototype = {
        log: s("SlidingPanel", !1),
        show: function (a) {
            var b = this;
            this.Mc && (clearTimeout(this.Mc), this.Mc = null);
            this.$.show();
            var c = this.$.outerWidth();
            this.$.hide();
            "right" === a ? (this.left = !1, this.$.css("left", "" + ($(window).width() - c) + "px")) : this.left = !0;
            b.Jb = new aa;
            b.Jb.zIndex = b.$.css("z-index");
            b.Jb.insertBefore = b.$;
            b.Jb.show(function () {
                b.hide()
            });
            b.cd ? (b.css("TransitionDuration", "0"), window.setTimeout(function () {
                b.$.css("display", "block");
                b.left ? b.css("Transform", "translate(-" + c + "px,0)") : b.css("Transform", "translate(" + c + "px,0)");
                b.css("TransitionDuration", "" + b.duration + "ms");
                window.setTimeout(function () {
                    b.css("Transform", "translate(0,0)");
                    window.setTimeout(function () {
                        b.emit("show")
                    }, b.duration)
                }, 1)
            }, 1)) : (b.$.css("display", "block"), b.emit("show"))
        },
        css: function (a, b) {
            a = "" !== this.prefix ? this.prefix + a : a.charAt(0).toLowerCase() + a.substr(1);
            this.$[0].style[a] = b
        },
        hide: function () {
            var a = this;
            if (!this.Mc) {
                a.Jb.hide();
                var b = this.$.outerWidth();
                a.cd ? this.left ? a.css("Transform", "translate(-" + b + "px,0)") : a.css("Transform", "translate(" + b + "px,0)") : a.$.css("display", "none");
                a.cd ? this.Mc = window.setTimeout(function () {
                    a.$.css("display", "none");
                    a.emit("hide")
                }, a.duration) : a.emit("hide")
            }
        }
    };
    Ra.prototype = $.extend({}, z.prototype, Ra.prototype);

    function Ta(a, b) {
        if (!a) throw b || "Assertion failed";
    }
    function Ua(a) {
        Ta("number" === typeof a, "Expected a number")
    }
    function Va(a) {
        return "number" === typeof a
    };

    function Wa(a) {
        this.keys = {};
        1 === arguments.length && this.add(arguments[0]);
        1 === arguments.length && "object" === typeof arguments[0] && this.add(arguments[0])
    }
    Wa.prototype = {
        contains: function (a) {
            return a in this.keys
        },
        add: function (a) {
            var b, c;
            if ("string" === typeof a || "number" === typeof a) this.keys[a] = !0;
            else if ("object" === typeof a) if ("[object Array]" === Object.prototype.toString.apply(a)) for (c = 0; c < a.length; c++) b = a[c], this.keys[b] = !0;
            else for (b in a) a.hasOwnProperty(b) && (this.keys[b] = !0);
            else return Ta(!1, "Arg must be an array")
        },
        remove: function (a) {
            delete this.keys[a]
        },
        toArray: function () {
            var a, b;
            b = [];
            for (a in this.keys) this.keys.hasOwnProperty(a) && b.push(a);
            return b
        },
        clear: function () {
            this.keys = {}
        }
    };

    function Xa(a) {
        var b, c;
        c = [];
        for (b in a.keys) a.keys.hasOwnProperty(b) && c.push(parseFloat(b));
        return c
    };

    function Ya() {
        this.Ea = [];
        this.next = 0
    }
    Ya.prototype = {
        log: s("TRANSLIST"),
        qa: function (a, b, c) {
            var d;
            c = c || null;
            d = this.Ea.length ? this.Ea[this.Ea.length - 1].id : "0";
            this.Ea.length = this.next;
            null === c ? (this.Ea.push(new sa(d, b, a.Da, null)), this.Pa(a)) : (this.Ea.push(new sa(d, b, c, null)), this.next += 1)
        },
        Vd: function (a, b, c, d) {
            if (b.Uf !== (this.Ea.length ? this.Ea[this.Ea.length - 1].id : "0")) throw "ERROR! mismatched parent id";
            if (b.Rd !== a.Da) throw "ERROR! mismatched base id";
            this.Ea.length = this.next;
            this.Ea.push(b);
            return this.Pa(a, c, d)
        },
        Pa: function (a, b, c) {
            var d, e, f, g;
            b = b || null;
            c = c || null;
            if (this.next === this.Ea.length) return !1;
            Ta(a.Da === this.Ea[this.next].Rd);
            g = this.Ea[this.next].Qa;
            e = 0;
            for (f = g.length; e < f; e++) d = g[e], b && d.Kc(a, b), c && Za(d, a, c), d.Pa(a);
            this.next += 1;
            return !0
        },
        Ua: function (a, b, c) {
            var d, e, f;
            b = b || null;
            c = c || null;
            if (0 === this.next) return !1;
            this.next -= 1;
            d = this.Ea[this.next].Qa;
            if (0 !== d.length) {
                for (e = f = d.length - 1; 0 <= f && !(0 > e); e = f += -1) d[e].Ua(a), b && d[e].Kc(a, b), c && Za(d[e], a, c);
                $a(a, this.Ea[this.next].Rd)
            }
        },
        rc: function () {
            return 0 < this.next
        },
        qc: function () {
            return this.next < this.Ea.length
        }
    };
    var ab = {
        base64: function (a) {
            var b = "",
                c, d, e, f, g, h = 0,
                k = {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    E: 4,
                    F: 5,
                    G: 6,
                    H: 7,
                    I: 8,
                    J: 9,
                    K: 10,
                    L: 11,
                    M: 12,
                    N: 13,
                    O: 14,
                    P: 15,
                    Q: 16,
                    R: 17,
                    S: 18,
                    T: 19,
                    U: 20,
                    V: 21,
                    W: 22,
                    X: 23,
                    Y: 24,
                    Z: 25,
                    a: 26,
                    b: 27,
                    c: 28,
                    d: 29,
                    e: 30,
                    f: 31,
                    g: 32,
                    h: 33,
                    i: 34,
                    j: 35,
                    k: 36,
                    l: 37,
                    m: 38,
                    n: 39,
                    o: 40,
                    p: 41,
                    q: 42,
                    r: 43,
                    s: 44,
                    t: 45,
                    u: 46,
                    v: 47,
                    w: 48,
                    x: 49,
                    y: 50,
                    z: 51,
                    0: 52,
                    1: 53,
                    2: 54,
                    3: 55,
                    4: 56,
                    5: 57,
                    6: 58,
                    7: 59,
                    8: 60,
                    9: 61,
                    "+": 62,
                    "/": 63,
                    "=": 64
                };
            for (a = a.replace(/[^A-Za-z0-9\-_\=\+\/]/g, ""); h < a.length;) c = k[a.charAt(h++)], d = k[a.charAt(h++)], f = k[a.charAt(h++)], g = k[a.charAt(h++)], c = c << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, e = (f & 3) << 6 | g, b += String.fromCharCode(c), 64 !== f && (b += String.fromCharCode(d)), 64 !== g && (b += String.fromCharCode(e));
            return b
        }
    };

    function A(a) {
        this.ka = a;
        this.Ha = {};
        this.ka.ue(this);
        this.Nc = !1;
        this.Qa = [];
        this.ic = 0;
        bb(this)
    }
    A.prototype = {
        log: s("CONTEXT"),
        pf: function () {
            this.Nc = !1;
            this.Qa = []
        },
        qf: function () {
            return this.Oc(this.dc())
        },
        sf: function () {
            this.Qa = [];
            this.ic = 0;
            this.Nc = !0
        },
        qc: function () {
            return this.ka.view.ia.qc()
        },
        rc: function () {
            return this.ka.view.ia.rc()
        },
        tf: function () {
            this.ka.view.ia.Ea = new Ya
        },
        uf: function (a) {
            this.ka.view.Hb(a, !1)
        },
        vf: function () {
            this.ka.view.qa(this.Qa, !0);
            this.Nc = !1;
            this.Qa = [];
            this.ic = 0
        },
        Vd: function () {
            this.ka.view.qa(this.Qa);
            this.Nc = !1;
            this.Qa = [];
            this.ic = 0
        },
        copy: function () {
            this.ka.view.copy()
        },
        sc: function (a) {
            return B(this, this.ka.sc(this.Qa, a))
        },
        createNode: function (a, b) {
            return B(this, this.ka.createNode(this.Qa, a, b))
        },
        hd: function (a) {
            return B(this, this.ka.hd(this.Qa, a))
        },
        Wd: function (a) {
            return B(this, this.ka.Wd(this.Qa, a))
        },
        Yd: function (a) {
            return B(this, this.ka.Yd(this.Qa, a))
        },
        Ie: function () {
            if (1 === this.dc()) this.log("Cannot remove all the pages.");
            else {
                var a = this.ka.view.ia;
                this.Qa.push(new cb([a.pb[a.nb].id]));
                B(this)
            }
        },
        Zd: function () {
            if (1 === arguments.length && !1 === arguments[0]) {
                var a = this.ka.view.ia;
                a.bf = a.Ea.next
            }
            return this.ka.view.ia.Zd()
        },
        $d: function (a, b) {
            "pdf" === a || "svg" === a || "png" === a ? this.ka.ff.$d(this, a, b) : this.log("unsupported format for download: %s", a)
        },
        ha: function (a, b) {
            b = b || {};
            var c = this.ka.view.ia.nb;
            this.ka.view.ia.lb(b.page || 0);
            this.ka.view.ia.ha(a);
            this.ka.view.ia.lb(c)
        },
        emit: function (a, b) {
            var c, d = this;
            this.Ha || (this.Ha = {});
            c = Array.prototype.slice.call(arguments, 1);
            setTimeout(function () {
                var b, f, g, h;
                if (a in d.Ha) for (h = d.Ha[a], f = 0, g = h.length; f < g; f++) b = h[f], b.apply(null, c)
            }, 0);
            return this
        },
        xc: function () {
            return this.ka.view.ia.nb
        },
        Me: function () {
            var a = db(this.ka.view.ia);
            return {
                x: a.x,
                y: a.y,
                width: a.width,
                height: a.height
            }
        },
        zf: function () {
            var a = this.ka.view.ia.ec();
            return {
                x: a.x,
                y: a.y,
                left: a.x,
                top: a.y,
                right: a.x + a.width,
                bottom: a.y + a.height,
                width: a.width,
                height: a.height
            }
        },
        Bf: function (a, b) {
            return this.nd(a, b)
        },
        nd: function (a, b) {
            return this.ka.nd(a, b)
        },
        dc: function () {
            return this.ka.view.ia.dc()
        },
        Oc: function (a) {
            var b = this.ka.view.ia.Da;
            this.Qa.push(new D("PageNode", {}, this.ka.view.ia.root.id, a));
            B(this, b);
            return a
        },
        load: function (a, b) {
            1 === arguments.length && (b = arguments[0], a = "zwibbler3");
            var c;
            "list" === a ? (this.ka.Dc(eb(b)), c = void 0) : c = this.ka.Dc(fb(b));
            return c
        },
        sd: function () {
            this.ka.sd();
            bb(this)
        },
        nextPage: function () {
            this.Cd(Math.min(this.xc() + 1, this.dc() - 1))
        },
        on: function (a, b) {
            a in this.Ha ? this.Ha[a].push(b) : this.Ha[a] = [b];
            return this
        },
        vd: function () {
            this.ka.view.vd()
        },
        Wf: function () {
            this.Cd(Math.max(this.xc() - 1, 0))
        },
        Pa: function () {
            this.ka.ga.emit("menu.redo")
        },
        resize: function () {
            this.ka.oc(!0)
        },
        save: function (a) {
            if ("list" === a) return gb(this.ka.view.ia.root);
            if ("png" === a) return hb(this.ka);
            if ("zwibbler3" === a || 0 === arguments.length) return this.ka.view.ia.save("zwibbler3");
            if ("image/png" === a) {
                for (var b = hb(this.ka), b = b.substr(b.indexOf(",") + 1), c = ["base64"], d = 0; d < c.length; d++) b = ab[c[d]](b);
                return b
            }
            return "Unsupported format: " + a
        },
        pe: function (a) {
            this.ka.view.pe(a)
        },
        $f: function (a) {
            var b = this.ka,
                c, d, e, f;
            b.wb.clear();
            f = [];
            d = 0;
            for (e = a.length; d < e; d++) c = a[d], "string" === typeof c ? f.push(ib(b.wb, c, c)) : f.push(ib(b.wb, c.small, c.large))
        },
        ag: function (a, b) {
            return this.ka.ea.set(a, b)
        },
        Cd: function (a) {
            this.ka.view.lb(a)
        },
        qe: function (a) {
            this.ka.view.qe(a)
        },
        Vc: function (a, b) {
            Va(a) && Va(b) ? this.ka.view.Vc(a, b) : alert("setDocumentSize: width/height must be numbers")
        },
        gf: function (a) {
            var b, c = null,
                d, e = !0,
                f = !1;
            if (2 === arguments.length) Va(arguments[0]) && Va(arguments[1]) ? (d = arguments[0], b = arguments[1]) : "string" === typeof arguments[0] && "boolean" === typeof arguments[1] ? (c = arguments[0], f = arguments[1]) : e = !1;
            else if (1 === arguments.length && "string" === typeof arguments[0]) for (var g = arguments[0].split(" "), h = 0; h < g.length; h++)"landscape" === g[h] ? f = !0 : "portrait" === g[h] ? f = !1 : c = g[h];
            if (!1 === e) return this.log("Bad arguments to setPaperSize()."), !1;
            if (null === c) return this.Vc(d, b), !0;
            switch (c) {
            case "letter":
                d = 816;
                b = 1056;
                break;
            case "legal":
                d = 816;
                b = 1344;
                break;
            case "11x17":
                d = 1056;
                b = 1632;
                break;
            case "tabloid":
                d = 1056;
                b = 1632;
                break;
            case "a0":
                d = 841 / 25.4 * 96;
                b = 1189 / 25.4 * 96;
                break;
            case "a1":
                d = 594 / 25.4 * 96;
                b = 841 / 25.4 * 96;
                break;
            case "a2":
                d = 420 / 25.4 * 96;
                b = 594 / 25.4 * 96;
                break;
            case "a3":
                d = 297 / 25.4 * 96;
                b = 420 / 25.4 * 96;
                break;
            case "a4":
                d = 210 / 25.4 * 96;
                b = 297 / 25.4 * 96;
                break;
            default:
                return this.log("Invalid paper size: %s", c), !1
            }
            f && (c = d, d = b, b = c);
            this.Vc(d, b);
            return !0
        },
        bg: function (a) {
            var b = this.ka,
                c, d, e, f;
            b.tb.clear();
            f = [];
            d = 0;
            for (e = a.length; d < e; d++) c = a[d], "string" === typeof c ? f.push(ib(b.tb, c, c)) : f.push(ib(b.tb, c.small, c.large))
        },
        cg: function (a, b, c) {
            this.Dd(a, b, c)
        },
        se: function (a, b) {
            return B(this, this.ka.se(this.Qa, a, b))
        },
        Dd: function (a, b, c) {
            return B(this, this.ka.Dd(this.Qa, a, b, c))
        },
        te: function (a) {
            this.ka.view.te(a)
        },
        eg: function (a) {
            Va(a) || "page" === a || "width" === a ? this.ka.view.zoom(a) : this.log("setZoom: invalid parameter.")
        },
        Wc: function (a, b) {
            this.ka.view.Wc(a, b)
        },
        xe: function (a, b, c) {
            this.log("Translate node %s by %s,%s actions=%s", a, b, c, this.Qa.length);
            return B(this, this.ka.xe(this.Qa, a, b, c))
        },
        Ua: function () {
            this.ka.ga.emit("menu.undo")
        },
        rg: function () {
            jb(this.ka.view)
        },
        sg: function (a, b) {
            kb(this.ka.view, a, b)
        },
        tg: function () {
            lb(this.ka.view)
        },
        ug: function () {
            mb(this.ka.view)
        },
        vg: function () {
            nb(this.ka.view)
        },
        wg: function () {
            E(this.ka.view)
        },
        xg: function (a, b) {
            ob(this.ka.view, a, b)
        },
        zg: function (a) {
            var b = this.ka.view;
            b.ea.get("readOnly") ? b.log("readOnly mode: Ignoring tool click.") : F(b, new pb(b, "stampline", a))
        },
        yg: function () {
            qb(this.ka.view)
        },
        Ag: function () {
            rb(this.ka.view)
        }
    };

    function bb(a) {
        var b = a.ka.ea.get("defaultPaperSize");
        a.log("onNewDocument()");
        "none" !== b && a.gf(b)
    }

    function B(a, b) {
        if (!a.Nc) return a.log("Not in a transaction. committing immediately. id=%s", b), a.Vd(), b;
        if ("number" === typeof b) return a.ic += 1, a.log("id=%s numCreated=%s", b, a.ic), b + a.ic - 1
    };

    function sb() {
        this.items = []
    }
    sb.prototype = {};

    function vb(a, b, c) {
        a.items.push({
            type: "menu",
            display: b,
            Tc: c
        })
    }
    function wb(a) {
        a.items.push({
            type: "separator"
        })
    }
    function G(a, b, c) {
        a.items.push({
            type: "normal",
            display: b,
            event: c,
            xf: void 0
        })
    };

    function xb(a) {
        for (var b = [], c = 0; c < a; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890" [Math.floor(63 * Math.random())]);
        return b.join("")
    }
    "object" === typeof module && (exports.Cg = xb);

    function yb(a) {
        a = a.replace(/\+/g, " ");
        return window.wf ? window.wf(a) : unescape(a)
    }
    function zb() {
        var a = window.location.hash,
            b, c, d, e, f;
        b = {};
        e = a.indexOf("#");
        0 <= e && (a = a.substr(e + 1));
        e = a.indexOf("#");
        0 <= e && (a = a.substr(0, e));
        a = a.split("&");
        e = 0;
        for (f = a.length; e < f; e++) c = a[e], d = c.split("="), c = yb(d[0]), d = 1 < d.length ? yb(d[1]) : "", c.length && (b[c] = d);
        return b
    };
    var Ab, Bb, Cb;
    Cb = document.getElementsByTagName("script");
    Bb = Cb[Cb.length - 1];
    Ab = void 0 !== Bb.getAttribute.length ? Bb.src : Bb.getAttribute("src", -1);

    function Db(a) {
        var b, c;
        this.options = {
            background: "clear",
            backgroundImage: null,
            colourPicker: "wheel",
            colourPalette: "#000000 #ffffff #000088 #008800 #008888 #880000 #880088 #884400 #888888 #444444 #0000ff #00ff00 #00ffff #ff0000 #ff00ff #ffff00".split(" "),
            debug: !1,
            defaultBrushColour: "#000000",
            defaultBrushWidth: 10,
            defaultFillStyle: "#e0e0e0",
            defaultFont: "Arial",
            defaultFontSize: 20,
            defaultLineWidth: 2,
            defaultPaperSize: "none",
            defaultRoundRectRadius: 10,
            defaultSmoothness: "smooth",
            defaultStrokeStyle: "#000000",
            defaultText: "Lorum ipsum dolor",
            defaultTextFillStyle: "#000000",
            defaultZoom: 1,
            fonts: ["Arial", "Times New Roman"],
            gridSpacing: 20,
            imageFolder: "$SCRIPT",
            iPadNoScrollText: !0,
            language: "en",
            nudge: 10,
            pageView: !1,
            pasteOffset: 10,
            readOnly: !1,
            setFocus: !0,
            showArrowTool: !0,
            showBackgroundSelector: !1,
            showBrushTool: !0,
            showCircleTool: !0,
            showColourPanel: !0,
            showCopyPaste: !0,
            showCurveTool: !0,
            showDebug: !1,
            showFontNameProperty: !0,
            showFontSizeProperty: !0,
            showImageSelector: !1,
            showImageTool: !1,
            showKeyboardHelp: !0,
            showLineTool: !0,
            showMathTool: !1,
            showMenu: !1,
            showMoveToFrontBack: !1,
            showPageSelector: !1,
            showPickTool: !0,
            showPropertyPanel: !1,
            showRoundRectTool: !1,
            showShapeBrushTool: !1,
            showSloppinessProperty: !0,
            showSmoothnessProperty: !0,
            showSquareTool: !0,
            showTextTool: !0,
            showToolbar: !0,
            showUndoRedo: !0,
            sloppy: !1,
            snap: 0,
            symmetry: 0,
            textMode: "interactive",
            useTouch: "auto"
        };
        for (c in a) a.hasOwnProperty(c) && (c in this.options || alert("Zwibbler: Unknown option '" + c + "'"), this.options[c] = a[c]);
        a = zb();
        for (c in a) a.hasOwnProperty(c) && this.set(c, a[c]);
        "" === Eb() ? (this.Ga = this.options.imageFolder.replace("$SCRIPT/", ""), this.Ga = this.Ga.replace("$SCRIPT", "")) : this.Ga = this.options.imageFolder.replace("$SCRIPT", Eb());
        "" !== this.Ga && "/" !== this.Ga[this.Ga.length - 1] && (this.Ga += "/");
        "auto" === this.options.useTouch && (c = "ontouchstart" in window || "onmsgesturechange" in window, this.log("Detected touch support: %s", c));
        for (b in this.options) this.options.hasOwnProperty(b) && this.log("%s=%s", b, this.options[b])
    }
    Db.prototype = {
        log: s("CONFIG"),
        set: function (a, b, c) {
            if (!(a in this.options)) return this.log("Error: %s is not a configuration option.", a), !1;
            if ("defaultZoom" === a) {
                if ("page" !== b && "width" !== b && !Va(b) && (b = parseFloat(b), isNaN(b))) return this.log("Error: Config option %s must be a number or 'page' or 'width'", a), !1
            } else if ("string" === typeof b) if ("number" === typeof this.options[a]) {
                if (b = parseFloat(b), isNaN(b)) return this.log("Error: Config option %s expects a number", a), !1
            } else "boolean" === typeof this.options[a] && (b = "1" === b || "true" === b || "" === b);
            this.log("Set config %s=%s", a, b);
            this.options[a] = b;
            c || this.emit("update", a, b);
            return !0
        },
        fg: function () {
            return this.options.showBrushTool
        },
        kf: function () {
            return this.options.showPropertyPanel
        },
        gg: function () {
            return this.options.showColourPanel
        },
        Vb: function () {
            return this.options.showDebug
        },
        hg: function () {
            return this.options.showToolbar
        },
        get: function (a) {
            return this.options[a]
        },
        Wb: function () {
            return "auto" === this.options.useTouch ? "ontouchstart" in window || "onmsgesturechange" in window : this.options.useTouch
        }
    };

    function Eb() {
        var a, b;
        b = Ab;
        a = b.lastIndexOf("/");
        return b = 0 <= a ? b.substr(0, a + 1) : ""
    }
    Db.prototype = $.extend({}, z.prototype, Db.prototype);
    var Fb;
    Fb = "en:arrowhead-size:Arrowhead size\nes:arrowhead-size:Flecha tama\u00f1o\n\nen:arrowhead-size-large:Large\nes:arrowhead-size-large:Grande\n\nen:arrowhead-size-medium:Medium\nes:arrowhead-size-medium:Medio\n\nen:arrowhead-size-none:None\nes:arrowhead-size-none:Nada\n\nen:arrowhead-size-small:Small\nes:arrowhead-size-small:Peque\u00f1o\n\nen:arrowhead-size-tiny:Tiny\nes:arrowhead-size-tiny:Diminuto\n\nen:arrowhead-style:Arrowhead style\nes:arrowhead-style:Flecha estilo\n\nen:arrowhead-style-simple:Simple\nes:arrowhead-style-simple:Llanura\n\nen:arrowhead-style-solid:Solid\nes:arrowhead-style-solid:Denso\n\nen:arrow-keys:Arrow Keys\nes:arrow-keys:Teclas de flecha\n\nen:arrow-tool:Arrow tool\nes:arrow-tool:Flecha\n\nen:break-apart-group:Break apart group\nes:break-apart-group:Dividir el grupo\n\nen:bring-to-front:Bring to front\nes:bring-to-front:Traer al frente\n\nen:brush-tool:Brush tool\nes:brush-tool:Brocha\n\nen:circle-tool:Circle tool\nes:circle-tool:C\u00edrculo\n\nen:click-to-place-another-point-or-double-click-to-end-the-line:Click to place another point, or double-click to end the line.\nes:click-to-place-another-point-or-double-click-to-end-the-line:Haga clic para colocar otro punto, o doble clic para finalizar la l\u00ednea\n\nen:click-to-place-first-point-of-line:Click to place first point of line\nes:click-to-place-first-point-of-line:Haga clic para colocar el primer punto de la l\u00ednea\n\nen:click-to-set-the-end-of-the-line:Click to set the end of the line\nes:click-to-set-the-end-of-the-line:Haga clic para colocar el extremo de la l\u00ednea\n\nen:copy:Copy\nes:copy:Copiar\n\nen:curve-tool:Curve tool\nes:curve-tool:Curva\n\nen:delete-selection:Delete selection\nes:delete-selection:Eliminar la selecci\u00f3n\n\nen:del-key:Del\nes:del-key:Del\n\nen:double-arrows:Double arrows\nes:double-arrows:flechas dobles\n\nen:draw-curves:Draw curves\nes:draw-curves:Dibuje las curvas\n\nen:draw-lines:Draw lines\nes:draw-lines:Dibujar l\u00edneas\n\nen:duplicate-selection:Duplicate selection\nes:duplicate-selection:Duplica la selecci\u00f3n\n\nen:fill-colour:Fill colour\nes:fill-colour:Color de relleno\n\nen:font:Font\nes:font:Font\n\nen:font-size:Font size\nes:font-size:Tama\u00f1o de letra\n\nen:group-selection:Group selection\nes:group-selection:Grupo la selecci\u00f3n\n\nen:image-tool:Image tool\nes:image-tool:Imagen\n\nen:image-url:Image URL\nes:image-url:URL de la imagen\n\nen:keyboard:Keyboard\nes:keyboard:Teclado\n\nen:line-style:Line style\nes:line-style:Estilo de l\u00ednea\n\nen:line-style-long-dashes:Long dashes\nes:line-style-long-dashes:Gui\u00f3n largo\n\nen:line-style-short-dashes:Short dashes\nes:line-style-short-dashes:Gui\u00f3n corto\n\nen:line-style-solid:Solid\nes:line-style-solid:Denso\n\nen:line-tool:Line tool\nes:line-tool:Raya\n\nen:math-tool:Equation tool\nes:math-tool:Ecuaci\u00f3n\n\nen:move-selection-away:Move selection away\nes:move-selection-away:Mover la selecci\u00f3n de distancia\n\nen:move-selection-closer:Move selection closer\nes:move-selection-closer:Mover la selecci\u00f3n de distancia\n\nen:move-while-zoomed:Move while zoomed\nes:move-while-zoomed:Desplazarse por la pantalla\n\nen:none:None\nes:none:Nada\n\nen:no:No\nes:no:No\n\nen:outline-colour:Outline colour\nes:outline-colour:Color del contorno\n\nen:outline-thickness:Outline thickness\nes:outline-thickness:Grosor del contorno\n\nen:page-down-key:Page Down\nes:page-down-key:Page Down\n\nen:page-up-key:Page Up\nes:page-up-key:Page Up\n\nen:paste:Paste\nes:paste:Pegar\n\nen:pick-tool:Pick tool\nes:pick-tool:Seleccionar\n\nen:rectangle-tool:Rectangle tool\nes:rectangle-tool:rect\u00e1ngulo\n\nen:redo:Redo\nes:redo:Rehacer\n\nen:rounded-rectangle-tool:Rounded rectangle tool\nes:rounded-rectangle-tool:Rect\u00e1ngulo redondeado\n\nen:save:Save\nes:save:Guardar\n\nen:send-to-back:Send to back\nes:send-to-back:Enviar a la parte posterior\n\nen:shadow:Shadow\nes:shadow:Sombra\n\nen:shape-brush-tool:Shape brush tool\nes:shape-brush-tool:Brush que dibuja formas\n\nen:sloppiness-artist:Artist\nes:sloppiness-artist:Artista\n\nen:sloppiness-cartoonist:Cartoonist\nes:sloppiness-cartoonist:Caricaturista\n\nen:sloppiness-child:Child\nes:sloppiness-child:Ni\u00f1o\n\nen:sloppiness-draftsman:Draftsman\nes:sloppiness-draftsman:Dibujante\n\nen:sloppiness-drunk:Drunk\nes:sloppiness-drunk:Borracho\n\nen:sloppiness:Sloppiness\nes:sloppiness:La dejadez\n\nen:smoothness-sharper:Sharper\nes:smoothness-sharper:Muy afilado\n\nen:smoothness-sharpest:Sharpest\nes:smoothness-sharpest:M\u00e1s afilado\n\nen:smoothness-sharp:Sharp\nes:smoothness-sharp:Afilado\n\nen:smoothness-smoothest:Smoothest\nes:smoothness-smoothest:Muy liso\n\nen:smoothness:Smoothness\nes:smoothness:Lisura\n\nen:smoothness-smooth:Smooth\nes:smoothness-smooth:Liso\n\nen:text-colour:Text colour\nes:text-colour:Color del texto\n\nen:text:Text\nes:text:Texto\n\nen:text-tool:Text tool\nes:text-tool:Texto\n\nen:thickness-brush:Brush\nes:thickness-brush:Brocha\n\nen:thickness-marker:Marker\nes:thickness-marker:Rotulador\n\nen:thickness-pencil:Pencil\nes:thickness-pencil:L\u00e1piz\n\nen:thickness-pen:Pen\nes:thickness-pen:Pluma\n\nen:undo:Undo\nes:undo:Deshacer\n\nen:yes:Yes\nes:yes:S\u00ed\n\nen:zoom-in:Zoom in\nes:zoom-in:Zoom\n\nen:zoom-out:Zoom out\nes:zoom-out:Disminuir el zoom\n";

    function H(a, b) {
        for (var c in a) a.hasOwnProperty(c) && !b.hasOwnProperty(c) && (b[c] = a[c])
    };

    function Gb() {
        z.call(this);
        this.$ = document.createElement("div");
        this.$.style.width = "50px";
        this.$.style.height = "320px";
        this.$.style.border = "none";
        this.hc = {};
        this.Id = 1;
        this.buttons = [];
        this.cc = 0
    }
    Gb.prototype = {
        width: function () {
            return parseInt(this.$.style.width, 10)
        },
        focus: function (a) {
            0 < this.buttons.length && (0 < arguments.length && (Hb(this, !1), this.cc = a), Hb(this, !0))
        },
        blur: function () {
            0 < this.buttons.length && Hb(this, !1)
        },
        Ib: function (a, b) {
            if (0 !== this.buttons.length) {
                var c = "next" === a || "previous" === a;
                c && Hb(this, !1);
                switch (a) {
                case "next":
                    this.cc = Math.min(this.cc + 1, this.buttons.length - 1);
                    break;
                case "previous":
                    this.cc = Math.max(this.cc - 1, 0);
                    break;
                case "enter":
                    this.buttons[this.cc].ed(b)
                }
                c && (Hb(this, !0), b.stopPropagation(), b.preventDefault())
            }
        },
        moveTo: function (a, b) {
            $(this.$).css("left", "" + a + "px");
            $(this.$).css("top", "" + b + "px")
        },
        show: function (a) {
            this.$.style.display = a || 0 === arguments.length ? "block" : "none"
        },
        log: s("TOOLBAR"),
        fb: function (a, b, c) {
            function d() {
                var a = e.style.background;
                e.style.background = "#e7d69f";
                f.style.background = "#e7d69f";
                var b = e.style.background;
                setTimeout(function () {
                    e.style.background === b && (e.style.background = a, f.style.background = a)
                }, 200)
            }
            var e = document.createElement("div"),
                f = document.createElement("img"),
                g = this;
            e.style.display = "inline";
            e.style.cssFloat = "left";
            e.style.overflow = "hidden";
            e.style.width = "50px";
            e.style.height = "50px";
            e.style.margin = "1px";
            f.src = a;
            f.$ = e;
            f.style.cursor = "hand";
            f.setAttribute("title", b);
            f.draggable = !1;
            e.appendChild(f);
            $(f).bind("load", function () {
                g.log("Toolbar image loaded; %sx%s", f.width, f.height);
                var a = (50 - f.height) / 2;
                f.style.marginLeft = (50 - f.width) / 2 + "px";
                f.style.marginTop = a + "px"
            });
            this.$.appendChild(e);
            var h = this.buttons.length;
            c && ($(e).bind("touchstart", function (a) {
                a.preventDefault();
                g.log("Got touchstart");
                d();
                c(a);
                g.emit("click", a)
            }), $(e).click(function (a) {
                g.log("Got a click");
                d();
                c(a);
                g.focus(h);
                g.emit("click", a)
            }));
            this.Id += 51;
            this.buttons.push({
                element: e,
                ed: c
            });
            return f
        }
    };

    function Ib(a, b) {
        for (var c in a.hc) a.hc.hasOwnProperty(c) && (a.hc[c].$.style.background = "#ffffff", a.hc[c].style.background = "#ffffff");
        b in a.hc ? (c = a.hc[b], a.log("Highlight %s", b), c.$.style.background = "#9fb3e7", c.style.background = "#9fb3e7") : a.log("Failed to highlight %s", b)
    }

    function Jb(a, b, c, d, e) {
        a.hc[b] = a.fb(d, c, e)
    }
    function Hb(a, b) {
        a.buttons[a.cc].element.style.outline = b ? "1px dotted gray" : "none"
    }
    H(z.prototype, Gb.prototype);

    function u(a, b) {
        this.x = a;
        this.y = b
    }
    u.prototype.vc = function (a) {
        return Math.sqrt((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y))
    };
    u.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")"
    };

    function Kb(a, b) {
        return a.x === b.x && a.y === b.y
    }
    u.prototype.clone = function () {
        return new u(this.x, this.y)
    };

    function Lb(a, b, c) {
        var d = b.x;
        b = b.y;
        var e = a.x;
        a = a.y;
        var f = c.x - d;
        c = c.y - b;
        var g = ((e - d) * f + (a - b) * c) / (f * f + c * c);
        1 < g ? g = 1 : 0 > g && (g = 0);
        d = d + g * f - e;
        b = b + g * c - a;
        return Math.sqrt(d * d + b * b)
    }

    function Mb(a, b) {
        this.width = a;
        this.height = b
    }
    function va(a, b, c, d) {
        return Math.sqrt((a - c) * (a - c) + (b - d) * (b - d))
    }
    function t(a, b, c, d) {
        var e = va(a, b, c, d);
        return 0 === e ? {
            x: 1,
            y: 0
        } : {
            x: (c - a) / e,
            y: (d - b) / e
        }
    }
    function Nb(a) {
        a.x *= -1;
        a.y *= -1;
        return a
    }
    function I(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d;
        0 > this.width && (this.x += this.width, this.width = -this.width);
        0 > this.height && (this.y += this.height, this.height = -this.height)
    }

    function Ob(a) {
        if (0 === a.length) return new I(0, 0, 0, 0);
        for (var b = a[0].x, c = a[0].x, d = a[0].y, e = a[0].y, f = 1; f < a.length; f++) a[f].x < b && (b = a[f].x), a[f].x > c && (c = a[f].x), a[f].y < d && (d = a[f].y), a[f].y > e && (e = a[f].y);
        return new I(b, d, c - b, e - d)
    }
    I.prototype = {
        save: function () {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
        },
        clone: function () {
            return new I(this.x, this.y, this.width, this.height)
        },
        contains: function (a) {
            return this.x <= a.x && this.x + this.width > a.x + a.width && this.y <= a.y && this.y + this.height > a.y + a.height
        },
        ac: function (a, b) {
            return this.x <= a && this.x + this.width > a && this.y <= b && this.y + this.height > b
        },
        transform: function (a) {
            var b, c, d;
            b = a.apply(this.x, this.y);
            c = a.apply(this.x + this.width, this.y);
            d = a.apply(this.x + this.width, this.y + this.height);
            a = a.apply(this.x, this.y + this.height);
            this.x = Math.min(b.x, c.x, d.x, a.x);
            this.y = Math.min(b.y, c.y, d.y, a.y);
            this.width = Math.max(b.x, c.x, d.x, a.x) - this.x;
            this.height = Math.max(b.y, c.y, d.y, a.y) - this.y
        },
        right: function () {
            return this.x + this.width
        },
        bottom: function () {
            return this.y + this.height
        }
    };

    function Pb(a) {
        return new u(a.x + a.width / 2, a.y + a.height / 2)
    }
    function Sb(a, b, c) {
        void 0 === c && (c = b);
        a.x -= b / 2;
        a.y -= c / 2;
        a.width += b;
        a.height += c
    }

    function Tb(a, b, c) {
        b < a.x ? (a.width += a.x - b, a.x = b) : b > a.x + a.width && (a.width = b - a.x);
        c < a.y ? (a.height += a.y - c, a.y = c) : c > a.y + a.height && (a.height = c - a.y)
    }
    function Ub(a, b) {
        b.x < a.x && (a.width += a.x - b.x, a.x = b.x);
        b.y < a.y && (a.height += a.y - b.y, a.y = b.y);
        b.x + b.width > a.x + a.width && (a.width += b.x + b.width - a.x - a.width);
        b.y + b.height > a.y + a.height && (a.height += b.y + b.height - a.y - a.height)
    }

    function J(a) {
        if (0 === arguments.length) this.m11 = 1, this.m21 = this.m12 = 0, this.m22 = 1, this.ya = this.xa = 0;
        else if (1 === arguments.length) {
            if (6 !== arguments[0].length) throw "Bad array initializer for Matrix.";
            this.m11 = arguments[0][0];
            this.m12 = arguments[0][1];
            this.m21 = arguments[0][2];
            this.m22 = arguments[0][3];
            this.xa = arguments[0][4];
            this.ya = arguments[0][5]
        } else if (6 === arguments.length) this.m11 = arguments[0], this.m12 = arguments[1], this.m21 = arguments[2], this.m22 = arguments[3], this.xa = arguments[4], this.ya = arguments[5];
        else throw "Bad initializer for Matrix.";
    }
    n = J.prototype;
    n.toString = function () {
        return "[ " + this.m11 + " " + this.m12 + " " + this.xa + "\n   " + this.m21 + " " + this.m22 + " " + this.ya + "\n   0 0 1 ]"
    };
    n.toArray = function () {
        return [this.m11, this.m12, this.m21, this.m22, this.xa, this.ya]
    };
    n.eb = "Matrix";
    n.multiply = function (a) {
        var b = new J;
        b.m11 = this.m11 * a.m11 + this.m12 * a.m21;
        b.m21 = this.m21 * a.m11 + this.m22 * a.m21;
        b.m12 = this.m11 * a.m12 + this.m12 * a.m22;
        b.m22 = this.m21 * a.m12 + this.m22 * a.m22;
        b.xa = this.m11 * a.xa + this.m12 * a.ya + this.xa;
        b.ya = this.m21 * a.xa + this.m22 * a.ya + this.ya;
        return b
    };
    n.apply = function (a, b) {
        return new u(this.m11 * a + this.m12 * b + this.xa, this.m21 * a + this.m22 * b + this.ya)
    };
    n.clone = function () {
        return new J(this.m11, this.m12, this.m21, this.m22, this.xa, this.ya)
    };
    n.inverse = function () {
        var a = this.m11 * this.m22 - this.m12 * this.m21;
        return new J(this.m22 / a, -this.m12 / a, -this.m21 / a, this.m11 / a, (this.m12 * this.ya - this.xa * this.m22) / a, (this.xa * this.m21 - this.m11 * this.ya) / a)
    };

    function Vb(a, b, c, d) {
        void 0 === c ? (this.m11 = a, this.m21 = this.m12 = 0, this.m22 = b, this.af = this.$e = this.ya = this.xa = 0) : (this.m11 = a, this.m21 = this.m12 = 0, this.m22 = b, this.xa = c - a * c, this.ya = d - b * d, this.$e = c, this.af = d);
        this.og = a;
        this.pg = b
    }
    Vb.prototype.inverse = function () {
        return new Vb(1 / this.og, 1 / this.pg, this.$e, this.af)
    };
    H(J.prototype, Vb.prototype);

    function Wb(a, b, c) {
        var d = Math.cos(a),
            e = Math.sin(a);
        this.m11 = d;
        this.m12 = e;
        this.m21 = -e;
        this.m22 = d;
        this.xa = -b * d - c * e + b;
        this.ya = b * e - c * d + c;
        this.Pd = a;
        this.x = b;
        this.y = c
    }
    Wb.prototype.inverse = function () {
        return new Wb(-this.Pd, this.x, this.y)
    };
    H(J.prototype, Wb.prototype);

    function Xb(a, b, c) {
        var d = Math.cos(2 * a),
            e = Math.sin(2 * a);
        this.m11 = d;
        this.m21 = this.m12 = e;
        this.m22 = -d;
        this.xa = -b * d - c * e + b;
        this.ya = -b * e + c * d + c;
        this.Pd = a;
        this.x = b;
        this.y = c
    }
    Xb.prototype.inverse = function () {
        return new Xb(-this.Pd, this.x, this.y)
    };
    H(J.prototype, Xb.prototype);

    function K(a, b) {
        this.m11 = 1;
        this.m21 = this.m12 = 0;
        this.m22 = 1;
        this.xa = a;
        this.ya = b
    }
    K.prototype.inverse = function () {
        return new K(-this.xa, -this.ya)
    };
    H(J.prototype, K.prototype);

    function Yb(a, b, c, d, e, f, g, h, k, l) {
        if (!(8 < ++Zb)) {
            var m = (b + d) / 2,
                p = (c + e) / 2,
                q = (d + f) / 2,
                r = (e + g) / 2,
                v = (f + h) / 2,
                w = (g + k) / 2,
                C = (m + q) / 2,
                y = (p + r) / 2,
                q = (q + v) / 2,
                r = (r + w) / 2,
                Qb = (C + q) / 2,
                Rb = (y + r) / 2,
                tb = h - b,
                ub = k - c;
            d = Math.abs((d - h) * ub - (e - k) * tb);
            f = Math.abs((f - h) * ub - (g - k) * tb);
            (d + f) * (d + f) < l * (tb * tb + ub * ub) ? a.push(new u(Qb, Rb)) : (Yb(a, b, c, m, p, C, y, Qb, Rb, l), Yb(a, Qb, Rb, q, r, v, w, h, k, l))
        }
        Zb -= 1
    }
    var Zb = 0;

    function $b(a, b, c, d, e, f, g, h) {
        if (!(8 < ++Zb)) {
            var k = (b + d) / 2,
                l = (c + e) / 2,
                m = (d + f) / 2,
                p = (e + g) / 2,
                q = (k + m) / 2,
                r = (l + p) / 2,
                v = f - b,
                w = g - c;
            d = Math.abs((d - f) * w - (e - g) * v);
            d * d <= h * (v * v + w * w) ? a.push(new u(q, r)) : ($b(a, b, c, k, l, q, r, h), $b(a, q, r, m, p, f, g, h))
        }
        Zb -= 1
    }
    function ac(a, b, c) {
        var d, e, f, g, h, k, l, m, p = 0;
        if (3 > a.length) return 0;
        f = a[a.length - 1].x;
        g = a[a.length - 1].y;
        for (m = 0; m < a.length; m++) d = a[m].x, e = a[m].y, d > f ? (h = f, l = d, k = g, g = e) : (h = d, l = f, k = e), d < b === b <= f && (c - k) * (l - h) < (g - k) * (b - h) && (p = !p), f = d, g = e;
        return p
    }

    function bc() {
        this.closed = !1;
        this.ba = []
    }
    var cc = [3, 3, 7, 5, 1],
        dc = [1, 1, 3, 2, 0];
    bc.prototype = {
        moveTo: function (a, b) {
            this.ba.push(0, a, b)
        },
        lineTo: function (a, b) {
            this.ba.push(1, a, b)
        },
        bezierCurveTo: function (a, b, c, d, e, f) {
            this.ba.push(2, a, b, c, d, e, f)
        },
        quadraticCurveTo: function (a, b, c, d) {
            this.ba.push(3, a, b, c, d)
        },
        close: function () {
            this.ba.push(4)
        },
        ha: function (a) {
            for (var b = 0; b < this.ba.length;) {
                switch (this.ba[b]) {
                case 0:
                    a.moveTo(this.ba[b + 1], this.ba[b + 2]);
                    break;
                case 1:
                    a.lineTo(this.ba[b + 1], this.ba[b + 2]);
                    break;
                case 2:
                    a.bezierCurveTo(this.ba[b + 1], this.ba[b + 2], this.ba[b + 3], this.ba[b + 4], this.ba[b + 5], this.ba[b + 6]);
                    break;
                case 3:
                    a.quadraticCurveTo(this.ba[b + 1], this.ba[b + 2], this.ba[b + 3], this.ba[b + 4]);
                    break;
                case 4:
                    a.closePath();
                    break;
                default:
                    alert("Error!")
                }
                b += cc[this.ba[b]]
            }
        },
        transform: function (a) {
            for (var b = 0, c, d; b < this.ba.length;) {
                d = dc[this.ba[b]];
                for (c = 0; c < d; c++) {
                    var e = a.apply(this.ba[b + 1 + 2 * c], this.ba[b + 1 + 2 * c + 1]);
                    this.ba[b + 1 + 2 * c] = e.x;
                    this.ba[b + 1 + 2 * c + 1] = e.y
                }
                b += cc[this.ba[b]]
            }
        },
        clone: function () {
            var a = new bc;
            a.ba = this.ba.concat();
            return a
        },
        append: function (a) {
            this.ba = this.ba.concat(a.ba)
        }
    };

    function ec(a, b, c, d, e) {
        var f;
        if (!(2 >= d - c)) {
            var g = a[c],
                h = a[d - 1],
                k = 0,
                l = 0;
            for (f = c + 1; f < d; f++) {
                var m = Lb(a[f], g, h);
                m > k && (k = m, l = f)
            }
            0 < l && Lb(a[l], g, h) > b ? (ec(a, b, c, l, e), ec(a, b, l, d, e)) : e.push(g)
        }
    }
    function L(a) {
        this.Xa = [];
        if (1 === arguments.length) {
            var b = arguments[0];
            b instanceof I ? (this.Xa.push(new u(b.x, b.y)), this.Xa.push(new u(b.right(), b.y)), this.Xa.push(new u(b.right(), b.bottom())), this.Xa.push(new u(b.x, b.bottom()))) : b instanceof Array ? this.Xa = b : alert("Bad parameter passed to Polygon() constructor.")
        }
    }
    L.prototype = {
        transform: function (a) {
            for (var b = 0; b < this.Xa.length; b++) this.Xa[b] = a.apply(this.Xa[b].x, this.Xa[b].y)
        },
        add: function (a, b) {
            this.Xa.push(new u(a, b))
        },
        ac: function (a, b) {
            return ac(this.Xa, a, b)
        }
    };

    function fc(a, b) {
        this.Ba(a, b)
    }
    n = fc.prototype;
    n.Ba = function (a, b) {
        z.call(this);
        this.td = !0;
        this.id = a;
        this.canvas = ha(document.body);
        this.canvas.style.position = "absolute";
        this.canvas.style.border = "none";
        this.ca = this.canvas.getContext("2d");
        this.fc = b;
        this.width = 32;
        this.height = 500;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        var c = this;
        $(this.canvas).bind("click", function (a) {
            c.cb(a)
        });
        $(this.canvas).bind("mousedown", function (a) {
            c.$a(a)
        });
        $(document.body).bind("mousemove", function (a) {
            c.ab(a)
        });
        $(document.body).bind("mouseup", function (a) {
            c.ib(a)
        });
        $(this.canvas).bind("touchstart", function (a) {
            c.Za(a)
        });
        $(document.body).bind("touchmove", function (a) {
            c.Za(a)
        });
        $(document.body).bind("touchend", function (a) {
            c.Za(a)
        });
        this.Ya = null;
        this.Ma = !1;
        this.rf = "#c0c0c0";
        this.Fe = "#808080";
        this.borderWidth = 1;
        this.Fb = 0;
        this.Eb = 100;
        this.Jd = 10;
        this.position = 5;
        this.va()
    };
    n.log = s("SCROLLBAR", !0);
    n.appendTo = function (a) {
        a.appendChild(this.canvas)
    };
    n.moveTo = function (a, b) {
        this.canvas.style.left = "" + a + "px";
        this.canvas.style.top = "" + b + "px"
    };

    function gc(a, b, c) {
        a.width = b;
        a.height = c;
        a.canvas.width = a.width;
        a.canvas.height = c;
        a.va();
        a.ha()
    }
    n.hide = function () {
        this.canvas.style.display = "none"
    };
    n.show = function () {
        this.canvas.style.display = "block"
    };
    n.va = function () {
        var a;
        a = this.fc ? this.width : this.height;
        var b = this.Jd / this.Eb * a;
        a *= (this.position - this.Fb) / this.Eb;
        this.Ya = this.fc ? new I(a, 0, b - 1, this.height - 1) : new I(0, a, this.width - 1, b - 1);
        this.Ya.x = Math.round(this.Ya.x) + 0.5;
        this.Ya.y = Math.round(this.Ya.y) + 0.5;
        this.Ya.width = Math.round(this.Ya.width);
        this.Ya.height = Math.round(this.Ya.height)
    };
    n.ha = function () {
        this.ca.beginPath();
        this.ca.fillStyle = this.rf;
        this.ca.strokeStyle = this.Fe;
        this.ca.lineWidth = this.borderWidth;
        this.ca.rect(this.borderWidth / 2, this.borderWidth / 2, this.width - this.borderWidth, this.height - this.borderWidth);
        this.ca.fill();
        this.ca.stroke();
        this.ca.beginPath();
        this.ca.fillStyle = this.Fe;
        this.ca.strokeStyle = "#000000";
        this.ca.rect(this.Ya.x, this.Ya.y, this.Ya.width, this.Ya.height);
        this.ca.fill();
        this.ca.stroke()
    };

    function hc(a, b) {
        var c = $(a.canvas).offset();
        if ("touchstart" === b.type || "touchend" === b.type || "touchmove" === b.type) b = b.changedTouches[0];
        return new u(b.pageX - c.left, b.pageY - c.top)
    }
    n.Za = function (a) {
        switch (a.type) {
        case "touchstart":
            this.$a(a);
            break;
        case "touchend":
            this.ib(a);
            break;
        case "touchmove":
            this.ab(a)
        }
    };
    n.cb = function () {};

    function ic(a, b) {
        var c;
        c = a.fc ? b.x / a.width * a.Eb + a.Fb : b.y / a.height * a.Eb + a.Fb;
        c = Math.min(c, a.Eb - a.Jd + a.Fb);
        return c = Math.max(c, a.Fb)
    }
    n.$a = function (a) {
        a.preventDefault();
        a = hc(this, a);
        this.Ya.ac(a.x, a.y) ? this.fc ? (this.offset = a.x - this.Ya.x, a.x -= this.offset) : (this.offset = a.y - this.Ya.y, a.y -= this.offset) : (this.position = ic(this, a), this.offset = 0, this.fc ? this.Ya.x = (this.position - this.Fb) / this.Eb * this.width : this.Ya.y = (this.position - this.Fb) / this.Eb * this.height, this.emit("scroll", this.position), this.ha());
        this.Ma = !0
    };
    n.ab = function (a) {
        this.Ma && (this.Ma && "mousemove" === a.type && ("buttons" in a && 0 === a.buttons || 0 === a.which) ? this.Ma = !1 : (a.preventDefault(), a = hc(this, a), this.fc ? a.x -= this.offset : a.y -= this.offset, this.position = ic(this, a), this.emit("scroll", this.position), this.va(), this.ha()))
    };
    n.ib = function () {
        this.Ma && (this.Ma = !1)
    };

    function jc(a) {
        return a.fc ? a.height : a.width
    }
    fc.prototype = $.extend({}, z.prototype, fc.prototype);

    function kc() {
        this.text = "";
        this.font = "10px Arial";
        this.yf = "Arial";
        this.fontSize = 10;
        this.Wa = [];
        this.rect = new I(0, 0, 0, this.fontSize);
        this.ye = "left";
        this.Lc = "top"
    }
    kc.prototype.log = s("TextBox");
    kc.prototype.va = function (a, b, c) {
        this.font = "" + this.fontSize + "px " + this.yf;
        this.Wa.length = 0;
        var d = this.text.split("\n");
        a.font = this.font;
        for (var e = 0, f = this.rect.width = 0; f < d.length; f++) {
            var g = d[f],
                h = a.measureText(g).width,
                e = e + this.fontSize;
            this.Wa.push({
                x: 0,
                y: e,
                width: h,
                text: g
            });
            this.rect.width = Math.max(this.rect.width, h)
        }
        this.rect.height = e;
        if ("centre" === this.Lc) for (f = 0; f < this.Wa.length; f++) a = this.Wa[f], a.x = this.rect.width / 2 - a.width / 2, this.log("line.x=%s", a.x);
        else if ("right" === this.Lc) for (f = 0; f < this.Wa.length; f++) a = this.Wa[f], a.x = this.rect.width - a.width;
        b && "centre" === this.Lc ? this.rect.x = b / 2 - this.rect.width / 2 : b && "right" === this.Lc && (this.rect.x = b - this.rect.width);
        c && "middle" === this.ye ? this.rect.y = c / 2 - this.rect.height / 2 : c && "bottom" === this.ye && (this.rect.y = c - this.rect.height)
    };
    kc.prototype.ha = function (a, b, c) {
        a.textBaseline = "alphabetic";
        a.font = this.font;
        for (var d = 0; d < this.Wa.length; d++) {
            var e = this.Wa[d];
            a.fillText(e.text, this.rect.x + e.x + b, this.rect.y + e.y + c)
        }
    };

    function lc(a, b, c, d, e, f) {
        this.view = a;
        this.handle = c;
        this.xd = b;
        this.qg = d;
        this.view.ce = this.handle === this.view.nc;
        this.Qe = !1;
        this.$a(e, f)
    }
    function mc(a) {
        for (var b = [], c = 0; c < a.length; c++) b.push(a[c].id);
        return b
    }
    lc.prototype = {
        log: s("TransformSelectionBehaviour"),
        Za: function (a) {
            var b;
            if (!this.Qe) {
                for (b = 0; b < a.touches.length;) {
                    b = a.touches[b];
                    b = M(this.view, b.pageX, b.pageY);
                    "touchmove" === a.type && this.ab(b.x, b.y, a);
                    break
                }
                for (b = 0; b < a.changedTouches.length;) {
                    b = a.changedTouches[b];
                    b = M(this.view, b.pageX, b.pageY);
                    "touchend" === a.type && this.ib(b.x, b.y, a);
                    break
                }
            }
        },
        zc: function (a) {
            this.log("%s scale=%s rotation=%s", a.type, a.scale, a.rotation);
            this.Qe = !0;
            var b = this.ua.x + this.ua.width / 2,
                c = this.ua.y + this.ua.height / 2,
                d = a.scale;
            this.view.Lb || (d = 1);
            b = (new Vb(d, d, b, c)).multiply(new Wb(-a.rotation / 180 * Math.PI, b, c));
            c = b.inverse();
            for (d = 0; d < this.oa.length; d++) nc(this.oa[d], b.multiply(this.Sc[d]), this.Pc[d].multiply(c)), this.oa[d].va(this.view.ca, this.view.ub);
            this.view.lc = b;
            this.view.ha();
            if ("gestureend" === a.type) {
                for (d = 0; d < this.oa.length; d++) nc(this.oa[d], this.Sc[d], this.Pc[d]);
                this.view.qa([new N(mc(this.oa), b, b.inverse())]);
                oc(this)
            }
        },
        $a: function (a, b) {
            this.log("onMouseDown");
            var c = this.view.Ta(new u(a, b));
            a = c.x;
            b = c.y;
            this.xa = a;
            this.ya = b;
            c = this.oa = pc(this.view);
            this.Sc = [];
            this.Pc = [];
            for (var d = 0; d < c.length; d++) this.Sc.push(qc(c[d])), this.Pc.push(c[d].aa.inverse);
            this.ua = new I(this.view.sa.x, this.view.sa.y, this.view.sa.width, this.view.sa.height);
            this.handle === this.view.nc && (1 === this.oa.length && this.oa[0].la("rotateAround") ? (c = this.oa[0].la("rotateAround"), c = qc(this.oa[0]).apply(c[0], c[1]), this.log("Rotating around %s", c), this.Ic = c.x, this.Jc = c.y) : (this.Ic = this.ua.x + this.ua.width / 2, this.Jc = this.ua.y + this.ua.height / 2), this.lg = Math.atan2(this.Jc - b, a - this.Ic))
        },
        ab: function (a, b, c) {
            var d = this,
                e = this.view.Ta(new u(a, b));
            a = e.x;
            b = e.y;
            c = rc(this, a, b, c.ctrlKey);
            for (var e = c.inverse(), f = 0; f < this.oa.length; f++) nc(this.oa[f], c.multiply(this.Sc[f]), this.Pc[f].multiply(e)), this.oa[f].va(this.view.ca, this.view.ub);
            this.view.lc = c;
            this.handle === this.view.nc && (this.view.Ac = a, this.view.Bc = b);
            this.view.ha(function () {
                if (d.handle === d.view.nc) {
                    var c = d.view.ca;
                    c.save();
                    c.beginPath();
                    c.strokeStyle = "#0050B7";
                    c.lineWidth = 1 / d.view.scale;
                    c.moveTo(d.Ic, d.Jc);
                    c.lineTo(a, b);
                    c.stroke();
                    c.restore()
                }
            })
        },
        ib: function (a, b, c) {
            this.log("onMouseUp");
            b = this.view.Ta(new u(a, b));
            a = b.x;
            b = b.y;
            if (a !== this.xa || b !== this.ya) {
                a = rc(this, a, b, c.ctrlKey);
                for (c = 0; c < this.oa.length; c++) nc(this.oa[c], this.Sc[c], this.Pc[c]);
                this.view.qa([new N(mc(this.oa), a, a.inverse())])
            } else this.qg && (a = this.view.ia.hb(a, b, this.view.Ka)) && a.Oe() && (this.log("Didn't move, and has edit mode. Selecting node %s", a.id), O(this.view), this.view.Fa = a);
            oc(this)
        },
        Tb: function () {
            this.log("onDoubleClick")
        }
    };

    function oc(a) {
        var b = new J;
        a.view.lc = b;
        a.view.ce = !0;
        sc(a.view);
        a.view.update(!0);
        a.view.na = a.xd
    }

    function rc(a, b, c, d) {
        function e() {
            if (d && 0 !== h && 0 !== k) {
                var a = Math.min(Math.abs(h), Math.abs(k));
                h = 0 > h ? -h / h * a : h / h * a;
                k = 0 > k ? -k / k * a : k / k * a
            }
        }
        var f = b - a.xa,
            g = c - a.ya,
            h, k;
        switch (a.handle) {
        case a.view.Ae:
            h = (b - a.ua.x) / a.ua.width;
            k = (a.ua.y + a.ua.height - c) / a.ua.height;
            e();
            a = new Vb(h, k, a.ua.x, a.ua.y + a.ua.height);
            break;
        case a.view.Ce:
            h = (b - a.ua.x) / a.ua.width;
            k = (c - a.ua.y) / a.ua.height;
            e();
            a = new Vb(h, k, a.ua.x, a.ua.y);
            break;
        case a.view.De:
            h = (a.ua.x + a.ua.width - b) / a.ua.width;
            k = (c - a.ua.y) / a.ua.height;
            e();
            a = new Vb(h, k, a.ua.x + a.ua.width, a.ua.y);
            break;
        case a.view.Be:
            h = (a.ua.x + a.ua.width - b) / a.ua.width;
            k = (a.ua.y + a.ua.height - c) / a.ua.height;
            e();
            a = new Vb(h, k, a.ua.x + a.ua.width, a.ua.y + a.ua.height);
            break;
        case a.view.nc:
            a = new Wb(Math.atan2(a.Jc - c, b - a.Ic) - a.lg, a.Ic, a.Jc);
            break;
        default:
            a = new K(f, g)
        }
        return a
    };

    function P(a) {
        Q(this, a, P)
    }
    var tc = {
        fillStyle: "#cccccc",
        strokeStyle: "#000000",
        lineWidth: 2,
        shadow: !1
    };
    P.prototype = {
        Oe: function () {
            return !1
        },
        Re: function () {
            return null
        },
        de: function () {
            return "text" in this.aa
        },
        clone: function (a) {
            a = new this.constructor(a());
            uc(a, this.aa);
            return a
        },
        type: function () {
            return "BaseNode"
        },
        setProperty: function (a, b) {
            a in this.aa && (this.aa[a] = b)
        },
        la: function (a) {
            return this.aa[a]
        },
        ec: function () {
            return this.rect
        },
        Le: function () {
            return new L(this.rect)
        },
        yc: function () {
            return this.la("zIndex") || 0
        },
        transform: function (a, b) {
            this.aa.matrix = a.multiply(this.aa.matrix);
            this.aa.inverse = this.aa.inverse.multiply(b)
        },
        va: function () {},
        hb: function (a, b) {
            return this.rect.ac(a, b) ? this : null
        },
        hidden: function () {
            return this.Nd
        },
        ha: function (a) {
            a.save();
            var b = this.aa.matrix;
            a.transform(b.m11, b.m21, b.m12, b.m22, b.xa, b.ya);
            a.strokeStyle = this.aa.strokeStyle;
            a.fillStyle = this.aa.fillStyle;
            a.lineWidth = this.aa.lineWidth;
            this.aa.shadow && (a.shadowOffsetX = 3, a.shadowOffsetY = 3, a.shadowBlur = 5, a.shadowColor = "rgba(0,0,0,0.5)");
            this.Yb(a);
            a.restore()
        },
        Yb: function () {}
    };

    function nc(a, b, c) {
        a.aa.matrix = b;
        a.aa.inverse = c
    }

    function qc(a) {
        return a.aa.matrix
    }
    function vc(a) {
        return null !== a.parent && null !== a.parent.parent && "PageNode" !== a.parent.type()
    }
    function wc(a) {
        return void 0 !== a.children
    }
    function xc(a) {
        return (a = a.la("layer")) ? "" + a : "default"
    }
    function uc(a, b) {
        for (var c in b) b.hasOwnProperty(c) && a.setProperty(c, b[c])
    }
    function yc(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a.aa[c] = b[c])
    }

    function Q(a, b, c) {
        a.id = b;
        a.aa = {};
        yc(a, tc);
        a.rect = new I(0, 0, 1, 1);
        a.aa.matrix = new J;
        a.aa.inverse = new J;
        a.aa.layer = "default";
        a.parent = null;
        a.constructor = c;
        a.Nd = !1
    }
    var zc = {};

    function R(a, b) {
        b.prototype = $.extend({}, P.prototype, b.prototype);
        zc[a] = b
    }
    function Ac(a, b) {
        return a in zc ? new zc[a](b) : null
    };

    function Bc(a) {
        Q(this, a, Bc);
        this.log("New BrushNode created.");
        this.aa.points = [];
        this.aa.strokeStyle = "#ff00ff";
        this.aa.lineWidth = 10;
        this.Xa = [];
        this.inverse = null
    }
    Bc.prototype = {
        log: s("BRUSH", !0),
        type: function () {
            return "BrushNode"
        },
        setProperty: function (a, b) {
            "fillStyle" === a && (a = "strokeStyle");
            a in this.aa && (this.aa[a] = b)
        },
        va: function () {
            var a, b, c, d;
            this.Xa.length = 0;
            b = this.aa.points;
            a = c = 0;
            for (d = b.length - 1; c <= d; a = c += 2) this.Xa.push(new u(b[a], b[a + 1]));
            a = Ob(this.Xa);
            Sb(a, this.aa.lineWidth + 3, this.aa.lineWidth + 3);
            a = new L(a);
            a.transform(this.aa.matrix);
            this.rect = Ob(a.Xa);
            this.inverse = this.aa.matrix.inverse()
        },
        hb: function (a, b) {
            var c;
            if (this.rect.ac(a, b)) {
                c = this.inverse.apply(a, b);
                var d;
                a: {
                    d = this.Xa;
                    var e = c.x;
                    c = c.y;
                    for (var f = this.aa.lineWidth / 2, f = f * f, g = 1; g < d.length; g++) {
                        var h = d[g - 1].x,
                            k = d[g - 1].y,
                            l = d[g].x - h,
                            m = d[g].y - k,
                            p = ((e - h) * l + (c - k) * m) / (l * l + m * m);
                        1 < p ? p = 1 : 0 > p && (p = 0);
                        h = h + p * l - e;
                        k = k + p * m - c;
                        if (h * h + k * k <= f) {
                            d = !0;
                            break a
                        }
                    }
                    d = !1
                }
                if (d) return this
            }
            return null
        },
        Yb: function (a) {
            var b, c, d, e;
            c = this.aa.points;
            if (0 !== c.length) {
                a.save();
                a.beginPath();
                a.lineCap = "round";
                a.lineJoin = "round";
                a.moveTo(c[0], c[1]);
                b = d = 2;
                for (e = c.length - 1; d <= e; b = d += 2) a.lineTo(c[b], c[b + 1]);
                a.stroke();
                if (Cc) {
                    a.beginPath();
                    b = d = 0;
                    for (e = c.length - 1; d <= e; b = d += 2) a.rect(c[b] - 2, c[b + 1] - 2, 4, 4);
                    a.fillStyle = "#0000ff";
                    a.fill()
                }
                a.restore()
            }
        }
    };
    var Cc = !1;
    R("BrushNode", Bc);

    function Dc(a, b, c, d, e) {
        this.view = a;
        this.xd = b;
        this.Ra = c;
        this.lineWidth = d;
        this.mode = e;
        this.Ma = !1;
        this.Kb = []
    }
    Dc.prototype = {
        log: s("Brush"),
        wc: function () {
            this.view.canvas.style.cursor = "crosshair"
        },
        reset: function () {
            this.Ma = !1;
            this.Kb = []
        },
        Za: function (a) {
            var b, c, d, e;
            if ("touchstart" === a.type) for (e = a.changedTouches, c = 0, d = e.length; c < d; c++) a = e[c], a = M(this.view, a.pageX, a.pageY), this.Kb.push([a]);
            else if ("touchmove" === a.type) {
                e = a.changedTouches;
                c = 0;
                for (d = e.length; c < d; c++) {
                    a = e[c];
                    b = a = M(this.view, a.pageX, a.pageY);
                    for (var f = void 0, g = void 0, h = void 0, k = void 0, l = void 0, m = void 0, f = null, g = 1E6, m = this.Kb, k = 0, l = m.length; k < l; k++) if (h = m[k], null === f || h[h.length - 1].vc(b) < g) f = h, g = h[h.length - 1].vc(b);
                    b = f;
                    a.x === b[b.length - 1].x && a.y === b[b.length - 1].y || b.push(a)
                }
                this.view.ha()
            } else "touchend" === a.type && 0 === a.touches.length && this.qa()
        },
        $a: function (a, b) {
            var c;
            c = this.view.Ta(new u(a, b));
            this.Ma = !0;
            this.Kb.push([c])
        },
        We: function (a) {
            var b, c, d, e, f, g, h;
            a.strokeStyle = this.Ra;
            a.lineCap = "round";
            a.If = "round";
            a.lineWidth = this.lineWidth;
            a.beginPath();
            g = this.Kb;
            d = 0;
            for (f = g.length; d < f; d++) for (c = g[d], a.moveTo(c[0].x, c[0].y), b = e = 1, h = c.length - 1; e <= h; b = e += 1) b = c[b], a.lineTo(b.x, b.y);
            a.stroke()
        },
        ab: function (a, b) {
            var c;
            c = this.view.Ta(new u(a, b));
            this.Ma && (this.sb = this.Kb[0][this.Kb[0].length - 1], c.x !== this.sb.x || c.y !== this.sb.y) && (this.Kb[0].push(c), this.view.ha())
        },
        ib: function (a, b) {
            this.ab(a, b);
            this.Ma = !1;
            this.qa()
        },
        qa: function () {
            var a, b, c, d, e, f, g, h, k, l;
            a = [];
            k = this.Kb;
            f = 0;
            for (h = k.length; f < h; f++) if (e = k[f], "brush" === this.mode) {
                if (c = [], 1 < e.length) {
                    d = b = 0;
                    for (g = e.length - 1; b <= g; d = b += 1) c.push(e[d].x), c.push(e[d].y);
                    a.push(new D("BrushNode", {
                        points: c,
                        strokeStyle: this.Ra,
                        lineWidth: this.lineWidth,
                        layer: this.view.Ka
                    }))
                }
            } else {
                c = e;
                d = [];
                ec(c, 20, 0, c.length, d);
                0 < c.length && 0 < d.length && !Kb(c[c.length - 1], d[d.length - 1]) && d.push(c[c.length - 1]);
                c = d;
                d = [];
                0 < c.length && d.push(c[0]);
                for (e = 1; e < c.length - 1; e++) 20 < Lb(c[e], c[e - 1], c[e + 1]) && d.push(c[e]);
                1 < c.length && d.push(c[c.length - 1]);
                e = d;
                c = e;
                g = l = b = e = l = d = void 0;
                if (!(3 > c.length)) {
                    e = c[0];
                    b = c[c.length - 1];
                    g = 40 > e.vc(b);
                    for (d = 0; d < c.length; d++) {
                        var m = c[d];
                        for (l = d + 1; l < c.length; l++) {
                            var p = c[l];
                            20 > Math.abs(m.x - p.x) ? p.x = m.x : 20 > Math.abs(m.y - p.y) && (p.y = m.y)
                        }
                    }
                    m = Pb(Ob(c));
                    for (d = 0; d < c.length; d++) l = c[d], 20 > Math.abs(l.x - m.x) && (l.x = m.x), 20 > Math.abs(l.y - m.y) && (l.y = m.y);
                    g && (e.x = b.x, e.y = b.y)
                }
                e = c;
                if (1 < e.length) {
                    c = new Ec;
                    c.moveTo(e[0].x, e[0].y);
                    b = Kb(e[0], e[e.length - 1]);
                    d = g = 1;
                    for (l = e.length - 1; g <= l; d = g += 1) c.lineTo(e[d].x, e[d].y);
                    b && c.close();
                    a.push(new D("PathNode", {
                        commands: c.toArray(),
                        strokeStyle: this.Ra,
                        lineWidth: this.lineWidth,
                        fillStyle: this.view.Cb,
                        sloppiness: 0,
                        layer: this.view.Ka
                    }))
                }
            }
            this.view.qa(a);
            O(this.view);
            Fc(this.view);
            this.reset()
        },
        Rc: function () {
            this.view.canvas.style.cursor = "default";
            this.view.ha()
        },
        Hb: function (a) {
            1 === a.button && (this.Ra = this.view.Nb = a.Ra)
        },
        Ib: function (a) {
            this.log("keyboard: %s", a);
            "cancel" === a && (this.log("ESC pressed. Abort brush and go back to toolbar."), E(this.view), this.view.ga.emit("goto-toolbar"))
        }
    };

    function Gc(a) {
        Q(this, a, Gc);
        this.aa.url = "";
        this.Ia = null;
        this.width = 100;
        this.height = 20;
        this.zb = new L
    }
    Gc.prototype = {
        log: s("IMAGE", !0),
        type: function () {
            return "ImageNode"
        },
        setProperty: function (a, b) {
            this.aa[a] = b;
            "url" === a && (this.Ia = null)
        },
        va: function (a, b) {
            var c, d, e, f, g, h = this;
            null === this.Ia && "ImageSurface" in window ? (this.Ia = new ImageSurface(this.aa.url), this.rect = new I(0, 0, this.Ia.width, this.Ia.height)) : null === this.Ia ? (this.rect = new I(0, 0, this.width, this.height), b.add(this, "image", this.aa.url, null, function (a) {
                h.log("Got image response.");
                h.Ia = a;
                return b.emit("reformat", h)
            })) : this.rect = new I(0, 0, this.Ia.width, this.Ia.height);
            if (c = this.la("boundingPolygon")) {
                e = [];
                d = f = 0;
                for (g = c.length - 1; f <= g; d = f += 2) e.push(new u(c[d], c[d + 1]));
                this.zb = new L(e)
            } else this.zb = new L(this.rect);
            this.zb.transform(this.aa.matrix);
            this.rect.transform(this.aa.matrix)
        },
        Le: function () {
            return this.zb
        },
        hb: function (a, b) {
            return !this.aa.locked && this.zb.ac(a, b, 3) ? this : null
        },
        Yb: function (a) {
            var b, c, d, e, f = !1;
            if (this.Ia) {
                this.log("img complete: %s", this.Ia.complete);
                try {
                    if (a.drawImage(this.Ia, 0, 0), Hc) {
                        c = this.zb.Xa;
                        a.save();
                        a.setTransform(1, 0, 0, 1, 0, 0);
                        a.beginPath();
                        a.lineWidth = 2;
                        a.strokeStyle = "#000000";
                        a.moveTo(c[0].x, c[0].y);
                        b = d = 1;
                        for (e = c.length - 1; d <= e; b = d += 1) a.lineTo(c[b].x, c[b].y);
                        a.closePath();
                        a.stroke();
                        a.restore()
                    }
                } catch (g) {
                    this.log("Error drawing image: %s", g.message), f = g
                }
            }
            if (null === this.Ia || f) a.save(), a.lineWidth = 1, a.strokeStyle = "#cccccc", a.strokeRect(0, 0, this.width, this.height), a.restore()
        }
    };
    var Hc = !1;
    R("ImageNode", Gc);

    function Ic(a) {
        Q(this, a, Ic);
        this.ob = null
    }
    Ic.prototype = {
        log: s("CUSTOM"),
        type: function () {
            return "CustomNode"
        },
        setProperty: function (a, b) {
            var c;
            null === this.ob && "type" === a && (c = Jc[b], this.ob = new c);
            this.ob && this.ob.setProperty ? this.ob.setProperty(a, b) : P.prototype.setProperty.call(this, a, b)
        },
        la: function (a) {
            return this.ob && this.ob.setProperty ? this.ob.getProperty(a) : P.prototype.la.call(this, a)
        },
        va: function (a) {
            "format" in this.ob ? this.ob.format(a) : alert("Error: custom item must have a format(ctx) function");
            a = this.ob.rect;
            this.rect = new I(a.x, a.y, a.width, a.height)
        },
        ha: function (a) {
            this.ob.draw(a)
        }
    };
    R("CustomNode", Ic);

    function Kc(a) {
        this.Ba(a)
    }
    n = Kc.prototype;
    n.Ba = function (a) {
        Q(this, a, Kc);
        this.parent = null;
        this.children = []
    };
    n.type = function () {
        return "GroupNode"
    };
    n.clone = function (a) {
        for (var b = new Kc(a()), c = 0; c < this.children.length; c++) {
            var d = this.children[c].clone(a);
            d.parent = b;
            b.children.push(d)
        }
        return b
    };
    n.setProperty = function (a, b) {
        for (var c = 0; c < this.children.length; c++) this.children[c].setProperty(a, b)
    };
    n.va = function (a, b) {
        for (var c = 0; c < this.children.length; c++) this.children[c].va(a, b), 0 === c ? this.rect = this.children[c].rect.clone() : Ub(this.rect, this.children[c].rect)
    };
    n.ha = function (a) {
        for (var b = 0; b < this.children.length; b++) this.children[b].ha(a)
    };
    n.hb = function (a, b) {
        for (var c = this.children.length - 1; 0 <= c; c--) {
            var d = this.children[c].hb(a, b);
            if (d) return d
        }
        return null
    };

    function Lc(a, b) {
        for (var c = 0; c < a.children.length; c++) if (b === a.children[c]) return c;
        return -1
    }
    H(P.prototype, Kc.prototype);
    R("GroupNode", Kc);

    function Mc(a) {
        Q(this, a, Mc);
        this.children = []
    }
    Mc.prototype = {
        log: s("PAGE", !0),
        type: function () {
            return "PageNode"
        },
        va: function () {},
        hb: function () {
            return null
        },
        ha: function () {}
    };
    H(Kc.prototype, Mc.prototype);
    R("PageNode", Mc);

    function Nc(a) {
        Q(this, a, Nc);
        this.aa.mathml = "";
        this.Ia = null;
        this.width = 100;
        this.height = 20;
        this.zb = new L;
        this.Dg = !1
    }
    Nc.prototype = {
        log: s("MATHNODE", !0),
        type: function () {
            return "MathNode"
        },
        setProperty: function (a, b) {
            this.aa[a] = b;
            "mathml" === a && (this.Ia = null)
        },
        va: function (a, b) {
            var c = this;
            null === this.Ia ? (this.rect = new I(0, 0, this.width, this.height), b.add(this, "math", this.aa.mathml, null, function (a) {
                c.log("Got math response.");
                c.Ia = a;
                if (c.Ia) return b.emit("reformat", c)
            })) : (this.Zf = this.Ia.width, this.Yf = this.Ia.height, this.rect = new I(0, 0, this.Zf, this.Yf));
            this.zb = new L(this.rect);
            this.zb.transform(this.aa.matrix);
            this.rect.transform(this.aa.matrix)
        },
        hb: function (a, b) {
            return !this.aa.locked && this.zb.ac(a, b, 3) ? this : null
        },
        Yb: function (a) {
            if (null === this.Ia) a.save(), a.lineWidth = 1, a.strokeStyle = "#cccccc", a.strokeRect(0, 0, this.width, this.height), a.restore();
            else try {
                a.drawImage(this.Ia, 0, 0)
            } catch (b) {
                this.log("Error: %s", b)
            }
        }
    };
    R("MathNode", Nc);

    function Oc(a) {
        Q(this, a, Oc);
        this.bd = "UnknownNode";
        this.width = 100;
        this.height = 20;
        a = this.Gd = new kc;
        switch ("centre") {
        case "left":
        case "centre":
        case "right":
            a.Lc = "centre";
            break;
        case null:
            break;
        default:
            a.log("Unknnown alignment: %s", "centre")
        }
        switch ("middle") {
        case "top":
        case "middle":
        case "bottom":
            a.ye = "middle";
            break;
        case null:
            break;
        default:
            a.log("Unknnown alignment: %s", "middle")
        }
    }
    Oc.prototype = {
        log: s("UNKNOWN", !0),
        type: function () {
            return this.bd
        },
        setProperty: function (a, b) {
            this.aa[a] = b
        },
        va: function (a) {
            this.log("Formatting placeholder for %s", this.bd);
            this.rect = new I(0, 0, this.width, this.height);
            this.rect.transform(this.aa.matrix);
            this.Gd.va(a, this.width, this.height)
        },
        Yb: function (a) {
            this.log("Drawing placeholder for for %s", this.bd);
            a.save();
            a.lineWidth = 1;
            a.fillStyle = "#888888";
            a.fillRect(0, 0, this.width, this.height);
            a.fillStyle = "#000000";
            this.Gd.ha(a, 0, 0);
            a.restore()
        }
    };
    R("UnknownNode", Oc);

    function Pc(a) {
        Q(this, a, Pc);
        yc(this, Qc);
        this.aa.text = "lorum ipsum dolor";
        this.Zc = 0;
        this.Aa = this.path = null;
        this.Ge = [];
        this.Wa = []
    }
    Pc.prototype = {
        log: s("TEXT", !0),
        type: function () {
            return "TextNode"
        },
        setProperty: function (a, b) {
            this.aa[a] = b;
            if ("fontName" === a || "text" === a) this.path = null;
            "textFillStyle" === a ? this.aa.fillStyle = b : "fillStyle" === a && (this.aa.textFillStyle = b)
        },
        va: function (a) {
            var b, c, d, e, f, g, h;
            this.font = "" + this.aa.fontSize + "px " + this.aa.fontName;
            a.font = this.font;
            a.Cf && (a.textBaseline = "alphabetic", this.path = a.Cf(this.aa.text, 0, 0));
            if (null === this.path) {
                a.save();
                b = this.aa.matrix;
                a.transform(b.m11, b.m21, b.m12, b.m22, b.xa, b.ya);
                this.Zc = c = 0;
                this.Wa = [];
                e = this.aa.text;
                for (f = e.length; 0 < f && "\n" === e[f - 1];) f -= 1;
                f = e.substr(0, f);
                e = this.aa.fontSize;
                h = f.split("\n");
                f = 0;
                for (g = h.length; f < g; f++) d = h[f], this.Wa.push({
                    text: d,
                    x: 0,
                    y: this.aa.fontSize * c
                }), d = a.measureText(d).width, this.Zc = Math.max(this.Zc, d), c += 1;
                a.restore();
                a = b.apply(0, -e);
                f = b.apply(this.Zc, -e);
                c = b.apply(this.Zc, e * (this.Wa.length - 1));
                b = b.apply(0, e * (this.Wa.length - 1));
                this.Ge = [a, f, c, b];
                this.rect = Ob(this.Ge)
            } else for (c = 0, b = this.aa.matrix, this.Aa = this.path.concat(); c < this.Aa.length;) switch (this.Aa[c]) {
            case 0:
            case 1:
                e = b.apply(this.Aa[c + 1], this.Aa[c + 2]);
                this.Aa[c + 1] = e.x;
                this.Aa[c + 2] = e.y;
                0 === c ? (this.rect.x = e.x, this.rect.y = e.y, this.rect.width = 0, this.rect.height = 0) : Tb(this.rect, e.x, e.y);
                c += 3;
                break;
            case 2:
                e = b.apply(this.Aa[c + 1], this.Aa[c + 2]);
                this.Aa[c + 1] = e.x;
                this.Aa[c + 2] = e.y;
                Tb(this.rect, e.x, e.y);
                e = b.apply(this.Aa[c + 3], this.Aa[c + 4]);
                this.Aa[c + 3] = e.x;
                this.Aa[c + 4] = e.y;
                Tb(this.rect, e.x, e.y);
                e = b.apply(this.Aa[c + 5], this.Aa[c + 6]);
                this.Aa[c + 5] = e.x;
                this.Aa[c + 6] = e.y;
                Tb(this.rect, e.x, e.y);
                c += 7;
                break;
            case 3:
                c += 1;
                break;
            default:
                this.log("Bad path command: %s", this.Aa[c]), c = this.Aa.length
            }
            b = this.la("lineWidth") + 0;
            Sb(this.rect, b, b)
        },
        Yb: function (a) {
            var b, c, d, e, f;
            if (0 !== this.aa.text.length) if (this.path) {
                b = this.aa.inverse;
                a.transform(b.m11, b.m21, b.m12, b.m22, b.xa, b.ya);
                a.beginPath();
                for (b = 0; b < this.Aa.length;) switch (this.Aa[b]) {
                case 0:
                    a.moveTo(this.Aa[b + 1], this.Aa[b + 2]);
                    b += 3;
                    break;
                case 1:
                    a.lineTo(this.Aa[b + 1], this.Aa[b + 2]);
                    b += 3;
                    break;
                case 2:
                    a.bezierCurveTo(this.Aa[b + 1], this.Aa[b + 2], this.Aa[b + 3], this.Aa[b + 4], this.Aa[b + 5], this.Aa[b + 6]);
                    b += 7;
                    break;
                case 3:
                    a.closePath();
                    b += 1;
                    break;
                default:
                    this.log("Bad xpath command: %s", this.Aa[b]), b = this.Aa.length
                }
                a.fill();
                0 < this.aa.lineWidth && (a.shadowColor = "rgba(0,0,0,0.0)", a.stroke())
            } else for (a.font = this.font, a.textBaseline = "alphabetic", c = 0, !0 === window.IN_SERVER_CGI && (c = -this.aa.fontSize), f = this.Wa, d = 0, e = f.length; d < e; d++) b = f[d], 0 < this.aa.lineWidth && a.strokeText(b.text, b.x, b.y + c), a.fillText(b.text, b.x, b.y + c)
        }
    };
    Pc.prototype = $.extend({}, P.prototype, Pc.prototype);
    var Qc = {
        textFillStyle: "#000000",
        fontName: "Arial",
        fontSize: 20,
        lineWidth: 0,
        fillStyle: "#000000"
    };
    R("TextNode", Pc);

    function Rc(a) {
        this.view = a;
        this.kd = !1;
        this.bc = this.ra = null;
        this.ve = "normal";
        a.ea.get("iPadNoScrollText") && null !== navigator.userAgent.match(/iPad/i) && (this.ve = "top")
    }
    Rc.prototype = {
        log: s("Text"),
        wc: function () {
            this.log("Entering text mode");
            this.view.canvas.style.cursor = "text"
        },
        Rc: function () {
            this.kd && Sc(this);
            this.view.canvas.style.cursor = "default";
            this.log("Leaving text mode");
            this.ra && (this.ra.parentNode.removeChild(this.ra), this.ra = null)
        },
        Za: function (a) {
            for (var b = 0; b < a.touches.length; b++) {
                var c = a.touches[b],
                    c = M(this.view, c.pageX, c.pageY);
                "touchstart" === a.type && this.$a(c.x, c.y, a)
            }
        },
        $a: function (a, b) {
            this.kd && (this.log("Editing somewhere else on mousedown; submit that first."), Sc(this));
            var c = this.view.ia.hb(a, b, this.view.Ka),
                d, e, f = 0;
            c && "TextNode" === c.type() ? (this.Fa = c, "top" !== this.ve && (this.Fa.Nd = !0), this.view.ha(), this.bc = new u(c.rect.x, c.rect.y), d = c.la("fontName"), e = c.la("fontSize"), f = c.ec().width * this.view.scale) : (this.Fa = null, this.bc = new u(a, b), d = this.view.wa.fontName, e = this.view.wa.fontSize);
            var g = this;
            this.ra = document.createElement("textarea");
            document.body.appendChild(this.ra);
            c = $(this.ra).height();
            f && (this.ra.style.width = "" + f + "px");
            f = Tc(this.view, this.bc.x, this.bc.y);
            this.ra.style.position = "absolute";
            this.ra.style.fontFamily = d;
            this.ra.style.fontSize = "" + e * this.view.scale + "px";
            this.ra.style.overflow = "auto";
            this.ra.style.zIndex = this.view.yc() + 1;
            "top" === this.ve ? (d = $(this.view.canvas).offset(), e = $(this.view.canvas).width(), f = $(this.ra).width(), this.ra.style.left = "" + (d.left + e / 2 - f / 2) + "px", this.ra.style.top = "" + d.top + "px") : (this.ra.style.left = "" + Math.round(f.x) + "px", this.ra.style.top = "" + Math.round(f.y) + "px");
            this.kd = !0;
            this.bc = new u(a, b + c);
            this.Fa && (this.ra.value = this.Fa.la("text"));
            var h = null;
            $(this.ra).bind("keypress", function (a) {
                13 === a.keyCode && a.shiftKey ? Sc(g) : 13 === a.keyCode && (h && clearTimeout(h), h = setTimeout(function () {
                    g.ra && (g.log("Set editBox height to %s", "" + g.ra.scrollHeight + "px"), g.ra.style.height = "" + g.ra.scrollHeight + "px", g.ra.style.width = "" + g.ra.scrollWidth + "px")
                }, 0))
            });
            h = setTimeout(function () {
                g.ra && (g.log("Set editBox height to %s", "" + g.ra.scrollHeight + "px"), g.ra.style.height = "" + g.ra.scrollHeight + "px", g.ra.style.width = "" + g.ra.scrollWidth + "px")
            }, 0);
            $(this.ra).bind("keydown", function (a) {
                27 === a.keyCode ? (g.log("ESC pressed; cancel."), g.cancel(), E(g.view), g.view.ga.emit("goto-toolbar")) : 13 === a.keyCode && (g.log("Enter pressed. create text."), Sc(g), g.view.ta.bb && Uc(g.view), g.view.ga.Je("goto-canvas"))
            });
            setTimeout(function () {
                g.ra && g.ra.focus()
            }, 100);
            g.ra.focus()
        },
        cancel: function () {
            this.ra && this.ra.parentNode.removeChild(this.ra);
            this.ra = null;
            this.kd = !1;
            this.Fa && (this.Fa.Nd = !1, this.view.ha())
        },
        ab: function () {},
        Ib: function (a) {
            this.log("keyboard: %s", a);
            "cancel" === a && null === this.ra && (E(this.view), this.view.ga.emit("goto-toolbar"))
        },
        Hb: function (a) {
            this.log("Set text colour to %s", a.Ra);
            this.view.setProperty("textFillStyle", a.Ra)
        }
    };

    function Sc(a) {
        var b = a.ra.value;
        a.cancel();
        if (a.Fa && a.Fa.la("text") === b) a.log("Text was not changed.");
        else if (null === a.Fa && "" === b) a.log("No text entered.");
        else if (a.Fa) a.log("Update text in node %s", a.Fa.id), a.view.qa([new Vc([a.Fa.id], "text", b)]);
        else {
            a.log("Create new text node.");
            var c = new K(a.bc.x, a.bc.y);
            a.view.qa([new D("TextNode", {
                text: b,
                fontSize: a.view.wa.fontSize,
                fontName: a.view.wa.fontName,
                textFillStyle: a.view.wa.textFillStyle,
                layer: a.view.Ka
            }), new N([a.view.ia.Da], c, c.inverse())])
        }
    };

    function Wc() {
        z.call(this);
        this.Ba()
    }
    Wc.prototype = {
        Ba: function () {
            this.keys = {};
            this.td = !0;
            this.kg = RegExp("alt control ctrl del delete down end esc enter home ins insert left pagedown pageup right shift up backspace f4".split(" ").sort(function (a, c) {
                return c.length - a.length
            }).join("|"), "g");
            var a = this;
            this.Ef = function (b) {
                for (var c = a.translate(b), d = 0; d < c.length; d++) a.log("action: %s", c[d]), a.Je("*", c[d], b)
            }
        },
        log: s("KEYMAP"),
        map: function (a, b) {
            for (var c = a.toLowerCase().split(","), d = b.split(","), e = 0; e < c.length; e++) for (var f = 0; f < d.length; f++) Xc(this, c[e], d[f])
        },
        translate: function (a) {
            var b = [],
                c = "";
            a.keyCode && (c += a.keyCode);
            a.shiftKey && (c += "-shift");
            a.ctrlKey && (c += "-control");
            a.altKey && (c += "-alt");
            a = c;
            a in this.keys && (b = this.keys[a]);
            this.log("%s", a);
            return b
        },
        each: function (a, b) {
            for (var c = this.translate(a), d = 0; d < c.length; d++) b(c[d])
        }
    };

    function Yc(a, b) {
        $(b).bind("keydown", a.Ef)
    }

    function Xc(a, b, c) {
        if (0 !== b.length) {
            var d = b.match(a.kg) || [],
                e = !1,
                f = !1,
                g = !1,
                h = [],
                k;
            for (k = 0; k < d.length; k++) switch (d[k]) {
            case "alt":
                g = !0;
                break;
            case "control":
            case "ctrl":
                f = !0;
                break;
            case "shift":
                e = !0;
                break;
            case "shift":
                e = !0;
                break;
            case "home":
                h.push(36);
                break;
            case "end":
                h.push(35);
                break;
            case "pageup":
                h.push(33);
                break;
            case "pagedown":
                h.push(34);
                break;
            case "delete":
            case "del":
                h.push(46);
                break;
            case "backspace":
                h.push(8);
                break;
            case "up":
                h.push(38);
                break;
            case "right":
                h.push(39);
                break;
            case "down":
                h.push(40);
                break;
            case "left":
                h.push(37);
                break;
            case "esc":
                h.push(27);
                break;
            case "enter":
                h.push(13);
                break;
            case "f4":
                h.push(115);
                break;
            default:
                alert("key entry not found: " + d[k])
            }
            d = function (b) {
                e && -1 === b.indexOf("-shift") && (b += "-shift");
                f && -1 === b.indexOf("-control") && (b += "-control");
                g && -1 === b.indexOf("-alt") && (b += "-alt");
                a.log("Keyboard mapping: %s->%s", b, c);
                if (b in a.keys) {
                    for (var d = 0, h = a.keys[b], d = 0; d < h.length && h[d] !== c; d++);
                    d === h.length && a.keys[b].push(c)
                } else a.keys[b] = [c]
            };
            if (0 === h.length) switch (b = b.toUpperCase().charAt(b.length - 1), b) {
            case "=":
                d("107-shift");
                d("187");
                d("61");
                break;
            case "+":
                d("107");
                d("61-shift");
                break;
            case "-":
                d("109");
                d("189");
                d("173");
                break;
            default:
                h.push(b.charCodeAt(0))
            }
            for (k = 0; k < h.length; k++) d("" + h[k])
        }
    }
    H(z.prototype, Wc.prototype);

    function Zc() {
        var a = document.createElement("input");
        $(a).attr("type", "range");
        if ("range" === a.type) return a.dg = function (b, c) {
            a.min = b;
            a.max = c
        }, a.Df = function () {
            return a.value
        }, a.hf = function (b) {
            a.value = b
        }, a;
        var b = $("<div>");
        b.css("display", "inline-block");
        b.css("vertical-align", "top");
        b.css("height", "1em");
        b.css("width", "10em");
        b.css("padding", "0.25em");
        b.css("position", "relative");
        var c = $("<div>");
        c.css("top", "50%");
        c.css("height", "0");
        c.css("border-top", "1px solid black");
        c.css("border-bottom", "1px solid #888888");
        c.css("position", "absolute");
        c.css("left", "0");
        c.css("right", "0");
        var d = $("<div>");
        d.css("height", "1em");
        d.css("left", "0px");
        d.css("background", "#888888");
        d.css("border-top", "1px solid #cccccc");
        d.css("border-left", "1px solid #cccccc");
        d.css("border-bottom", "1px solid #000000");
        d.css("border-right", "1px solid #000000");
        d.css("width", "0.5em");
        d.css("position", "absolute");
        d.css("cursor", "pointer");
        b.append(c);
        b.append(d);
        b[0].type = "range";
        b[0].min = 0;
        b[0].max = 100;
        b[0].value = 0;
        b[0].onchange = function () {};
        b[0].dg = function (a, c) {
            b[0].min = a;
            b[0].max = c
        };
        b[0].hf = function (a) {
            b[0].value = a;
            var c = b.width() - d.width();
            a = a / b[0].max * c;
            a = Math.round(a);
            a = Math.max(a, 0);
            a = Math.min(a, b.width());
            d.css("left", "" + a + "px")
        };
        b[0].Df = function () {
            return b[0].value
        };
        var e, f, g, h = s("RANGE");
        $(d).mousedown(function (a) {
            g = !0;
            e = a.pageX;
            f = parseInt(d.css("left"), 10);
            h("Mousedown at %s, ox=%s", e, f);
            a.stopPropagation();
            a.preventDefault()
        });
        $(b).mousedown(function (a) {
            var c = b.width() - d.width(),
                h = a.pageX - $(b).offset().left,
                h = Math.max(h, 0),
                h = Math.min(h, c);
            d.css("left", "" + h + "px");
            e = a.pageX;
            f = h;
            h = h / c * (b[0].max - b[0].min) + b[0].min;
            h = Math.round(h);
            b[0].value = h;
            b[0].onchange();
            g = !0
        });
        $(b).mousemove(function (a) {
            if (g) {
                var c = b.width() - d.width();
                a = a.pageX - e + f;
                a = Math.max(a, 0);
                a = Math.min(a, c);
                d.css("left", "" + a + "px");
                a = a / c * (b[0].max - b[0].min) + b[0].min;
                a = Math.round(a);
                b[0].value = a;
                b[0].onchange()
            }
        });
        $(document.body).mouseup(function () {
            g = !1
        });
        return b[0]
    };

    function $c(a, b, c, d) {
        this.view = a;
        this.ya = this.xa = 0;
        this.Ma = !1;
        this.xd = b;
        this.$a(c, d)
    }
    $c.prototype = {
        log: s("SELECT"),
        Za: function (a) {
            "touchmove" === a.type ? (a = ad(this.view, a.changedTouches[0]), this.ab(a.x, a.y)) : "touchend" === a.type && (a = ad(this.view, a.changedTouches[0]), this.ib(a.x, a.y))
        },
        $a: function (a, b) {
            this.xa = a;
            this.ya = b;
            this.Ma = !0
        },
        ab: function (a, b) {
            if (this.Ma) {
                var c = this.view.ca,
                    d = this;
                this.view.ha(function () {
                    c.save();
                    c.strokeStyle = "#0050B7";
                    c.lineWidth = 2 / d.view.scale;
                    c.fillStyle = "rgba(0, 80, 183, 0.2)";
                    var e = new I(d.xa + 0.5, d.ya + 0.5, a - d.xa, b - d.ya);
                    c.fillRect(e.x, e.y, e.width, e.height);
                    c.strokeRect(e.x, e.y, e.width, e.height);
                    c.restore()
                })
            }
        },
        ib: function (a, b) {
            this.Ma = !1;
            O(this.view);
            for (var c = this.view, d = bd(c.ia, new I(this.xa, this.ya, a - this.xa, b - this.ya)), e = 0; e < d.length; e++) cd(c, d[e]);
            Fc(this.view);
            this.view.ha();
            this.view.na = this.xd
        }
    };

    function dd() {
        return "localStorage" in window && null !== window.localStorage
    }
    var ed = {};

    function fd(a) {
        this.Ba(a)
    }
    fd.prototype = {
        Ba: function (a) {
            if ("string" === typeof a) {
                for (; 8 > a.length;) a += a;
                for (var b = 16777619, c = 0; c < a.length; c++) b = (16777619 * b ^ a.charCodeAt(c)) & 4294967295;
                a = b
            }
            this.df = a;
            this.reset()
        },
        reset: function () {
            this.rd = this.qd = this.df
        },
        next: function () {
            this.rd = 36969 * (this.rd & 65535) + (this.rd >> 16);
            this.qd = 18E3 * (this.qd & 65535) + (this.qd >> 16);
            return ((this.rd << 16) + this.qd) / 4294967295 / 2 + 0.5
        }
    };

    function gd(a) {
        this.Ba(a)
    }
    var hd = {
        strokeStyle: "#000000",
        fillStyle: "#ffffff",
        textFillStyle: "#000000",
        fontName: "Arial",
        fontSize: 20,
        lineWidth: 2,
        dashes: "",
        smoothness: 0.3,
        sloppiness: 0.5,
        shadow: !1,
        closed: !1,
        arrowSize: 0,
        arrowStyle: "simple",
        doubleArrow: !1,
        text: "",
        roundRadius: 0
    },
        id = 1,
        jd = 5,
        kd = 6,
        S = [2];
    S[id] = 2;
    S[2] = 4;
    S[3] = 5;
    S[4] = 6;
    S[jd] = 2;
    S[kd] = 4;
    S[7] = 0;
    n = gd.prototype;
    n.Ba = function (a) {
        Q(this, a, gd);
        yc(this, hd);
        this.aa.closed = !1;
        this.aa.commands = [];
        this.pa = [];
        this.dd = 0;
        this.aa.seed = 0;
        this.vb = new Pc(0);
        this.vb.setProperty("text", this.aa.text)
    };
    n.log = s("PATHNODE");
    n.moveTo = function (a, b) {
        var c = this.aa.commands;
        c.push(0);
        c.push(a);
        c.push(b)
    };
    n.type = function () {
        return "PathNode"
    };
    n.de = function () {
        return !0 === this.aa.closed
    };

    function ld(a, b) {
        var c = a.aa.commands;
        a.aa.commands = b;
        return c
    }
    n.setProperty = function (a, b) {
        P.prototype.setProperty.apply(this, arguments);
        "fontName" === a || "fontSize" === a || "text" === a ? this.vb.setProperty(a, b) : "textFillStyle" === a && this.vb.setProperty("fillStyle", b)
    };

    function md(a, b, c, d) {
        for (var e = 0, f = a.aa.commands, g = 0; g < b; g++) e += S[f[e]] + 1;
        g = a.aa.inverse.apply(c, d);
        f[e + 1] = g.x;
        f[e + 2] = g.y;
        if (0 === b && a.aa.closed) {
            for (b = null; e < f.length;) g = S[f[e]], 2 <= g && (b = e), e += g + 1;
            b && (e = b, g = a.aa.inverse.apply(c, d), f[e + 1] = g.x, f[e + 2] = g.y)
        }
    }

    function nd(a, b) {
        for (var c = a.aa.commands, d = 0, e = 0; e < b; e++) d += S[c[d]] + 1;
        c.splice(d, S[c[d]] + 1)
    }
    n.va = function (a, b) {
        this.origin = null;
        this.pa.length = 0;
        for (var c = new u(0, 0), d = this.aa.commands, e = null, f, g, h = this.aa.matrix, k = new fd(this.aa.seed), l = 0; l < d.length;) {
            switch (d[l++]) {
            case 0:
                c = h.apply(d[l++], d[l++]);
                this.pa.push(new ta(e, c));
                null === this.origin && (this.origin = c);
                break;
            case id:
                c = h.apply(d[l++], d[l++]);
                this.pa.push(new ua(e, c, k, this.aa.sloppiness, this.aa.roundRadius));
                break;
            case 2:
                c = h.apply(d[l++], d[l++]);
                f = h.apply(d[l++], d[l++]);
                this.pa.push(new xa(e, f, c));
                break;
            case 3:
                c = h.apply(d[l++], d[l++]);
                f = h.apply(d[l++], d[l++]);
                g = d[l++];
                this.pa.push(new ya(e, f, c, g));
                break;
            case 4:
                c = h.apply(d[l++], d[l++]);
                f = h.apply(d[l++], d[l++]);
                g = h.apply(d[l++], d[l++]);
                this.pa.push(new za(e, f, g, c));
                break;
            case jd:
                c = h.apply(d[l++], d[l++]);
                this.pa.push(new wa(e, c, this.aa.smoothness));
                break;
            case kd:
                c = h.apply(d[l++], d[l++]);
                f = h.apply(d[l++], d[l++]);
                this.pa.push(new Aa(e, f, c, k, this.aa.sloppiness));
                break;
            case 7:
                this.aa.closed = !0;
                break;
            default:
                l++
            }
            e = this.pa[this.pa.length - 1]
        }
        this.aa.closed && 4 <= this.pa.length && this.pa[1].Ed && (this.pa[1].Ed(e), e.da = this.origin);
        this.dd = this.pa.length;
        od(this, k);
        this.rect.x = this.origin.x;
        this.rect.y = this.origin.y;
        this.rect.width = 0;
        this.rect.height = 0;
        c = this.aa.dashes.split(",");
        this.jd = [];
        for (l = 0; l < c.length; l++) d = parseFloat(c[l]), isNaN(d) || this.jd.push(d);
        l = this.jd.length ? 2 : 16;
        c = new bc;
        for (d = 0; d < this.pa.length; d++) this.pa[d].ha(c);
        f = k = d = 0;
        for (e = new bc; d < c.ba.length;) {
            switch (c.ba[d]) {
            case 0:
                k = c.ba[d + 1];
                f = c.ba[d + 2];
                e.moveTo(k, f);
                break;
            case 1:
                k = c.ba[d + 1];
                f = c.ba[d + 2];
                e.lineTo(k, f);
                break;
            case 2:
                g = h = [];
                var m = c.ba[d + 5],
                    p = c.ba[d + 6];
                k !== m && f !== p && Yb(g, k, f, c.ba[d + 1], c.ba[d + 2], c.ba[d + 3], c.ba[d + 4], m, p, l * l);
                g.push(new u(m, p));
                for (k = 0; k < h.length; k++) e.lineTo(h[k].x, h[k].y);
                k = c.ba[d + 5];
                f = c.ba[d + 6];
                break;
            case 3:
                g = h = [];
                m = c.ba[d + 3];
                p = c.ba[d + 4];
                k !== m && f !== p && $b(g, k, f, c.ba[d + 1], c.ba[d + 2], m, p, l * l);
                g.push(new u(m, p));
                for (k = 0; k < h.length; k++) e.lineTo(h[k].x, h[k].y);
                k = c.ba[d + 3];
                f = c.ba[d + 4];
                break;
            case 4:
                e.close()
            }
            d += cc[c.ba[d]]
        }
        for (var c = this.wd = e, d = 0, q, r, e = new I(c.ba[1], c.ba[2], 0, 0); d < c.ba.length;) {
            switch (c.ba[d]) {
            case 0:
            case 1:
                q = c.ba[d + 1];
                r = c.ba[d + 2];
                Tb(e, q, r);
                break;
            case 2:
                k = h = [];
                f = c.ba[d + 5];
                g = c.ba[d + 6];
                q !== f && r !== g && Yb(k, q, r, c.ba[d + 1], c.ba[d + 2], c.ba[d + 3], c.ba[d + 4], f, g, l * l);
                k.push(new u(f, g));
                for (q = 0; q < h.length; q++) Tb(e, h[q].x, h[q].y);
                q = c.ba[d + 5];
                r = c.ba[d + 6];
                break;
            case 3:
                k = h = [];
                f = c.ba[d + 3];
                g = c.ba[d + 4];
                q !== f && r !== g && $b(k, q, r, c.ba[d + 1], c.ba[d + 2], f, g, l * l);
                k.push(new u(f, g));
                for (q = 0; q < h.length; q++) Tb(e, h[q].x, h[q].y);
                q = c.ba[d + 3];
                r = c.ba[d + 4]
            }
            d += cc[c.ba[d]]
        }
        this.rect = e;
        q = this.aa.lineWidth;
        Sb(this.rect, 2 * q + 1, 2 * q + 1);
        8 > this.rect.width && (this.rect.x += this.rect.width / 2 - 4, this.rect.width = 8);
        8 > this.rect.height && (this.rect.y += this.rect.height / 2 - 4, this.rect.height = 8);
        this.aa.closed && (r = Pb(this.rect), this.vb.va(a, b), q = r.x - this.vb.rect.x - this.vb.rect.width / 2, r = r.y - this.vb.rect.y - this.vb.rect.height / 2, this.vb.transform(new K(q, r), new K(-q, -r)), this.vb.va(a, b))
    };

    function od(a, b) {
        function c(a, c) {
            var g, m, p, q;
            g = a.x - c.x * e;
            m = a.y - c.y * e;
            p = g + c.y * e / 2;
            q = m - c.x * e / 2;
            g += -c.y * e / 2;
            m += c.x * e / 2;
            d.pa.push(new ta(d.pa[d.pa.length - 1], new u(g, m)));
            d.pa.push(new wa(d.pa[d.pa.length - 1], a, f));
            d.pa.push(new wa(d.pa[d.pa.length - 1], new u(p, q), f));
            "solid" === d.aa.arrowStyle && d.pa.push(new ua(d.pa[d.pa.length - 1], new u(g, m), b, d.aa.smoothness, 0))
        }
        a.Ff = 0 < a.aa.arrowSize && !a.aa.closed && 0 < a.pa.length;
        if (a.Ff) {
            var d = a,
                e = a.aa.arrowSize,
                f = a.aa.smoothness,
                g = a.pa[a.pa.length - 1];
            c(g.da, g.Ob());
            a.aa.doubleArrow && c(a.pa[0].da, Nb(a.pa[1].Ec()))
        }
    }
    n.close = function () {
        this.aa.commands.push(7)
    };
    n.Yb = function (a) {
        var b = this.aa.inverse;
        a.save();
        a.lineJoin = "round";
        a.transform(b.m11, b.m21, b.m12, b.m22, b.xa, b.ya);
        a.beginPath();
        a.lineCap = "round";
        a.If = "round";
        for (b = 0; b < this.pa.length; b++) this.pa[b].ha(a);
        this.aa.closed && (a.closePath(), a.fill(), a.shadowColor = "rgba(0,0,0,0.0)");
        if (this.jd.length && 0 < this.aa.lineWidth) {
            a.beginPath();
            for (var b = this.wd, c = this.jd, d = 0, e = 0, f = c[0], g, h = new u(0, 0), k; d < b.ba.length;) {
                switch (b.ba[d]) {
                case 0:
                    k = b.ba[d + 1];
                    g = b.ba[d + 2];
                    a.moveTo(k, g);
                    h = new u(k, g);
                    break;
                case 1:
                    k = b.ba[d + 1];
                    var l = g = b.ba[d + 2],
                        m = new u(k, l);
                    g = h.vc(m);
                    if (!(0 >= g)) {
                        for (; g > f;) h.x += (m.x - h.x) * f / g, h.y += (m.y - h.y) * f / g, e & 1 ? a.moveTo(h.x, h.y) : a.lineTo(h.x, h.y), g -= f, e = (e + 1) % c.length, f = c[e];
                        g <= f && (h = new u(k, l), e & 1 ? a.moveTo(h.x, h.y) : a.lineTo(h.x, h.y), f -= g)
                    }
                }
                d += cc[b.ba[d]]
            }
            a.lineCap = "butt"
        }
        0 < this.aa.lineWidth && a.stroke();
        if (this.aa.arrowSize && "solid" === this.aa.arrowStyle) {
            a.beginPath();
            for (b = this.dd; b < this.pa.length; b++) this.pa[b].ha(a);
            a.fillStyle = this.aa.strokeStyle;
            a.fill()
        }
        this.aa.closed && this.vb.ha(a);
        a.restore()
    };
    n.hb = function (a, b) {
        if (a >= this.rect.x - 8 && a < this.rect.x + 8 + this.rect.width && b >= this.rect.y - 8 && b < this.rect.y + 8 + this.rect.height) if (this.aa.closed) {
            for (var c = this.wd, d = 0, e, f = []; d < c.ba.length;) {
                var g = dc[c.ba[d]];
                for (e = 0; e < g; e++) f.push(new u(c.ba[d + 1 + 2 * e], c.ba[d + 1 + 2 * e + 1]));
                d += cc[c.ba[d]]
            }
            if (ac(f, a, b)) return this
        } else {
            a: {
                for (var c = this.wd, h = 0, d = g = 0, k, l, m; d < c.ba.length;) {
                    switch (c.ba[d]) {
                    case 0:
                        h = c.ba[d + 1];
                        g = c.ba[d + 2];
                        break;
                    case 1:
                        e = c.ba[d + 1];
                        f = c.ba[d + 2];
                        l = e - h;
                        k = f - g;
                        m = l * l + k * k;
                        m = ((a - h) * l + (b - g) * k) / m;
                        1 < m ? m = 1 : 0 > m && (m = 0);
                        h += m * l;
                        k = g + m * k;
                        g = h - a;
                        k -= b;
                        g = g * g + k * k;
                        if (8 >= g) {
                            c = !0;
                            break a
                        }
                        h = e;
                        g = f
                    }
                    d += cc[c.ba[d]]
                }
                c = !1
            }
            if (c) return this
        }
        return null
    };
    n.lineTo = function (a, b) {
        var c = this.aa.commands;
        c.push(id);
        c.push(a);
        c.push(b)
    };
    n.Xd = function (a, b) {
        var c = this.aa.commands;
        c.push(jd);
        c.push(a);
        c.push(b)
    };
    n.Oe = function () {
        return !1 !== this.aa.editable
    };
    n.Re = function (a, b, c) {
        c *= 8;
        if (a >= this.origin.x - c && a < this.origin.x + c && b >= this.origin.y - c && b < this.origin.y + c) return 0;
        for (var d = 0; d < this.dd; d++) if (a >= this.pa[d].da.x - c && a < this.pa[d].da.x + c && b >= this.pa[d].da.y - c && b < this.pa[d].da.y + c) return d;
        return null
    };
    H(P.prototype, gd.prototype);

    function Ec(a) {
        this.Ba(a)
    }
    Ec.prototype = {
        Ba: function (a) {
            this.ba = void 0 === a ? [] : a
        },
        change: function (a, b, c) {
            for (var d = 0, e = 0; e < a; e++) d += S[this.ba[d]] + 1;
            this.ba[d + 1] = b;
            this.ba[d + 2] = c
        },
        moveTo: function (a, b) {
            this.ba.push(0);
            this.ba.push(a);
            this.ba.push(b)
        },
        lineTo: function (a, b) {
            this.ba.push(id);
            this.ba.push(a);
            this.ba.push(b)
        },
        Xd: function (a, b) {
            this.ba.push(jd);
            this.ba.push(a);
            this.ba.push(b)
        },
        arcTo: function (a, b, c, d, e) {
            this.ba.push(3);
            this.ba.push(c);
            this.ba.push(d);
            this.ba.push(a);
            this.ba.push(b);
            this.ba.push(e)
        },
        close: function () {
            this.ba.push(7)
        },
        toArray: function () {
            return this.ba
        }
    };

    function T(a, b, c, d, e) {
        a.ba.push(kd);
        a.ba.push(d);
        a.ba.push(e);
        a.ba.push(b);
        a.ba.push(c)
    }
    function pd(a, b) {
        var c = new Ec;
        c.moveTo(a.x, a.y - b);
        T(c, a.x + b, a.y - b, a.x + b, a.y);
        T(c, a.x + b, a.y + b, a.x, a.y + b);
        T(c, a.x - b, a.y + b, a.x - b, a.y);
        T(c, a.x - b, a.y - b, a.x, a.y - b);
        c.close();
        return c.toArray()
    }
    R("PathNode", gd);

    function U() {}
    U.prototype = {
        rename: function (a) {
            var b, c, d, e;
            this.id && (this.id = a(this.id));
            if (this.za && 0 < this.za.length) {
                e = [];
                b = c = 0;
                for (d = this.za.length - 1; 0 <= d ? c <= d : c >= d; b = 0 <= d ? ++c : --c) e.push(this.za[b] = a(this.za[b]));
                return e
            }
        },
        log: s("ACTION"),
        Kc: function (a, b) {
            return Za(this, a, b)
        },
        toString: function () {
            return "" + this.eb + "()"
        }
    };

    function Za(a, b, c) {
        var d;
        d = a.za ? a.za.concat() : [];
        a.id && d.push(a.id);
        return qd(b, d, c)
    }
    function D(a, b, c, d) {
        this.type = a;
        this.ud = c;
        this.index = d;
        this.aa = b
    }
    D.prototype = {
        eb: "CreateAction",
        Pa: function (a) {
            var b = a.Da++;
            this.ja = Ac(this.type, b);
            if (!this.ja) if (this.type in Jc) this.ja = new Ic(b), this.ja.setProperty("type", this.type);
            else {
                this.log("Bad node type: %s", this.type);
                var b = this.ja = Ac("UnknownNode", b),
                    c = this.type;
                b.bd = c;
                b.Gd.text = c;
                b.log("Creating placeholder for node type %s", c)
            }
            uc(this.ja, this.aa);
            void 0 === this.ud && (this.ud = a.pb[a.nb].id, this.index = -1);
            b = V(a, this.ud);
            W(a, b, this.ja, this.index)
        },
        toString: function () {
            return "" + this.eb + "(" + this.type + ", " + JSON.stringify(this.aa) + ", parent=" + this.ud + ", index=" + this.index + ")"
        },
        Ua: function (a) {
            a.removeNode(this.ja)
        },
        Kc: function (a, b) {
            return b.add(a.Da)
        }
    };
    D.prototype = $.extend({}, U.prototype, D.prototype);

    function cb(a) {
        this.za = a;
        this.Rb = []
    }
    cb.prototype = {
        eb: "DeleteAction",
        Pa: function (a) {
            var b, c, d, e, f;
            this.Rb.length = 0;
            e = this.za;
            f = [];
            c = 0;
            for (d = e.length; c < d; c++) b = e[c], b = V(a, b), f.push(this.Rb.push({
                ja: b,
                parent: b.parent,
                index: a.removeNode(b)
            }));
            return f
        },
        Ua: function (a) {
            var b, c, d, e, f;
            if (0 !== this.Rb.length) {
                e = this.Rb;
                f = [];
                c = 0;
                for (d = e.length; c < d; c++) b = e[c], f.push(W(a, b.parent, b.ja, b.index));
                return f
            }
        }
    };
    cb.prototype = $.extend({}, U.prototype, cb.prototype);

    function Vc(a, b, c) {
        this.za = a;
        this.name = b;
        this.value = c;
        this.Sb = []
    }
    Vc.prototype = {
        eb: "SetAction",
        Pa: function (a) {
            var b, c, d, e;
            this.Sb.length = 0;
            e = this.za;
            c = 0;
            for (d = e.length; c < d; c++) b = e[c], b = V(a, b), this.Sb.push(b.la(this.name)), b.setProperty(this.name, this.value)
        },
        Ua: function (a) {
            var b, c, d, e;
            if (0 !== this.za.length) for (b = d = 0, e = this.za.length - 1; 0 <= e ? d <= e : d >= e; b = 0 <= e ? ++d : --d) c = V(a, this.za[b]), c.setProperty(this.name, this.Sb[b])
        }
    };
    Vc.prototype = $.extend({}, U.prototype, Vc.prototype);

    function N(a, b, c) {
        this.za = a;
        this.Te = b;
        this.inverse = c
    }
    N.prototype = {
        eb: "TransformAction",
        Pa: function (a) {
            var b, c, d, e;
            e = this.za;
            c = 0;
            for (d = e.length; c < d; c++) b = e[c], b = V(a, b), b.transform(this.Te, this.inverse)
        },
        Ua: function (a) {
            var b, c, d, e;
            e = this.za;
            c = 0;
            for (d = e.length; c < d; c++) b = e[c], b = V(a, b), b.transform(this.inverse, this.Te)
        },
        rename: function (a) {
            var b, c, d;
            if (0 !== this.za.length) for (b = c = 0, d = this.za.length - 1; 0 <= d ? c <= d : c >= d; b = 0 <= d ? ++c : --c) this.za[b] = a(this.za[b])
        }
    };
    N.prototype = $.extend({}, U.prototype, N.prototype);

    function rd(a, b) {
        this.id = a;
        this.ba = b
    }
    rd.prototype = {
        eb: "SetPathAction",
        Pa: function (a) {
            this.Nf = ld(V(a, this.id), this.ba)
        },
        Ua: function (a) {
            ld(V(a, this.id), this.Nf)
        }
    };
    rd.prototype = $.extend({}, U.prototype, rd.prototype);

    function sd(a, b, c, d, e, f) {
        this.id = a;
        this.handle = b;
        this.Of = c;
        this.Pf = d;
        this.x = e;
        this.y = f
    }
    sd.prototype = {
        eb: "MoveEditHandleAction",
        Pa: function (a) {
            return md(V(a, this.id), this.handle, this.x, this.y)
        },
        Ua: function (a) {
            return md(V(a, this.id), this.handle, this.Of, this.Pf)
        }
    };
    sd.prototype = $.extend({}, U.prototype, sd.prototype);

    function td(a) {
        this.za = a;
        this.Rb = []
    }
    td.prototype = {
        eb: "GroupAction",
        Pa: function (a) {
            var b, c, d, e;
            this.Rb.length = 0;
            e = this.za;
            c = 0;
            for (d = e.length; c < d; c++) b = e[c], b = V(a, b), this.Rb.push({
                ja: b,
                parent: b.parent,
                index: Lc(b.parent, b)
            });
            this.ja = a.sc(this.za)
        },
        Ua: function (a) {
            var b, c;
            if (0 !== this.za.length) {
                for (b = c = this.za.length - 1; 0 <= c && !(0 > b); b = c += -1) b = this.Rb[b], W(a, b.parent, b.ja, b.index);
                a.removeNode(this.ja)
            }
        },
        Kc: function (a, b) {
            return b.add(a.Da)
        },
        toString: function () {
            return "GroupAction(" + JSON.stringify(this.za) + ")"
        }
    };
    td.prototype = $.extend({}, U.prototype, td.prototype);

    function ud(a) {
        this.za = a;
        this.od = []
    }
    ud.prototype = {
        eb: "UngroupAction",
        Pa: function (a) {
            var b, c, d, e, f, g, h, k, l;
            d = {};
            k = this.za;
            e = 0;
            for (g = k.length; e < g; e++) if (b = k[e], b = V(a, b), wc(b) && !(b.id in d)) for (d[b.id] = !0, c = {
                ja: b,
                parent: b.parent,
                children: b.children.concat(),
                index: a.removeNode(b)
            }, this.od.push(c), l = c.children, f = 0, h = l.length; f < h; f++) b = l[f], W(a, c.parent, b, -1)
        },
        Ua: function (a) {
            var b, c, d, e;
            if (0 !== this.od.length) {
                for (b = d = this.od.length - 1; 0 <= d && !(0 > b); b = d += -1) if (b = this.od[b], 0 !== b.children.length) {
                    for (c = e = b.children.length - 1; 0 <= e && !(0 > c); c = e += -1) W(a, b.ja, b.children[c], -1);
                    W(a, b.parent, b.ja, b.index)
                }
                a.ld()
            }
        }
    };
    ud.prototype = $.extend({}, U.prototype, ud.prototype);

    function vd(a, b, c) {
        var d, e, f;
        if (wc(a)) for (f = a.children, d = 0, e = f.length; d < e; d++) a = f[d], vd(a, b, c);
        else a.transform(b, c)
    }
    function wd(a, b) {
        this.za = a;
        this.offset = b;
        this.oa = []
    }
    wd.prototype = {
        eb: "DuplicateAction",
        Pa: function (a) {
            var b, c, d, e, f, g, h;
            e = new K(this.offset, this.offset);
            c = e.inverse();
            this.oa.length = 0;
            d = function () {
                return a.Da++
            };
            h = this.za;
            f = 0;
            for (g = h.length; f < g; f++) b = h[f], b = V(a, b).clone(d), vd(b, e, c), xd(a, b), this.oa.push(b)
        },
        Ua: function (a) {
            var b, c;
            if (0 !== this.oa.length) for (b = c = this.oa.length - 1; 0 <= c && !(0 > b); b = c += -1) a.removeNode(this.oa[b])
        },
        Kc: function (a, b) {
            var c, d, e;
            c = a.Da;
            d = qd(a, this.za).length;
            c = e = c;
            for (d -= 1; e <= d; c = e += 1) b.add(c)
        }
    };
    wd.prototype = $.extend({}, U.prototype, wd.prototype);

    function yd(a, b) {
        this.za = a;
        this.type = b;
        this.oa = [];
        this.me = []
    }
    yd.prototype = {
        eb: "ChangeOrderAction",
        Pa: function (a) {
            var b, c, d, e, f, g;
            this.me.length = 0;
            this.oa.length = 0;
            g = this.za;
            e = 0;
            for (f = g.length; e < f; e++) switch (b = g[e], b = V(a, b), d = b.parent, c = a.removeNode(b), this.me.push(c), this.oa.push(b), this.type) {
            case zd:
                W(a, d, b, -1);
                break;
            case Ad:
                W(a, d, b, 0);
                break;
            case Bd:
                0 < c ? W(a, d, b, c - 1) : W(a, d, b, c);
                break;
            case Cd:
                c < d.children.length ? W(a, d, b, c + 1) : W(a, d, b, c)
            }
        },
        Ua: function (a) {
            var b, c, d, e;
            if (0 !== this.za.length) for (b = e = this.za.length - 1; 0 <= e && !(0 > b); b = e += -1) c = this.oa[b], d = c.parent, a.removeNode(c), W(a, d, c, this.me[b])
        }
    };
    yd.prototype = $.extend({}, U.prototype, yd.prototype);
    var zd = 0,
        Ad = 1,
        Cd = 2,
        Bd = 3;

    function Dd(a) {
        this.aa = a
    }
    Dd.prototype = {
        eb: "SetDocumentProperties",
        Pa: function (a) {
            var b;
            this.Sb = {};
            for (b in this.aa) this.aa.hasOwnProperty(b) && (this.Sb[b] = a.la(b), a.setProperty(b, this.aa[b]))
        },
        Ua: function (a) {
            for (var b in this.Sb) this.Sb.hasOwnProperty(b) && a.setProperty(b, this.Sb[b])
        }
    };
    Dd.prototype = $.extend({}, U.prototype, Dd.prototype);

    function pb(a, b, c) {
        this.view = a;
        this.ja = null;
        this.type = b;
        this.url = c || ""
    }
    pb.prototype = {
        wc: function () {
            this.view.canvas.style.cursor = "crosshair";
            Ed(this.view, "click-to-place-first-point-of-line");
            this.view.ha();
            this.le = this.view.ia.Da;
            this.Qc = new u(0, 0);
            this.ja = null
        },
        log: s("DRAWLINES"),
        reset: function () {
            this.wc()
        },
        Za: function (a) {
            "touchstart" === a.type ? (a = a.changedTouches[0], a = M(this.view, a.pageX, a.pageY), 10 < a.vc(this.Qc) ? this.cb(a.x, a.y) : (this.cb(a.x, a.y), this.cb(a.x, a.y), this.Tb(a.x, a.y))) : "touchmove" === a.type && (a = a.changedTouches[0], a = M(this.view, a.pageX, a.pageY), this.ab(a.x, a.y))
        },
        Ib: function (a) {
            "cancel" === a && (null !== this.ja && this.view.Gf && "curves" === this.type && this.qa(), null !== this.ja && (this.view.ia.removeNode(this.ja), $a(this.view.ia, this.le)), this.view.ta.bb ? this.view.ga.emit("goto-toolbar") : E(this.view))
        },
        cb: function (a, b) {
            var c = this.view.Ta(new u(a, b));
            a = c.x;
            b = c.y;
            if ("stampline" === this.type && null === this.ja) this.ja = Ac("StampLineNode", this.view.ia.Da++), this.ja.setProperty("x1", a), this.ja.setProperty("y1", b), this.ja.setProperty("x2", a), this.ja.setProperty("y2", b), this.ja.setProperty("url", this.url), xd(this.view.ia, this.ja), Ed(this.view, "click-to-set-the-end-of-the-line"), this.view.update(), this.index = 1;
            else if ("stampline" === this.type && this.ja) this.view.ia.removeNode(this.ja), $a(this.view.ia, this.le), this.view.qa([new D("StampLineNode", {
                x1: this.ja.la("x1"),
                y1: this.ja.la("y1"),
                x2: this.ja.la("x2"),
                y2: this.ja.la("y2"),
                url: this.url,
                layer: this.view.Ka
            })]), this.reset();
            else if (null === this.ja) this.ja = new gd(this.view.ia.Da++), this.ja.setProperty("seed", Math.round(65535 * Math.random())), this.ja.setProperty("strokeStyle", this.view.Db), this.ja.setProperty("lineWidth", this.view.wa.lineWidth), this.ja.setProperty("sloppiness", this.view.wa.sloppiness), this.ja.setProperty("smoothness", this.view.wa.smoothness), xd(this.view.ia, this.ja), "arrow" === this.type && this.ja.setProperty("arrowSize", 15), this.ja.moveTo(a, b), Fd(this, a, b), this.index = 1, Ed(this.view, "click-to-place-another-point-or-double-click-to-end-the-line"), this.view.update();
            else if (!this.view.ta.bb || "lines" !== this.type && "arrow" !== this.type) {
                Fd(this, a, b);
                this.index += 1;
                var c = this.view.ia,
                    d = this.ja.id;
                Ua(d);
                c.jc.add(d);
                this.view.update()
            } else this.qa(), E(this.view), this.view.ga.emit("goto-toolbar");
            this.Qc.x = a;
            this.Qc.y = b
        },
        ab: function (a, b) {
            var c = this.view.Ta(new u(a, b));
            a = c.x;
            b = c.y;
            this.ja && (md(this.ja, this.index, a, b), this.ja.va(this.view.ca, this.view.ub), this.view.ha(), this.Qc.x = a, this.Qc.y = b)
        },
        Tb: function (a, b) {
            this.view.Ta(new u(a, b));
            if (this.ja && 1 < this.index) {
                var c = this.index;
                nd(this.ja, c);
                nd(this.ja, c - 1);
                this.qa()
            }
            this.reset()
        },
        qa: function () {
            var a = this.ja,
                b = a.pa[a.pa.length - 1];
            8 >= va(b.da.x, b.da.y, a.origin.x, a.origin.y) && a.close();
            this.view.ia.removeNode(this.ja);
            $a(this.view.ia, this.le);
            this.view.qa([new D("PathNode", {
                arrowSize: "arrow" === this.type ? 15 : 0,
                commands: this.ja.la("commands"),
                seed: this.ja.la("seed"),
                fillStyle: this.view.Cb,
                strokeStyle: this.view.Db,
                lineWidth: this.view.wa.lineWidth,
                sloppiness: this.view.wa.sloppiness,
                smoothness: this.view.wa.smoothness,
                layer: this.view.Ka
            })]);
            this.ja = null
        },
        Rc: function () {
            this.view.canvas.style.cursor = "default";
            Ed(this.view, null);
            this.view.ha()
        },
        Hb: function (a) {
            var b;
            1 === a.button ? (this.view.Cb = a.Ra, this.view.Nb = a.Ra, b = "fillStyle") : (this.view.Db = a.Ra, b = "strokeStyle");
            this.view.setProperty(b, a.Ra)
        }
    };

    function Fd(a, b, c) {
        "curves" === a.type || "arrow" === a.type ? a.ja.Xd(b, c) : a.ja.lineTo(b, c)
    };

    function Gd(a, b, c, d, e) {
        this.view = a;
        this.ja = b;
        this.handle = c;
        a = 0;
        for (var f = b.aa.commands, g = 0; g < c; g++) a += S[f[a]] + 1;
        this.Ze = qc(b).apply(f[a + 1], f[a + 2]);
        this.$a(d, e)
    }
    Gd.prototype = {
        Za: function (a) {
            "touchmove" === a.type ? (a = a.touches[0], a = M(this.view, a.pageX, a.pageY), this.ab(a.x, a.y)) : "touchend" === a.type && (a = a.changedTouches[0], a = M(this.view, a.pageX, a.pageY), this.ib(a.x, a.y))
        },
        $a: function (a, b) {
            this.mg = a;
            this.ng = b
        },
        ab: function (a, b) {
            var c = this.view.Ta(new u(a, b));
            a = c.x;
            b = c.y;
            md(this.ja, this.handle, a, b);
            this.ja.va(this.view.ca, this.view.ub);
            this.view.ha()
        },
        ib: function (a, b) {
            var c = this.view.Ta(new u(a, b));
            a = c.x;
            b = c.y;
            a === this.mg && b === this.ng || this.view.qa([new sd(this.ja.id, this.handle, this.Ze.x, this.Ze.y, a, b)], this.view.ia.Da);
            this.view.ha();
            F(this.view, new Hd(this.view))
        }
    };

    function Hd(a) {
        this.Ba(a)
    }
    Hd.prototype = {
        Ba: function (a) {
            this.view = a;
            Ed(this.view, "");
            this.Wb = this.view.ea.Wb();
            this.cf = 1;
            this.Wb && (this.cf = 2)
        },
        log: s("DefaultBehaviour"),
        wc: function () {
            this.log("Entering pick tool.")
        },
        Rc: function () {
            this.log("Leaving pick tool.")
        },
        Za: function (a) {
            for (var b, c = 0; c < a.touches.length; c++) b = a.touches[c], b = M(this.view, b.pageX, b.pageY), "touchstart" === a.type ? this.$a(b.x, b.y, a) : "touchend" === a.type && this.ib(b.x, b.y)
        },
        $a: function (a, b, c) {
            this.log("onMouseDown");
            if (this.view.ea.get("readOnly")) this.log("readOnly mode: Ignoring click.");
            else {
                var d = Id(this.view, a, b);
                if (d) F(this.view, new lc(this.view, this, d, !1, a, b));
                else {
                    if (d = this.view.selection.length) {
                        var d = this.view,
                            e, f;
                        f = Jd(d);
                        var g = $(d.canvas).offset(),
                            h = jc(d.qb);
                        "changedTouches" in c ? (e = c.changedTouches[0].pageX - g.left - f, f = c.changedTouches[0].pageY - g.top - f) : (e = c.pageX - g.left - f, f = c.pageY - g.top - f);
                        d = d.mc && e > d.canvas.width - d.mc.width - h && f < d.mc.height
                    }
                    d && this.view.ga.emit("menu.delete", {});
                    if (this.view.Fa && (d = this.view.Fa, e = d.Re(a, b, 1 / this.view.scale * this.cf), null !== e)) {
                        F(this.view, new Gd(this.view, d, e, a, b));
                        return
                    }(d = this.view.ia.hb(a, b, this.view.Ka)) && this.log("layer=%s active=%s", xc(d), this.view.Ka);
                    d && xc(d) === this.view.Ka ? (e = d === this.view.Fa, h = d.kb === this.view.kb, this.log("wasEditNode: %s, wasSelected: %s", e, h), h || (c.shiftKey || O(this.view), cd(this.view, d), Fc(this.view)), F(this.view, new lc(this.view, this, -1, !e && h, a, b))) : (c = this.view, c.selection.length && c.ef.ac(a, b) ? F(this.view, new lc(this.view, this, -1, !0, a, b)) : (this.view.Fa = null, F(this.view, new $c(this.view, this, a, b))))
                }
            }
        },
        ib: function () {
            this.log("onMouseUp")
        },
        Ib: function (a, b) {
            this.log("keyboard: %s", a);
            var c = !0;
            switch (a) {
            case "bring-to-front":
                this.view.ga.emit("menu.bringToFront", {});
                break;
            case "send-to-back":
                this.view.ga.emit("menu.sendToBack", {});
                break;
            case "left":
                Kd(this.view, -1, 0) || (this.view.Oa = Math.min(this.view.Oa + 16, 0), X(this.view), this.view.ha());
                break;
            case "right":
                Kd(this.view, 1, 0) || (this.view.Oa = Math.max(-(this.view.canvas.width * this.view.scale - this.view.canvas.width), this.view.Oa - 16), X(this.view), this.view.ha());
                break;
            case "up":
                Kd(this.view, 0, -1) || (this.view.Ja = Math.min(this.view.Ja + 16, 0), X(this.view), this.view.ha());
                break;
            case "down":
                Kd(this.view, 0, 1) || (this.view.Ja = Math.max(-(this.view.canvas.height * this.view.scale - this.view.canvas.height), this.view.Ja - 16), X(this.view), this.view.ha());
                break;
            case "select-none":
                O(this.view);
                Fc(this.view);
                this.view.ha();
                this.view.ta.bb && this.view.ga.emit("goto-toolbar");
                break;
            case "duplicate":
                this.view.ga.emit("menu.duplicate", {});
                break;
            case "move-up":
                this.view.ga.emit("menu.moveUp", {});
                break;
            case "move-down":
                this.view.ga.emit("menu.moveDown", {});
                break;
            case "delete":
                this.view.ga.emit("menu.delete", {});
                break;
            case "curve-tool":
                mb(this.view);
                break;
            case "line-tool":
                nb(this.view);
                break;
            case "group":
                this.view.ga.emit("menu.group", {});
                break;
            case "ungroup":
                this.view.ga.emit("menu.ungroup", {});
                break;
            case "undo":
                this.view.ga.emit("menu.undo", {});
                break;
            case "redo":
                this.view.ga.emit("menu.redo", {});
                break;
            case "cut":
                this.view.ga.emit("menu.cut", {});
                break;
            case "copy":
                this.view.ga.emit("menu.copy", {});
                break;
            case "paste":
                this.view.ga.emit("menu.paste", {});
                break;
            case "zoom-1-1":
                var d = Ld(this.view);
                this.view.scale = 1;
                this.view.Oa = -d.x;
                this.view.Ja = -d.y;
                X(this.view);
                this.view.ha();
                break;
            case "zoom-in":
                this.view.scale *= 1.1;
                X(this.view);
                this.view.ha();
                break;
            case "zoom-out":
                this.view.scale /= 1.1;
                X(this.view);
                this.view.ha();
                break;
            default:
                c = !1
            }
            c && (b.preventDefault(), b.stopPropagation())
        },
        Hb: function (a) {
            var b;
            1 === a.button ? (this.view.Cb = a.Ra, this.view.Nb = a.Ra, b = "fillStyle") : (this.view.Db = a.Ra, b = "strokeStyle");
            this.view.setProperty(b, a.Ra)
        },
        Tb: function (a, b) {
            var c, d;
            this.log("onDoubleClick");
            var e = this.view.ia.hb(a, b, this.view.Ka);
            e && e.de() ? (c = e.la("text"), d = prompt("Enter new text", c), null !== d && "" !== d && d !== c && d !== e.la("text") && this.view.qa([new Vc([e.id], "text", d)])) : e && "MathNode" === e.type() && this.view.ga.emit("math.edit", Y(this.view)[0]);
            this.log("hittest: %s, hasText: %s", null !== e, null !== e && e.de())
        }
    };
    for (var Md, Nd = [], Od = 0; 4 > Od; Od++) Nd.push(String.fromCharCode(">2$-".charCodeAt(Od) ^ "zwibbler3".charCodeAt(Od % 9)));
    Md = Nd.join("");
    for (var Pd, Qd = [115, 116, 114, 111, 107, 101, 84, 101, 120, 116], Rd = [], Sd = 0; Sd < Qd.length; Sd++) Rd.push(String.fromCharCode(Qd[Sd]));
    Pd = Rd.join("");

    function Td(a, b, c, d, e, f) {
        this.ea = e;
        this.language = f;
        this.mb = c;
        this.ga = d;
        this.canvas = a[0];
        this.ca = this.canvas.getContext("2d");
        this.Fd = !0 === e.get("pageView");
        Ud(this);
        this.ta = {
            bb: !1,
            Ma: !1,
            Ud: !1,
            x: 100,
            y: 100
        };
        this.na = null;
        F(this, new Hd(this));
        this.jb = null;
        this.Gb = new fc("horizontal", !0);
        this.Gb.appendTo(this.canvas.parentNode);
        this.qb = new fc("vertical", !1);
        this.qb.appendTo(this.canvas.parentNode);
        this.Xb = "none";
        this.Fc = 0;
        this.Lb = !0;
        this.Ka = "default";
        e.Wb() && (this.mc = document.createElement("img"), this.mc.setAttribute("src", e.Ga + "wd-trash.png"));
        var g = this;
        this.ub = new Oa;
        this.ub.on("reformat", function (a) {
            g.log("Node %s requests reformat", a.id);
            if (a.id in g.ia.oa) {
                g.log("   Reformatting...");
                var b = g.ia;
                a = a.id;
                Ua(a);
                b.jc.add(a);
                g.update()
            }
        });
        this.Fa = this.Qd = null;
        this.$c = 4;
        this.ea.Wb() ? (this.ze = 4 * this.$c, this.$c = 9) : this.ze = 2 * this.$c;
        this.Ae = 1;
        this.Ce = 2;
        this.De = 3;
        this.Be = 4;
        this.nc = 5;
        this.ga.bind("menu.undo", function () {
            g.Ua()
        });
        this.ga.bind("menu.redo", function () {
            g.Pa()
        });
        this.ga.bind("menu.copy", function () {
            g.copy()
        });
        this.ga.bind("menu.cut", function () {
            g.copy();
            Vd(g)
        });
        this.ga.bind("menu.paste", function () {
            g.vd()
        });
        this.ga.bind("menu.duplicate", function () {
            g.duplicate()
        });
        this.ga.bind("menu.moveUp", function () {
            var a = Y(g);
            a.length && g.qa([new yd(a, Cd)])
        });
        this.ga.bind("menu.moveDown", function () {
            var a = Y(g);
            a.length && g.qa([new yd(a, Bd)])
        });
        this.ga.bind("menu.bringToFront", function () {
            var a = Y(g);
            a.length && g.qa([new yd(a, zd)])
        });
        this.ga.bind("menu.sendToBack", function () {
            var a = Y(g);
            a.length && g.qa([new yd(a, Ad)])
        });
        this.ga.bind("menu.group", function () {
            g.group()
        });
        this.ga.bind("menu.ungroup", function () {
            var a = Y(g);
            a.length && g.qa([new ud(a)])
        });
        this.ga.bind("menu.delete", function () {
            Vd(g)
        });
        this.ga.bind("menu.outline-none", function () {
            g.setProperty("lineWidth", 0)
        });
        this.ga.bind("menu.outline-pencil", function () {
            g.setProperty("lineWidth", 1)
        });
        this.ga.bind("menu.outline-pen", function () {
            g.setProperty("lineWidth", 2)
        });
        this.ga.bind("menu.outline-marker", function () {
            g.setProperty("lineWidth", 4)
        });
        this.ga.bind("menu.shadow-none", function () {
            g.setProperty("shadow", !1)
        });
        this.ga.bind("menu.shadow", function () {
            g.setProperty("shadow", !0)
        });
        this.ga.bind("menu.font.FG Virgil", function () {
            g.setProperty("fontName", "FG Virgil")
        });
        this.ga.bind("menu.font.Stinky Kitty", function () {
            g.setProperty("fontName", "Stinky Kitty")
        });
        this.ga.bind("menu.font.Arial", function () {
            g.setProperty("fontName", "Arial")
        });
        this.ga.bind("menu.font.Times New Roman", function () {
            g.setProperty("fontName", "Times New Roman")
        });
        this.ga.bind("menu.sloppiness-draftsman", function () {
            g.setProperty("sloppiness", 0)
        });
        this.ga.bind("menu.sloppiness-artist", function () {
            g.setProperty("sloppiness", 0.25)
        });
        this.ga.bind("menu.sloppiness-Cartoonist", function () {
            g.setProperty("sloppiness", 0.5)
        });
        this.ga.bind("menu.sloppiness-child", function () {
            g.setProperty("sloppiness", 1)
        });
        this.ga.bind("menu.sloppiness-drunk", function () {
            g.setProperty("sloppiness", 2)
        });
        this.ga.bind("menu.insert.cylinder", function () {
            var a = g.ia.Da,
                b = new Ec([]);
            b.moveTo(100, 100);
            b.lineTo(200, 100);
            b.lineTo(200, 200);
            T(b, 200, 225, 150, 225);
            T(b, 100, 225, 100, 200);
            b.lineTo(100, 100);
            b.close();
            var c = new Ec;
            c.moveTo(100, 100);
            T(c, 100, 75, 150, 75);
            T(c, 200, 75, 200, 100);
            T(c, 200, 125, 150, 125);
            T(c, 100, 125, 100, 100);
            c.close();
            g.qa([new D("PathNode", {
                commands: b.toArray(),
                layer: g.Ka
            }), new D("PathNode", {
                commands: c.toArray(),
                layer: g.Ka
            }), new td([a, a + 1])])
        });
        this.qb.on("scroll", function (a) {
            g.Ja = -a * g.scale;
            g.ha()
        });
        this.Gb.on("scroll", function (a) {
            g.Oa = -a * g.scale;
            g.ha()
        });
        Wd(this);
        this.Dc(b);
        (a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) ? (this.log("Using requestAnimationFrame"), this.requestAnimationFrame = a) : this.log("Emulating requestAnimationFrame");
        this.be = !1;
        this.ae = null;
        this.ea.on("update", function (a, b) {
            g.ne(a, b)
        })
    }
    Td.prototype = {
        log: s("VIEW"),
        ue: function (a) {
            this.rb = a
        },
        requestAnimationFrame: function (a) {
            a()
        },
        pe: function (a) {
            this.log("setActiveLayer(%s)", a);
            this.Ka = a;
            O(this);
            Fc(this);
            this.ha()
        },
        Wc: function (a, b) {
            this.ia.Wc(a, b);
            b || a !== this.Ka || (O(this), Fc(this));
            this.ha()
        },
        Dc: function (a) {
            this.ia = a;
            this.scale = 1;
            this.Ja = this.Oa = 0;
            this.selection = [];
            this.Fa = null;
            this.kb = 1;
            this.sa = new I(0, 0, 0, 0);
            this.ef = new L(this.sa);
            this.lc = new J;
            this.ce = !0;
            this.Bc = this.Ac = 0;
            this.fe = null;
            this.Cb = "#ffffff";
            this.Nb = this.ea.options.defaultBrushColour;
            this.Db = this.ea.options.defaultStrokeStyle;
            this.wa = {};
            this.wa.lineWidth = this.ea.options.defaultLineWidth;
            this.wa.sloppiness = 0.5;
            this.wa.fontName = this.ea.options.defaultFont;
            this.wa.fontSize = this.ea.options.defaultFontsize;
            this.wa.smoothness = 0.3;
            this.wa.textFillStyle = this.ea.options.defaultTextFillStyle;
            this.uc = this.ea.get("defaultBrushWidth");
            a = Ld(this);
            this.Oa = -a.x;
            this.Ja = -a.y;
            X(this);
            this.ia.va(this.ca, this.ub);
            "none" !== this.Xb ? this.zoom(this.Xb) : (this.zoom(this.ea.get("defaultZoom")), this.ha())
        },
        ne: function (a, b) {
            var c = !1;
            switch (a) {
            case "defaultBrushColour":
                this.Nb = b;
                break;
            case "defaultFillStyle":
                this.Cb = this.wa.fillStyle = b;
                break;
            case "defaultStrokeStyle":
                this.Db = b;
                this.wa.strokeStyle = b;
                break;
            case "defaultLineWidth":
                this.wa.lineWidth = b;
                break;
            case "defaultFont":
                this.wa.fontName = b;
                break;
            case "defaultFontSize":
                this.wa.fontSize = b;
                break;
            case "defaultTextFillStyle":
                this.wa.textFillStyle = b;
                break;
            case "defaultBrushWidth":
                this.uc = b;
                break;
            case "snap":
            case "background":
                Wd(this);
                c = !0;
                break;
            case "symmetry":
                c = !0
            }
            c && this.ha()
        },
        re: function (a) {
            this.ub.re(a)
        },
        zoom: function (a) {
            var b, c = this.canvas.width - 20;
            this.Xb = "none";
            if (Va(a)) this.scale = a;
            else if ("none" === a || this.ia.empty()) this.scale = 1, this.Ja = this.Oa = 0;
            else if ("page" === a) {
                b = Ld(this);
                var d = c = 0;
                this.scale = Math.min(this.canvas.width / b.width, this.canvas.height / b.height);
                this.scale * b.width < this.canvas.width && (c += (this.canvas.width - this.scale * b.width) / 2 / this.scale);
                this.scale * b.height < this.canvas.height && (d += (this.canvas.height - this.scale * b.height) / 2 / this.scale);
                this.Oa = -(b.x - c) * this.scale;
                this.Ja = -(b.y - d) * this.scale;
                this.log("RECT=%s scale=%s tx=%s", b, this.scale, this.Oa);
                this.Xb = a
            } else "width" === a && (b = Ld(this), this.scale = c / b.width, this.Oa = -b.x * this.scale, this.Ja = -b.y * this.scale, this.log("RECT=%s scale=%s tx=%s ty=%s", b, this.scale, this.Oa, this.Ja), this.Xb = a);
            X(this);
            this.ha()
        },
        Ib: function (a, b) {
            var c;
            if (this.ta.bb) {
                var d = 0,
                    e = 0,
                    f = this.ea.get("nudge");
                switch (a) {
                case "right":
                    d = f;
                    break;
                case "left":
                    d = -f;
                    break;
                case "down":
                    e = f;
                    break;
                case "up":
                    e = -f;
                    break;
                case "enter":
                    this.na.cb ? (this.ta.Ma = !1, c = "click") : (this.ta.Ma = !this.ta.Ma, c = this.ta.Ma ? "mousedown" : "mouseup")
                }
                if (d || e) this.ta.x += d, this.ta.x = Math.max(this.ta.x, 0), this.ta.x = Math.min(this.canvas.width, this.ta.x), this.ta.y += e, this.ta.y = Math.max(this.ta.y, 0), this.ta.y = Math.min(this.canvas.height, this.ta.y), this.ha(), c = "mousemove";
                c ? (b.preventDefault(), b.stopPropagation(), this.ha(), e = $(this.canvas).offset(), d = this.ta.x + e.left, e = this.ta.y + e.top, this.log("Simulate a %s at (%s,%s)", c, d, e), f = document.createEvent("MouseEvents"), f.initMouseEvent(c, !0, !0, window, 0, d, e, d, e, !1, !1, !1, !1, this.ta.Ma ? 1 : 0, null), this.canvas.dispatchEvent(f), c = !0) : c = !1
            } else c = !1;
            if (!c) {
                this.na.Ib && this.na.Ib(a, b);
                switch (a) {
                case "next-page":
                    this.lb(this.ia.nb + 1);
                    break;
                case "previous-page":
                    this.lb(this.ia.nb - 1);
                    break;
                case "zoom-to-page":
                    this.zoom("page");
                    break;
                case "zoom-to-width":
                    this.zoom("width")
                }
                b.preventDefault();
                b.stopPropagation()
            }
        },
        Mb: function (a) {
            this.ta.bb = !0;
            this.ta.Ma = !1;
            this.ta.Ud = a;
            this.log("Showing keyboard cursor, caret=%s", a);
            this.ha()
        },
        Gf: function () {
            return this.ta.bb
        },
        Ta: function (a) {
            var b = this.ea.get("snap"),
                c;
            0 < b ? (c = Math.round(a.x / b) * b, a = Math.round(a.y / b) * b) : (c = a.x, a = a.y);
            return new u(c, a)
        },
        setProperty: function (a, b) {
            var c = Y(this);
            this.wa[a] = b;
            c.length && this.qa([new Vc(c, a, b)]);
            0 < this.selection.length && "lineWidth" === a && "BrushNode" === this.selection[0].type() ? this.uc = b : "textFillStyle" === a && (this.wa.textFillStyle = b)
        },
        group: function () {
            var a = Y(this);
            a.length && this.qa([new td(a)])
        },
        selectNodes: function (a) {
            O(this);
            for (var b = 0; b < a.length; b++) a[b].la("locked") || "PageNode" === a[b].type() || cd(this, a[b]);
            Fc(this)
        },
        qa: function (a, b) {
            if (this.ea.get("readOnly")) this.log("readOnly mode: Ignoring change.");
            else {
                var c = this.ia.qa(a, b);
                this.ia.va(this.ca, this.ub);
                if (c.length) this.selectNodes(c);
                else if (this.selection.length || this.Fa) {
                    c = 0;
                    this.kb += 1;
                    for (var d = 0; d < this.selection.length; d++) d !== c && (this.selection[c] = this.selection[d]), this.selection[c].id in this.ia.oa && (this.selection[c].kb = this.kb, c++);
                    this.selection.length !== c && (this.selection.length = c);
                    0 === this.selection.length ? O(this) : sc(this);
                    !this.Fa || this.Fa.id in this.ia.oa || (this.Fa = null)
                }
                this.ha();
                this.ga.emit("document-changed")
            }
        },
        update: function (a) {
            if (this.ia.va(this.ca, this.ub) || a) sc(this), this.ha()
        },
        qe: function (a) {
            a ? (this.log("Setting a custom background function."), this.Qd = a) : this.log("Clearing custom background function.")
        },
        ha: function (a) {
            this.ae = a;
            if (!this.be) {
                this.be = !0;
                var b = this;
                this.requestAnimationFrame.call(window, function () {
                    b.be = !1;
                    var a, d, e, f;
                    a = (0 - b.Oa) / b.scale;
                    d = (0 - b.Ja) / b.scale;
                    e = (b.canvas.width - b.Oa) / b.scale;
                    f = (b.canvas.height - b.Ja) / b.scale;
                    b.ca.setTransform(1, 0, 0, 1, 0, 0);
                    b.Fd ? (b.ca.fillStyle = "#808080", b.ca.fillRect(0, 0, b.canvas.width, b.canvas.height)) : b.ca.clearRect(0, 0, b.canvas.width, b.canvas.height);
                    b.ca.translate(b.Oa, b.Ja);
                    b.ca.scale(b.scale, b.scale);
                    Xd(b, b.ca, e, f);
                    if (b.Fd) {
                        var g = b.ca,
                            h = Yd(b.ia);
                        g.beginPath();
                        g.fillStyle = "#ffffff";
                        g.shadowOffsetX = 3 / b.scale;
                        g.shadowOffsetY = 3 / b.scale;
                        g.shadowBlur = 5 / b.scale;
                        g.shadowColor = "rgba(0,0,0,1.0)";
                        g.rect(0, 0, h.width, h.height);
                        g.fill();
                        g.shadowColor = "rgba(0,0,0,0.0)";
                        g.shadowBlur = 0;
                        g.shadowOffsetX = 0;
                        g.shadowOffsetY = 0
                    }
                    b.Qd && (b.ca.save(), b.Qd(b.ca, a, d, e, f), b.ca.restore());
                    a = b.ea.options.symmetry;
                    if (1 < a) {
                        d = 2 * Math.PI / a;
                        e = b.Ta(new u(b.canvas.width / 2, b.canvas.height / 2));
                        var k;
                        a & 1 && (k = new Wb(d, e.x, e.y));
                        for (b.ca.save(); d < 2 * Math.PI - 1E-8;) 0 === (a & 1) && (k = new Xb(d, e.x, e.y)), b.ca.transform(k.m11, k.m21, k.m12, k.m22, k.xa, k.ya), b.ia.ha(b.ca), d += 2 * Math.PI / a;
                        b.ca.setTransform(1, 0, 0, 1, 0, 0);
                        b.ca.fillStyle = "rgba(255,255,255,0.3)";
                        b.ca.fillRect(0, 0, b.canvas.width, b.canvas.height);
                        b.ca.restore()
                    }
                    b.ia.ha(b.ca);
                    0 < b.selection.length && (b.ca.save(), k = b.lc.apply(b.sa.x, b.sa.y), a = b.lc.apply(b.sa.x + b.sa.width, b.sa.y), d = b.lc.apply(b.sa.x + b.sa.width, b.sa.y + b.sa.height), e = b.lc.apply(b.sa.x, b.sa.y + b.sa.height), f = b.$c / b.scale, b.Lb && (b.ca.strokeStyle = "#888888", b.ca.lineWidth = 1 / b.scale, b.ca.beginPath(), Zd(b, b.ca, k.x, k.y, a.x, a.y), Zd(b, b.ca, a.x, a.y, d.x, d.y), Zd(b, b.ca, d.x, d.y, e.x, e.y), Zd(b, b.ca, e.x, e.y, k.x, k.y), b.ca.stroke(), b.ca.strokeStyle = "#000000", b.ca.strokeRect(a.x - f, a.y - f, 2 * f, 2 * f), b.ca.strokeRect(k.x - f, k.y - f, 2 * f, 2 * f), b.ca.strokeRect(e.x - f, e.y - f, 2 * f, 2 * f), b.ca.strokeRect(d.x - f, d.y - f, 2 * f, 2 * f)), k = new u(b.Ac, b.Bc), b.ce && (b.ca.beginPath(), b.ca.strokeStyle = "#008000", b.ca.lineWidth = 3 / b.scale, b.ca.moveTo(k.x, k.y), b.ca.arc(k.x, k.y, 6 / b.scale, 0, 1.5 * Math.PI, !1), b.ca.stroke()));
                    if (b.Fa) {
                        k = b.Fa;
                        a = b.ca;
                        d = 1 / b.scale;
                        a.save();
                        a.lineWidth = 1 * d;
                        a.strokeStyle = "#0050B7";
                        d *= 4;
                        a.strokeRect(k.origin.x - d, k.origin.y - d, 2 * d, 2 * d);
                        for (e = 1; e < k.dd; e++) a.strokeRect(k.pa[e].da.x - d, k.pa[e].da.y - d, 2 * d, 2 * d);
                        a.restore()
                    }
                    b.fe && (b.ca.save(), b.ca.font = "10px Arial", b.ca.fillStyle = "#000000", b.ca.textBaseline = "top", b.ca.fillText(b.fe, 0, 0), b.ca.restore());
                    k = b.ca;
                    b.ta.bb && (a = b.ta.x, d = b.ta.y, k.globalCompositeOperation = "xor", k.beginPath(), b.ta.Ud ? (k.moveTo(a - 3, d - 10), k.lineTo(a + 3, d - 10), k.moveTo(a - 3, d + 10), k.lineTo(a + 3, d + 10), k.moveTo(a, d - 10), k.lineTo(a, d + 10)) : (k.moveTo(a, d - 3), k.lineTo(a, d - 15), k.moveTo(a, d + 3), k.lineTo(a, d + 15), k.moveTo(a - 3, d), k.lineTo(a - 15, d), k.moveTo(a + 3, d), k.lineTo(a + 15, d)), b.ta.Ma && b.ca.arc(a, d, 8, 0, 2 * Math.PI, !1), k.lineWidth = 2, k.strokeStyle = "#000000", k.stroke(), k.globalCompositeOperation = "source-over");
                    0 < b.selection.length && b.mc && (b.ca.setTransform(1, 0, 0, 1, 0, 0), b.ca.drawImage(b.mc, b.canvas.width - b.mc.width - jc(b.qb), 0));
                    b.na.We && b.na.We(b.ca);
                    b.ae && b.ae();
                    b.ca.setTransform(1, 0, 0, 1, 0, 0);
                    b.ca.beginPath();
                    b.ca.font = "20px Arial";
                    e = b.ca.measureText(Md).width;
                    k = 0;//b.canvas.width / e;
                    b.ca.scale(k, k);
                    b.ca.textBaseline = "top";
                    b.ca.lineWidth = 0;//4 / k;
                    b.ca.strokeStyle = "rgba(255, 0, 0, 0.1)";
                    b.ca[Pd](Md, 0, 0)
                })
            }
        },
        Ua: function () {
            this.ia.rc() && (this.ia.Ua(), this.ia.va(this.ca, this.ub), $d(this), sc(this), this.ha(), this.ga.emit("document-changed"))
        },
        Pa: function () {
            this.ia.qc() && (this.ia.Pa(), this.ia.va(this.ca, this.ub), $d(this), sc(this), this.ha(), this.ga.emit("document-changed"))
        },
        copy: function () {
            var a = pc(this);
            if (0 !== a.length) {
                var b = this.ia,
                    c, d, e, f, g;
                c = [];
                d = 0;
                g = ae(b, a);
                e = 0;
                for (f = g.length; e < f; e++) a = g[e], d = be(b, a, c, d);
                b = JSON.stringify(c);
                dd() ? window.localStorage.setItem("clipboard", b) : ed.clipboard = b;
                this.log("Reset paste offset to 0");
                this.Fc = 0
            }
        },
        duplicate: function () {
            var a = Y(this);
            0 < a.length && this.qa([new wd(a, 10)])
        },
        vd: function () {
            var a = [],
                b;
            b = dd() ? window.localStorage.getItem("clipboard") : ed.clipboard;
            b = ce(this.ia, b, a);
            var c = this.ea.get("pasteOffset");
            0 !== c && (this.Fc += c, this.log("Using paste offset %s", this.Fc), c = new K(this.Fc, this.Fc), b.push(new N(a, c, c.inverse())));
            this.qa(b);
            this.update()
        },
        Vc: function (a, b) {
            this.log("Set document size %s,%s", a, b);
            this.ia.setProperty("width", a);
            this.ia.setProperty("height", b);
            X(this);
            de(this)
        },
        yc: function () {
            return ka(this.canvas)
        },
        Hb: function (a, b) {
            this.na.Hb ? (this.log("Simulating click of colour %s", a), this.na.Hb({
                Ra: a,
                button: b ? 2 : 1
            })) : this.log("A colour is not needed for this tool.")
        },
        lb: function (a) {
            this.ia.lb(a) && (O(this), Fc(this), this.ha(), this.rb.emit("set-page", a))
        },
        te: function (a) {
            this.Fd = a;
            a = Ld(this);
            this.Oa = -a.x;
            this.Ja = -a.y;
            X(this);
            this.ha()
        }
    };

    function ee(a, b) {
        var c, d;
        c = a.ia.Da;
        d = a.Ta(new u(100, 100));
        d = new K(d.x, d.y);
        a.qa([new D("ImageNode", {
            url: b,
            layer: a.Ka
        }), new N([c], d, d.inverse())]);
        return E(a)
    }
    function lb(a) {
        var b, c;
        c = a.ea.get("snap");
        b = 50;
        0 < c && (b = Math.round(b / c) * c);
        a.qa([new D("PathNode", {
            commands: pd(a.Ta(new u(150, 150)), b),
            fillStyle: a.Cb,
            strokeStyle: a.Db,
            seed: Math.round(65535 * Math.random()),
            lineWidth: a.wa.lineWidth,
            sloppiness: a.wa.sloppiness,
            layer: a.Ka
        })]);
        E(a)
    }

    function qb(a, b) {
        var c, d, e, f, g;
        e = new Ec;
        f = a.Ta(new u(100, 100));
        g = a.Ta(new u(200, 100));
        d = a.Ta(new u(200, 200));
        c = a.Ta(new u(100, 200));
        e.moveTo(f.x, f.y);
        e.lineTo(g.x, g.y);
        e.lineTo(d.x, d.y);
        e.lineTo(c.x, c.y);
        e.lineTo(f.x, f.y);
        e.close();
        a.log("Create an item on layer %s", a.Ka);
        a.qa([new D("PathNode", {
            commands: e.toArray(),
            fillStyle: a.Cb,
            strokeStyle: a.Db,
            seed: Math.round(65535 * Math.random()),
            lineWidth: a.wa.lineWidth,
            sloppiness: a.wa.sloppiness,
            layer: a.Ka,
            roundRadius: b
        })]);
        E(a)
    }

    function Kd(a, b, c) {
        var d = a.ea.get("nudge");
        b *= d / a.scale;
        c *= d / a.scale;
        a.log("Nudge selection by %s, %s", b, c);
        d = Y(a);
        d.length && (b = new K(b, c), a.qa([new N(d, b, b.inverse())]));
        return 0 < d.length
    }

    function X(a) {
        var b = Ld(a),
            c = b.width,
            d = b.height,
            e = a.canvas.width / a.scale,
            f = a.canvas.height / a.scale;
        if (f >= d) a.qb.hide();
        else {
            a.qb.show();
            var g = a.qb,
                h = b.y,
                k = b.bottom(),
                l = -a.Ja / a.scale;
            g.Fb = h;
            g.Eb = k - h;
            g.Jd = f;
            g.position = l;
            g.va();
            g.ha()
        }
        e >= c ? a.Gb.hide() : (a.Gb.show(), g = a.Gb, h = b.x, b = b.right(), k = -a.Oa / a.scale, g.Fb = h, g.Eb = b - h, g.Jd = e, g.position = k, g.va(), g.ha());
        e >= c && f >= d || (e >= c ? gc(a.qb, 20, a.canvas.height) : f >= d ? gc(a.Gb, a.canvas.width, 20) : (gc(a.qb, 20, a.canvas.height - 20), gc(a.Gb, a.canvas.width - 20, 20)))
    }

    function Ld(a) {
        a.Fd ? (a = Yd(a.ia), a = new I(0, 0, a.width, a.height), Sb(a, 20, 20)) : a = db(a.ia);
        return a
    }
    function jb(a) {
        a.ea.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (F(a, new pb(a, "arrow")), a.ga.emit("arrow-tool"))
    }
    function mb(a) {
        a.ea.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (F(a, new pb(a, "curves")), a.ga.emit("curve-tool"))
    }

    function ob(a, b, c) {
        b = b || a.Nb;
        c = c || a.uc;
        a.ea.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (F(a, new Dc(a, a.na, b, c, "shapes")), a.ga.emit("shapebrush-tool"))
    }
    function kb(a, b, c) {
        b = b || a.Nb;
        c = c || a.uc;
        a.ea.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (F(a, new Dc(a, a.na, b, c, "brush")), a.ga.emit("brush-tool"))
    }
    function nb(a) {
        a.ea.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (F(a, new pb(a, "lines")), a.ga.emit("line-tool"))
    }

    function rb(a) {
        a.ea.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (F(a, new Rc(a)), a.ga.emit("text-tool"))
    }
    function F(a, b) {
        a.na && a.na.Rc && a.na.Rc();
        a.na = b;
        b.wc && b.wc()
    }
    function E(a) {
        F(a, new Hd(a));
        a.ga.emit("pick-tool")
    }
    function Ed(a, b) {
        a.fe = b ? a.language.get(b) : null
    }

    function Id(a, b, c) {
        if (a.selection.length) {
            var d = a.ze / a.scale;
            if (b >= a.sa.x - d && b < a.sa.x + d) {
                if (c >= a.sa.y - d && c < a.sa.y + d && a.Lb) return a.Be;
                if (c >= a.sa.y + a.sa.height - d && c < a.sa.y + a.sa.height + d && a.Lb) return a.De
            } else if (b >= a.sa.x + a.sa.width - d && b < a.sa.x + a.sa.width + d) {
                if (c >= a.sa.y - d && c < a.sa.y + d && a.Lb) return a.Ae;
                if (c >= a.sa.y + a.sa.height - d && c < a.sa.y + a.sa.height + d && a.Lb) return a.Ce
            }
            if (b >= a.Ac - d && b < a.Ac + d && c >= a.Bc - d && c < a.Bc + d) return a.nc
        }
        return null
    }
    function de(a) {
        "page" !== a.Xb && "width" !== a.Xb || a.zoom(a.Xb)
    }

    function Zd(a, b, c, d, e, f) {
        a = 3 / a.scale;
        b.moveTo(c, d);
        var g = e - c,
            h = f - d;
        a = Math.floor(Math.sqrt(g * g + h * h) / a);
        for (var g = g / a, h = h / a, k = 0; k++ < a;) c += g, d += h, 0 === k % 2 ? b.moveTo(c, d) : b.lineTo(c, d);
        0 === k % 2 ? b.moveTo(e, f) : b.lineTo(e, f)
    }
    function Xd(a, b, c, d) {
        a.background ? (b.fillStyle = a.ca.createPattern(a.background, "repeat"), b.fillRect(0, 0, c, d)) : "G_vmlCanvasManager" in window && (b.fillStyle = "rgba(0, 0, 0, 0.0)", b.fillRect(0, 0, c, d))
    }

    function Wd(a) {
        var b = a.ea.get("snap"),
            c = null,
            d, e;
        if ("grid" === a.ea.get("background")) {
            var b = a.ea.get("gridSpacing"),
                f = 10 * b,
                c = ha(document.body);
            c.width = f;
            c.height = f;
            d = c.getContext("2d");
            d.beginPath();
            for (e = 0; e < f; e += b) e % f && (d.moveTo(e + 0.5, 0), d.lineTo(e + 0.5, f));
            for (e = 0; e < f; e += b) e % f && (d.moveTo(0, e + 0.5), d.lineTo(f, e + 0.5));
            d.strokeStyle = "#cccccc";
            d.lineWidth = 1;
            d.stroke();
            d.beginPath();
            for (e = 0; e <= f; e += f) d.moveTo(e, 0), d.lineTo(e, f);
            for (e = 0; e <= f; e += f) d.moveTo(0, e + 0.5), d.lineTo(f, e + 0.5);
            d.lineWidth = 2;
            d.stroke()
        } else 0 < b && (c = ha(document.body), c.width = b, c.height = b, d = c.getContext("2d"), d.beginPath(), d.moveTo(0, 0), d.arc(0, 0, 3, 0, 2 * Math.PI, !1), d.moveTo(b, 0), d.arc(b, 0, 3, 0, 2 * Math.PI, !1), d.moveTo(b, b), d.arc(b, b, 3, 0, 2 * Math.PI, !1), d.moveTo(0, b), d.arc(0, b, 3, 0, 2 * Math.PI, !1), d.fillStyle = "#c0c0c0", d.fill());
        c && document.body.removeChild(c);
        a.background = c
    }
    function Y(a) {
        for (var b = [], c = ae(a.ia, pc(a)), d = 0; d < c.length; d++) a.log("Selected id=%s", c[d].id), b.push(c[d].id);
        return b
    }

    function pc(a) {
        var b = a.selection.concat();
        a.Fa && b.push(a.Fa);
        a.log("editNode=%s", a.Fa ? a.Fa.id : "none");
        for (var c = 0; c < b.length; c++) a.log("Selected node=%s", b[c].id);
        return b
    }
    function $d(a) {
        for (var b = 0, c = 0; c < a.selection.length; c++) c !== b && (a.selection[b] = a.selection[c]), a.selection[b].id in a.ia.oa && (b += 1);
        a.selection.length !== b && (a.selection.length = b)
    }

    function sc(a) {
        a.Lb = !0;
        if (0 !== a.selection.length) {
            a.sa = a.selection[0].ec().clone();
            a.selection[0].la("lockSize") && (a.Lb = !1);
            for (var b = 1; b < a.selection.length; b++) Ub(a.sa, a.selection[b].ec()), a.selection[b].la("lockSize") && (a.Lb = !1);
            a.ef = 1 === a.selection.length ? a.selection[0].Le() : new L(a.sa);
            b = a.selection[0].la("rotateHandle");
            1 === a.selection.length && b ? (b = qc(a.selection[0]).apply(b[0], b[1]), a.Ac = b.x, a.Bc = b.y) : (a.Ac = a.sa.x + a.sa.width - 30 / a.scale, a.Bc = a.sa.y)
        }
    }

    function Fc(a) {
        sc(a);
        if (a.jb) {
            var b = a.jb;
            a = a.selection;
            b.action = null;
            b.Ad.length = 0;
            b.Bd = {};
            b.oa = a.concat();
            for (var c = !1, d = 0; d < a.length; d++) {
                var e = a[d];
                vc(e) && (c = !0);
                var f = e.aa,
                    g;
                for (g in f) if (f.hasOwnProperty(g)) {
                    var h = b,
                        k = g,
                        l = e,
                        m = void 0,
                        m = h.ea;
                    k in h.Bd ? (m = h.Bd[k], m.value !== l.la(k) && (m.value = null)) : "locked" === k || "points" === k || !0 === l.la("closed") && ("arrowSize" === k || "arrowStyle" === k || "doubleArrow" === k) || !1 === l.la("closed") && ("fontName" === k || "fontSize" === k || "textFillStyle" === k || "text" === k || "fillStyle" === k) || "ImageNode" === l.type() && ("fillStyle" === k || "strokeStyle" === k || "lineWidth" === k || "shadow" === k) || "BrushNode" === l.type() && "fillStyle" === k || "MathNode" === l.type() && ("fillStyle" === k || "strokeStyle" === k || "lineWidth" === k) || "TextNode" === l.type() && "fillStyle" === k || "lockSize" === k || "rotateAround" === k || "layer" === k || 0 === k.indexOf("cell-") || "fontName" === k && !m.get("showFontNameProperty") || "fontSize" === k && !m.get("showFontSizeProperty") || "smoothness" === k && !m.get("showSmoothnessProperty") || "sloppiness" === k && !m.get("showSloppinessProperty") || (m = {
                        oe: fe(h, l, k),
                        value: l.la(k)
                    }, m.oe.display && 0 === m.oe.display.indexOf("Display-") || (h.Ad.push(m), h.Bd[k] = m))
                }
            }
            ge(b);
            if (b.ea.get("showKeyboardHelp")) for (g = $("<div>").addClass("keydiv"), g.css("font-size", "8pt"), g.css("color", "#909090"), g.css("font-weight", "normal"), $(b.$).append(g), d = b.language.fn(), g.append("<h1>" + d("keyboard") + "</h1>"), b = [{
                key: "C",
                description: d("draw-curves")
            }, {
                key: "L",
                description: d("draw-lines")
            }], 0 < a.length && b.push({
                key: d("del-key"),
                description: d("delete-selection")
            }, {
                key: "Ctrl+D",
                description: d("duplicate-selection")
            }, {
                key: d("page-up-key"),
                description: d("move-selection-closer")
            }, {
                key: d("page-down-key"),
                description: d("move-selection-away")
            }), 1 < a.length && b.push({
                key: "Ctrl+G",
                description: d("group-selection")
            }), c && b.push({
                key: "Ctrl+Shift+G",
                description: d("break-apart-group")
            }), b.push({
                key: "+",
                description: d("zoom-in")
            }), b.push({
                key: "-",
                description: d("zoom-out")
            }), b.push({
                key: d("arrow-keys"),
                description: d("move-while-zoomed")
            }), a = 0; a < b.length; a++) c = $("<a>").text(b[a].key).addClass("key"), c.css("background", "#d0d0d0"), c.css("border-left", "1px solid #808080"), c.css("border-right", "1px solid #e0e0e0"), c.css("border-top", "1px solid #808080"), c.css("border-bottom", "1px solid #e0e0e0"), c.css("padding-left", "0.5em"), c.css("padding-right", "0.5em"), c.css("margin-right", "1em"), c.css("color", "#4fa0d3"), c.css("font-weight", "bold"), c = $("<p>").append(c), c[0].appendChild(document.createTextNode(b[a].description)), g.append(c)
        }
    }

    function cd(a, b) {
        a.Fa = null;
        if (b.kb !== a.kb && xc(b) === a.Ka) {
            a.selection.push(b);
            b.kb = a.kb;
            if (vc(b)) {
                for (var c = b.parent, d = 0; d < c.children.length; d++) cd(a, c.children[d]);
                cd(a, c)
            }
            b.children && 0 < b.children.length && cd(a, b.children[0])
        }
    }
    function O(a) {
        0 < a.selection.length && (a.kb += 1, a.selection.length = 0, a.log("Clear selection. selectGeneration=%s", a.kb));
        a.Fa = null
    }
    function Vd(a) {
        var b = Y(a);
        b.length && a.qa([new cb(b)])
    }

    function Uc(a) {
        a.ta.bb = !0;
        a.ta.Ud = !1;
        if (0 < a.selection.length) {
            a.log("showKeyboardCursorAndStartMoving()");
            a.ta.Ma = !0;
            var b = Pb(a.sa);
            a.ta.x = b.x;
            a.ta.y = b.y;
            E(a);
            F(a, new lc(a, a.na, null, !1, b.x - 4, b.y - 4))
        }
        a.ha()
    }

    function Ud(a) {
        var b = Jd(a),
            c = new Date;
        $(a.canvas).bind("touchstart", function (b) {
            if (a.na.Za) {
                if (300 < (new Date).getTime() - c.getTime()) a.na.Za(b.originalEvent);
                else if (a.na.Tb) {
                    var d = ad(a, b.originalEvent.touches[0]);
                    a.na.Tb(d.x, d.y)
                }
                b.stopPropagation();
                b.preventDefault();
                c = new Date
            }
        });
        $(a.canvas).bind("touchmove", function (b) {
            a.na.Za && (a.na.Za(b.originalEvent), b.stopPropagation(), b.preventDefault())
        });
        $(a.canvas).bind("touchend", function (b) {
            a.na.Za && (a.na.Za(b.originalEvent), b.stopPropagation(), b.preventDefault())
        });
        $(a.canvas).bind("gesturestart", function (b) {
            a.log("GestureStart");
            a.na.zc && (a.na.zc(b.originalEvent), b.stopPropagation(), b.preventDefault())
        });
        $(a.canvas).bind("gesturechange", function (b) {
            a.log("GestureChange");
            a.na.zc && (a.na.zc(b.originalEvent), b.stopPropagation(), b.preventDefault())
        });
        $(a.canvas).bind("gestureend", function (b) {
            a.log("GestureEnd");
            a.na.zc && (a.na.zc(b.originalEvent), b.stopPropagation(), b.preventDefault())
        });
        $(a.canvas).mousemove(function (c) {
            if (a.na.ab) {
                var d = $(a.canvas).offset();
                a.na.ab((c.pageX - d.left - b - a.Oa) / a.scale, (c.pageY - d.top - b - a.Ja) / a.scale, c)
            }
            c.preventDefault()
        });
        $(a.canvas).mousedown(function (c) {
            var d = $(a.canvas).offset();
            a.na.$a && a.na.$a((c.pageX - d.left - b - a.Oa) / a.scale, (c.pageY - d.top - b - a.Ja) / a.scale, c);
            c.stopPropagation();
            c.preventDefault()
        });
        $(a.canvas).mouseup(function (c) {
            var d = $(a.canvas).offset();
            a.na.ib && a.na.ib((c.pageX - d.left - b - a.Oa) / a.scale, (c.pageY - d.top - b - a.Ja) / a.scale, c);
            c.stopPropagation();
            c.preventDefault()
        });
        $(a.canvas).click(function (c) {
            var d = $(a.canvas).offset();
            a.na.cb && a.na.cb((c.pageX - d.left - b - a.Oa) / a.scale, (c.pageY - d.top - b - a.Ja) / a.scale);
            c.stopPropagation();
            c.preventDefault()
        });
        $(a.canvas).dblclick(function (c) {
            var d = $(a.canvas).offset();
            if (a.na.Tb || a.na.cb) {
                var g = (c.pageX - d.left - b - a.Oa) / a.scale,
                    d = (c.pageY - d.top - b - a.Ja) / a.scale;
                ja() && a.na.cb && (a.log("Insert false mouse click for IE"), a.na.cb(g, d));
                a.na.Tb && a.na.Tb(g, d)
            }
            c.stopPropagation();
            c.preventDefault()
        });
        $(a.canvas).bind("mouseenter", function (b) {
            a.log("Supress %s", b.type);
            b.stopPropagation();
            b.preventDefault()
        });
        $(a.canvas).bind("mouseleave", function (b) {
            a.log("Supress %s", b.type);
            b.stopPropagation();
            b.preventDefault()
        });
        $(a.canvas).bind("mouseover", function (b) {
            a.log("Supress %s", b.type);
            b.stopPropagation();
            b.preventDefault()
        });
        $(a.canvas).bind("mouseout", function (b) {
            a.log("Supress %s", b.type);
            b.stopPropagation();
            b.preventDefault()
        });
        !window.parent && a.ea.get("setFocus") && $(a.canvas).focus();
        a.mb.bind("colour", function (b) {
            a.na.Hb && a.na.Hb(b)
        });
        var d = "mousewheel";
        "onwheel" in document.createElement("div") && (d = "wheel");
        a.log("Binding to '%s' for mouse wheel", d);
        $(a.canvas).bind(d, function (b) {
            if ("block" === a.qb.canvas.style.display) {
                var c = Ld(a);
                b = b.originalEvent.wheelDelta || -40 * b.originalEvent.deltaY;
                var d = b / 120 * 32;
                a.Ja = -120 >= b ? Math.max(a.Ja + d, -(c.bottom() * a.scale - a.canvas.height)) : Math.min(a.Ja + d, -c.y * a.scale);
                X(a);
                a.ha()
            }
        })
    }
    function ad(a, b) {
        return M(a, b.pageX, b.pageY)
    }
    function Tc(a, b, c) {
        var d = Jd(a),
            e = $(a.canvas).offset();
        return new u(b * a.scale + a.Oa + e.left + d, c * a.scale + a.Ja + e.top + d)
    }

    function M(a, b, c) {
        var d = Jd(a),
            e = $(a.canvas).offset();
        return a.Ta(new u((b - e.left - d - a.Oa) / a.scale, (c - e.top - d - a.Ja) / a.scale))
    }
    function he(a, b, c) {
        a.wa[b] = c;
        "fillStyle" === b ? a.Cb = c : "strokeStyle" === b && (a.Db = c)
    }
    function Jd(a) {
        return parseInt($(a.canvas).css("border-left-width"), 10) || 0
    };
    var ie = Function("return this")();
    ie.JSON || (ie.JSON = {});
    (function () {
        function a(a) {
            return 10 > a ? "0" + a : a
        }
        function b(a) {
            e.lastIndex = 0;
            return e.test(a) ? '"' + a.replace(e, function (a) {
                var b = h[a];
                return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }
        function c(a, d) {
            var e, h, r, v, w = f,
                C, y = d[a];
            y && "object" === typeof y && "function" === typeof y.toJSON && (y = y.toJSON(a));
            "function" === typeof k && (y = k.call(d, a, y));
            switch (typeof y) {
            case "string":
                return b(y);
            case "number":
                return isFinite(y) ? String(y) : "null";
            case "boolean":
            case "null":
                return String(y);
            case "object":
                if (!y) return "null";
                f += g;
                C = [];
                if ("[object Array]" === Object.prototype.toString.apply(y)) {
                    v = y.length;
                    for (e = 0; e < v; e += 1) C[e] = c(e, y) || "null";
                    r = 0 === C.length ? "[]" : f ? "[\n" + f + C.join(",\n" + f) + "\n" + w + "]" : "[" + C.join(",") + "]";
                    f = w;
                    return r
                }
                if (k && "object" === typeof k) for (v = k.length, e = 0; e < v; e += 1) h = k[e], "string" === typeof h && (r = c(h, y)) && C.push(b(h) + (f ? ": " : ":") + r);
                else for (h in y) Object.hasOwnProperty.call(y, h) && (r = c(h, y)) && C.push(b(h) + (f ? ": " : ":") + r);
                r = 0 === C.length ? "{}" : f ? "{\n" + f + C.join(",\n" + f) + "\n" + w + "}" : "{" + C.join(",") + "}";
                f = w;
                return r
            }
        }
        "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : ""
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return "" + this.valueOf()
        });
        var d = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            f, g, h = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            k;
        "function" !== typeof ie.JSON.stringify && (ie.JSON.stringify = function (a, b, d) {
            var e;
            g = f = "";
            if ("number" === typeof d) for (e = 0; e < d; e += 1) g += " ";
            else "string" === typeof d && (g = d);
            if ((k = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) throw Error("JSON.stringify");
            return c("", {
                "": a
            })
        });
        "function" !== typeof ie.JSON.parse && (ie.JSON.parse = function (a, b) {
            function c(a, d) {
                var e, f, g = a[d];
                if (g && "object" === typeof g) for (e in g) Object.hasOwnProperty.call(g, e) && (f = c(g, e), void 0 !== f ? g[e] = f : delete g[e]);
                return b.call(a, d, g)
            }
            var e;
            a = String(a);
            d.lastIndex = 0;
            d.test(a) && (a = a.replace(d, function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" === typeof b ? c({
                "": e
            }, "") : e;
            throw new SyntaxError("JSON.parse");
        })
    })();

    function je() {
        var a = this;
        z.call(this);
        window.addEventListener("message", function (b) {
            ke(a, b)
        }, !1);
        window.parent.postMessage('{"event": "ready"}', "*")
    }
    je.prototype = {
        log: s("Api")
    };

    function ke(a, b) {
        function c(a) {
            "ticket" in d && (a = {
                ticket: d.ticket,
                args: a
            }, window.parent.postMessage(window.JSON.stringify(a), "*"))
        }
        var d;
        try {
            d = window.JSON.parse(b.data)
        } catch (e) {
            a.log("Error parsing %s from %s", b.data, b.origin);
            return
        }
        a.log("Received %s", b.data);
        if (d["function"] in a.Ha) for (var f = a.Ha[d["function"]], g = 0; g < f.length; g++)(0, f[g])(d.args, c)
    }
    je.prototype = $.extend({}, z.prototype, je.prototype);

    function le(a) {
        z.apply(this, arguments);
        this.Ea = new Ya;
        this.oa = {};
        this.jc = new Wa;
        this.ld = this.Ke = !0;
        this.Da = 0;
        this.ie = [];
        this.root = new Kc(this.Da++);
        this.oa[this.root.id] = this.root;
        this.bf = this.Ea.next;
        this.aa = {};
        this.ee = new Wa;
        this.nf = new Wa;
        this.pb = [];
        this.nb = 0;
        a || (me(this, this.root), this.lb(this.Oc(0)))
    }
    le.prototype = {
        log: s("DOC"),
        empty: function () {
            return 0 === this.root.children.length
        },
        Zd: function () {
            return this.bf !== this.Ea.next
        },
        qa: function (a, b) {
            this.ie.length = 0;
            if (b) {
                this.log("Performing actions without adding to undo stack");
                for (var c = 0; c < a.length; c++) a[c].Pa(this)
            } else this.Ea.qa(this, a);
            return this.ie
        },
        Ua: function () {
            this.Ea.Ua(this)
        },
        Pa: function () {
            this.Ea.Pa(this)
        },
        rc: function () {
            return this.Ea.rc()
        },
        qc: function () {
            return this.Ea.qc()
        },
        va: function (a, b) {
            var c, d, e, f, g;
            d = this.Ke ? this.oa : this.jc.keys;
            e = [];
            for (c in d) d.hasOwnProperty(c) && e.push(this.oa[c]);
            g = ae(this, e);
            d = 0;
            for (f = g.length; d < f; d++) c = g[d], c.va(a, b);
            this.jc.clear();
            this.Ke = !1;
            return e.length
        },
        ha: function (a) {
            function b(b) {
                ne(f, function (c) {
                    f.ee.contains(xc(c)) || c.yc() === b && (c.hidden() || c.ha(a))
                })
            }
            var c, d, e, f = this;
            c = Xa(this.nf);
            c.sort();
            d = 0;
            for (e = c.length; d < e; d++) b(c[d])
        },
        hb: function (a, b, c) {
            var d;
            d = null;
            ne(this, function (e) {
                xc(e) === c && e.hb(a, b) && (null === d || d.yc() <= e.yc()) && (d = e)
            });
            return d
        },
        each: function (a, b) {
            var c;
            c = function (d) {
                var e, f, g;
                if (d.children) for (a && b(d), g = d.children, e = 0, f = g.length; e < f; e++) d = g[e], c(d);
                else b(d)
            };
            c(this.root)
        },
        sc: function (a) {
            var b, c, d, e;
            b = new Kc(this.Da++);
            xd(this, b);
            d = 0;
            for (e = a.length; d < e; d++) c = a[d], W(this, b, this.oa[c], -1);
            return b
        },
        removeNode: function (a, b) {
            var c, d, e = this;
            void 0 === b && (b = !0);
            c = Lc(a.parent, a);
            0 <= c && (a.parent.children.splice(c, 1), a.parent = null, b && (d = function (a) {
                var b, c, k;
                delete e.oa[a.id];
                e.jc.remove(a.id);
                if (wc(a)) for (k = a.children, b = 0, c = k.length; b < c; b++) a = k[b], d(a)
            }, d(a)));
            "PageNode" === a.type() && c === this.nb && (this.log("Removed current page."), this.pb.splice(c, 1), this.lb(Math.min(c, this.pb.length - 1)));
            return c
        },
        ec: function () {
            var a, b, c, d;
            a = d = c = b = null;
            this.each(!1, function (e) {
                if (null === b || e.rect.x < b) b = e.rect.x;
                if (null === c || e.rect.right() > c) c = e.rect.right();
                if (null === d || e.rect.y < d) d = e.rect.y;
                if (null === a || e.rect.bottom() > a) a = e.rect.bottom()
            });
            return null === b ? new I(0, 0, 10, 10) : new I(b, d, c - b, a - d)
        },
        la: function (a) {
            return this.aa[a]
        },
        setProperty: function (a, b) {
            void 0 === b ? a in this.aa && delete this.aa[a] : this.aa[a] = b
        },
        Wc: function (a, b) {
            this.log("showLayer(%s, %s)", a, b);
            b ? this.ee.remove(a) : this.ee.add(a)
        },
        Oc: function (a) {
            this.log("Adding page to document with index %s", a);
            if (a > this.pb.length) return this.log("Error: Can insert page with index %s", a), -1;
            var b = Ac("PageNode", this.Da++);
            W(this, this.root, b, a);
            return a
        },
        dc: function () {
            return this.pb.length
        },
        lb: function (a) {
            if (0 <= a && a < this.pb.length) return this.log("Set current page to %s/%s", a, this.pb.length), this.nb = a, !0;
            this.log("Tried to set page to non-existing %s", a);
            return !1
        }
    };

    function Yd(a) {
        var b = 816,
            c = 1056;
        "width" in a.aa && (b = a.aa.width);
        "height" in a.aa && (c = a.aa.height);
        return new Mb(b, c)
    }
    function db(a) {
        if ("width" in a.aa) return new I(0, 0, a.aa.width, a.aa.height);
        a = a.ec();
        a.width += a.x;
        a.height += a.y;
        a.x = 0;
        a.y = 0;
        return a
    }
    function W(a, b, c, d) {
        c.parent && a.removeNode(c, !1); - 1 === d ? b.children.push(c) : b.children.splice(d, 0, c);
        me(a, c);
        a.ld = !0;
        "PageNode" === c.type() && (-1 === d ? a.pb.push(c) : a.pb.splice(d, 0, c));
        c.parent = b
    }

    function ce(a, b, c) {
        var d, e, f, g, h, k, l, m, p, q;
        f = JSON.parse(b);
        b = [];
        h = a.Da;
        p = 0;
        for (q = f.length; p < q; p++) if (e = f[p], "GroupAction" === e.type) b.push(new td(e.members)), c.push(h++);
        else if ("CreateAction" === e.type) {
            m = e.properties;
            k = {};
            for (g in m) m.hasOwnProperty(g) && (l = m[g], "[object Array]" === Object.prototype.toString.apply(l) && "Matrix" === l[0] && (l.splice(0, 1), l = new J(l)), k[g] = l);
            b.push(new D(e.node, k));
            c.push(h++)
        }
        d = a.Da;
        g = function (b) {
            a.log("Remap %s -> %s", b, b + d);
            return b + d
        };
        e = 0;
        for (f = b.length; e < f; e++) c = b[e], c.rename(g);
        return b
    }
    function be(a, b, c, d) {
        var e, f, g, h;
        if (wc(b)) {
            e = [];
            h = b.children;
            f = 0;
            for (g = h.length; f < g; f++) b = h[f], d = be(a, b, c, d), e.push(d - 1);
            c.push({
                type: "GroupAction",
                members: e
            })
        } else {
            a = b.aa;
            g = {};
            for (e in a) a.hasOwnProperty(e) && (f = a[e], f instanceof J && (f = ["Matrix", f.m11, f.m12, f.m21, f.m22, f.xa, f.ya]), g[e] = f);
            c.push({
                type: "CreateAction",
                node: b.type(),
                properties: g
            })
        }
        return d + 1
    }
    function oe(a, b) {
        var c;
        c = 0;
        a.ld && (a.ld = !1, a.each(!0, function (a) {
            a.Ye = c++
        }));
        b.sort(function (a, b) {
            return a.Ye - b.Ye
        })
    }

    function ne(a, b) {
        function c(a) {
            if (a.children) for (var e = 0; e < a.children.length; e++) c(a.children[e]);
            else "PageNode" !== a.type() && b(a)
        }
        c(a.pb[a.nb])
    }
    function qd(a, b, c) {
        var d, e, f, g;
        void 0 === c && (c = new Wa);
        e = function (a) {
            var b, d, f, g;
            c.add(a.id);
            if (wc(a)) {
                f = a.children;
                g = [];
                b = 0;
                for (d = f.length; b < d; b++) a = f[b], g.push(e(a));
                return g
            }
        };
        f = 0;
        for (g = b.length; f < g; f++) d = b[f], e(a.oa[d]);
        return c
    }

    function ae(a, b) {
        var c, d, e, f, g;
        e = [];
        c = {};
        f = 0;
        for (g = b.length; f < g; f++) {
            for (d = b[f]; vc(d);) d = d.parent;
            d.id in c || (c[d.id] = !0, e.push(d))
        }
        oe(a, e);
        return e
    }
    function bd(a, b) {
        var c = [];
        ne(a, function (a) {
            b.contains(a.ec()) && c.push(a)
        });
        return c
    }
    function V(a, b) {
        var c;
        Ua(b);
        return b in a.oa ? (c = a.oa[b], a.jc.add(b), c) : null
    }
    function xd(a, b) {
        W(a, a.pb[a.nb], b, -1)
    }

    function me(a, b, c) {
        var d, e, f, g;
        void 0 === c && (c = !0);
        Ta("id" in b, "Must be a node");
        if (!(b.id in a.oa) && (a.oa[b.id] = b, a.ie.push(b), wc(b))) for (g = b.children, e = 0, f = g.length; e < f; e++) d = g[e], me(a, d, c);
        c && a.jc.add(b.id);
        a.nf.add(b.yc())
    }
    function $a(a, b) {
        Ua(b);
        a.Da = b;
        a.log("nextId now %s", b)
    }
    $.extend({}, z.prototype, le.prototype);
    var pe = s("DOC");
    le.prototype.save = function (a) {
        if ("list" === a) return gb(this);
        if ("zwibbler3" === a) return a = gb(this), "zwibbler3." + window.JSON.stringify(a);
        throw "Unknown save format: " + a;
    };

    function fb(a) {
        if ("{" === a.charAt(0)) return qe(a);
        if (0 === a.indexOf("zwibbler3.")) return a = window.JSON.parse(a.substr(10)), eb(a);
        throw "Format detection failed.";
    }

    function qe(a) {
        var b = s("IMPORT"),
            c = new le,
            d = c.Da,
            e, f, g, h, k, l = [];
        k = function (a) {
            var b = new J;
            b.m11 = a.m11;
            b.m12 = a.m12;
            b.m21 = a.m21;
            b.m22 = a.m22;
            b.xa = a.dx;
            b.ya = a.dy;
            return b
        };
        g = function (a) {
            var b = 0;
            "arrowSize" in a && (b = a.arrowSize, a = a.path);
            var c = k(a.matrix),
                b = {
                    strokeStyle: a.strokeStyle,
                    fillStyle: a.fillStyle,
                    lineWidth: a.lineWidth,
                    smoothness: a.smoothness,
                    sloppiness: a.sloppiness,
                    shadow: a.shadow,
                    arrowSize: b,
                    seed: Math.round(65535 * Math.random())
                };
            if ("textNode" in a) {
                var e = a.textNode;
                b.fontSize = e.fontSize;
                b.fontName = e.fontName;
                b.text = e.text;
                b.textFillStyle = "textFillStyle" in e ? e.textFillStyle : e.fillStyle
            }
            "path" in a && (a = a.path);
            var f = a.startX,
                g = a.startY,
                e = a.closed,
                h = new Ec;
            a = a.segments;
            f = c.apply(f, g);
            h.moveTo(f.x, f.y);
            for (f = 0; f < a.length; f++) {
                var m = a[f];
                switch (m.type) {
                case 1:
                    g = c.apply(m.x, m.y);
                    h.lineTo(g.x, g.y);
                    break;
                case 2:
                    g = c.apply(m.x, m.y);
                    h.Xd(g.x, g.y);
                    break;
                case 3:
                    g = c.apply(m.x1, m.y1);
                    m = c.apply(m.x, m.y);
                    T(h, g.x, g.y, m.x, m.y);
                    break;
                default:
                    throw "Unknown path segment type: " + m.type;
                }
            }
            e && h.close();
            b.commands = h.toArray();
            l.push(new D("PathNode", b));
            d += 1
        };
        e = function (a, b) {
            for (var c = [], e = a.children, g = e.length - 1; 0 <= g; g--) {
                var h = d;
                try {
                    f(e[g], b + 1)
                } catch (k) {
                    continue
                }
                c.push(h)
            }
            0 < b && (d += 1, l.push(new td(c)))
        };
        h = function (a) {
            var b = k(a.matrix),
                b = b.multiply(new K(0, 1.3 * a.fontSize));
            a = {
                fillStyle: a.fillStyle,
                lineWidth: 0,
                text: a.text,
                fontName: a.fontName,
                fontSize: a.fontSize,
                matrix: b,
                inverse: b.inverse()
            };
            l.push(new D("TextNode", a));
            d += 1
        };
        f = function (a, b) {
            switch (a.type) {
            case "Node":
                e(a, b);
                break;
            case "PathNode":
            case "ArrowNode":
                g(a);
                break;
            case "TextNode":
                h(a);
                break;
            default:
                throw "Unknown node type: " + a.type;
            }
        };
        var m;
        try {
            m = window.JSON.parse(a)
        } catch (p) {
            a = a.replace(/\\\\/g, "\\").replace(/\\"/g, '"');
            try {
                m = window.JSON.parse(a)
            } catch (q) {
                a = a.replace(",", ",\n");
                try {
                    m = eval("(" + a + ")")
                } catch (r) {
                    throw b("Couldn't parse file."), "Couldn't parse file.";
                }
            }
        }
        b("Successfully parsed!");
        f(m, 0);
        c.qa(l);
        return c
    }

    function re(a) {
        function b() {
            for (var a = [], b = 0; 4 > b; b++) a.push(Math.random());
            return a
        }
        function c(a) {
            var e = {},
                f;
            e.type = "Node";
            f = qc(a);
            e.matrix = {
                m11: f.m11,
                m12: f.m12,
                m21: f.m21,
                m22: f.m22,
                dx: f.xa,
                dy: f.ya
            };
            e.children = [];
            if (wc(a)) for (f = 0; f < a.children.length; f++) e.children.push(c(a.children[f]));
            if ("BaseNode" !== a.type() && "GroupNode" !== a.type()) if ("TextNode" === a.type()) e.type = "TextNode", e.fillStyle = a.la("textFillStyle"), e.fontName = a.la("fontName"), e.fontSize = a.la("fontSize"), e.text = a.la("text");
            else if ("PathNode" === a.type()) {
                f = e;
                0 < a.la("arrowSize") && !a.la("closed") && (e.type = "ArrowNode", e.arrowSize = a.la("arrowSize"), f = {}, e.path = f);
                e.type = "PathNode";
                "" !== a.la("text") && (f = {}, f.fillStyle = a.la("textFillStyle"), f.fontName = a.la("fontName"), f.fontSize = a.la("fontSize"), f.text = a.la("text"), e.textNode = f);
                var g = a.aa.commands;
                if (3 > g.length) throw "Tried to export empty path.";
                e.strokeStyle = a.la("strokeStyle");
                e.fillStyle = a.la("fillStyle");
                e.lineWidth = a.la("lineWidth");
                e.smoothness = a.la("smoothness");
                e.sloppiness = a.la("sloppiness");
                e.startX = g[1];
                e.startY = g[2];
                e.closed = a.la("closed");
                e.segments = [];
                e.shadow = a.la("shadow");
                e.seed = a.la("seed");
                for (f = 3; f < g.length;) g[f] === id ? e.segments.push({
                    type: 1,
                    x: g[f + 1],
                    y: g[f + 2],
                    r: b()
                }) : g[f] === jd ? e.segments.push({
                    type: 2,
                    x: g[f + 1],
                    y: g[f + 2]
                }) : g[f] === kd && e.segments.push({
                    type: 3,
                    x: g[f + 1],
                    y: g[f + 2],
                    x1: g[f + 3],
                    y1: g[f + 4],
                    r: b()
                }), f += S[g[f]] + 1
            } else throw "Unknown node type: " + a.type();
            return e
        }
        return window.JSON.stringify(c(a))
    }

    function gb(a) {
        function b(a, d) {
            var e = {
                id: d.id,
                type: d.type()
            };
            c.push(e);
            a && (e.parent = a.id);
            var f = d.aa,
                m;
            for (m in f) f.hasOwnProperty(m) && ("matrix" === m ? e[m] = f[m].toArray() : "inverse" !== m && (e[m] = f[m]));
            if (wc(d)) for (e = 0; e < d.children.length; e++) b(d, d.children[e])
        }
        var c = [],
            d = {
                type: "document"
            },
            e = !1,
            f;
        for (f in a.aa) a.aa.hasOwnProperty(f) && (d[f] = a.aa[f], e = !0);
        e && c.push(d);
        b(null, a.root);
        return c
    }

    function eb(a) {
        function b(a, c) {
            var d;
            if (void 0 !== a) {
                d = {};
                for (var e in a) a.hasOwnProperty(e) && "children" !== e && "parent" !== e && "id" !== e && "type" !== e && ("matrix" === e ? (d[e] = new J(a[e]), d.inverse = d.matrix.inverse()) : d[e] = a[e]);
                e = h;
                0 !== a.id && f.push(new D(a.type, d, c, -1));
                g[a.id] = h;
                h += 1;
                if (void 0 !== a.children) for (d = 0; d < a.children.length; d++) b(a.children[d], e)
            }
        }
        var c, d, e;
        a = window.JSON.parse(window.JSON.stringify(a));
        var f = [],
            g = {},
            h = 0,
            k = {},
            l = !1;
        for (c = 0; c < a.length; c++) if (e = a[c], "document" === e.type) delete e.type, f.push(new Dd(e));
        else {
            "PageNode" === e.type && (l = !0);
            if ("parent" in e) {
                if (!(e.parent in k)) throw "Error: child " + e.id + " references parent " + e.parent + " before it was defined.";
                d = k[e.parent];
                void 0 !== d.children ? d.children.push(e) : d.children = [e]
            }
            "GroupNode" !== e.type && "PageNode" !== e.type || void 0 !== e.children || (e.children = []);
            k[e.id] = e
        }
        l || (h += 1);
        b(k[0], h);
        pe(JSON.stringify(g));
        for (c = 0; c < f.length; c++) pe(f[c].toString());
        a = new le(l);
        a.qa(f);
        a.Ea = new Ya;
        return a
    };

    function se(a) {
        te(this, a)
    }
    function te(a, b) {
        a.$ = b || $("<div>");
        a.$.css("position", "absolute");
        a.$.css("margin", "0px");
        a.$.css("padding", "0px");
        $("body").append(a.$)
    }
    n = se.prototype;
    n.width = function (a) {
        function b(a) {
            a = parseInt(c.$.css(a), 10);
            return isNaN(a) ? 0 : a
        }
        var c = this;
        if (void 0 === a) return this.$.outerWidth();
        a -= b("border-left-width");
        a -= b("border-right-width");
        a -= b("padding-right");
        a -= b("padding-left");
        a -= b("margin-left");
        a -= b("margin-right");
        a = Math.max(0, a);
        this.$.css("width", "" + a + "px")
    };
    n.height = function (a) {
        function b(a) {
            a = parseInt(c.$.css(a), 10);
            return isNaN(a) ? 0 : a
        }
        var c = this;
        if (void 0 === a) return this.$.outerHeight();
        a -= b("border-top-width");
        a -= b("border-bottom-width");
        a -= b("padding-top");
        a -= b("padding-bottom");
        a -= b("margin-top");
        a -= b("margin-bottom");
        this.ad = a = Math.max(0, a);
        this.$.css("height", "" + this.ad + "px")
    };
    n.moveTo = function (a, b) {
        this.$.css("left", "" + a + "px");
        this.$.css("top", "" + b + "px")
    };
    n.show = function () {
        this.$.show()
    };
    n.hide = function () {
        this.$.hide()
    };

    function ue(a) {
        se.apply(this, arguments);
        var b = this;
        this.$.css("background", "black");
        this.$.css("font-family", '"Lucida Console","Dejavu Sans Mono",Monospace,"Courier New"');
        this.$.css("font-size", "10px");
        this.$.css("line-height", "12px");
        this.$.css("overflow", "scroll");
        this.je = 0;
        this.ge = {};
        this.bb = !1;
        this.width(300);
        fa(function (a, d) {
            return ve(b, a, d)
        });
        this.timeout = null;
        this.Wa = [];
        ve(this, "DEBUG", "Debug window starting")
    }
    ue.prototype = {
        gb: "#ffffff #008800 #008888 #880000 #880088 #884400 #888888 #444444 #0000ff #00ff00 #00ffff #ff0000 #ff00ff #ffff00".split(" "),
        show: function () {
            se.prototype.show.call(this);
            this.bb = !0;
            we(this);
            this.$[0].scrollTop = this.$[0].scrollHeight
        },
        hide: function () {
            this.bb = !1;
            se.prototype.hide.call(this)
        }
    };

    function we(a) {
        var b, c, d, e, f, g;
        g = a.Wa;
        e = 0;
        for (f = g.length; e < f; e++) {
            c = g[e];
            d = c.key;
            c = c.Mf;
            b = a;
            var h = d;
            h in b.ge || (b.ge[h] = b.gb[b.je], b.je = (b.je + 1) % b.gb.length);
            b = b.ge[h];
            b = $("<div>").css("color", b);
            b.css("border-bottom", "1px solid #222");
            b.text("" + d + ": " + c);
            a.$.append(b)
        }
        a.$[0].scrollTop = a.$[0].scrollHeight;
        a.timeout = null;
        a.Wa.length = 0
    }

    function ve(a, b, c) {
        var d, e, f;
        f = c.split("\n");
        d = 0;
        for (e = f.length; d < e; d++) c = f[d], a.Wa.push({
            key: b,
            Mf: c
        });
        a.bb && null === a.timeout && (a.timeout = setTimeout(function () {
            return we(a)
        }, 100))
    }
    H(se.prototype, ue.prototype);

    function xe(a) {
        var b = $("<div>");
        te(this, b);
        a.append(this.$);
        this.Ha = {};
        this.maxWidth = 128;
        this.jg = 5;
        this.$.css("overflow-x", "auto");
        this.$.css("overflow-y", "auto");
        this.pd = "grid";
        this.ke = 0;
        this.md = 1;
        this.cells = [];
        this.Lf = new ma({
            itemSize: this.maxWidth,
            algorithm: "mason",
            resize: !1
        });
        this.we = null
    }
    xe.prototype = {
        on: function (a, b) {
            this.Ha[a] = b
        },
        log: s("ListView"),
        va: function () {
            var a, b, c, d, e;
            b = null;
            e = this.cells;
            c = 0;
            for (d = e.length; c < d; c++) a = e[c], a.Se || (null === b ? this.$.prepend(a.Ia) : b.Ia.after(a.Ia), a.Se = !0), b = a;
            this.Lf.pd(this.$[0])
        },
        clear: function () {
            this.$.empty();
            this.cells.length = 0;
            this.md += 1
        }
    };

    function ib(a, b, c) {
        var d, e;
        e = a.md;
        d = {
            Ia: null,
            index: a.ke,
            Se: !1
        };
        a.ke += 1;
        Ea(b, function (b) {
            var g, h;
            e === a.md && (h = b.width, g = b.height, h > a.maxWidth && (b.width = a.maxWidth, b.height = g / h * a.maxWidth), b = $(b), b.css("margin", "" + a.jg + "px"), b.css("border-width", "3"), b.css("border-color", "white"), b.css("border-style", "solid"), b.css("image-rendering", "optimizeQuality"), b.mouseenter(function () {
                a.log("Mouseenter");
                return b.css("border-color", "#888888")
            }), b.mouseleave(function () {
                return b.css("border-color", "white")
            }), b.click(function () {
                if ("click" in a.Ha) return a.Ha.click(c)
            }), d.Ia = b, a.cells.push(d), a.cells.sort(function (a, b) {
                return a.index - b.index
            }), a.we || (a.we = setTimeout(function () {
                a.we = null;
                a.va()
            }, 500)))
        })
    }
    function ye(a) {
        a.pd = "horizontal";
        "grid" !== a.pd && a.$.css("white-space", "nowrap")
    }
    xe.prototype = $.extend({}, se.prototype, xe.prototype);

    function ze(a, b, c) {
        this.Ba(a, b, c)
    }
    ze.prototype.log = s("Menubar");
    ze.prototype.Ba = function (a, b, c) {
        te(this, $("<div>"));
        this.Vf = c;
        this.$.css("position", "absolute");
        this.$.css("background", "#ccc");
        this.$.css("font-family", "tahoma,helvetica,arial,sans");
        this.$.css("font-size", "12px");
        this.$.css("padding", "0.5em");
        this.$.css("cursor", "default");
        this.$.css("MozUserSelect", "none");
        this.$[0].onselectstart = function () {
            return !1
        };
        c && (this.$.css("background", "white"), this.$.css("border-left", "1px solid #ccc"), this.$.css("border-bottom", "1px solid #888"), this.$.css("border-right", "1px solid #888"), this.$.css("box-shadow", "3px 3px 5px #ccc"));
        this.Tc = a;
        this.ga = b;
        for (b = 0; b < a.items.length; b++) Ae(this, a.items[b]);
        this.Bb = this.Jb = null;
        this.$.css("z-index", 3001)
    };

    function Ae(a, b) {
        var c;
        a.Vf ? ("separator" === b.type ? c = $("<hr>") : (c = $("<div>"), c.css("padding-left", "0.5em"), c.css("padding-right", "0.5em"), c.text(b.display), c.hover(function () {
            c.css("background", "#ff9900")
        }, function () {
            c.css("background", "transparent")
        }), c.mouseup(function () {
            a.ed && a.ed();
            a.ga.emit(b.event, b.xf)
        })), a.$.append(c)) : "separator" !== b.type && (6 < b.display.length && "image:" === b.display.substr(0, 6) ? (c = $("<img>"), c.attr("src", b.display.substr(6)), c.load(function () {
            a.ga.emit("resize", {})
        }), c.css("border", "1px solid #888"), c.css("box-shadow", "3px 3px 3px #000"), c.css("border-radius", "5px"), c.css("vertical-align", "middle"), c.css("margin-left", "0.5em"), c.css("margin-right", "0.5em"), c.hover(function () {
            c.css("background", "#ff9900");
            c.css("color", "white");
            a.Bb && c.trigger("mousedown")
        }, function () {
            c.css("background", "transparent");
            c.css("color", "black")
        }), a.$.append(c)) : (c = $("<div>"), c.css("display", "inline"), c.css("padding-left", "0.5em"), c.css("padding-right", "0.5em"), c.css("padding-top", "0.5em"), c.css("padding-bottom", "0.5em"), c.css("MozUserSelect", "none"), c[0].onselectstart = function () {
            return !1
        }, c.css("vertical-align", "middle"), c.text(b.display), c.hover(function () {
            c.css("background", "#ff9900");
            if (a.Bb && a.Bb !== b.Tc) {
                var d = c.offset();
                a.log("highlight a menu item.");
                a.jf(b, d.left, d.top + c.outerHeight())
            }
        }, function () {
            c.css("background", "transparent")
        })), "menu" === b.type ? c.mousedown(function () {
            var d = c.offset();
            a.jf(b, d.left, d.top + c.outerHeight())
        }) : c.click(function () {
            a.ga.emit(b.event, {})
        }), a.$.append(c))
    }
    ze.prototype.click = function (a) {
        this.ed = a
    };

    function Be(a) {
        a.Bb && (a.Bb.$.remove(), a.Bb = null);
        a.Jb && (a.Jb.hide(), a.Jb = null)
    }
    ze.prototype.jf = function (a, b, c) {
        if (this.Bb && this.Bb.Tc === a.Tc) Be(this);
        else {
            Be(this);
            var d = $(this.$).offset().top + this.height(),
                d = new aa("transparent", 0, d),
                e = this,
                f = function () {
                    Be(e)
                };
            d.show(f);
            a = new ze(a.Tc, this.ga, !0);
            a.click(f);
            a.moveTo(b, c);
            this.Bb = a;
            this.Jb = d
        }
    };
    H(se.prototype, ze.prototype);

    function Z(a, b) {
        this.type = a;
        this.fa = b;
        if (4 > this.fa.length) throw "Bad value";
    }
    var Ce, De = 0,
        Ee = 1,
        Fe = 2,
        Ge = 3;

    function He(a) {
        a.toLowerCase() in Ie && (a = Ie[a.toLowerCase()]);
        var b = /rgba\( *([0-9]+) *, *([0-9]+) *, *([0-9]+) *, *([0-9\.]+) *\)/,
            c, d;
        d = /\#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])/i.exec(a);
        null !== d ? (a = parseInt(d[1], 16) / 255, b = parseInt(d[2], 16) / 255, c = parseInt(d[3], 16) / 255, d = 1) : (d = b.exec(a), null !== d ? (a = parseFloat(d[1]) / 255, b = parseFloat(d[2]) / 255, c = parseFloat(d[3]) / 255, d = parseFloat(d[4])) : (a = 1, b = 0, d = c = 1));
        return new Z(De, [a, b, c, d])
    }
    Z.prototype = {
        toString: function () {
            function a(a) {
                a = Math.round(255 * a);
                return 16 > a ? "0" + a.toString(16) : a.toString(16)
            }
            var b = Je(this, De);
            return 1 === b.fa[3] ? "#" + a(b.fa[0]) + a(b.fa[1]) + a(b.fa[2]) : "rgba(" + Math.round(255 * b.fa[0]) + "," + Math.round(255 * b.fa[1]) + "," + Math.round(255 * b.fa[2]) + "," + b.fa[3] + ")"
        },
        vc: function (a) {
            a.type !== this.type && (a = Je(a, this.type));
            if (this.type === Fe) {
                var b = this.fa[0],
                    c = a.fa[0],
                    b = b > c ? Math.min(b - c, c - b + 360) : Math.min(c - b, b - c + 360),
                    b = b / 360;
                return Math.pow(b * b + (this.fa[1] - a.fa[1]) * (this.fa[1] - a.fa[1]) + (this.fa[2] - a.fa[2]) * (this.fa[2] - a.fa[2]), 0.5)
            }
            return Math.pow((this.fa[0] - a.fa[0]) * (this.fa[0] - a.fa[0]) + (this.fa[1] - a.fa[1]) * (this.fa[1] - a.fa[1]) + (this.fa[2] - a.fa[2]) * (this.fa[2] - a.fa[2]), 0.5)
        }
    };

    function Je(a, b) {
        return Ce[a.type][b](a)
    }(function () {
        function a(a) {
            var b = a.fa[0],
                c = a.fa[1],
                d = a.fa[2];
            0 > b && (b += 360);
            var e = b / 60 - Math.floor(b / 60),
                f = d * (1 - c),
                g = d * (1 - e * c),
                c = d * (1 - (1 - e) * c),
                h, k, l;
            switch (Math.floor(b / 60) % 6) {
            case 0:
                h = d;
                k = c;
                l = f;
                break;
            case 1:
                h = g;
                k = d;
                l = f;
                break;
            case 2:
                h = f;
                k = d;
                l = c;
                break;
            case 3:
                h = f;
                k = g;
                l = d;
                break;
            case 4:
                h = c;
                k = f;
                l = d;
                break;
            case 5:
                h = d, k = f, l = g
            }
            return new Z(De, [h, k, l, a.fa[3]])
        }
        function b(a) {
            var b, c = a.fa[0],
                d = a.fa[1],
                e = a.fa[2],
                f = Math.max(c, d, e),
                g = Math.min(c, d, e);
            f === g ? b = 0 : f === c ? b = (60 * (d - e) / (f - g) + 360) % 360 : f === d ? b = 60 * (e - c) / (f - g) + 120 : f === e && (b = 60 * (c - d) / (f - g) + 240);
            return new Z(Fe, [b, 0 === f ? 0 : 1 - g / f, f, a.fa[3]])
        }
        function c(a) {
            function b(a) {
                return a > 6 / 29 * (6 / 29) * (6 / 29) ? Math.pow(a, 1 / 3) : 1 / 3 * (29 / 6) * (29 / 6) * a + 4 / 29
            }
            var c = b(a.fa[1] / l.Ld);
            return new Z(Ge, [116 * c - 16, 500 * (b(a.fa[0] / l.Kd) - c), 200 * (c - b(a.fa[2] / l.Md)), a.fa[3]])
        }
        function d(a) {
            var b = (a.fa[0] + 16) / 116,
                c = b + a.fa[1] / 500,
                d = b - a.fa[2] / 200,
                e = 6 / 29;
            return new Z(Ee, [c > e ? l.Kd * c * c * c : 3 * (c - 16 / 116) * e * e * l.Kd, b > e ? l.Ld * b * b * b : 3 * (b - 16 / 116) * e * e * l.Ld, d > e ? l.Md * d * d * d : 3 * (d - 16 / 116) * e * e * l.Md, a.fa[3]])
        }
        function e(a) {
            for (var b = [], c = 0; 3 > c; c++) b[c] = 0.04045 >= a.fa[c] ? a.fa[c] / 12.92 : Math.pow((a.fa[c] + 0.055) / 1.055, 2.4);
            return new Z(Ee, [0.4124 * b[0] + 0.3576 * b[1] + 0.1805 * b[2], 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2], 0.0193 * b[0] + 0.1192 * b[1] + 0.9505 * b[2], a.fa[3]])
        }
        function f(a) {
            var b = [],
                c = [];
            b[0] = 3.241 * a.fa[0] - 1.5374 * a.fa[1] - 0.4986 * a.fa[2];
            b[1] = -0.9692 * a.fa[0] + 1.876 * a.fa[1] + 0.0416 * a.fa[2];
            b[2] = 0.0556 * a.fa[0] - 0.204 * a.fa[1] + 1.057 * a.fa[2];
            for (var d = 0; 3 > d; d++) c[d] = 0.0031308 >= b[d] ? 12.92 * b[d] : 1.055 * Math.pow(b[d], 1 / 2.4) - 0.055;
            c[3] = a.fa[3];
            return new Z(De, c)
        }
        function g(a) {
            return new Z(a.type, a.fa.concat())
        }
        function h(a) {
            return c(e(a))
        }
        function k(a) {
            return b(f(a))
        }
        var l = {
            Kd: 0.9505,
            Ld: 1,
            Md: 1.089
        };
        Ce = [
            [g, e, b, h],
            [f, g, k, c],
            [a, function (b) {
                return e(a(b))
            },
            g, function (b) {
                return h(a(b))
            }],
            [function (a) {
                return f(d(a))
            },
            d, function (a) {
                return k(d(a))
            },
            g]
        ]
    })();
    var Ie = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };

    function Ke(a, b, c, d) {
        this.Ba(a, b, c, d)
    }
    n = Ke.prototype;
    n.Ba = function (a, b, c, d) {
        function e(a) {
            for (var b = 30; 100 > b; b += 20) a.fa[2] = b / 100, f.gb.push(a.toString())
        }
        z.call(this);
        this.$ = this.canvas = $(ha(a[0]));
        this.canvas.css("position", "absolute");
        this.canvas.css("border", "none");
        this.canvas.css("border-top", "1px solid black");
        this.canvas.css("display", "block");
        this.ca = this.canvas[0].getContext("2d");
        this.size = b;
        this.Wb = c;
        this.wrap = d;
        this.gb = "#000000 #ffffff #000088 #008800 #008888 #880000 #880088 #884400 #888888 #444444 #0000ff #00ff00 #00ffff #ff0000 #ff00ff #ffff00".split(" ");
        var f = this;
        e(new Z(Fe, [0, 0, 0, 1]));
        for (a = 0; 720 > a; a += 35) b = new Z(Fe, [a, 0.5, 0, 1]), e(b);
        Le(this, 100);
        this.canvas.bind("touchstart", function (a) {
            var b = f.canvas.offset();
            f.cb(a.touches[0].pageX - b.left - 0, a.touches[0].pageY - b.top - 0, 1);
            a.preventDefault();
            a.stopPropagation()
        });
        this.canvas.mousedown(function (a) {
            var b = f.canvas.offset();
            f.cb(a.pageX - b.left - 0, a.pageY - b.top - 0, a.which) || (a.preventDefault(), a.stopPropagation())
        });
        this.canvas.bind("contextmenu", function (a) {
            a.preventDefault();
            a.stopPropagation();
            return !1
        })
    };
    n.log = s("COLOURPANEL");

    function Me(a, b) {
        a.gb = b.slice(0);
        a.log("Set colours to %s len=%s", a.gb, a.gb.length);
        a.va();
        a.ha()
    }
    function Le(a, b) {
        a.width = b;
        a.canvas.attr("width", "" + a.width);
        a.va();
        a.ha()
    }
    n.height = function () {
        return this.ad
    };
    n.moveTo = function (a, b) {
        this.canvas.css("left", "" + a + "px");
        this.canvas.css("top", "" + b + "px")
    };
    n.va = function () {
        this.fd = Math.floor(this.width / this.size);
        var a = Math.ceil(this.gb.length / this.fd);
        this.log("Format to width=%s; height=%s wrap=%s, cpr=%s", this.width, a * this.size, this.wrap, this.fd);
        this.ad = this.wrap ? a * this.size : this.size;
        this.canvas.attr("height", "" + this.ad)
    };
    n.ha = function () {
        for (var a = 0, b = 0, c = 0; c < this.gb.length; c++) {
            var d = He(this.gb[c]);
            this.ca.fillStyle = this.gb[c];
            this.ca.fillRect(a, b, this.size, this.size);
            0 === d.fa[3] && (this.ca.beginPath(), this.ca.strokeStyle = "#000000", this.ca.moveTo(a, b), this.ca.lineTo(a + this.size, b + this.size), this.ca.moveTo(a + this.size, b), this.ca.lineTo(a, b + this.size), this.ca.stroke());
            a += this.size;
            a >= this.width && (b += this.size, a = 0)
        }
    };
    n.hide = function () {
        this.canvas.hide()
    };
    n.show = function () {
        this.canvas.show()
    };
    n.cb = function (a, b, c) {
        a = Math.floor(a / this.size);
        b = Math.floor(b / this.size);
        var d = b * this.fd + a;
        this.log("row=%s col=%s index=%s coloursPerRow=%s", b, a, d, this.fd);
        return d < this.gb.length ? (this.emit("colour", {
            Ra: this.gb[d],
            button: c
        }), !0) : !1
    };
    $.extend(Ke.prototype, z.prototype);

    function Ne(a) {
        this.$ = document.createElement("div");
        this.canvas = document.createElement("canvas");
        this.height = this.width = a;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.cursor = "crosshair";
        this.Da = 0;
        this.$.appendChild(this.canvas);
        "G_vmlCanvasManager" in window && window.G_vmlCanvasManager.initElement(this.canvas);
        this.ca = this.canvas.getContext("2d");
        var b = document.createElement("input");
        b.setAttribute("type", "range");
        this.Gc = document.createElement("input");
        this.Gc.setAttribute("type", "checkbox");
        "range" === b.type ? (this.$.appendChild(document.createElement("br")), this.$.appendChild(b), b.min = 0, b.max = 255, b.value = 255, this.pc = b) : (this.pc = null, b = "colourcheckbox" + this.Da, this.Gc.setAttribute("id", b), this.$.appendChild(document.createElement("br")), this.$.appendChild(this.Gc), this.Da += 1, b = $("<label>").attr("for", b).text("Transparent"), this.$.appendChild(b[0]));
        this.Na = this.height;
        this.Pb = 0.8 * this.height;
        if (Ne[a]) this.data = Ne[a];
        else {
            for (var b = this.ca.getImageData(0, 0, this.Na, this.Na), c = this.Na / 2, d = this.Pb / 2, e, f = 0; f < this.Na; f++) {
                var g = Math.sqrt(c * c - (f - c) * (f - c)),
                    h = Math.floor(-g + c),
                    k = Math.floor(g + c),
                    l = d * d - (f - c) * (f - c);
                if (0 <= l) {
                    for (var g = Math.sqrt(l), l = Math.floor(-g + c), m = Math.floor(g + c), g = f * this.Na * 4 + 4 * h; h <= l; h++) e = Math.atan2(f - c, h - c), e = new Z(Fe, [e / Math.PI * 180, 1, 1, 1]), e = Je(e, De), b.data[g++] = 255 * e.fa[0], b.data[g++] = 255 * e.fa[1], b.data[g++] = 255 * e.fa[2], b.data[g++] = 255;
                    g = f * this.Na * 4 + 4 * m;
                    h = m
                } else g = f * this.Na * 4 + 4 * h;
                for (; h <= k; h++) e = Math.atan2(f - c, h - c), e = new Z(Fe, [e / Math.PI * 180, 1, 1, 1]), e = Je(e, De), b.data[g++] = 255 * e.fa[0], b.data[g++] = 255 * e.fa[1], b.data[g++] = 255 * e.fa[2], b.data[g++] = 255
            }
            this.data = b;
            Ne[a] = b
        }
        this.Va = new Z(Fe, [20, 1, 1, 1]);
        this.update();
        this.ha();
        var p = this;
        p.Sd = !1;
        p.Uc = "";
        $(this.canvas).mousedown(function (a) {
            var b = $(p.canvas).offset(),
                c = a.pageX - b.left,
                b = a.pageY - b.top;
            p.Sd = !0;
            Oe(p, c, b);
            a.stopPropagation();
            a.preventDefault()
        });
        $(this.canvas).mousemove(function (a) {
            if (p.Sd) {
                var b = $(p.canvas).offset();
                Oe(p, a.pageX - b.left, a.pageY - b.top)
            }
            a.stopPropagation();
            a.preventDefault()
        });
        $(window).mouseup(function () {
            p.Sd = !1;
            p.Uc = ""
        });
        null !== this.pc && $(this.pc).change(function () {
            p.Va.fa[3] = p.pc.value / 255;
            p.update();
            p.ha()
        });
        $(this.Gc).change(function () {
            p.Va.fa[3] = p.Gc.checked ? 0 : 1;
            p.update();
            p.ha()
        })
    }
    Ne.prototype = {
        update: function () {
            this.Xe && this.Xe(this.Va.toString())
        },
        ha: function () {
            this.ca.save();
            this.ca.lineWidth = 1;
            this.ca.fillStyle = "rgb(128, 128, 128)";
            this.ca.fillRect(0, 0, this.width, this.height);
            this.ca.putImageData(this.data, 0, 0);
            var a = this.Va.fa[0] / 180 * Math.PI;
            this.ca.beginPath();
            var b = {
                x: Math.cos(a) * this.Pb / 2 + this.Na / 2,
                y: Math.sin(a) * this.Pb / 2 + this.Na / 2
            },
                c = {
                    x: Math.cos(a + 2 * Math.PI / 3) * this.Pb / 2 + this.Na / 2,
                    y: Math.sin(a + 2 * Math.PI / 3) * this.Pb / 2 + this.Na / 2
                },
                d = {
                    x: Math.cos(a + 4 * Math.PI / 3) * this.Pb / 2 + this.Na / 2,
                    y: Math.sin(a + 4 * Math.PI / 3) * this.Pb / 2 + this.Na / 2
                },
                e = Math.cos(a) * this.Na / 2 + this.Na / 2,
                a = Math.sin(a) * this.Na / 2 + this.Na / 2,
                f = c.x + (d.x - c.x) / 2,
                g = c.y + (d.y - c.y) / 2;
            this.ca.moveTo(b.x, b.y);
            this.ca.lineTo(c.x, c.y);
            this.ca.lineTo(d.x, d.y);
            this.ca.lineTo(b.x, b.y);
            var h = this.ca.createLinearGradient(c.x, c.y, d.x, d.y);
            h.addColorStop(0, "#ffffff");
            h.addColorStop(1, "#000000");
            this.ca.fillStyle = h;
            this.ca.fill();
            h = this.ca.createLinearGradient(b.x, b.y, f, g);
            f = Je(this.Va, Fe);
            f.fa[1] = 1;
            f.fa[2] = 1;
            f = Je(f, De);
            f.fa[3] = 1;
            h.addColorStop(0, f.toString());
            f.fa[3] = 0;
            h.addColorStop(1, f.toString());
            this.ca.fillStyle = h;
            this.ca.fill();
            this.strokeStyle = "#000000";
            this.ca.beginPath();
            this.ca.moveTo(b.x, b.y);
            this.ca.lineTo(e, a);
            this.ca.stroke();
            a = 1 - this.Va.fa[2];
            e = this.Va.fa[1] * b.x + a * d.x + (1 - this.Va.fa[1] - a) * c.x;
            a = this.Va.fa[1] * b.y + a * d.y + (1 - this.Va.fa[1] - a) * c.y;
            this.ca.beginPath();
            this.ca.arc(e, a, 4, 0, 2 * Math.PI, !1);
            this.ca.stroke();
            this.ca.restore();
            this.Qf = b;
            this.Rf = c;
            this.Sf = d
        }
    };

    function Oe(a, b, c) {
        var d = Math.sqrt((b - a.Na / 2) * (b - a.Na / 2) + (c - a.Na / 2) * (c - a.Na / 2));
        if ("ring" === a.Uc || "triangle" !== a.Uc && d >= a.Pb / 2 && d <= a.Na / 2) a.Va.fa[0] = Math.atan2(a.Na / 2 - c, a.Na / 2 - b) / Math.PI * 180 + 180, 0 === a.Va.fa[1] && (a.Va.fa[1] = 1, a.Va.fa[2] = 1), a.Uc = "ring";
        else {
            var e, f = a.Qf,
                d = a.Rf,
                g = a.Sf;
            e = (f.x - g.x) * (d.y - g.y) - (d.x - g.x) * (f.y - g.y);
            d = ((d.y - g.y) * (b - g.x) - (d.x - g.x) * (c - g.y)) / e;
            b = (-(f.y - g.y) * (b - g.x) + (f.x - g.x) * (c - g.y)) / e;
            b = 1 - Math.max(0, d) - Math.max(0, b);
            a.Va.fa[1] = Math.min(Math.max(d, 0), 1);
            a.Va.fa[2] = 1 - Math.min(Math.max(b, 0), 1);
            a.Uc = "triangle"
        }
        a.ha();
        a.update()
    }
    function Pe(a, b) {
        a.Va = Je(He(b), Fe);
        null !== a.pc && (a.pc.value = Math.round(255 * a.Va.fa[3]));
        a.Gc.checked = 0 === a.Va.fa[3] ? !0 : !1;
        a.ha();
        a.update()
    }
    function Qe() {
        var a = document.createElement("canvas");
        "G_vmlCanvasManager" in window && window.G_vmlCanvasManager.initElement(a);
        return a.getContext && a.getContext("2d").getImageData
    };

    function Re(a, b) {
        this.ea = a;
        this.language = b;
        te(this, $("<div>"));
        this.$.addClass("PropertyPanel");
        this.Ad = [];
        this.Bd = {};
        this.view = null;
        this.oa = [];
        (this.He = Qe() && "wheel" === a.get("colourPicker")) || this.log("ColourWheel not supported in this canvas.");
        this.action = null;
        this.$.css("background", "#ffffff");
        this.$.css("border", "none");
        this.$.css("font-family", "tahoma,arial,helvetica,sans");
        this.$.css("color", "#4fa0d3");
        this.$.css("font-weight", "bold");
        this.$.css("font-size", "10pt");
        this.$.css("overflow-y", "scroll");
        var c = this;
        this.$.click(function () {
            c.log("PropertyPanel clicked.");
            c.emit("click")
        });
        this.onclick = null
    }
    Re.prototype = {
        log: s("PROP"),
        on: function (a, b) {
            if ("click" === a) this.onclick = b;
            else throw "This object only handles the click event";
        },
        emit: function () {
            if (this.onclick) this.onclick()
        },
        apply: function (a, b) {
            this.view.setProperty(a, b)
        }
    };

    function Se(a, b, c, d) {
        null !== a.action && a.action.name === d.name || a.view.setProperty(d.name, b);
        c.value = b
    }

    function Te(a, b) {
        if (!b.Pe) if (a.He) {
            var c = new Ne(120);
            Pe(c, b.input.value);
            c.Xe = function (c) {
                Se(a, c, b.input, b.input.prop)
            };
            b.Bg = c;
            b.Pe = !0;
            b.parentNode.appendChild(c.$)
        } else {
            c = new Ke($(b.parentNode), 20, !1, !0);
            c.$.css("position", "static");
            Me(c, a.ea.get("colourPalette"));
            b.Bg = c;
            b.Pe = !0;
            b.parentNode.appendChild(c.$[0]);
            var d;
            c.on("colour", function (c) {
                Se(a, c.Ra, b.input, b.input.prop);
                c = He(c.Ra).fa[3];
                d.value = Math.round(100 * c)
            });
            d = Zc();
            d.min = 0;
            d.max = 100;
            var e = He(b.input.value);
            d.hf(Math.round(100 * e.fa[3]));
            d.onchange = function () {
                e = He(b.input.value);
                e.fa[3] = d.value / 100;
                Se(a, e.toString(), b.input, b.input.prop)
            };
            b.parentNode.appendChild(document.createElement("br"));
            b.parentNode.appendChild(d)
        }
    }

    function ge(a) {
        function b() {
            Te(a, this)
        }
        function c() {
            var b = this;
            "timer" in b && clearTimeout(b.timer);
            b.timer = setTimeout(function () {
                a.apply(b.prop.name, b.value)
            }, 250)
        }
        function d() {
            var b = a.view,
                c = this.prop.name;
            b.log("Someone clicked a button for %s", c);
            "mathml" === c && b.ga.emit("math.edit", Y(b)[0])
        }
        function e(b) {
            13 === b.keyCode && a.apply(this.prop.name, this.value)
        }
        function f() {
            a.apply(this.prop.name, this.prop.fa[parseInt(this.value, 10)].value)
        }
        $(a.$).empty();
        var g, h;
        for (g = 0; g < a.Ad.length; g++) {
            var k = a.Ad[g],
                l = k.oe;
            if ("none" !== l.type) {
                var m = document.createElement("div");
                h = document.createElement("span");
                h.appendChild(document.createTextNode(l.display));
                m.appendChild(h);
                m.appendChild(document.createElement("br"));
                if ("select" === l.type) {
                    var p = document.createElement("select");
                    for (h = 0; h < l.fa.length; h++) {
                        var q = l.fa[h],
                            r = document.createElement("option");
                        r.appendChild(document.createTextNode(q.name));
                        r.setAttribute("value", h);
                        q.value === k.value && r.setAttribute("selected", "");
                        p.appendChild(r)
                    }
                    p.prop = l;
                    p.onchange = f;
                    m.appendChild(p)
                } else if ("colour" === l.type) h = document.createElement("input"), h.setAttribute("type", "text"), h.value = k.value, h.prop = l, $(h).keydown(e), m.appendChild(h), k = document.createElement("img"), k.src = a.ea.Ga + "../Images/wd-wheel.png", k.style.verticalAlign = "middle", k.input = h, m.appendChild(k), $(k).click(b);
                else if ("text" === l.type) h = document.createElement("input"), h.setAttribute("type", "text"), h.value = k.value, h.prop = l, $(h).keydown(e), m.appendChild(h);
                else if ("textarea" === l.type) h = document.createElement("textarea"), h.setAttribute("rows", "3"), h.setAttribute("cols", "20"), h.value = k.value, h.prop = l, $(h).keydown(c), m.appendChild(h);
                else if ("button" === l.type) h = document.createElement("input"), h.setAttribute("type", "button"), h.value = "Edit", h.prop = l, $(h).click(d), m.appendChild(h);
                else throw "Error: No such property";
                a.$.append(m)
            }
        }
    }

    function fe(a, b, c) {
        var d = a.language.fn();
        if ("strokeStyle" === c) return {
            name: c,
            type: "colour",
            display: d("outline-colour")
        };
        if ("fillStyle" === c) return {
            name: c,
            type: "colour",
            display: d("fill-colour")
        };
        if ("lineWidth" === c) return a = [{
            name: d("thickness-pencil"),
            value: 1
        }, {
            name: d("thickness-pen"),
            value: 2
        }, {
            name: d("thickness-marker"),
            value: 4
        }, {
            name: d("thickness-brush"),
            value: 10
        }], !0 !== b.la("closed") && "TextNode" !== b.type() || a.unshift({
            name: d("none"),
            value: 0
        }), {
            name: c,
            display: d("outline-thickness"),
            type: "select",
            fa: a
        };
        if ("sloppiness" === c) return {
            name: "sloppiness",
            display: d("sloppiness"),
            type: "select",
            fa: [{
                name: d("sloppiness-draftsman"),
                value: 0
            }, {
                name: d("sloppiness-artist"),
                value: 0.25
            }, {
                name: d("sloppiness-cartoonist"),
                value: 0.5
            }, {
                name: d("sloppiness-child"),
                value: 1
            }, {
                name: d("sloppiness-drunk"),
                value: 2
            }]
        };
        if ("smoothness" === c) return {
            name: "smoothness",
            display: d("smoothness"),
            type: "select",
            fa: [{
                name: d("smoothness-sharpest"),
                value: 0
            }, {
                name: d("smoothness-sharper"),
                value: 0.1
            }, {
                name: d("smoothness-sharp"),
                value: 0.2
            }, {
                name: d("smoothness-smooth"),
                value: 0.3
            }, {
                name: d("smoothness-smoothest"),
                value: 0.5
            }]
        };
        if ("shadow" === c) return {
            name: "shadow",
            display: d("shadow"),
            type: "select",
            fa: [{
                name: d("yes"),
                value: !0
            }, {
                name: d("no"),
                value: !1
            }]
        };
        if ("dashes" === c) return {
            name: "dashes",
            display: d("line-style"),
            type: "select",
            fa: [{
                name: d("line-style-solid"),
                value: ""
            }, {
                name: d("line-style-short-dashes"),
                value: "5,5"
            }, {
                name: d("line-style-long-dashes"),
                value: "10,5"
            }]
        };
        if ("matrix" === c || "inverse" === c || "closed" === c || "commands" === c || "seed" === c) return {
            name: c,
            type: "none"
        };
        if ("text" === c) return {
            name: "text",
            display: d("text"),
            type: "textarea"
        };
        if ("textFillStyle" === c) return {
            name: "textFillStyle",
            display: d("text-colour"),
            type: "colour"
        };
        if ("fontSize" === c) return {
            name: "fontSize",
            display: d("font-size"),
            type: "select",
            fa: [{
                name: "10",
                value: 10
            }, {
                name: "12",
                value: 12
            }, {
                name: "15",
                value: 15
            }, {
                name: "20",
                value: 20
            }, {
                name: "30",
                value: 30
            }, {
                name: "40",
                value: 40
            }, {
                name: "50",
                value: 50
            }, {
                name: "60",
                value: 60
            }]
        };
        if ("fontName" === c) {
            b = [];
            c = a.ea.options.fonts;
            for (a = 0; a < c.length; a++) b.push({
                name: c[a],
                value: c[a]
            });
            return {
                name: "fontName",
                display: d("font"),
                type: "select",
                fa: b
            }
        }
        return "arrowSize" === c ? {
            name: "arrowSize",
            display: d("arrowhead-size"),
            type: "select",
            fa: [{
                name: d("arrowhead-size-none"),
                value: 0
            }, {
                name: d("arrowhead-size-tiny"),
                value: 10
            }, {
                name: d("arrowhead-size-small"),
                value: 15
            }, {
                name: d("arrowhead-size-medium"),
                value: 20
            }, {
                name: d("arrowhead-size-large"),
                value: 30
            }]
        } : "arrowStyle" === c ? {
            name: "arrowStyle",
            display: d("arrowhead-style"),
            type: "select",
            fa: [{
                name: d("arrowhead-style-simple"),
                value: "simple"
            }, {
                name: d("arrowhead-style-solid"),
                value: "solid"
            }]
        } : "doubleArrow" === c ? {
            name: "doubleArrow",
            display: d("double-arrows"),
            type: "select",
            fa: [{
                name: d("no"),
                value: !1
            }, {
                name: d("yes"),
                value: !0
            }]
        } : "url" === c ? {
            name: "url",
            display: d("image-url"),
            type: "text"
        } : "mathml" === c ? {
            name: "mathml",
            display: "Equation",
            type: "button"
        } : "rows" === c ? {
            name: c,
            display: "Rows",
            type: "text"
        } : "columns" === c ? {
            name: c,
            display: "Columns",
            type: "text"
        } : {
            name: c,
            display: "Display-" + c,
            type: "text"
        }
    }
    Re.prototype = $.extend({}, se.prototype, Re.prototype);

    function Ue(a, b) {
        var c, d = this;
        this.$ = a;
        this.$.empty();
        "absolute" !== this.$.css("position") && this.$.css("position", "relative");
        this.tc = new ue($("<div>"));
        this.$.append(this.tc.$);
        this.ea = new Db(b);
        this.language = new Ga(Fb);
        Ia(this.language, this.ea.get("language"));
        this.Zb = null;
        this.canvas = $(ha(this.$[0]));
        this.canvas.css("outline", "0");
        this.canvas.css("position", "absolute");
        this.canvas.attr("tabindex", "0");
        this.ca = this.canvas[0].getContext("2d");
        this.ea.Wb() ? this.mb = new Ke(this.$, 40, !0, !1) : this.mb = new Ke(this.$, 20, !1, !1);
        this.ga = new z;
        this.ga.bind("document-changed", function () {
            Ve(d)
        });
        this.ga.bind("document-changed", function () {
            Ve(d)
        });
        this.view = new Td(this.canvas, new le, this.mb, this.ga, this.ea, this.language);
        We(this);
        Xe(this);
        Ye(this);
        this.jb = new Re(this.ea, this.language);
        this.$.append(this.jb.$);
        this.ea.kf() && (this.view.jb = this.jb);
        this.jb.view = this.view;
        this.jb.on("click", function () {
            d.focus("none")
        });
        $(window).resize(function () {
            return d.oc()
        });
        this.ga.bind("resize", function () {
            return d.oc
        });
        this.query = zb();
        this.Vb = "debug" in this.query || this.ea.Vb();
        this.wb = new xe(this.$);
        this.wb.$.css("border-right", "1px solid black");
        this.tb = new xe(this.$);
        this.tb.$.css("border-top", "1px solid black");
        ye(this.tb);
        this.tb.on("click", function (a) {
            return ee(d.view, a)
        });
        this.wb.on("click", function (a) {
            return Ze(d, a)
        });
        null !== this.ea.options.backgroundImage && (Ze(this, this.ea.options.backgroundImage), this.view.ia.Ea = new Ya);
        $e(this);
        this.ea.get("showMathTool") && (c = new qa, c.load(function () {
            d.log("App: MJAX loaded.");
            return d.view.re(c)
        }));
        this.ea.on("update", function (a, b) {
            d.ne(a, b)
        });
        this.Ab = null;
        this.Ue = this.Ve = -1;
        this.yb = new Ja($("<div>"));
        Na(this.yb, this.ea.get("showPageSelector"));
        this.$.append(this.yb.$);
        this.oc();
        this.yb.on("goto-page", function (a) {
            d.view.lb(a)
        });
        this.ea.get("setFocus") && this.focus("toolbar");
        this.ea.get("pageView") && this.view.zoom("page");
        this.ff = new Fa;
        this.ff.start()
    }
    Ue.prototype = {
        log: s("APP"),
        ne: function (a, b) {
            var c = !1;
            this.log("onConfigChange %s=%s", a, b);
            switch (a) {
            case "debug":
                this.Vb = b;
                c = !0;
                break;
            case "showPageSelector":
                c = !0, Na(this.yb, b)
            }
            c && this.oc(!0)
        },
        Dc: function (a) {
            this.Zb = null;
            this.view.Dc(a);
            We(this);
            af(this);
            this.Ab && (this.Ab.emit("document-changed"), this.Ab.emit("set-page", a.nb))
        },
        focus: function (a) {
            this.log("Set focus to %s", a);
            if ("toolbar" !== a && "canvas" !== a && "none" !== a) throw "Focus must be toolbar or canvas or none, not " + a;
            this.Hc = a;
            "toolbar" === this.Hc ? (this.toolbar.focus(), a = this.view, a.ta.bb && (a.ta.bb = !1, a.ha()), this.$.focus()) : "canvas" === this.Hc && (this.toolbar.blur(), this.$.focus())
        },
        Mb: function (a) {
            this.focus("canvas");
            this.view.Mb(a)
        },
        createNode: function (a, b, c) {
            var d;
            d = this.view.ia.Da;
            "layer" in c || (c.layer = this.view.Ka);
            a.push(new D(b, c));
            return d
        },
        xe: function (a, b, c, d) {
            c = new K(c, d);
            a.push(new N([b], c, c.inverse()));
            return !0
        },
        Yd: function (a, b) {
            return a.push(new cb([b]))
        },
        sd: function () {
            this.Dc(new le);
            null !== this.ea.options.backgroundImage && (Ze(this, this.ea.options.backgroundImage), this.view.ia.Ea = new Ya)
        },
        oc: function (a) {
            var b, c, d, e, f, g, h, k, l, m, p, q, r, v, w;
            v = $(window).width();
            h = $(window).height();
            if (a || v !== this.Kf || h !== this.Jf) this.Kf = v, this.Jf = h, v = this.$.width() - 0, h = this.$.height() - 0, 0 >= v || !a && v === this.Ve && h === this.Ue || (this.Ve = v, this.Ue = h, this.ea.options.showMenu ? (this.gc.show(), this.gc.moveTo(0, 0), this.gc.width(v), l = this.gc.height()) : (this.gc.hide(), l = 0), this.ea.options.showBackgroundSelector ? (b = 100, this.wb.show()) : (b = 0, this.wb.hide()), this.ea.options.showImageSelector ? (e = 100, this.tb.show()) : (e = 0, this.tb.hide()), this.ea.options.showPageSelector ? (this.yb.$.show(), w = this.yb.$.outerWidth()) : (this.yb.$.hide(), w = 0), this.ea.gg() ? (this.mb.show(), Le(this.mb, v), a = this.mb.height()) : (this.mb.hide(), a = 0), this.log("Colour panel height is %s", a), this.ea.hg() ? (this.toolbar.show(!0), c = h - l - a, d = this.toolbar, 0 >= c || (f = 52 * Math.ceil(d.Id / c) + 1, d.$.style.width = "" + f + "px", d.log("Toolbar width/height = %s,%s totalHeight=%s", f, c, d.Id)), r = this.toolbar.width()) : (this.toolbar.show(!1), r = 0), c = Jd(this.view), this.toolbar.moveTo(b + w, l), f = h - a, g = m = q = 0, this.Vb && (g = this.tc.width()), (p = this.ea.kf() && 700 <= v) && (m = 300), q += m + g, k = v - 2 * c - b - q, d = h - 2 * c - a - l - e, this.wb.width(b), this.wb.height(h - 2 * c - l - a), this.wb.moveTo(0, l), this.yb.$.css("top", "" + l + "px"), this.yb.$.css("left", "0"), this.tb.width(k), this.tb.height(e), this.tb.moveTo(b, h - 2 * c - a - e), e = w + b + r, b = v - 2 * c - r - q - b - w, this.log("menuHeight = %s", l), this.canvas.css("left", "" + e + "px"), this.canvas.css("top", "" + l + "px"), this.canvas.attr("width", "" + b), this.canvas.attr("height", "" + d), this.mb.moveTo(0, f), Le(this.mb, v), this.mb.ha(), this.Vb ? (this.tc.show(), this.tc.moveTo(v - g, l), this.tc.height(h - 2 * c - a - l)) : this.tc.hide(), p ? (this.jb.show(), this.jb.moveTo(v - g - m, l), this.jb.width(m), this.jb.height(h - 2 * c - l - a)) : this.jb.hide(), h = this.view, a = $(h.canvas), b = a.offset(), w = $(h.canvas.parentNode).offset(), v = a.width(), a = a.height(), l = b.left - w.left, b = b.top - w.top, w = Jd(h), h.qb.moveTo(l + v - 20 + w, b + w), gc(h.qb, 20, a - 20), h.Gb.moveTo(l + w, b + a - 20 + w), gc(h.Gb, v - 20, 20), de(h), h.ha())
        },
        emit: function (a, b) {
            return this.ga.emit(a, b)
        },
        ue: function (a) {
            this.Ab = a;
            Ma(this.yb, a);
            this.view.ue(a);
            this.Ab.emit("document-changed");
            this.Ab.emit("set-page", this.view.ia.nb)
        },
        Dd: function (a, b, c, d) {
            this.log("External app setItemProperty %s: %s=%s", b, c, d);
            a.push(new Vc([b], c, d))
        },
        se: function (a, b, c) {
            var d;
            this.log("External app setNodeProperty %s: %s", b, c);
            if (b in this.view.ia.oa) {
                for (d in c) c.hasOwnProperty(d) && a.push(new Vc([b], d, c[d]));
                if (0 < a.length) return this.view.qa(a)
            } else return this.log("setItemProperties: Node %s does not exist", b)
        },
        nd: function (a, b) {
            var c, d;
            (c = V(this.view.ia, a)) && (d = c.la(b));
            this.log("GetItemProperty %s: %s=%s", a, b, d);
            return d
        },
        Wd: function (a, b) {
            var c, d, e, f, g, h;
            if (6 > b.length) this.log("newShape: Cannot create shape with fewer than three points.");
            else {
                c = new Ec;
                e = g = 0;
                for (h = b.length - 1; g <= h; e = g += 2) f = this.view.Ta(new u(b[e], b[e + 1])), 0 === e ? (c.moveTo(f.x, f.y), d = f) : c.lineTo(f.x, f.y);
                c.lineTo(d.x, d.y);
                c.close();
                return this.hd(a, c.toArray())
            }
        },
        hd: function (a, b) {
            return this.createNode(a, "PathNode", {
                commands: b,
                fillStyle: this.view.Cb,
                strokeStyle: this.view.Db,
                seed: Math.round(65535 * Math.random()),
                lineWidth: this.view.wa.lineWidth,
                sloppiness: this.view.wa.sloppiness
            })
        },
        sc: function (a, b) {
            var c;
            c = this.view.ia.Da;
            a.push(new td(b));
            return c
        }
    };

    function hb(a) {
        var b, c, d;
        d = db(a.view.ia);
        b = $("<canvas>");
        b.attr("width", "" + d.width);
        b.attr("height", "" + d.height);
        c = b[0].getContext("2d");
        c.translate(-d.x, -d.y);
        Xd(a.view, c, d.width, d.height);
        a.view.ia.ha(c);
        return b[0].toDataURL()
    }

    function Ze(a, b) {
        var c, d;
        c = [];
        null !== a.Zb && a.Zb in a.view.ia.oa && c.push(new cb([a.Zb]));
        d = a.view.ia.Da;
        c.push(new D("ImageNode", {
            url: b,
            locked: !0,
            layer: a.view.Ka
        }));
        c.push(new yd([d], Ad));
        a.Zb = d;
        a.view.qa(c);
        O(a.view);
        return Fc(a.view)
    }
    function af(a) {
        a.Zb = null;
        a.view.ia.each(!1, function (b) {
            "ImageNode" === b.type() && !0 === b.la("locked") && (a.log("Found background image at nodeid %s", b.id), a.Zb = b.id)
        })
    }
    function bf(a) {
        a.focus("canvas");
        Uc(a.view)
    }

    function Ye(a) {
        a.Hc = "none";
        a.Ca = new Wc;
        a.Ca.map("left", "left");
        a.Ca.map("right", "right");
        a.Ca.map("up", "up");
        a.Ca.map("down", "down");
        a.Ca.map("esc", "select-none");
        a.Ca.map("esc", "cancel");
        a.Ca.map("home", "bring-to-front");
        a.Ca.map("end", "send-to-back");
        a.Ca.map("pageup", "move-up");
        a.Ca.map("pagedown", "move-down");
        a.Ca.map("shift+pageup", "previous-page");
        a.Ca.map("shift+pagedown", "next-page");
        a.Ca.map("ctrl+d", "duplicate");
        a.Ca.map("delete,backspace", "delete");
        a.Ca.map("c", "curve-tool");
        a.Ca.map("l", "line-tool");
        a.Ca.map("ctrl+shift+g", "ungroup");
        a.Ca.map("ctrl+g", "group");
        a.Ca.map("ctrl+z", "undo");
        a.Ca.map("ctrl+shift+z", "redo");
        a.Ca.map("ctrl+x", "cut");
        a.Ca.map("ctrl+c", "copy");
        a.Ca.map("ctrl+v", "paste");
        a.Ca.map("=", "zoom-1-1");
        a.Ca.map("+,shift+=", "zoom-in");
        a.Ca.map("-", "zoom-out");
        a.Ca.map("f4", "zoom-to-page");
        a.Ca.map("shift+f4", "zoom-to-width");
        a.Ca.map("left,up", "previous");
        a.Ca.map("down,right", "next");
        a.Ca.map("enter", "enter");
        a.Ca.on("*", function (b, c) {
            "toolbar" === a.Hc ? a.toolbar.Ib(b, c) : "canvas" === a.Hc ? a.view.Ib(b, c) : a.log("Ignore key action -- don't have focus.")
        });
        a.$.attr("tabindex", "0");
        Yc(a.Ca, a.$[0]);
        a.canvas.click(function () {
            ja() ? a.Hc = "canvas" : a.focus("canvas")
        });
        $(a.toolbar.$).click(function () {
            a.focus("toolbar")
        });
        a.mb.on("colour", function () {
            a.focus("canvas")
        });
        a.ga.on("goto-toolbar", function () {
            a.focus("toolbar")
        });
        a.ga.on("goto-canvas", function () {
            a.focus("canvas")
        })
    }

    function Xe(a) {
        function b(a) {
            return 0 === a.type.indexOf("key")
        }
        var c, d, e, f, g, h, k = a.language.fn();
        a.toolbar = new Gb(a.ea.Wb());
        if (a.ea.get("showToolbar")) {
            a.ea.get("showPickTool") && Jb(a.toolbar, "pick", k("pick-tool"), a.ea.Ga + "../Images/wd-pick.png", function (c) {
                E(a.view);
                b(c) && a.Mb()
            });
            a.ea.get("showSquareTool") && a.toolbar.fb(a.ea.Ga + "../Images/wd-box.png", k("rectangle-tool"), function (c) {
                qb(a.view, 0);
                b(c) && bf(a)
            });
            a.ea.get("showRoundRectTool") && a.toolbar.fb(a.ea.Ga + "../Images/wd-roundrect.png", k("rounded-rectangle-tool"), function (c) {
                qb(a.view, a.ea.get("defaultRoundRectRadius"));
                b(c) && bf(a)
            });
            a.ea.get("showCircleTool") && a.toolbar.fb(a.ea.Ga + "../Images/wd-circle.png", k("circle-tool"), function (c) {
                lb(a.view);
                b(c) && bf(a)
            });
            a.ea.get("showShapeBrushTool") && Jb(a.toolbar, "shapebrush", k("shape-brush-tool"), a.ea.Ga + "../Images/wd-shapebrush.png", function (c) {
                ob(a.view, a.view.Nb, a.view.uc);
                b(c) && a.Mb()
            });
            a.ea.fg() && Jb(a.toolbar, "brush", k("brush-tool"), a.ea.Ga + "../Images/wd-brush.png", function (c) {
                kb(a.view, a.view.Nb, a.view.uc);
                b(c) && a.Mb()
            });
            a.ea.get("showLineTool") && Jb(a.toolbar, "line", k("line-tool"), a.ea.Ga + "../Images/wd-line.png", function (c) {
                nb(a.view);
                b(c) && a.Mb()
            });
            a.ea.get("showCurveTool") && Jb(a.toolbar, "curve", k("curve-tool"), a.ea.Ga + "../Images/wd-curve.png", function (c) {
                mb(a.view);
                b(c) && a.Mb()
            });
            a.ea.get("showArrowTool") && Jb(a.toolbar, "arrow", k("arrow-tool"), a.ea.Ga + "../Images/wd-arrow.png", function (c) {
                jb(a.view);
                b(c) && a.Mb()
            });
            a.ea.get("showTextTool") && Jb(a.toolbar, "text", k("text-tool"), a.ea.Ga + "../Images/wd-text.png", function (c) {
                var d = a.view,
                    e, f;
                "interactive" === d.ea.get("textMode") ? rb(d) : (e = d.ia.Da, f = d.Ta(new u(100, 100)), f = new K(f.x, f.y), d.qa([new D("TextNode", {
                    text: d.ea.options.defaultText,
                    fontSize: d.wa.fontSize,
                    fontName: d.wa.fontName,
                    textFillStyle: d.wa.textFillStyle,
                    layer: d.Ka
                }), new N([e], f, f.inverse())]));
                b(c) && a.Mb(!0)
            });
            a.ea.get("showMathTool") && a.toolbar.fb(a.ea.Ga + "../Images/wd-equation.png", k("math-tool"), function () {
                var b = a.view,
                    c, d;
                E(b);
                c = b.ia.Da;
                d = new K(100, 100);
                b.qa([new D("MathNode", {
                    mathml: "<math xmlns='http://www.w3.org/1998/Math/MathML'></math>",
                    layer: b.Ka
                }), new N([c], d, d.inverse())]);
                b.ga.emit("math.edit", c)
            });
            c = function (b) {
                a.toolbar.fb(d, b.name, function () {
                    a.log("Custom button %s clicked.", b.name);
                    b.onclick(a.Ab)
                })
            };
            g = 0;
            for (h = cf.length; g < h; g++) e = cf[g], f = e.name, d = e.image, a.log("add custom button %s", f), c(e);
            Ib(a.toolbar, "pick");
            a.ea.options.showImageTool && a.toolbar.fb(a.ea.Ga + "../Images/wd-image.png", k("image-tool"), function () {
                ee(a.view, "logo.png")
            });
            a.ea.options.showMoveToFrontBack && (a.toolbar.fb(a.ea.Ga + "../Images/wd-moveup.png", k("bring-to-front"), function () {
                a.ga.emit("menu.bringToFront")
            }), a.toolbar.fb(a.ea.Ga + "../Images/wd-movedown.png", k("send-to-back"), function () {
                a.ga.emit("menu.sendToBack")
            }));
            a.ea.options.showMenu || (a.ea.get("showUndoRedo") && (a.toolbar.fb(a.ea.Ga + "../Images/wd-undo.png", k("undo"), function () {
                a.ga.emit("menu.undo")
            }), a.toolbar.fb(a.ea.Ga + "../Images/wd-redo.png", k("redo"), function () {
                a.ga.emit("menu.redo")
            })), a.ea.get("showCopyPaste") && (a.toolbar.fb(a.ea.Ga + "../Images/wd-copy.png", k("copy"), function () {
                a.ga.emit("menu.copy")
            }), a.toolbar.fb(a.ea.Ga + "../Images/wd-paste.png", k("paste"), function () {
                a.ga.emit("menu.paste")
            })))
        }
        a.toolbar.on("click", function () {
            a.focus("toolbar")
        });
        a.toolbar.$.style.position = "absolute";
        a.toolbar.$.style.left = "0";
        a.toolbar.$.style.right = "0";
        a.$.append(a.toolbar.$);
        a.ga.on("pick-tool", function () {
            Ib(a.toolbar, "pick")
        });
        a.ga.on("text-tool", function () {
            Ib(a.toolbar, "text")
        });
        a.ga.on("line-tool", function () {
            Ib(a.toolbar, "line")
        });
        a.ga.on("curve-tool", function () {
            Ib(a.toolbar, "curve")
        });
        a.ga.on("arrow-tool", function () {
            Ib(a.toolbar, "arrow")
        });
        a.ga.on("brush-tool", function () {
            Ib(a.toolbar, "brush")
        });
        c = new sb;
        e = new sb;
        G(e, "New", "menu.new");
        vb(c, "File", e);
        e = new sb;
        G(e, "Undo\tCtrl+Z", "menu.undo");
        G(e, "Redo\tCtrl+Shift+Z", "menu.redo");
        wb(e);
        G(e, "Cut\tCtrl+X", "menu.cut");
        G(e, "Copy\tCtrl+C", "menu.copy");
        G(e, "Paste\tCtrl+V", "menu.paste");
        G(e, "Duplicate\tCtrl+D", "menu.duplicate");
        wb(e);
        G(e, "Delete\tDel", "menu.delete");
        vb(c, "Edit", e);
        e = new sb;
        G(e, "Raise", "menu.moveUp");
        G(e, "Lower", "menu.moveDown");
        G(e, "Raise to front", "menu.bringToFront");
        G(e, "Send to back", "menu.sendToBack");
        wb(e);
        G(e, "Group", "menu.group");
        G(e, "Break apart group", "menu.ungroup");
        vb(c, "Arrange", e);
        e = new sb;
        G(e, "No Outline", "menu.outline-none");
        G(e, "Pencil Outline", "menu.outline-pencil");
        G(e, "Pen Outline", "menu.outline-pen");
        G(e, "Marker Outline", "menu.outline-marker");
        wb(e);
        G(e, "No shadow", "menu.shadow-none");
        G(e, "Shadow", "menu.shadow");
        wb(e);
        G(e, "Draftsman", "menu.sloppiness-draftsman");
        G(e, "Artist", "menu.sloppiness-artist");
        G(e, "Cartoonist", "menu.sloppiness-cartoonist");
        G(e, "Child", "menu.sloppiness-child");
        G(e, "Drunk", "menu.sloppiness-drunk");
        vb(c, "Appearance", e);
        e = new sb;
        G(e, "Arial", "menu.font.Arial");
        G(e, "Times New Roman", "menu.font.Times New Roman");
        vb(c, "Font", e);
        e = new sb;
        G(e, "Force redraw", "menu.force-redraw");
        wb(e);
        G(e, "Rebuild document", "menu.rebuild-doc");
        G(e, "Show/Hide Debug Panel", "menu.toggle-debug");
        G(e, "dump", "menu.dump");
        vb(c, "Debug", e);
        a.gc = new ze(c, a.ga);
        a.$.append(a.gc.$);
        a.gc.moveTo(0, 0);
        a.ga.bind("menu.new", function () {
            a.sd()
        });
        a.ga.bind("menu.force-redraw", function () {
            a.view.update(!0)
        });
        a.ga.bind("menu.remove-cookie", function () {
            var a = "cookieid",
                b = "",
                c;
            c = new Date;
            c.setTime(c.getTime() + -1E3);
            a = encodeURIComponent(a);
            b = encodeURIComponent(b);
            a = "" + a + "=" + b + "; expires=" + c.toGMTString() + "; path=/";
            la("Set document.cookie=%s", a);
            document.cookie = a
        });
        a.ga.bind("menu.rebuild-doc", function () {
            for (var b = a.view.ia; b.Ea.Ua(b););
            if (b.root.children.length) throw "Error: There should be 0 children length.";
            if (1 !== b.Da) throw "Error: nextId should be 1";
            for (; b.Ea.Pa(b););
        });
        a.ga.bind("menu.toggle-debug", function () {
            a.Vb = !a.Vb;
            var b = a.Vb,
                c;
            c = zb();
            b ? c.debug = "1" : delete c.debug;
            var d, e;
            e = [];
            b = !0;
            for (d in c) c.hasOwnProperty(d) && (b || e.push("&"), b = !1, e.push(encodeURIComponent(d)), "" !== c[d] && (e.push("="), e.push(encodeURIComponent(c[d]))));
            window.location.hash = e.join("");
            a.oc()
        });
        a.ga.bind("menu.dump", function () {
            window.console.log(re(a.view.ia.root))
        });
        a.ga.bind("math.edit", function (b) {
            a.Ab && (a.log("Starting equation editor"), a.Ab.emit("math.edit", b))
        })
    }
    function Ve(a) {
        a.log("Local document changed.");
        a.Ab.emit("document-changed")
    }

    function We(a) {
        a.ea.options.sloppy || he(a.view, "sloppiness", 0);
        var b;
        b = ("" + a.ea.options.defaultSmoothness).toLowerCase();
        he(a.view, "smoothness", "sharpest" === b ? 0 : "sharper" === b ? 0.1 : "sharp" === b ? 0.2 : "smoothest" === b ? 0.5 : 0.3);
        he(a.view, "fillStyle", a.ea.options.defaultFillStyle);
        he(a.view, "strokeStyle", a.ea.options.defaultStrokeStyle);
        he(a.view, "fontName", a.ea.options.defaultFont);
        he(a.view, "fontSize", a.ea.options.defaultFontSize);
        he(a.view, "lineWidth", a.ea.options.defaultLineWidth);
        he(a.view, "textFillStyle", a.ea.options.defaultTextFillStyle)
    }
    function $e(a) {
        var b, c, d, e, f;
        a.canvas[0].getContext("2d");
        e = a.ea.options.fonts;
        f = [];
        c = 0;
        for (d = e.length; c < d; c++) b = e[c], a.log("Preloading: %s", b), b = $("<div>").css("font-family", b).text("abcd"), b.css("color", "white"), f.push(a.$.append(b))
    };
    "jQuery" in window && (window.jQuery.fn.zwibbler = function (a) {
        a = a || {};
        var b = null;
        this.each(function (c, d) {
            d.zwibbler && $(d).empty();
            var e = new Ue($(d), a);
            d.zwibbler = new A(e);
            b = d.zwibbler
        });
        return b
    }, window.jQuery.fn.zwibblerContext = function () {
        return this[0].zwibbler
    });
    var cf = [],
        Jc = {};
    window.Zwibbler = {
        create: function (a, b) {
            var c = document.getElementById(a);
            if (null === c) return alert("Zwibbler.create: Cannot find an element with id " + a), null;
            c = new Ue($(c), b);
            return new A(c)
        },
        addButton: function (a) {
            for (var b = ["name", "image", "onclick"], c = 0; c < b.length; c++) if (!(b[c] in a)) return alert("Zwibbler.addButton: missing " + b[c]), !1;
            cf.push(a);
            return !0
        },
        addCustomNode: function (a, b) {
            Jc[a] = b
        },
        Dialog: function (a, b) {
            function c() {
                f.hide();
                d.hide();
                if (b.onhide) b.onhide()
            }
            var d = $("#" + a);
            b = b || {};
            var e = ka(d[0]),
                f = new aa("rgba(0,0,0,0.5)");
            f.zIndex = e;
            f.insertBefore = d;
            return {
                show: function () {
                    d.show();
                    var a = d.width(),
                        e = d.height();
                    d.css("left", "50%");
                    d.css("top", "50%");
                    d.css("margin-left", "" + -a / 2 + "px");
                    d.css("margin-top", "" + -e / 2 + "px");
                    f.show(c);
                    if (b.onshow) b.onshow()
                },
                hide: c
            }
        },
        SlidingPanel: function (a, b) {
            b = b || {};
            var c = $("#" + a),
                d = new Ra(c);
            if (b.onshow) d.on("show", b.onshow);
            if (b.onhide) d.on("hide", b.onhide);
            return {
                show: function (a) {
                    d.show(a)
                },
                hide: function () {
                    d.hide()
                }
            }
        }
    };
    A.prototype.abortTransaction = A.prototype.pf;
    A.prototype.addPage = A.prototype.qf;
    A.prototype.beginTransaction = A.prototype.sf;
    A.prototype.canRedo = A.prototype.qc;
    A.prototype.canUndo = A.prototype.rc;
    A.prototype.clearUndo = A.prototype.tf;
    A.prototype.clickColour = A.prototype.uf;
    A.prototype.commitIrreversibleTransaction = A.prototype.vf;
    A.prototype.commitTransaction = A.prototype.Vd;
    A.prototype.copy = A.prototype.copy;
    A.prototype.createGroup = A.prototype.sc;
    A.prototype.createNode = A.prototype.createNode;
    A.prototype.createPath = A.prototype.hd;
    A.prototype.createShape = A.prototype.Wd;
    A.prototype.deleteNode = A.prototype.Yd;
    A.prototype.deletePage = A.prototype.Ie;
    A.prototype.dirty = A.prototype.Zd;
    A.prototype.download = A.prototype.$d;
    A.prototype.draw = A.prototype.ha;
    A.prototype.getCurrentPage = A.prototype.xc;
    A.prototype.getDocumentSize = A.prototype.Me;
    A.prototype.getDrawingRectangle = A.prototype.zf;
    A.prototype.getItemProperty = A.prototype.Bf;
    A.prototype.getNodeProperty = A.prototype.nd;
    A.prototype.getPageCount = A.prototype.dc;
    A.prototype.insertPage = A.prototype.Oc;
    A.prototype.load = A.prototype.load;
    A.prototype.newDocument = A.prototype.sd;
    A.prototype.nextPage = A.prototype.nextPage;
    A.prototype.on = A.prototype.on;
    A.prototype.paste = A.prototype.vd;
    A.prototype.previousPage = A.prototype.Wf;
    A.prototype.redo = A.prototype.Pa;
    A.prototype.resize = A.prototype.resize;
    A.prototype.save = A.prototype.save;
    A.prototype.setActiveLayer = A.prototype.pe;
    A.prototype.setBackgroundBrowserImages = A.prototype.$f;
    A.prototype.setConfig = A.prototype.ag;
    A.prototype.setCurrentPage = A.prototype.Cd;
    A.prototype.setCustomBackgroundFn = A.prototype.qe;
    A.prototype.setDocumentSize = A.prototype.Vc;
    A.prototype.setPaperSize = A.prototype.gf;
    A.prototype.setIconBrowserImages = A.prototype.bg;
    A.prototype.setItemProperty = A.prototype.cg;
    A.prototype.setNodeProperties = A.prototype.se;
    A.prototype.setNodeProperty = A.prototype.Dd;
    A.prototype.setPageView = A.prototype.te;
    A.prototype.setZoom = A.prototype.eg;
    A.prototype.showLayer = A.prototype.Wc;
    A.prototype.translateNode = A.prototype.xe;
    A.prototype.undo = A.prototype.Ua;
    A.prototype.useArrowTool = A.prototype.rg;
    A.prototype.useBrushTool = A.prototype.sg;
    A.prototype.useCircleTool = A.prototype.tg;
    A.prototype.useCurveTool = A.prototype.ug;
    A.prototype.useLineTool = A.prototype.vg;
    A.prototype.usePickTool = A.prototype.wg;
    A.prototype.useShapeBrushTool = A.prototype.xg;
    A.prototype.useStampLineTool = A.prototype.zg;
    A.prototype.useSquareTool = A.prototype.yg;
    A.prototype.useTextTool = A.prototype.Ag;
    Ue.prototype.emit = Ue.prototype.emit;
    Ue.prototype.createGroup = Ue.prototype.sc;

})();