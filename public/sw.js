if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let r = Promise.resolve();
      return (
        n[e] ||
          (r = new Promise(async (r) => {
            if ("document" in self) {
              const n = document.createElement("script");
              (n.src = e), document.head.appendChild(n), (n.onload = r);
            } else importScripts(e), r();
          })),
        r.then(() => {
          if (!n[e]) throw new Error(`Module ${e} didn’t register its module`);
          return n[e];
        })
      );
    },
    r = (r, n) => {
      Promise.all(r.map(e)).then((e) => n(1 === e.length ? e[0] : e));
    },
    n = { require: Promise.resolve(r) };
  self.define = (r, i, s) => {
    n[r] ||
      (n[r] = Promise.resolve().then(() => {
        let n = {};
        const a = { uri: location.origin + r.slice(1) };
        return Promise.all(
          i.map((r) => {
            switch (r) {
              case "exports":
                return n;
              case "module":
                return a;
              default:
                return e(r);
            }
          })
        ).then((e) => {
          const r = s(...e);
          return n.default || (n.default = r), n;
        });
      }));
  };
}
define("./sw.js", ["./workbox-ea903bce"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/0c428ae2-efbf5d0771bd75c5369f.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/29107295-2648cb5e919f7c78c7cc.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/96-d844a177a49d69e84ec2.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/framework-2191d16384373197bc0a.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/main-cd8dd92c03ec9e36a72f.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/pages/_app-2807443a80cce80c8e23.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/pages/_error-82a806cd39f8ab3dc3ac.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/pages/index-1071a0e3f5a563bbc54a.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/chunks/webpack-9fc9ab40a062a7008df3.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/css/120f2e2270820d49a21f.css",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/eUZF5X4OA83R6r3pi6r2e/_buildManifest.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/_next/static/eUZF5X4OA83R6r3pi6r2e/_ssgManifest.js",
          revision: "eUZF5X4OA83R6r3pi6r2e",
        },
        {
          url: "/android-icon-144x144.png",
          revision: "542177c0130d55359b17d141cf98ead4",
        },
        {
          url: "/android-icon-192x192.png",
          revision: "4f1ae5429b8d672c199377e0845d3c85",
        },
        {
          url: "/android-icon-36x36.png",
          revision: "802b00c9fa4d274c804174f424a7dd49",
        },
        {
          url: "/android-icon-48x48.png",
          revision: "5a612dafca6a6e63cecfac3903f1e88a",
        },
        {
          url: "/android-icon-72x72.png",
          revision: "0b17741a0911c987db1a0f4679566a9e",
        },
        {
          url: "/android-icon-96x96.png",
          revision: "b5c05e272e3aab2401f302f4c0844408",
        },
        {
          url: "/apple-icon-114x114.png",
          revision: "44c67692a5d2168b5ede62047a7132ec",
        },
        {
          url: "/apple-icon-120x120.png",
          revision: "e7aa6709bf216262424da605168e034b",
        },
        {
          url: "/apple-icon-144x144.png",
          revision: "542177c0130d55359b17d141cf98ead4",
        },
        {
          url: "/apple-icon-152x152.png",
          revision: "5966ab2b4f94480b7e71a0a51f7852bd",
        },
        {
          url: "/apple-icon-180x180.png",
          revision: "3643bccdde342a1296c6bfdf36d71261",
        },
        {
          url: "/apple-icon-57x57.png",
          revision: "c38c74834f951f25276b88f1be91bdc5",
        },
        {
          url: "/apple-icon-60x60.png",
          revision: "2a6258bb460e41953bf57c379878d009",
        },
        {
          url: "/apple-icon-72x72.png",
          revision: "0b17741a0911c987db1a0f4679566a9e",
        },
        {
          url: "/apple-icon-76x76.png",
          revision: "a1175f6df0698f9835086d8bbb31a296",
        },
        {
          url: "/apple-icon-precomposed.png",
          revision: "0db6f042ab74f0eda823bcd79cc5c0c5",
        },
        {
          url: "/apple-icon.png",
          revision: "0db6f042ab74f0eda823bcd79cc5c0c5",
        },
        {
          url: "/browserconfig.xml",
          revision: "653d077300a12f09a69caeea7a8947f8",
        },
        {
          url: "/favicon-16x16.png",
          revision: "ac9c35d2f0546d245d317924cf7bb7c7",
        },
        {
          url: "/favicon-32x32.png",
          revision: "02405235d7af39791377da4dde7c2707",
        },
        {
          url: "/favicon-96x96.png",
          revision: "b5c05e272e3aab2401f302f4c0844408",
        },
        { url: "/favicon.ico", revision: "8d5d43741974420edfb06720df61f6f1" },
        { url: "/manifest.json", revision: "b58fcfa7628c9205cb11a1b2c3e8f99a" },
        {
          url: "/ms-icon-144x144.png",
          revision: "542177c0130d55359b17d141cf98ead4",
        },
        {
          url: "/ms-icon-150x150.png",
          revision: "bbfbbc30f356cfbbfafee2a7a7c5fd5c",
        },
        {
          url: "/ms-icon-310x310.png",
          revision: "5b67650aacf69ff88ac30b94eb31eba6",
        },
        {
          url: "/ms-icon-70x70.png",
          revision: "acf811136403e4eb4baf02fbb73f7901",
        },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
        { url: "/vips/vips.js", revision: "24f2794b0e7767dbd99e982013dcf2ab" },
        {
          url: "/vips/vips.wasm",
          revision: "fee468ba346625e55ac28350ddaff45c",
        },
        {
          url: "/vips/vips.worker.js",
          revision: "86e760bf4cddd0a9e938cdec4c5b2798",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: r,
              event: n,
              state: i,
            }) =>
              r && "opaqueredirect" === r.type
                ? new Response(r.body, {
                    status: 200,
                    statusText: "OK",
                    headers: r.headers,
                  })
                : r,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-media-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const r = e.pathname;
        return !r.startsWith("/api/auth/") && !!r.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 3600,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
