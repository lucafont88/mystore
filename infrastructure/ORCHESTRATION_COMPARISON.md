# Kubernetes vs Docker Swarm - Confronto per E-commerce

Guida decisionale per scegliere l'orchestratore giusto per il tuo e-commerce.

## 📊 Confronto Diretto

### Complessità Setup

```
DOCKER SWARM                          KUBERNETES
─────────────                         ──────────

# Inizializza cluster (1 comando)     # Inizializza cluster (molti step)
docker swarm init                     kubeadm init
                                      kubectl apply -f flannel.yaml
# Aggiungi worker (1 comando)         mkdir -p $HOME/.kube
docker swarm join --token xxx         cp /etc/kubernetes/admin.conf ...
                                      
# Deploy (1 file, 1 comando)          # Deploy (10+ file YAML)
docker stack deploy -c stack.yml app  kubectl apply -k overlays/prod/

TEMPO: ~10 minuti                     TEMPO: ~1-2 ore
```

### Complessità File Configurazione

```yaml
# DOCKER SWARM - docker-stack.yml     # KUBERNETES - deployment.yaml
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~        # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
services:                             apiVersion: apps/v1
  api-gateway:                        kind: Deployment
    image: api-gateway:latest         metadata:
    deploy:                             name: api-gateway
      replicas: 3                       namespace: ecommerce
      resources:                      spec:
        limits:                         replicas: 3
          memory: 512M                  selector:
    healthcheck:                          matchLabels:
      test: ["CMD", "curl", ...]            app: api-gateway
                                      template:
# TOTALE: ~20 righe per servizio        metadata:
                                          labels:
                                            app: api-gateway
                                        spec:
                                          containers:
                                          - name: api-gateway
                                            image: api-gateway:latest
                                            resources:
                                              limits:
                                                memory: 512Mi
                                            livenessProbe:
                                              httpGet:
                                                path: /health
                                      ---
                                      apiVersion: v1
                                      kind: Service
                                      ...
                                      ---
                                      apiVersion: autoscaling/v2
                                      kind: HorizontalPodAutoscaler
                                      ...
                                      
                                      # TOTALE: ~80 righe per servizio
```

### Feature Comparison Matrix

| Feature | Docker Swarm | Kubernetes | Note |
|---------|:------------:|:----------:|------|
| **Setup Cluster** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Swarm: 1 comando |
| **Curva Apprendimento** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Swarm: già conosci docker-compose |
| **Rolling Updates** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | K8s: più controllo granulare |
| **Auto-scaling** | ⭐ | ⭐⭐⭐⭐⭐ | K8s: HPA nativo |
| **Self-healing** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | K8s: reschedule avanzato |
| **Service Discovery** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Entrambi DNS interno |
| **Load Balancing** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | K8s: Ingress avanzato |
| **Storage** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | K8s: PV/PVC/StorageClass |
| **Secrets** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | K8s: integrazione Vault |
| **Monitoring** | ⭐⭐ | ⭐⭐⭐⭐⭐ | K8s: ecosistema ricchissimo |
| **Community** | ⭐⭐ | ⭐⭐⭐⭐⭐ | Swarm in declino |
| **Managed Services** | ⭐ | ⭐⭐⭐⭐⭐ | K8s: EKS, GKE, AKS |
| **Risorse Minime** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Swarm: meno overhead |

## 🎯 Scenari Decisionali per il TUO E-commerce

### Scenario 1: Startup / MVP / Budget Limitato
```
📈 Traffico: < 5.000 utenti/giorno
💰 Budget: VPS da €20-50/mese
👥 Team: 1-2 sviluppatori
⏱️ Timeline: Lancio in 2 settimane

         ┌─────────────────────────────┐
         │                             │
         │    👉 DOCKER SWARM          │
         │                             │
         │    • 2-3 VPS bastano        │
         │    • Setup in 1 ora         │
         │    • Usa il docker-compose  │
         │      che hai già            │
         │                             │
         └─────────────────────────────┘

Infrastruttura consigliata:
┌──────────────────────────────────────────────────┐
│  VPS Manager (€15/mese)                          │
│  • 2 CPU, 4GB RAM                                │
│  • Swarm manager + Traefik                       │
├──────────────────────────────────────────────────┤
│  VPS Worker 1 (€20/mese)                         │
│  • 4 CPU, 8GB RAM                                │
│  • API Gateway, Auth, Products                   │
├──────────────────────────────────────────────────┤
│  VPS Worker 2 (€15/mese)                         │
│  • 2 CPU, 4GB RAM                                │
│  • PostgreSQL, Redis, RabbitMQ                   │
└──────────────────────────────────────────────────┘
TOTALE: ~€50/mese
```

