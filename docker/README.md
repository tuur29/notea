
# Custom Notea

In comparison with the base docker setup from upstream, this one also includes a minio server and any other custom changes.
The minio bundling was reused from the following repo: https://github.com/diamkil/docker-notea/

To build and publish a new docker image, run `./build.sh`

## Docker Run

```bash
docker run -d \
    --name=Notea \
    -p 3000:3000 \
    -p 9000:9000 \ # Optional, only if you want to be able to access MinIO's interface
    -e PASSWORD=(notea web password) \
    -e STORE_USER=(minio username) \
    -e STORE_PASSWORD=(minio password) \
    -v /path/to/storage:/data \
    tuur29/notea:latest
```

More info on:

- https://github.com/diamkil/docker-notea/
- https://github.com/QingWei-Li/notea.
