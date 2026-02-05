# Sviluppo Windows → Deploy Linux

Guida completa per sviluppare su Windows e deployare su server Linux.

## 🖥️ Setup Ambiente Windows

### Opzione 1: WSL2 + Docker Desktop (Consigliata)

```powershell
# 1. Installa WSL2
wsl --install -d Ubuntu-22.04

# 2. Installa Docker Desktop
# Scarica da: https://www.docker.com/products/docker-desktop
# Abilita: Settings → Resources → WSL Integration → Ubuntu-22.04

# 3. Apri Ubuntu WSL
wsl -d Ubuntu-22.04

# 4. Verifica Docker funziona in WSL
docker run hello-world
```

**Vantaggi WSL2:**
- Filesystem Linux nativo (no problemi CRLF)
- Performance Docker native
- Condividi file con Windows (`/mnt/c/Users/...`)
- VS Code Remote WSL integrato

### Opzione 2: Docker Desktop Standalone

Funziona, ma con alcune limitazioni:
- Filesystem Windows (attenzione a CRLF)
- Volume mounts più lenti
- Alcuni comandi Linux non disponibili

## ⚙️ Configurazioni Essenziali

### 1. Git - Line Endings

```bash
# Configura Git globalmente
git config --global core.autocrlf input
git config --global core.eol lf
```

### 2. .gitattributes (nel progetto)

```gitattributes
# Forza LF per tutti i file di testo
* text=auto eol=lf

# File specifici
*.js text eol=lf
*.ts text eol=lf
*.json text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.md text eol=lf
*.sh text eol=lf
*.sql text eol=lf
*.prisma text eol=lf

# File binari
*.png binary
*.jpg binary
*.gif binary
*.ico binary
*.woff binary
*.woff2 binary

# Script shell devono avere LF
*.sh text eol=lf
Dockerfile text eol=lf
```

### 3. .editorconfig

```ini
# .editorconfig
root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

### 4. VS Code Settings

```json
// .vscode/settings.json
{
  "files.eol": "\n",
  "files.encoding": "utf8",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "editor.formatOnSave": true,
  
  // Se usi WSL
  "terminal.integrated.defaultProfile.windows": "Ubuntu-22.04 (WSL)"
}
```

### 5. Dockerfile Best Practices

```dockerfile
# Usa sempre LF nei Dockerfile
# Se copi script, assicurati siano LF

FROM node:20-alpine

WORKDIR /app

# Copia package files
COPY package*.json ./

# Installa dipendenze
RUN npm ci --only=production

# Copia codice (con .dockerignore appropriato)
COPY . .

