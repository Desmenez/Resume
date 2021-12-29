requirejs.config({
    shim:{
        bootstrap:['jquery'],
        hashchange:['jquery']
    },
    paths:{
        jquery:'jquery-1.7.2.min',
        underscore:'lodash.min',
        knockout:'knockout-2.1.0',
        pager:'pager.min',
        bootstrap:'bootstrap/js/bootstrap.min',
        hashchange:'jquery.ba-hashchange.min',
        "zoidberg":'character/zoidberg'
    }
});

requirejs(['jquery', 'knockout', 'underscore', 'pager', 'bootstrap', 'hashchange'], function ($, ko, _, pager) {


    ko.bindingHandlers['prettyprint'] = {
        init:function(element) {
            var $element = $(element);
            $element.html(prettyPrintOne($element.html(), undefined, true));
        }
    };

    ko.bindingHandlers['tooltip'] = {
        init:function(element) {
            $(element).tooltip();
        }
    };

    var getActivePages = function() {
        var pages = [];
        var active = pager.page;
        while(active != null && active.currentChildPage()() != null) {
            active = active.currentChildPage()();
            pages.push(active);
        }
        return pages;
    };

    var viewModel = {
        closePage: function(page) {
            return function() {
                page.hideElementWrapper();
                return true;
            };
        },
        theID: ko.observable(''),
        name:ko.observable("Pelle"),
        description:ko.observable('pl'),
        externalContentLoaded:function (page) {
        },
        externalContentLazyLoaded: function(page) {
        },
        afterFryIsDisplayed:function () {
            $('body').css("background-color", "#FF9999");
        },
        beforeFryIsHidden:function () {
            $('body').stop().css("background-color", "#FFFFFF");
        },
        showFry:function (page, callback) {
            $(page.element).fadeIn(1000, callback);
        },
        hideFry:function (page, callback) {
            var $e = $(page.element);
            if (!page.pageHiddenOnce) {
                page.pageHiddenOnce = true;
                $e.hide();
            } else {
                $e.fadeOut(1000, function () {
                    $e.hide();
                });
                if (callback) {
                    callback();
                }
            }
        },
        textLoader:function (page, element) {
            var loader = {};
            var txt = $('<h3></h3>', {text:'Loading ' + page.getValue().title});
            loader.load = function () {
                $(element).prepend(txt);
            };
            loader.unload = function () {
                txt.remove();
            };
            return loader;
        },
        randomFailed:function (options) {
            var page = options.page;
            var route = options.route;
            viewModel.newChildren.push({
                childId:route[0]
            });
            page.showPage(route);
        },
        newChildren:ko.observableArray([])
    };

    window.delaySource = function(url) {
        var iframe = $('<iframe width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        return function(page, callback) {
            setTimeout(function() {
                $(page.element).append(iframe);
                iframe.attr('src', url);
                callback();
            }, 2000);
        };
    };

    window.requireVM = function (module) {
        return function (callback) {
            require([module], function (mod) {
                callback(mod.getVM());
            });
        };
    };

    window.requireView = function (viewModule) {
        return function (page, callback) {
            require([viewModule], function (viewString) {
                $(page.element).html(viewString);
                callback();
            });
        };
    };

    window.recapLoaded = function (page) {
        $('.tt').tooltip();

        // for each h3
        var h3s = $('h3', $(page.element));
        $.each(h3s, function (h3Index, h3) {
            var $h3 = $(h3);
            // get all siblings until another h3 or h2
            var siblings = $([]);
            var sibling = $h3.next();
            while (sibling && sibling.length > 0 && sibling[0].tagName.toLocaleLowerCase() !== 'h3' && sibling[0].tagName.toLocaleLowerCase() !== 'h2') {
                siblings.push(sibling);
                sibling = sibling.next();
            }
            // hide all siblings
            siblings.toggle();
            // on h3-click toggle all siblings
            $h3.click(function () {
                siblings.toggle();
            });
        });
    };

    pager.onBindingError.add(function(event) {
        var page = event.page;
        $(page.element).empty().append('<div class="alert"> Error Loading Page</div>');
    });

    pager.onSourceError.add(function(event) {
        var page = event.page;
        var url = event.url;
        $(page.element).empty().append($('<div></div>', {text: 'Error loading page ' + url, "class" : 'alert'}));
    });


    var indexOfCurrentPage = function(page) {
        return page.parentPage.children.indexOf(page);
    };

    var pageStep = function(page, step) {
        return ko.computed(function() {
            var rawStep = ko.utils.unwrapObservable(step);
            return page.parentPage.children()[(Math.abs(indexOfCurrentPage(page))) + rawStep] || page.nullObject;
        });
    };


    var NextPage = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        this.element = element;
        this.bindingContext = bindingContext;
        this.path = ko.observable();
        var parent = pager.getParentPage(bindingContext);
        this.siblingPage = pageStep(parent, valueAccessor());
        this.path = ko.computed(function () {
            var value = this.siblingPage();
            return value.getFullRoute()().join('/');
        }, this);
    };

    NextPage.prototype.bind = function () {
        var text = $(this.element).text();

        ko.computed(function () {
            var page = this.siblingPage();
            if (text.length === 0) {
                var newText = page.val('title');
                ko.applyBindingsToNode(this.element, {
                    text:newText
                });
            } else if (text.indexOf('{0}')) {
                var replacedText = text.replace('{0}', page.val('title'));
                ko.applyBindingsToNode(this.element, {
                    text:replacedText
                });
            }
        }, this);

        var hash = ko.computed(function () {
            return pager.Href.hash + this.path();
        }, this);

        ko.applyBindingsToNode(this.element, {
            attr:{
                'href':hash
            }
        });
    };

    ko.bindingHandlers['page-step'] = {
        init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var nextPage = new NextPage(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            nextPage.bind();
        }
    };



    $(function () {

        pager.Href.hash = '#!/';

        pager.extendWithPage(viewModel);

        viewModel.activePageChildren = ko.computed(function() {
            var p = getActivePages();
            return p.slice(0, p.length - 1);
        });
        viewModel.activePage = ko.computed(function() {
            var p = getActivePages();
           return p[p.length-1];
        });

        window.VM = viewModel;
        ko.applyBindings(viewModel);
        pager.start();

        $('.dropdown-toggle').dropdown();
    });


});