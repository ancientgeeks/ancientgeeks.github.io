'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "8bc74619fb2d3ba1726fa8727f6a94d5",
"index.html": "15eec27326b6f8e9c94fd347573714a3",
"/": "15eec27326b6f8e9c94fd347573714a3",
"main.dart.js": "05c84a7a00cb8f1d8d6e6c3d91f87b3c",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "246e6c10c103c88e12b4cb8c04b913c3",
"assets/images/icon.png": "3137230f61e2e5d4fb7ce74da6bd6959",
"assets/images/4x.png": "b6f08c28559a1f08f09778a9cba4d13a",
"assets/images/fives.png": "3d5f10224fa23f2288ea8cd74c0dbf55",
"assets/images/three.png": "3bf512c8a90072561820c09556610751",
"assets/images/feature.png": "39f7542d00393b7da7dfa7c563745f1c",
"assets/images/blank.png": "8d76da19ede86b69835a03edb1035bdd",
"assets/images/threes.png": "499707c9f214c8109981f36cea8c2c35",
"assets/images/six.png": "68452088c816a017fab20c37191f8b55",
"assets/images/two.png": "c93a1cde889ca9177c419e4bd1a7a026",
"assets/images/bonus.png": "670addc9fc2c61960bedb7e339de8cf0",
"assets/images/four.png": "28c93a7a7f4a35e5688d37600a107c89",
"assets/images/3x.png": "4a75d9f459f5a789f9e104db4953492b",
"assets/images/house.png": "1ce5c039620f707fba0f13a3a6565e7d",
"assets/images/ones.png": "aed97ed1008fef450f5c852722e55abb",
"assets/images/twos.png": "e6be446d184420d3de2857084dec7636",
"assets/images/five.png": "23e59d337e5d2c0474a4f3c13d61e166",
"assets/images/one.png": "d110de921dca6f9a891deabf470b6479",
"assets/images/fours.png": "dd714ec78c2a231e65adb86a3c9106f2",
"assets/images/large.png": "583360fb5630f1c3597525a1d3bd4a6c",
"assets/images/chance.png": "a15029d3ed5347d4077eed655aa7068b",
"assets/images/AncientGeeks%2520logo.png": "93c67722e00ccf2c8e07a33ba9bfcf43",
"assets/images/appstoreicon.png": "9544ad093921c6d3166e5de9b19a0168",
"assets/images/yahtzee.png": "38eb0e9441ff1abfb7a025b8b42f8f3f",
"assets/images/small.png": "a43d0992c2f9180389fed8a79579c06e",
"assets/images/sixes.png": "fdf22a51d3ecebcdc1bda2400e1434ba",
"assets/text_files/help.html": "2aa6f2e6590137d32f99621835438199",
"assets/text_files/open_source_license.txt": "22986f58e2dbd2960a59d3bacdc6098b",
"assets/text_files/privacy_policy.html": "f37fbd0b9e99a80549830755e5bbf39c",
"assets/text_files/Terms_of_Service.txt": "e97efa574d831df13f84cc9e685520d7",
"assets/AssetManifest.json": "5cd7f779ecc1cb2c196b227ccacbbc92",
"assets/NOTICES": "421904506b4a65abb2265e006d4ef1ff",
"assets/FontManifest.json": "21afffc563bb6d04ea5422b5078adee4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "71629d942b7ce4a78687d8c443bf70cc",
"assets/fonts/Modak-Regular.ttf": "9b6bdd2608ad69f1e4f379fadcd6aec5",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
