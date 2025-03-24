# Microservice Boilerplate

Este projeto serve como base para novos microserviços Node.js com arquitetura limpa, segurança, testes e integração com AWS e Kubernetes.

---

## 📦 Estrutura

- `src/` - Código da aplicação
- `tests/` - Testes unitários, e2e e contrato
- `scripts/` - Automação de infraestrutura local
- `k8s/` - Manifests Kubernetes simples
- `k8s/helm/` - Helm Chart completo com probes configuráveis
- `plop-templates/` - Templates para geração de endpoints
- `plopfile.js` - Geração de endpoints via CLI

---

## 🚀 Como usar

1. Crie seu microserviço com a CLI:
```bash
npx @fintech/microservice init
```

2. Gere novos endpoints:
```bash
npx plop endpoint
```

3. Rode localmente:
```bash
docker-compose up --build
```

---

## 🧪 Testes e Qualidade

```bash
npm run lint        # Análise estática
npm run test        # Testes unitários
npm run test:all    # Testes + mutação (Stryker)
npm run sonar       # Envio ao SonarQube
```

---

## ☸️ Deploy com Helm

```bash
helm upgrade --install svc ./k8s/helm/microservice -f values.staging.yaml
```

---

## 🔐 Segurança

- OAuth2 com Cognito
- Rate limit por rota (customizável)
- Audit logging automático

---

## 📊 Observabilidade

- `traceId` incluído nos logs
- `dd-trace` ativo por padrão
- Logs legíveis em `development`, `local`, `staging`, ou com `LOG_PRETTY=true`

---

## 🛠️ Scripts úteis

```bash
docker exec app npm run setup:dynamodb -- --file configs/dynamodb-table.json
docker exec app npm run setup:sns -- --topic my-topic-name
```

---

## 🧱 Versionamento

```bash
GET /version
# → { "version": "1.1.0" }
```

---

## 📜 License
MIT
