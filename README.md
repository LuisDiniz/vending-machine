# vending-machine

Esse sistema é uma solução para empresas que oferecem vending-machines para uso de seus funcionários. O sistema pode ser acessado diretamente pelas vending-machines via API e possibilita consultar saldo, recarga automática diária e realizar lançamentos de compra de produtos. Assume-se que todas as operações precisam que um cartão seja inserido na máquina. Todos os dias que o cartão é inserido na máquina pela primeira vez, uma carga automática de R$ 5.50 é realizada no cartão do funcionário e o saldo não é cumulativo.

## Pré-requisitos

Esse projeto foi desenvolvido utilizando Node.js e banco de dados Microsoft SQL Server executando em Docker.

Para instalar o node acesse: https://nodejs.org/en/download/

É possível instalar o MSSQL em usando Docker, para isso a microsoft disponibilizou o seguinte tutorial: https://docs.microsoft.com/pt-br/sql/linux/quickstart-install-connect-docker?view=sql-server-2017

Se preferir é possível baixar e instalar o MSSQL por meio desse link: https://www.microsoft.com/pt-br/sql-server/sql-server-editions-express

## Instalações necessárias

Para instalar as dependências necessárias usadas no projeto é preciso navegar até a raíz do projeto e executar o seguinte comando via terminal:

```
npm install
```

## Configurações

Após instalar as dependências usadas no projeto, basta configurar a conexão com o banco de dados e o endereço e porta que a API vai rodar.

Para configurar a conexão com o banco de dados altere o arquivo vending-machine/config/dbConfig.js com as configurações do seu banco de dados. Exemplo:

```
const config = {
    user: 'User',
    password: 'Senha',
    server: 'localhost',
    database: 'VendingMachine',
    port: 1433,
    options: {
        encrypt: true
    }
}
```

Para configurar o endereço que a API irá executar é necessário alterar o campo "host" do arquivo vending-machine/api/swagger/swagger.yaml. Exemplo: 

```
swagger: "2.0"
info:
  version: "0.0.1"
  title: Vending Machine
# during dev, should point to your local machine
host: localhost:3000
...
```

Se preferir você pode instalar o swagger (https://www.npmjs.com/package/swagger) e configurar a documentação da API por meio do comando na raíz do seu projeto:

```
swagger project edit
```

Ao executar o camndo uma página é carregada no navegador que permite alterar a documentação. A vantagem de utilizar a UI do swagger é que se você comentar algum erro de sintaxe a interface te notifica durante a edição.

Para mais informações sobre a sintaxe do swagger acesse: https://swagger.io/specification/v2/

## Executando o projeto

```
npm start
```

Para acessar a documentação da API e verificar os endpoints existentes, assim como os campos obrigatórios e tipos esperados basta acessar o seguinte endereço em algum navegador:

```
http://localhost:3000/docs
```

O exemplo acima acessa a documentação da API usando o endereço e portal default do projeto, basta alterar de acordo com suas configurações.

### Testes automatizados

Para realizar os testes automatizados execute o seguinte comando via terminal no diretório raíz do projeto:

```
npm teste
```

## Ferramentas utilizas

* [npm](https://www.npmjs.com) - Gerenciador de dependências
* [Swagger](https://swagger.io) - Framework para documentação da API

