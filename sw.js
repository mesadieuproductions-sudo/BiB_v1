{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const CACHE_NAME = 'bib-hcv-cache-v1';\
const ASSETS_TO_CACHE = [\
  './',\
  './index.html',\
  'https://cdn.tailwindcss.com'\
];\
\
// Install Event - Caching core assets\
self.addEventListener('install', (event) => \{\
  event.waitUntil(\
    caches.open(CACHE_NAME).then((cache) => \{\
      return cache.addAll(ASSETS_TO_CACHE);\
    \})\
  );\
  self.skipWaiting();\
\});\
\
// Activate Event - Clean up old caches\
self.addEventListener('activate', (event) => \{\
  event.waitUntil(\
    caches.keys().then((keys) => \{\
      return Promise.all(\
        keys.map((key) => \{\
          if (key !== CACHE_NAME) \{\
            return caches.delete(key);\
          \}\
        \})\
      );\
    \})\
  );\
  self.clients.claim();\
\});\
\
// Fetch Event - Serve from cache, fallback to network\
self.addEventListener('fetch', (event) => \{\
  event.respondWith(\
    caches.match(event.request).then((cachedResponse) => \{\
      if (cachedResponse) \{\
        return cachedResponse;\
      \}\
      return fetch(event.request).then((networkResponse) => \{\
        return caches.open(CACHE_NAME).then((cache) => \{\
          // Optionally cache new dynamic requests if needed\
          return networkResponse;\
        \});\
      \}).catch(() => \{\
        // Fallback behavior if offline and asset isn't cached\
      \});\
    \})\
  );\
\});}