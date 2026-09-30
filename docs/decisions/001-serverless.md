# ADR 001 — Migração da Coffee API para Serverless/Edge

- **Status:** Accepted
- **Data:** 2026-08-05 (início da migração, conforme histórico disponível)
- **Escopo:** arquitetura de execução e organização estrutural da Coffee API
- **Decisões relacionadas:** Hono, Cloudflare Workers e Vertical Slice Architecture

## Contexto

A Coffee API originalmente possuía uma arquitetura baseada em um servidor HTTP tradicional, utilizando Koa. Durante a evolução do projeto surgiu a decisão de migrar a API para um modelo **Serverless/Edge**, tendo o **Cloudflare Workers** como ambiente de execução e o **Hono** como framework HTTP.

A migração não foi tratada apenas como uma troca de framework. Ela exigiu rever a forma como a aplicação é inicializada, como as requisições são processadas, como dependências são organizadas e como a aplicação acessa recursos externos, especialmente considerando as características do runtime Serverless/Edge.

Também foi decidido adotar **Vertical Slice Architecture** como princípio de organização do código. Essa decisão acompanha a migração porque permite organizar a aplicação por funcionalidades/feature slices, reduzindo a dependência de uma estrutura global baseada exclusivamente em camadas técnicas.

## Decisão

A Coffee API será executada como uma aplicação **Serverless/Edge**, utilizando **Cloudflare Workers** como ambiente de execução e **Hono** como framework HTTP.

A aplicação não terá como unidade principal de execução um servidor Node.js tradicional iniciado e mantido pelo processo da aplicação. O ponto de entrada deverá ser compatível com o modelo de execução do Workers, no qual a plataforma recebe as requisições e invoca a aplicação conforme necessário.

A arquitetura também adotará **Vertical Slice Architecture** como estratégia principal de organização das funcionalidades.

A migração deve preservar as responsabilidades de negócio existentes sempre que possível, mas adaptar as fronteiras técnicas às características do novo runtime.

## Motivações

As motivações registradas para a migração são:

1. Adotar um modelo Serverless/Edge para a execução da API.
2. Utilizar a infraestrutura do Cloudflare Workers como ambiente de execução.
3. Utilizar Hono como framework HTTP adequado ao ambiente de Workers/Edge.
4. Evitar transportar para o novo ambiente pressupostos específicos de um servidor Node.js tradicional.
5. Reorganizar a aplicação em torno das funcionalidades por meio de Vertical Slice Architecture.
6. Aproveitar a migração para estabelecer uma arquitetura mais adequada ao modelo de execução escolhido.

> **Nota histórica:** o histórico disponível registra a decisão de migrar para Serverless/Edge e a adoção de Hono/Cloudflare, mas não registra métricas formais de custo, latência ou desempenho que tenham sido usadas como justificativa quantitativa. Portanto, essas métricas não são consideradas motivação documentada desta decisão.

## Evolução da decisão

### 1. Arquitetura anterior baseada em Koa

A Coffee API utilizava Koa como framework HTTP e possuía uma estrutura tradicional de aplicação web, com componentes como `app.ts`, middlewares e uma organização separada para controllers, services e models.

Essa arquitetura funcionava como uma aplicação de servidor tradicional.

### 2. Decisão de migrar para Serverless

Em agosto de 2026 foi iniciada a migração da aplicação para Serverless/Edge.

O objetivo passou a ser construir a API diretamente considerando o runtime do Cloudflare Workers, em vez de adaptar posteriormente uma aplicação Koa/Node.js para esse ambiente.

Foi explicitamente decidido reiniciar a parte de infraestrutura da API de forma limpa, preservando a arquitetura e o conhecimento de domínio que fossem úteis, mas sem tratar o código Koa como a implementação obrigatória do novo runtime.

### 3. Escolha do Hono

Hono foi escolhido como framework HTTP para a nova implementação.

