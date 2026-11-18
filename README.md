# Leveling Radio

Portal comunitário independente para a comunidade de Leveling Idle 2D, com identidade visual dark fantasy em roxo e azul.

## Stack inicial

- React
- Vite
- CSS responsivo
- Lucide React para ícones
- Player HTML5 preparado para stream Icecast/AzuraCast

## Rodar localmente

```bash
npm install
cp .env.example .env
# Defina VITE_RADIO_STREAM_URL com a URL pública da transmissão
npm run dev
```

## O que está no MVP

- Homepage responsiva com identidade visual Leveling Radio
- Navegação por seções
- Player fixo com play/pause e volume
- Área de notícias demonstrativas
- Ranking visual demonstrativo
- Cards de classes
- Chamadas para login, comunidade e recursos planejados

## Próximas integrações

1. Configurar o servidor de streaming Icecast ou AzuraCast.
2. Conectar Supabase Auth e PostgreSQL para cadastro, login e perfis.
3. Implementar feed, comentários, chat e notificações.
4. Confirmar a existência de API pública/autorizada do jogo antes de integrar rankings reais.
5. Criar painel administrativo, moderação e permissões.
6. Configurar hospedagem e domínio.

## Observações

- Os dados de ranking e conteúdo são fictícios e servem apenas para demonstrar o layout.
- Login, chat, ranking sincronizado e painel administrativo ainda não estão implementados.
- Projeto independente, sem afiliação oficial com os criadores ou operadores de Leveling Idle 2D.
- Usar marcas, artes e dados do jogo somente conforme as permissões aplicáveis.
