self.addEventListener('install', function (e) {

    e.waitUntil(
        caches.open('neverlate-cache').then(function (cache) {
            return cache.addAll([
                '/',
                './index.html',
                './manifest.json',
                './assets/',
                './node_modules/axios/dist/axios.min.js',
                './offline.html'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(error => {
                return caches.match("/offline.html");
            })
        );
    }
    else{
        event.respondWith(caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
        );
    }}
    );