/* ========================================================= */
/* BANCO DE DADOS */
/* ========================================================= */

CREATE DATABASE GestaoEmCampo;
GO

USE GestaoEmCampo;
GO


/* ========================================================= */
/* TABELA DE USUÁRIOS */
/* ========================================================= */

CREATE TABLE Usuarios (
    id_usuario INTEGER IDENTITY PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(8),
    cargo VARCHAR(50)
);


/* ========================================================= */
/* TABELA DE ESCALAS */
/* ========================================================= */

CREATE TABLE Escalas (
    id_escala INTEGER IDENTITY PRIMARY KEY,
    data_inicio DATE,
    data_fim DATE,
    baixada VARCHAR(100),
    statuss BIT
);


/* ========================================================= */
/* TABELA DE SOLICITAÇÕES */
/* ========================================================= */

CREATE TABLE Solicitacoes (
    id_solicitacao INTEGER IDENTITY PRIMARY KEY,
    tipo VARCHAR(100),
    data_solicitada_inicio DATE,
    data_solicitada_fim DATE,
    motivo VARCHAR(200),
    statuss BIT,
    fk_id_usuario INTEGER,
    fk_id_escala INTEGER
);


/* ========================================================= */
/* TABELA DE TROCA DE ESCALA */
/* ========================================================= */

CREATE TABLE Troca_escala (
    Id_Troca INTEGER IDENTITY(1,1) PRIMARY KEY,
    Id_Usuario INTEGER NOT NULL,
    EscalaAtual VARCHAR(100) NOT NULL,
    NovaEscala VARCHAR(100) NOT NULL,
    Statuss VARCHAR(50) NOT NULL
    DataTroca DATE,
    Motivo VARCHAR(255),
    
);


/* ========================================================= */
/* RELACIONAMENTO SOLICITAÇÃO -> USUÁRIO */
/* ========================================================= */

ALTER TABLE Solicitacoes
ADD CONSTRAINT FK_Solicitacao_Usuario
FOREIGN KEY (fk_id_usuario)
REFERENCES Usuarios(id_usuario)
ON DELETE NO ACTION;


/* ========================================================= */
/* RELACIONAMENTO SOLICITAÇÃO -> ESCALA */
/* ========================================================= */

ALTER TABLE Solicitacoes
ADD CONSTRAINT FK_Solicitacao_Escala
FOREIGN KEY (fk_id_escala)
REFERENCES Escalas(id_escala)
ON DELETE NO ACTION;


/* ========================================================= */
/* RELACIONAMENTO TROCA DE ESCALA -> USUÁRIO */
/* ========================================================= */

ALTER TABLE Troca_escala
ADD CONSTRAINT FK_TrocaEscala_Usuario
FOREIGN KEY (Id_Usuario)
REFERENCES Usuarios(id_usuario)
ON DELETE NO ACTION;
/* ========================================================= */
/* TABELA DE APROVAÇÃO DE SOLICITAÇÕES */
/* ========================================================= */

CREATE TABLE Aprovar_Solicitacao (
    Id_Aprovacao INTEGER IDENTITY(1,1) PRIMARY KEY,
    Fk_Id_Solicitacao INTEGER NOT NULL,
    Fk_Id_Gestor INTEGER NOT NULL,
    Statuss VARCHAR(20) NOT NULL,
    Data_Aprovacao DATETIME NOT NULL DEFAULT GETDATE(),
    Observacao VARCHAR(200),

    /* RELACIONAMENTO COM SOLICITAÇÕES */
    CONSTRAINT FK_AprovarSolicitacao_Solicitacao
    FOREIGN KEY (Fk_Id_Solicitacao)
    REFERENCES Solicitacoes(id_solicitacao),

    /* RELACIONAMENTO COM USUÁRIOS/GESTORES */
    CONSTRAINT FK_AprovarSolicitacao_Gestor
    FOREIGN KEY (Fk_Id_Gestor)
    REFERENCES Usuarios(id_usuario)
);


/* ========================================================= */
/* USUÁRIOS */
/* ========================================================= */

INSERT INTO Usuarios
(nome, email, senha, cargo)
VALUES
('Ana Souza', 'ana.souza@email.com', '12345678', 'Funcionário'),

('Carlos Oliveira', 'carlos.oliveira@email.com', '87654321', 'Funcionário'),

('Mariana Santos', 'mariana.santos@email.com', '11223344', 'Gestor'),

('João Pereira', 'joao.pereira@email.com', '55667788', 'Funcionário'),

('Beatriz Lima', 'beatriz.lima@email.com', '99887766', 'Gestor');


/* ========================================================= */
/* ESCALAS */
/* ========================================================= */

INSERT INTO Escalas
(data_inicio, data_fim, baixada, statuss)
VALUES
('2026-09-01', '2026-09-07', 'Sim', 1),

('2026-09-08', '2026-09-14', 'Não', 1),

('2026-09-15', '2026-09-21', 'Não', 1),

('2026-09-22', '2026-09-28', 'Não', 1),

('2026-09-29', '2026-10-05', 'Não', 0);


/* ========================================================= */
/* SOLICITAÇÕES */
/* ========================================================= */

INSERT INTO Solicitacoes
(tipo,
 data_solicitada_inicio,
 data_solicitada_fim,
 motivo,
 statuss,
 fk_id_usuario,
 fk_id_escala)
VALUES

('Folga',
 '2026-09-10',
 '2026-09-11',
 'Compromisso pessoal',
 0,
 1,
 2),

('Troca de Escala',
 '2026-09-12',
 '2026-09-13',
 'Necessidade de trocar o turno',
 1,
 2,
 2),

('Folga',
 '2026-09-16',
 '2026-09-17',
 'Consulta e compromisso pessoal',
 0,
 4,
 3),

('Troca de Escala',
 '2026-09-23',
 '2026-09-24',
 'Conflito de horário',
 1,
 1,
 4),

('Folga',
 '2026-09-30',
 '2026-10-01',
 'Motivo familiar',
 0,
 2,
 5);


/* ========================================================= */
/* TROCAS DE ESCALA */
/* ========================================================= */

INSERT INTO Troca_escala
(Id_Usuario, EscalaAtual, NovaEscala, statuss,DataTroca,Motivo)
VALUES

(1,
 'Manhã - 06:00 às 14:00',
 'Tarde - 14:00 às 22:00',
 'Pendente'),

(2,
 'Tarde - 14:00 às 22:00',
 'Noite - 22:00 às 06:00',
 'Pendente'),

(4,
 'Noite - 22:00 às 06:00',
 'Manhã - 06:00 às 14:00',
 'Aprovada');

GO
