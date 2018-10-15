IF NOT EXISTS (
                SELECT 1
                FROM sys.databases
                WHERE name = 'VendingMachine'
               )
BEGIN
    CREATE DATABASE VendingMachine
END

USE VendingMachine

-- Script para criação de tabela
BEGIN

    IF NOT EXISTS (
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'Cartao'
                )
    BEGIN
        CREATE TABLE Cartao (
            CartaoId    INT             IDENTITY    NOT NULL,
            Saldo       MONEY                       NOT NULL    CONSTRAINT DF_Cartao_Saldo DEFAULT 0.00,
            CONSTRAINT PK_CartaoId                              PRIMARY KEY (CartaoId) 
        )
    END

    IF NOT EXISTS (
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'Lancamento'
                )
    BEGIN
        CREATE TABLE Lancamento (
            LancamentoId        INT             IDENTITY    NOT NULL,
            CartaoId            INT                         NOT NULL,
            Descricao           VARCHAR(50)                 NOT NULL,
            Valor               MONEY                       NOT NULL,
            [Data]              DATE                        NOT NULL    CONSTRAINT DF_Lancamento_Data  DEFAULT GETDATE(),
            CONSTRAINT PK_LancamentoId           PRIMARY KEY (LancamentoId),
            CONSTRAINT FK_Lancamento_Cartao      FOREIGN KEY (CartaoId) REFERENCES Cartao(CartaoId)
        )
    END    

    IF NOT EXISTS (
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'Produto'
                )
    BEGIN
        CREATE TABLE Produto (
            ProdutoId        INT             IDENTITY    NOT NULL,
            Descricao        VARCHAR(50)                 NOT NULL,
            Preco            MONEY                       NOT NULL,
            CONSTRAINT PK_ProdutoId                      PRIMARY KEY (ProdutoId)
        )
    END       

END