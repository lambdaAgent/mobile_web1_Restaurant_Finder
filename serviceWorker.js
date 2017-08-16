const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';
const PRECACHE_URLS =  [
  '/',
  '/restaurant.html',
  // '/index.html',
  // '/restaurant.html',
  '/css/responsive.css',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
];
console.log('service worker')
this.addEventListener('install', function(event) {
  console.log('event', event);
  event.waitUntil(
    caches.open(PRECACHE).then(function(cache) {
      console.log(cache)
      return cache.addAll(PRECACHE_URLS);
    })
  );
});


// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', function (event)
{
    console.log("FETCHING", event);
    event.respondWith(
            caches.match(event.request)
                    .then(function (response, err)
                            {
                                // Cache hit - return response
                                if (response)
                                {
                                    console.log("FOUND", response, err);
                                    return response;
                                }
                                console.log("MISSED", event.request.mode);
                                return fetch(event.request)
                            }
                    )
    );
});


