
- [Quis - BACK-END](#quis---back-end)
  - [Como rodar o projeto localmente:](#como-rodar-o-projeto-localmente)
  - [Formatação](#formatação)
  - [Mudanças no banco de dados](#mudanças-no-banco-de-dados)
  - [Ambientes](#ambientes)

# Quis - BACK-END

## Como rodar o projeto localmente:

1. baixar dependências
```bash
npm i
```

2. Rodar o projeto
```bash
npm run start:dev
```

## Swagger | doc

Após rodar o projeto, é possível visualizar a documentação no path: /api/docs

ex.: http://localhost:3000/api/docs

## Formatação

Não esqueça de formatar o arquivo antes de salvar no repositório online. Para isso, estamos utilizando o eslint

1) comando para ver coisas a serem mudadas

```bash
npm run lint
```
2) comando para formatar automaticamente
   
```bash
npm run format
```

## Mudanças no banco de dados

Se for modificado algo no arquivo **schema.prisma**: 

1) Fazer o update do prisma client com:

```bash
npx prisma generate
```
2) Faça o push para a database

```bash
npx prisma db push
```

Se quiser fazer uma migração, utilize o comando:

```bash
npx prisma migrate dev --name migration-name
```

## Tests

```bash
npm run test
```

## Ambientes

Por motivos de segurança, alguns arquivos serão disponibilizados internamente nos nossos grupos, mas não devem aparecer no repositório:

- .env: . Perguntar no grupo qual estamos usando
-  requests para testes no postman
