# Docker Swarm - E-commerce Platform

Setup completo per deployment su Docker Swarm.

## 🚀 Setup Cluster

### Requisiti Minimi
- 2+ server con Docker installato
- Porte aperte: 2377 (cluster), 7946 (comunicazione), 4789 (overlay)
- Connettività di rete tra i nodi

### 1. Inizializza il Manager

```bash
# Sul server manager
docker swarm init --advertise-addr <MANAGER_IP>

# Salva il token per i worker (output del comando sopra)
# docker swarm join --token SWMTKN-xxx <MANAGER_IP>:2377
```

### 2. Aggiungi Worker Nodes

```bash
# Su ogni worker
docker swarm join --token SWMTKN-xxx <MANAGER_IP>:2377
```

### 3. Verifica Cluster

```bash
docker node ls

# Output atteso:
# ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS
# abc123 *                      manager1   Ready     Active         Leader
# def456                        worker1    Ready     Active         
# ghi789                        worker2    Ready     Active         
```

### 4. Etichetta i Nodi

```bash
# Per constraint di placement (database su nodi specifici)
docker node update --label-add db=true worker1
docker node update --label-add cache=true worker1
docker node update --label-add mq=true worker2
```

## 🔐 Crea Secrets

```bash
# JWT Secret (genera con: openssl rand -hex 32)
echo "your-super-secret-jwt-key-change-in-production" | docker secret create jwt_secret -

# PostgreSQL
echo "ecommerce" | docker secret create postgres_user -
echo "$(openssl rand -base64 24)" | docker secret create postgres_password -

# Database URLs
echo "postgres://ecommerce:PASSWORD@postgres-auth:5432/auth_db" | docker secret create auth_database_url -
echo "postgres://ecommerce:PASSWORD@postgres-products:5432/products_db" | docker secret create product_database_url -

# RabbitMQ
echo "ecommerce" | docker secret create rabbitmq_user -
echo "$(openssl rand -base64 16)" | docker secret create rabbitmq_password -
echo "amqp://ecommerce:PASSWORD@rabbitmq:5672" | docker secret create rabbitmq_url -

# Verifica
docker secret ls
```

## 📦 Build e Push Immagini

```bash
# Setup registry locale (opzionale, per test)
docker service create --name registry --publish 5000:5000 registry:2

# Build immagini
cd services/api-gateway && docker build -t localhost:5000/api-gateway:v1 .
cd services/auth-service && docker build -t localhost:5000/auth-service:v1 .
cd services/product-service && docker build -t localhost:5000/product-service:v1 .

# Push
docker push localhost:5000/api-gateway:v1
docker push localhost:5000/auth-service:v1
docker push localhost:5000/product-service:v1
```

## 🚀 Deploy Stack

```bash
# Deploy
cd infrastructure/swarm
export TAG=v1
export DOMAIN=myecommerce.com
docker stack deploy -c docker-stack.yml ecommerce

# Verifica deployment
docker stack services ecommerce
```

## 📊 Comandi Operativi

### Monitoring

```bash
# Status servizi
docker stack services ecommerce

# Processi in esecuzione
docker stack ps ecommerce

# Logs di un servizio
docker service logs ecommerce_api-gateway -f --tail 100

# Ispeziona servizio
docker service inspect ecommerce_api-gateway --pretty
```

### Scaling

```bash
# Scala manualmente
docker service scale ecommerce_api-gateway=5
docker service scale ecommerce_product-service=4

# Scala multipli servizi
docker service scale ecommerce_api-gateway=5 ecommerce_auth-service=3
```

### Updates

```bash
# Update immagine
docker service update --image localhost:5000/api-gateway:v2 ecommerce_api-gateway

# Update con rollback automatico se fallisce
docker service update \
  --image localhost:5000/api-gateway:v2 \
  --update-failure-action rollback \
  ecommerce_api-gateway

# Rollback manuale
docker service rollback ecommerce_api-gateway
```

### Troubleshooting

```bash
# Vedi task falliti
docker stack ps ecommerce --no-trunc

# Ispeziona container specifico
docker inspect $(docker ps -q -f name=ecommerce_api)

# Esegui comando in container
docker exec -it $(docker ps -q -f name=ecommerce_api-gateway) sh

# Verifica network
docker network inspect ecommerce_backend
```

## 🔄 Update Stack

```bash
# Modifica docker-stack.yml, poi:
docker stack deploy -c docker-stack.yml ecommerce

# Swarm applica solo le differenze (rolling update)
```

## 🗑️ Cleanup

```bash
# Rimuovi stack (mantiene volumes)
docker stack rm ecommerce

# Rimuovi tutto inclusi volumes
docker stack rm ecommerce
docker volume prune -f

# Rimuovi secrets
docker secret rm $(docker secret ls -q)

# Lascia swarm (su ogni nodo)
docker swarm leave --force
```

## 📈 Monitoring con Prometheus + Grafana

```bash
# Aggiungi al cluster
docker stack deploy -c docker-monitoring.yml monitoring
```

## 🆚 Differenze Chiave con Kubernetes

| Aspetto | Docker Swarm | Equivalente K8s |
|---------|--------------|-----------------|
| `docker stack deploy` | `kubectl apply` |
| `docker service scale` | `kubectl scale` |
| `docker service update` | `kubectl set image` |
| `docker service logs` | `kubectl logs` |
| `deploy.replicas` | `spec.replicas` |
| `deploy.resources.limits` | `resources.limits` |
| `secrets:` | `kind: Secret` |
| `networks: overlay` | `kind: NetworkPolicy` |

## ⚠️ Limitazioni Docker Swarm

1. **No auto-scaling**: Devi scalare manualmente o usare tool esterni
2. **Monitoring base**: Nessun sistema nativo, serve Prometheus/Grafana
3. **Secrets semplici**: No rotazione automatica, no integrazione Vault nativa
4. **Community in calo**: Meno aggiornamenti e supporto rispetto a K8s
5. **No managed services**: Devi gestire tutto tu

## ✅ Vantaggi Docker Swarm

1. **Semplicità**: Se conosci docker-compose, conosci Swarm
2. **Veloce**: Cluster up in 5 minuti
3. **Leggero**: Meno overhead, stesse macchine = più risorse per app
4. **Economico**: 2 VPS bastano per iniziare
5. **Meno YAML**: File configurazione più corti e leggibili
