# Kubernetes Deployment - E-commerce Platform

Guida completa per il deployment dell'e-commerce su Kubernetes.

## 📋 Prerequisiti

- Kubernetes cluster (v1.25+)
- kubectl configurato
- Helm 3 (opzionale, per alcuni componenti)
- Docker registry per le immagini

## 🏗️ Architettura K8s

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INGRESS CONTROLLER                            │
│                  (NGINX / Traefik / ALB)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NAMESPACE: ecommerce                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ API Gateway  │  │ API Gateway  │  │ API Gateway  │  (HPA)   │
│  │   Pod #1     │  │   Pod #2     │  │   Pod #N     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         └─────────────────┴─────────────────┘                   │
│                           │                                      │
│         ┌─────────────────┼─────────────────┐                   │
│         ▼                 ▼                 ▼                   │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐            │
│  │Auth Service│    │Product Svc │    │Order Service│            │
│  │  (2+ pods) │    │  (2+ pods) │    │  (2+ pods)  │            │
│  └─────┬──────┘    └─────┬──────┘    └─────┬───────┘            │
│        │                 │                 │                     │
│        ▼                 ▼                 ▼                     │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐              │
│  │PostgreSQL│      │PostgreSQL│      │PostgreSQL│              │
│  │ auth_db  │      │products  │      │ orders   │              │
│  │(StatefulSet)    │(StatefulSet)    │(StatefulSet)            │
│  └──────────┘      └──────────┘      └──────────┘              │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │              Shared Infrastructure                │          │
│  │  ┌─────────┐                    ┌─────────────┐  │          │
│  │  │  Redis  │                    │  RabbitMQ   │  │          │
│  │  │ (Cache) │                    │  (Events)   │  │          │
│  │  └─────────┘                    └─────────────┘  │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Build e Push delle immagini Docker

```bash
# Build immagini
docker build -t your-registry/api-gateway:v1.0.0 ./services/api-gateway
docker build -t your-registry/auth-service:v1.0.0 ./services/auth-service
docker build -t your-registry/product-service:v1.0.0 ./services/product-service

# Push al registry
docker push your-registry/api-gateway:v1.0.0
docker push your-registry/auth-service:v1.0.0
docker push your-registry/product-service:v1.0.0
```

### 2. Configura i Secrets

```bash
# Crea il file secrets con valori reali (NON committare!)
cp infrastructure/k8s/base/secrets.yaml infrastructure/k8s/base/secrets-real.yaml

# Modifica secrets-real.yaml con valori reali
vim infrastructure/k8s/base/secrets-real.yaml

# Oppure usa Sealed Secrets
kubeseal --format=yaml < secrets-real.yaml > sealed-secrets.yaml
```

### 3. Deploy

```bash
# Development
kubectl apply -k infrastructure/k8s/overlays/development

# Staging
kubectl apply -k infrastructure/k8s/overlays/staging

# Production
kubectl apply -k infrastructure/k8s/overlays/production
```

### 4. Verifica deployment

```bash
# Status pods
kubectl get pods -n ecommerce

# Status services
kubectl get svc -n ecommerce

# Logs
kubectl logs -f deployment/api-gateway -n ecommerce

# Describe pod problematico
kubectl describe pod <pod-name> -n ecommerce
```

## 📦 Struttura File

```
infrastructure/k8s/
├── base/                          # Configurazioni base
│   ├── kustomization.yaml         # Kustomize manifest
│   ├── namespace.yaml             # Namespace
│   ├── configmap.yaml             # Configurazioni non sensibili
│   ├── secrets.yaml               # Template secrets (NON usare in prod!)
│   ├── api-gateway.yaml           # Deployment + Service + HPA
│   ├── auth-service.yaml          # Deployment + Service + HPA
│   ├── product-service.yaml       # Deployment + Service + HPA
│   ├── postgres.yaml              # StatefulSets PostgreSQL
│   ├── redis.yaml                 # Deployment Redis
│   ├── rabbitmq.yaml              # StatefulSet RabbitMQ
│   └── ingress.yaml               # Ingress rules
│
└── overlays/
    ├── development/               # Overlay dev (risorse minime)
    │   └── kustomization.yaml
    ├── staging/                   # Overlay staging
    │   └── kustomization.yaml
    └── production/                # Overlay prod (HA, risorse aumentate)
        └── kustomization.yaml
```

## ⚙️ Configurazione per Ambiente

| Aspetto | Development | Staging | Production |
|---------|-------------|---------|------------|
| Repliche API Gateway | 1 | 2 | 4+ |
| Repliche Services | 1 | 2 | 3+ |
| Memory Limit | 256Mi | 512Mi | 1Gi+ |
| CPU Limit | 200m | 500m | 1000m+ |
| Storage DB | 1Gi | 10Gi | 50Gi+ |
| HPA | Disabilitato | Abilitato | Abilitato |
| Log Level | debug | info | warn |

## 🔐 Gestione Secrets in Produzione

**NON** usare secrets.yaml in chiaro in produzione. Opzioni:

### 1. Sealed Secrets
```bash
# Installa controller
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm install sealed-secrets sealed-secrets/sealed-secrets

# Cripta secrets
kubeseal --format yaml < secrets.yaml > sealed-secrets.yaml
```

### 2. External Secrets Operator
```bash
# Installa
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets external-secrets/external-secrets

# Configura con AWS Secrets Manager, HashiCorp Vault, etc.
```

### 3. HashiCorp Vault
```bash
# Installa
helm repo add hashicorp https://helm.releases.hashicorp.com
helm install vault hashicorp/vault
```

## 📊 Monitoring

### Prometheus + Grafana
```bash
# Installa stack completo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
```

### Loki per logs
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm install loki grafana/loki-stack
```

## 🔄 CI/CD Pipeline (esempio GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to K8s

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build & Push Images
        run: |
          docker build -t ${{ secrets.REGISTRY }}/api-gateway:${{ github.sha }} ./services/api-gateway
          docker push ${{ secrets.REGISTRY }}/api-gateway:${{ github.sha }}
      
      - name: Deploy to K8s
        uses: azure/k8s-deploy@v4
        with:
          manifests: infrastructure/k8s/overlays/production
          images: |
            ${{ secrets.REGISTRY }}/api-gateway:${{ github.sha }}
```

## 🛠️ Comandi Utili

```bash
# Port forward per debug locale
kubectl port-forward svc/api-gateway 3000:3000 -n ecommerce

# Accedi a shell in un pod
kubectl exec -it deployment/api-gateway -n ecommerce -- sh

# Scala manualmente
kubectl scale deployment api-gateway --replicas=5 -n ecommerce

# Rollback
kubectl rollout undo deployment/api-gateway -n ecommerce

# Visualizza HPA status
kubectl get hpa -n ecommerce

# Visualizza risorse consumate
kubectl top pods -n ecommerce
```

## ⚠️ Considerazioni per Produzione

1. **Database**: Usa servizi managed (RDS, Cloud SQL) invece di StatefulSet
2. **Redis**: Considera ElastiCache, Memorystore o Redis Cluster
3. **Message Broker**: Amazon MQ, CloudAMQP o RabbitMQ Cluster Operator
4. **SSL/TLS**: Configura cert-manager con Let's Encrypt
5. **Backup**: Velero per backup cluster, pg_dump schedulato per DB
6. **Network Policies**: Limita comunicazione tra pod
7. **Pod Disruption Budget**: Garantisci availability durante updates
8. **Resource Quotas**: Limita risorse per namespace