As rotas passaram a ser definidas por meio de instâncias de `Hono`, e os handlers passaram a utilizar o `Context` fornecido pelo framework.

Exemplo conceitual da nova abordagem:

```ts
const categoryRoutes = new Hono();

categoryRoutes.get("/categories", CategoryController.index);
```

A implementação definitiva deve seguir a estrutura atualmente existente no código, e este exemplo serve apenas para registrar a evolução histórica.

### 4. Adaptação de controllers e services

A migração exigiu adaptar controllers e services que anteriormente estavam associados ao modelo de execução do Koa.

No Hono, handlers recebem o `Context` da requisição e trabalham com mecanismos próprios do framework, como:

- `c.req` para acessar dados da requisição;
- `c.req.param()` para parâmetros de rota;
- `c.req.json()` para corpos JSON;
- métodos de resposta do contexto do Hono.

Os services continuam sendo uma possibilidade para encapsular regras de aplicação, mas a arquitetura deixa de exigir uma separação global rígida baseada exclusivamente em `controllers/`, `services/` e `models/`.

### 5. Adoção de Vertical Slice Architecture

Durante a definição da nova arquitetura foi decidido adotar **Vertical Slice Architecture**.

A unidade principal de organização passa a ser a funcionalidade, e não apenas o tipo técnico do arquivo.

Assim, conceitos como controller/handler, service/use case, validação e acesso a dados podem permanecer próximos da funcionalidade à qual pertencem quando isso fizer sentido.

A adoção de Vertical Slice não significa que classes como services, repositories ou models sejam proibidas. Significa que sua localização e responsabilidade devem ser determinadas pela feature e pelo fluxo da aplicação, e não por uma obrigação de criar diretórios globais para cada tipo de componente.

### 6. Testes e validação inicial

Antes de avançar na migração arquitetural, foi estabelecida uma configuração de testes utilizando **Vitest**, com suporte aos aliases do TypeScript por meio de `vite-tsconfig-paths`.

A etapa inicial da nova configuração foi concluída com sucesso, com os testes passando e a API em execução.

Essa validação serviu como base para continuar a evolução da implementação Serverless/Hono.

## Consequências positivas

### Compatibilidade com o modelo Serverless/Edge

A aplicação passa a ser projetada diretamente para um runtime de Workers, reduzindo a necessidade de manter abstrações específicas de um servidor Node.js tradicional.

### Separação entre domínio e infraestrutura

A migração incentiva a identificação das responsabilidades que pertencem ao domínio/aplicação e das que dependem do ambiente de execução.

### Organização por funcionalidade

A Vertical Slice Architecture permite que uma funcionalidade seja entendida de maneira mais localizada, reduzindo a necessidade de navegar por vários diretórios técnicos globais para compreender um fluxo.

### Evolução independente das features

Funcionalidades diferentes podem evoluir com menor acoplamento estrutural entre si, desde que suas interfaces e dependências permaneçam bem definidas.

## Consequências e trade-offs

### Mudança do modelo mental de execução

Desenvolvedores acostumados com um servidor Node.js persistente precisam considerar as características do runtime Serverless/Edge.

Não se deve assumir que estado em memória do processo, inicialização única da aplicação ou recursos específicos do Node.js tradicional estarão disponíveis da mesma forma.

### Adaptação de dependências

Dependências utilizadas pela aplicação precisam ser compatíveis com o ambiente escolhido. Bibliotecas que dependem de APIs específicas do Node.js podem exigir substituição ou adaptação.

### Mudança estrutural

A migração pode exigir mover ou reestruturar componentes que anteriormente estavam organizados em diretórios globais como `controllers`, `services` e `models`.

### Maior atenção à infraestrutura

Configurações de ambiente, bindings, banco de dados, secrets e recursos externos precisam ser tratados de acordo com o modelo do Cloudflare Workers.

### Migração incremental

