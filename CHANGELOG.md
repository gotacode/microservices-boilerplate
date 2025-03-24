# Changelog

## [1.1.0] - Versão Estável com CLI Modular

### ✨ Novidades

- Separação da CLI (`plop-cli/`) e Boilerplate (`boilerplate/`) no pacote
- CLI `init` agora clona o boilerplate via Git (por versão)
- CLI `upgrade` mostra diferenças entre versões via `git diff`
- Adicionado suporte a comando `endpoint` no boilerplate (`plopfile.js`)

### 🔐 Segurança

- Middleware `rateLimit()` agora aceita configuração por rota (peso, duração)
- Middleware `audit()` criado para rotas sensíveis (log de IP, userId e método)

### 🩺 Healthcheck

- Rota `/health` agora segue Clean Code: separada por controller e rota
- Documentação no Swagger como `[Infra]`

### 🧪 Qualidade

- Adicionados scripts `npm run lint` e `npm run format`
- Cobertura mínima obrigatória com Jest (80%)
- Reorganização dos testes

### ☸️ Kubernetes/Helm

- Probes (`liveness` e `readiness`) movidos para `values.yaml`
- Permite override por ambiente

### 📊 Logger

- Logger adaptativo: usa `pino-pretty` em `development`, `local`, `staging` ou com `LOG_PRETTY=true`
- TraceId incluso automaticamente nos logs

