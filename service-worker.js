const CACHE_NAME = "dsa-app-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "bubble-sort.html",
  "selection-sort.html",
  "insertion-sort.html",
  "quick-sort.html",
  "stack.html",
  "queue.html",
  "circular-singly-linked-list.html",
  "doubly-linked-list.html",
  "binary-tree.html",
  "graphs.html",
  "binary-search.html",
  "linear-search.html",
  "singly-linked-list.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
