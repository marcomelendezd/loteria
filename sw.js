// Service worker: permite abrir la app sin conexión.
// Sube la versión (v3, v4...) cada vez que cambies index.html.
const CACHE = "loteria-v5";
const BASICOS = [
  "./", "./index.html", "./config.js", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASICOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  // La tipografía se guarda para que la app se vea igual sin conexión.
  if(url.host === "fonts.googleapis.com" || url.host === "fonts.gstatic.com"){
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(req, copia)).catch(()=>{});
        return res;
      }).catch(() => r))
    );
    return;
  }
  // Lo de Firebase y cualquier otro dominio va siempre a la red.
  if(url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(req, copia)).catch(()=>{});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
