# Estrutura geral de arquivos do projeto

```bash
coffee-api/
├── docs/                           # Documentação técnica e de negócio
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── vertical-slice.md
│   │   └── order-state-machine.md  # Diagrama de estados do pedido
│   ├── database/
│   │   ├── schema.md
│   │   └── migrations.md
│   ├── decisions/
│   │   ├── 001-serverless.md
│   │   ├── 002-authentication.md
│   │   └── 003-error-handling.md
│   └── deployment/
│       ├── environment.md
│       └── ci-cd.md

├── scripts/                   # Seeds de cardápio e utilitários
│   ├── fix-alias.js
│   └── seed-menu.js
├── src/
│   ├── config/                # Variáveis de ambiente com validação Zod
│   │   └── env.ts
│   ├── infrastructure/        # Comunicação com serviços externos
│   │   ├── database/
│   │   │   ├── client.ts      # Instância HTTP do Postgres/Drizzle/Supabase
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── logger/
│   │   │   └── logger.ts
│   │   ├── notifications/     # Push Notification / WhatsApp API
│   │   │   └── push.service.ts
│   │   └── payment/           # Gateway de Pagamento (Mercado Pago, Stripe, Pix)
│   │       └── payment-gateway.ts
│   ├── middleware/            # Interceptadores globais
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── request-id.middleware.ts
│   │   ├── security.middleware.ts
│   │   └── validate.middleware.ts
│   ├── modules/               # Módulos do Domínio de Delivery
│   │   ├── auth/              # Login, Cadastro e Refresh Token
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── me/
│   │   ├── catalog/           # Gestão do Cardápio (Produtos, Categorias, Opcionais)
│   │   │   ├── list-products/
│   │   │   │   ├── handler.ts
│   │   │   │   ├── schema.ts
│   │   │   │   └── dto.ts
│   │   │   ├── get-product/
│   │   │   └── common/        # Mapeadores e repositório específicos do catálogo
│   │   │       ├── catalog.repository.ts
│   │   │       └── catalog.types.ts
│   │   ├── orders/            # Coração do Delivery (Criação e Fluxo do Pedido)
│   │   │   ├── create-order/
│   │   │   │   ├── handler.ts # Valida estoque, adicionais, calcula taxa e salva
│   │   │   │   ├── schema.ts
│   │   │   │   └── dto.ts
│   │   │   ├── update-status/ # Cozinha/Entregador muda status (ex: EM_PREPARO -> A_CAMINHO)
│   │   │   │   ├── handler.ts
│   │   │   │   └── state-machine.ts # Garante transições de status válidas
│   │   │   ├── get-order/
│   │   │   ├── list-active-orders/  # Rota em Realtime/Polling para a tela da cozinha
│   │   │   └── common/
│   │   │       ├── order.repository.ts
│   │   │       └── order.types.ts
│   │   ├── delivery/          # Cálculo de Frete e Endereços
│   │   │   ├── calculate-fee/
│   │   │   │   ├── handler.ts # Valida CEP/Coordenadas e retorna taxa + tempo estimado
│   │   │   │   └── schema.ts
│   │   │   └── address/
│   │   ├── payments/          # Webhooks e Processamento financeiro
│   │   │   ├── process-pix/
│   │   │   └── webhook/
│   │   │       └── handler.ts # Recebe confirmação de pagamento do gateway
│   │   └── store/             # Configurações do Estabelecimento
│   │       ├── get-status/    # Retorna se a cafeteria está Aberta ou Fechada no momento
│   │       └── update-hours/
│   └── shared/                # Tipos, utilitários e erros globais
│       ├── errors/
│       ├── types/
│       ├── helpers/
│       └── utils/
│           ├── geo.ts         # Cálculo de distância/raio de entrega
│           └── money.ts       # Tratamento de centavos/moeda
├── tests/                     # Testes de unidades
│   ├── integration/
│   └── e2e/
├── .env
├── .env.example
├── .gitignore
├── .nvmrc
├── .prettierrc
├── eslint.config.js
├── package.json
├── tsconfig.json
├── wrangler.jsonc
└── README.md
```

---

[← Voltar para o README](../../README.md)
