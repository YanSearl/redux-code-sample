# Redux Code Sample

For comparing async data code structure with:
* data-class (no redux)
* redux
* redux-thunk
* redux-saga
* redux-service (home-made middleware)

The data logic is just complex enough for:
* Auth (with async fetch)
* Data (with async fetch)
* Error

Shared minimal React UI and basic server is provided.


#### Client
Build from source:
```
  npm run build         # production, slow
  npm run build-dev     # development, with file watcher
```
Then just open `static/index.html` directly.


#### Server
Start the server using: (default to `localhost:3000`)
```
  npm run start-server
```


#### License

[MIT](https://wikipedia.org/wiki/MIT_License)