# NON usare CRLF negli script
RUN chmod +x scripts/*.sh

EXPOSE 3000

CMD ["node", "src/app.js"]
```

### 6. .dockerignore

```dockerignore
# Git
.git
.gitignore

# Dependencies
node_modules
npm-debug.log

# IDE
.vscode
.idea
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
.env.*.local

# Build
dist
build
coverage

# Logs
logs
*.log
```

## 🐧 Distribuzioni Linux Consigliate

### Per Docker Swarm

| Distribuzione | Pro | Contro | Consiglio |
|---------------|-----|--------|-----------|
| **Ubuntu Server 22.04 LTS** | Documentazione enorme, supporto 5 anni, facile | Più pesante | ⭐ **MIGLIORE per iniziare** |
| **Debian 12 (Bookworm)** | Stabile, leggero, sicuro | Pacchetti meno recenti | ⭐ **MIGLIORE per produzione** |
| **Rocky Linux 9** | Compatibile RHEL, enterprise | Curva apprendimento | Buono se conosci CentOS |
| **Alpine Linux** | Ultraleggero (50MB) | Meno tool, musl libc | Solo per esperti |

**🏆 Raccomandazione Swarm: Ubuntu Server 22.04 LTS o Debian 12**

### Per Kubernetes

| Distribuzione | Pro | Contro | Consiglio |
|---------------|-----|--------|-----------|
| **Ubuntu Server 22.04** | Ottimo supporto K8s, snap | Snap può dare problemi | ⭐ **Per self-managed K8s** |
| **Debian 12** | Stabile, prevedibile | Setup manuale più lungo | Ottimo |
| **Flatcar Container Linux** | Fatto per container, auto-update | Diverso da distro classiche | ⭐ **Per cluster dedicati** |
| **Talos Linux** | OS immutabile per K8s, sicurissimo | Solo per K8s, no SSH | Per esperti |
| **Rocky/Alma Linux 9** | Enterprise, supporto lungo | Più pesante | Se hai requisiti RHEL |

**🏆 Raccomandazione K8s:**
- **Self-managed**: Ubuntu Server 22.04 o Debian 12
- **Managed (EKS/GKE/AKS)**: Non importa, scegli il cloud provider

## 📊 Confronto Distribuzioni

```
                    SEMPLICITÀ                          LEGGEREZZA
                        │                                   │
    Ubuntu 22.04  ──────┼───────────────────────────────────┤
                        │                                   │
    Debian 12     ──────┼─────────────────────────────┬─────┤
                        │                             │     │
    Rocky Linux 9 ──────┼───────────────────────┬─────┘     │
                        │                       │           │
    Flatcar       ──────┼─────────────────┬─────┘           │
                        │                 │                 │
    Alpine        ──────┼───────────┬─────┘                 │
                        │           │                       │
    Talos         ──────┼─────┬─────┘                       │
                        │     │                             │
                        └─────┴─────────────────────────────┘
                       Difficile                         Facile
```

## 🚀 Setup Server Linux (Ubuntu 22.04)

### 1. Provisioning Iniziale

```bash
# Aggiorna sistema
sudo apt update && sudo apt upgrade -y

# Installa tool essenziali
sudo apt install -y \
  curl \
  wget \
  git \
  htop \
  vim \
  ufw \
  fail2ban \
  unattended-upgrades

# Configura firewall
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Configura automatic security updates
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 2. Installa Docker

```bash
# Rimuovi versioni vecchie
sudo apt remove docker docker-engine docker.io containerd runc

# Aggiungi repository Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installa Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Aggiungi utente al gruppo docker
sudo usermod -aG docker $USER

# Verifica
docker --version
docker compose version
```

### 3. Setup Docker Swarm

```bash
# Inizializza Swarm (sul manager)
docker swarm init --advertise-addr <SERVER_IP>

# Aggiungi worker (sugli altri nodi)
docker swarm join --token <TOKEN> <MANAGER_IP>:2377
```

### 4. Setup Kubernetes (con k3s - leggero)

```bash
# Installa k3s (Kubernetes leggero, perfetto per VPS)
curl -sfL https://get.k3s.io | sh -

# Verifica
sudo kubectl get nodes

# Copia kubeconfig per utente normale
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config
```

## 🔄 Workflow Sviluppo → Produzione

```
┌─────────────────────────────────────────────────────────────────┐
│                     WINDOWS (Sviluppo)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│  │   VS Code   │───▶│    WSL2     │───▶│   Docker    │        │
│  │             │    │  Ubuntu     │    │   Desktop   │        │
│  └─────────────┘    └─────────────┘    └─────────────┘        │
│         │                                     │                │
│         │              docker build           │                │
│         │              docker compose up      │                │
│         ▼                                     ▼                │
│  ┌─────────────────────────────────────────────────┐          │
│  │              Test Locale (localhost)             │          │
│  └─────────────────────────────────────────────────┘          │
│                            │                                   │
└────────────────────────────┼───────────────────────────────────┘
                             │
                             │ git push / docker push
                             │
┌────────────────────────────┼───────────────────────────────────┐
│                            ▼                                   │
│  ┌─────────────────────────────────────────────────┐          │
│  │           CI/CD (GitHub Actions)                 │          │
│  │                                                  │          │
│  │  • Build immagini Docker                        │          │
│  │  • Run tests                                    │          │
│  │  • Push a registry                              │          │
│  │  • Deploy a produzione                          │          │
│  └─────────────────────────────────────────────────┘          │
│                            │                                   │
│                            ▼                                   │
│  ┌─────────────────────────────────────────────────┐          │
│  │         LINUX SERVER (Produzione)               │          │
│  │                                                  │          │
│  │         Ubuntu 22.04 / Debian 12                │          │
│  │         Docker Swarm / Kubernetes               │          │
│  └─────────────────────────────────────────────────┘          │
│                                                                │
│                     LINUX (Produzione)                         │
└────────────────────────────────────────────────────────────────┘
```

## ✅ Checklist Pre-Deploy

```bash
# 1. Verifica line endings
find . -name "*.js" -exec file {} \; | grep CRLF
# Non dovrebbe trovare nulla

# 2. Verifica Dockerfile
docker build --no-cache -t test-build .
docker run --rm test-build

# 3. Test su Linux (in WSL o container)
docker run --rm -v $(pwd):/app -w /app node:20-alpine npm test

# 4. Verifica script shell
shellcheck scripts/*.sh

# 5. Build finale
docker compose build
docker compose up -d
docker compose logs -f
```

## 🐛 Troubleshooting Comune

### Errore: `exec format error`
```bash
# Causa: immagine buildata per architettura diversa
# Soluzione: build multi-arch
docker buildx build --platform linux/amd64 -t myapp:latest .
```

### Errore: `Permission denied` su script
```bash
# Causa: script non ha permessi esecuzione
# Soluzione: nel Dockerfile
RUN chmod +x scripts/*.sh
```

### Errore: `env: node\r: No such file or directory`
```bash
# Causa: CRLF line endings
# Soluzione: converti a LF
sed -i 's/\r$//' script.sh
# Oppure in VS Code: cambia EOL in basso a destra
```

### Errore: `Module not found` (case sensitivity)
```bash
# Causa: Windows non è case-sensitive, Linux sì
# Esempio: import './Component' ma file è 'component.js'
# Soluzione: verifica nomi file esatti
```
