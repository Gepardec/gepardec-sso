ARG KEYCLOAK_VERSION=26.8.1

# Build the Keycloakify theme JAR
FROM node:22-bookworm-slim AS theme-builder
RUN apt-get update && apt-get install -y --no-install-recommends maven && rm -rf /var/lib/apt/lists/*
WORKDIR /build/theme
COPY theme/package*.json ./
RUN npm ci
COPY theme/ ./
RUN npm run build-keycloak-theme


RUN pwd
RUN ls -la dist_keycloak

FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

COPY --chown=keycloak:keycloak --from=theme-builder /build/theme/dist_keycloak/gepardec-login-theme.jar /opt/keycloak/providers/

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION}
COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]