# microfrontends

1. Entender o funcionamento para imports externos do [NextJS URL Imports](https://nextjs.org/docs/pages/api-reference/next-config-js/urlImports)
2. Entender como fazer o build completo da aplicação com suas dependências
3. Entender o build se baseando no [skypack](https://cdn.skypack.dev/canvas-confetti)

# Prova de conceito - Webpack Module Federation

## Prós 

1. Ferramental consolidado
2. Permite compartilhar dependências
3. Documentação/Material vasto

## Contras

1. Apesar do ferramental consolidado, tivemos problemas com Typescript
2. O setup + boilerplate é bastante verboso e confuso
3. Solução atrelada a somente uma tecnologia

# Prova de conceito com ViteJS - Host x Remote

## Prós

1. Agnostico a tecnologia
2. Simplicidade por usar apenas a plataforma web
3. Permite multiplas tecnologias na mesma página

## Contras

1. Aumenta do bundle size da aplicação
2. Falta de ferramental
3. Orientado a contratos