Durante a migração, pode existir temporariamente uma mistura de conceitos da arquitetura anterior e da nova arquitetura. Essa situação deve ser tratada como estado de transição e não como objetivo arquitetural final.

## Alternativas consideradas

### Permanecer com Koa em um servidor tradicional

Não foi escolhida como arquitetura final. O projeto decidiu prosseguir com Serverless/Edge e construir a nova implementação considerando o runtime escolhido desde o início.

### Manter uma arquitetura global estritamente em camadas

A estrutura tradicional baseada em diretórios globais de `controllers`, `services`, `models` e similares foi considerada durante a evolução do projeto, mas a decisão final foi utilizar Vertical Slice Architecture como organização principal.

Isso não elimina camadas ou responsabilidades; apenas evita que a estrutura física do projeto seja determinada exclusivamente por categorias técnicas globais.

### Adaptar o Koa diretamente para o ambiente Serverless

Essa abordagem não foi adotada como estratégia principal. O projeto optou por tratar a nova API como uma implementação Serverless/Hono, em vez de preservar o ciclo de vida de uma aplicação Koa tradicional.

## Impacto sobre a API

A migração arquitetural não implica, por si só, uma mudança no contrato funcional da API.

Endpoints, regras de negócio, autenticação e formatos de resposta devem ser preservados durante a migração sempre que não houver uma decisão explícita de alteração.

Quando uma mudança de comportamento for necessária devido ao novo runtime ou a uma decisão de projeto, ela deve ser documentada separadamente.

## Regras decorrentes desta decisão

1. O código novo deve ser compatível com o runtime alvo do Cloudflare Workers.
2. Não devem ser introduzidas dependências Node.js incompatíveis com Workers sem uma justificativa técnica explícita.
3. O ciclo de vida do servidor tradicional não deve ser assumido como disponível.
4. Novas funcionalidades devem ser organizadas preferencialmente como slices verticais.
5. Componentes compartilhados devem ser extraídos somente quando houver uma necessidade real de compartilhamento.
6. A infraestrutura específica do Cloudflare deve permanecer separada das regras de negócio sempre que possível.
7. Mudanças no contrato público da API devem ser documentadas independentemente desta decisão arquitetural.
8. O código atual é a fonte de verdade para o estado da implementação; este ADR registra a decisão e seu contexto histórico, não substitui a implementação.

## Estado atual

Esta decisão permanece como base arquitetural da migração da Coffee API para Serverless/Edge.

A implementação deve ser avaliada continuamente para garantir que a estrutura física do projeto esteja convergente com as decisões de **Hono + Cloudflare Workers + Vertical Slice Architecture**, evitando manter estruturas herdadas do Koa apenas por compatibilidade histórica.

## Histórico de alterações deste ADR

| Data | Alteração |
| --- | --- |
| 2026-08-05 | Início da migração da API para Serverless/Edge e definição de uma nova implementação baseada no runtime alvo. |
| 2026-08-07 | Definição das rotas utilizando Hono e adaptação da camada HTTP para o modelo de handlers/contexto do Hono. |
| 2026-08-12 | Continuidade da adaptação das rotas, autenticação/autorização e controllers para Hono. |
| 2026-08-21 | Evolução da abordagem de controllers para execução Serverless/Cloudflare. |
| 2026-08-22 | Adaptação de services existentes para a nova arquitetura Hono. |
| 2026-09-30 | Consolidação desta documentação como ADR, reunindo as decisões e recorrências registradas no histórico disponível do projeto. |

## Referências internas

- `architecture/` — descrição da arquitetura atual.
- `deployment/` — detalhes do ambiente Serverless/Cloudflare.
- `testing/` — estratégia e configuração de testes.
- `decisions/002-hono.md` — decisão específica sobre Hono, caso criada.
- `decisions/003-vertical-slice.md` — decisão específica sobre Vertical Slice Architecture, caso criada.