### Scenario 2: Crescita / Scale-up
```
📈 Traffico: 10.000-50.000 utenti/giorno
💰 Budget: €200-500/mese
👥 Team: 3-5 sviluppatori
⏱️ Timeline: 1-2 mesi per migrazione

         ┌─────────────────────────────┐
         │                             │
         │    👉 KUBERNETES            │
         │       (Managed: EKS/GKE)    │
         │                             │
         │    • Auto-scaling           │
         │    • Zero-downtime deploy   │
         │    • Monitoring integrato   │
         │                             │
         └─────────────────────────────┘

Infrastruttura consigliata:
┌──────────────────────────────────────────────────┐
│  GKE Autopilot / EKS Fargate                     │
│  • Pay-per-pod                                   │
│  • No gestione nodi                              │
│  • Auto-scaling incluso                          │
│  • ~€150-300/mese (dipende dal traffico)         │
├──────────────────────────────────────────────────┤
│  Cloud SQL / RDS PostgreSQL                      │
│  • High availability                             │
│  • Backup automatici                             │
│  • ~€50-100/mese                                 │
├──────────────────────────────────────────────────┤
│  ElastiCache / Memorystore Redis                 │
│  • ~€30-50/mese                                  │
└──────────────────────────────────────────────────┘
TOTALE: ~€250-450/mese
```

### Scenario 3: Enterprise / Alto Traffico
```
📈 Traffico: > 100.000 utenti/giorno, picchi (Black Friday)
💰 Budget: €1000+/mese
👥 Team: DevOps dedicato
📋 Requisiti: Compliance, audit, SLA 99.9%

         ┌─────────────────────────────┐
         │                             │
         │    👉 KUBERNETES            │
         │       (con tutte le opzioni)│
         │                             │
         │    • Multi-region           │
         │    • GitOps (ArgoCD)        │
         │    • Service mesh (Istio)   │
         │    • Full observability     │
         │                             │
         └─────────────────────────────┘
```

## ⚡ Quick Start - Docker Swarm

```bash
# 1. Inizializza Swarm sul manager
docker swarm init --advertise-addr <MANAGER_IP>

# 2. Aggiungi worker (copia il comando dal manager)
docker swarm join --token SWMTKN-xxx <MANAGER_IP>:2377

# 3. Etichetta i nodi per placement
docker node update --label-add db=true <NODE_ID>
docker node update --label-add cache=true <NODE_ID>
docker node update --label-add mq=true <NODE_ID>

# 4. Crea secrets
echo "your-jwt-secret" | docker secret create jwt_secret -
echo "ecommerce" | docker secret create postgres_user -
echo "supersecret" | docker secret create postgres_password -
echo "postgres://ecommerce:supersecret@postgres-auth:5432/auth_db" | docker secret create auth_database_url -
echo "postgres://ecommerce:supersecret@postgres-products:5432/products_db" | docker secret create product_database_url -
echo "amqp://guest:guest@rabbitmq:5672" | docker secret create rabbitmq_url -
echo "guest" | docker secret create rabbitmq_user -
echo "guest" | docker secret create rabbitmq_password -

# 5. Deploy!
docker stack deploy -c docker-stack.yml ecommerce

# 6. Verifica
docker stack services ecommerce
docker service logs ecommerce_api-gateway -f
```

## ⚡ Quick Start - Kubernetes

```bash
# 1. Crea cluster (esempio con GKE)
gcloud container clusters create ecommerce \
  --num-nodes=3 \
  --machine-type=e2-medium \
  --region=europe-west1

# 2. Configura kubectl
gcloud container clusters get-credentials ecommerce

# 3. Deploy con Kustomize
kubectl apply -k infrastructure/k8s/overlays/production

# 4. Verifica
kubectl get pods -n ecommerce
kubectl logs -f deployment/api-gateway -n ecommerce
```

## 🔄 Comandi Operativi Comuni

| Operazione | Docker Swarm | Kubernetes |
|------------|--------------|------------|
| **Status** | `docker stack services app` | `kubectl get pods -n app` |
| **Scale** | `docker service scale app_api=5` | `kubectl scale deploy api --replicas=5` |
| **Logs** | `docker service logs app_api -f` | `kubectl logs -f deploy/api` |
| **Update** | `docker service update --image v2 app_api` | `kubectl set image deploy/api api=v2` |
| **Rollback** | `docker service rollback app_api` | `kubectl rollout undo deploy/api` |
| **Shell** | `docker exec -it $(docker ps -q -f name=api) sh` | `kubectl exec -it deploy/api -- sh` |

## 🏁 La Mia Raccomandazione

Per il tuo e-commerce con microservizi Node.js:

### Parti con Docker Swarm SE:
- Vuoi andare in produzione **velocemente**
- Il budget è **limitato** (< €100/mese)
- Il team non ha esperienza K8s
- Non prevedi **picchi enormi** di traffico

### Migra a Kubernetes QUANDO:
- Il traffico cresce oltre le **50k visite/giorno**
- Hai bisogno di **auto-scaling** per i picchi
- Vuoi usare servizi managed (EKS, GKE)
- Il team ha acquisito competenze DevOps

### Path Consigliato:
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Docker    │      │   Docker    │      │ Kubernetes  │
│   Compose   │ ──▶  │   Swarm     │ ──▶  │   Managed   │
│   (Dev)     │      │   (Prod v1) │      │   (Scale)   │
└─────────────┘      └─────────────┘      └─────────────┘
     Oggi            Mese 1-6            Quando serve
```

La cosa bella è che il tuo `docker-compose.yml` richiede **modifiche minime** per diventare uno stack Swarm! 🎉
