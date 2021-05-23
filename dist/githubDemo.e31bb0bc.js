// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var token = "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";

function myFunction() {
  var username = document.getElementById("search_term").value;
  var body = {
    query: "query {\n    user(login:\"Teepath\" ){\n      avatarUrl\n      createdAt\n      bio\n      name\n      \n      email\n      repositories(first: 20, orderBy:{field: CREATED_AT, direction:DESC}){\n           edges{\n            node{\n              ... on Repository{\n                name,\n                id,\n                owner{\n                  login\n                },\n                stargazers{\n                  totalCount\n                },\n                primaryLanguage {\n                  name\n                }\n                description\n                url\n                pushedAt\n                updatedAt\n                forkCount\n               \n                \n               \n              }\n            }\n          }\n      }\n      \n    }\n  }\n  "
  };
  var baseUrl = "https://api.github.com/graphql";
  var headers = {
    Authorization: "Bearer ".concat(token)
  };
  axios.post(baseUrl, JSON.stringify(body), {
    method: "POST",
    headers: headers
  }).then(function (response) {
    console.log(response.data.data.user.avatarUrl);
    myLoadData(response.data.data);
  }).catch(function (err) {
    return console.log(JSON.stringify(err));
  });
}

myFunction();

function getUserRepo() {
  // var token =process.env.GITHUB_TOKEN;
  var username = document.getElementById("search_term").value;
  var git_data = {// "token": "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",
    // "username": "Teepath",
  };
  var body = {
    query: "query {\n    user(login:".concat(username !== "" ? JSON.stringify(username) : "Teepath", " ){\n      avatarUrl\n      createdAt\n      bio\n      name\n      \n      email\n      repositories(first: 20, orderBy:{field: CREATED_AT, direction:DESC}){\n           edges{\n            node{\n              ... on Repository{\n                name,\n                id,\n                owner{\n                  login\n                },\n                stargazers{\n                  totalCount\n                },\n                primaryLanguage {\n                  name\n                }\n                description\n                url\n                pushedAt\n                updatedAt\n                forkCount\n               \n                \n               \n              }\n            }\n          }\n      }\n      \n    }\n  }\n  ")
  };
  document.getElementById("display").innerHTML = "";
  var baseUrl = "https://api.github.com/graphql";
  var headers = {
    Authorization: "Bearer ".concat(token)
  };
  axios.post(baseUrl, JSON.stringify(body), {
    method: "POST",
    headers: headers
  }).then(function (response) {
    console.log(response.data.data.user.avatarUrl);
    myLoadData(response.data.data);
  }).catch(function (err) {
    return console.log(JSON.stringify(err));
  });
}

var myLoadData = function myLoadData(data) {
  var _data$user = data.user,
      avatarUrl = _data$user.avatarUrl,
      name = _data$user.name,
      email = _data$user.email,
      bio = _data$user.bio,
      createdAt = _data$user.createdAt,
      repositories = _data$user.repositories;
  document.getElementById("avatar").src = avatarUrl;
  document.getElementById("name").innerHTML = name;
  var alias = document.getElementById("search_term").value;
  document.getElementById("alias").innerHTML = alias;
  document.getElementById("bio").innerHTML = bio;
  document.getElementById("repo_total").innerHTML = repositories.edges.length; // console.log(repositories.edges);

  var displayList = document.getElementById('display'); // repositories.edges.forEach((file) => {
  //   console.log(file)
  // })

  appendToDOM(repositories.edges);
};

var appendToDOM = function appendToDOM(res) {
  var display = document.getElementById('display');
  console.log(res);
  res.map(function (_ref) {
    var node = _ref.node;
    var li = document.createElement('LI');
    li.style.width = "100%";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.borderBottom = " 1px solid grey";
    li.id = node.url;
    li.append(createDiv(node), buttonTag());
    document.getElementById("display").appendChild(li);
  });
};

var createTag = function createTag(node) {
  var div = document.createElement('div');
  div.style.width = "100%";
  div.style.display = "flex";
  div.style.justifyContent = "space-around";
  div.style.alignItems = "center";
  div.appendChild(updateAt(node));
  return div;
};

var updateAt = function updateAt(node) {
  var span = document.createElement('span');
  span.innerHTML = "updated at ".concat(new Date(node.updatedAt));
  return span;
};

var lang = function lang(node) {
  var em = document.createElement('em'); // em.setAttribute("class", "fas fa-circle");

  em.innerHTML = node.primaryLanguage.name;
  return em;
};

var createDiv = function createDiv(node) {
  // li.appendChild(mainInfo)
  var div = document.createElement('div');
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.justifyContent = "space-around";
  div.style.alignItems = "flex-start";
  div.style.width = "80%";
  var repo_name = document.createElement('p');
  repo_name.style.color = "blue";
  repo_name.style.fontSize = "90%";
  repo_name.innerHTML = node.name;
  div.append(repo_name, createTag(node)); // div.appendChild(createLi(node), buttonTag())

  return div;
};

var buttonTag = function buttonTag() {
  var button = document.createElement('Button');
  button.style.display = "flex";
  button.style.justifyContent = " flex-end";
  button.style.height = "30px";
  buttonStar = document.createElement('em');
  buttonStar.setAttribute('class', "fas fa-star");
  button.innerHTML = "start";
  button.appendChild(buttonStar);
  return button;
};

var createEm = function createEm(node) {
  var div = document.createElement('div');
  div.setAttribute("class", "fas fa-circle");
  div.innerHTML = node.primaryLanguage.name;
  return div;
};
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57345" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/githubDemo.e31bb0bc.js.map