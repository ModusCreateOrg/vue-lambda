# Static assets

Files in this directory are copied directly into `dist/static` during a build without any cache-bust renaming and are served from `/*`.

The only files that should reside here are those that are requested externally by convention from specific paths.

- E.g. `/favicon.ico`
