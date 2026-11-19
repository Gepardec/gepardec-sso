# gepardec-sso
Repository contains all customizations of the Gepardec Keycloak

# Local Keycloak Setup

**Build Image**
```shell
podman build -t gepardec-sso:local .
```

**Create Network**
```shell
podman network create gepardec-sso
```


**Run DB:**
```shell
podman run -d --name gepardec-sso-postgres --network=gepardec-sso -e POSTGRES_DB=keycloak -e POSTGRES_PASSWORD=keycloak@123 -e POSTGRES_USER=keycloak -p 5432:5432 postgres:15
```


**Run Keycloak:**
```shell
podman run -e KC_DB_PASSWORD=keycloak@123 \
           -e KC_DB_URL=jdbc:postgresql://gepardec-sso-postgres:5432/keycloak \
           -e KC_DB_USERNAME=keycloak \
           -e KC_HOSTNAME_ADMIN=http://localhost:8080 \
           -e KC_HOSTNAME=http://localhost:8080 \
           -e KC_HTTP_ENABLED=true \
           -e KC_HTTPS_PORT=8080 \
           -e KEYCLOAK_ADMIN=admin \
           -e KEYCLOAK_ADMIN_PASSWORD=admin@123 \
           --network=gepardec-sso \
           -p 8080:8080 -p 9000:9000 \
           --name gepardec-sso \
           --rm \
           localhost/gepardec-sso:local \
           start --optimized --verbose
```