/* Banco de dados */
CREATE DATABASE GestaoEmCampo;
GO

USE GestaoEmCampo;
GO
/* Lógico_2 */

/* Tabela de Usuários */
CREATE TABLE Usuario_Escala (
    id_usuario INTEGER IDENTITY PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(8),
    tipo_usuario VARCHAR(50)
);


/* Tabela de Escalas */
CREATE TABLE Escala (
    id_escala INTEGER IDENTITY PRIMARY KEY,
    data_inicio DATE,
    data_fim DATE,
    baixada VARCHAR(100),
    statuss BIT
);


/* Tabela de Solicitações */
CREATE TABLE Solicitacao (
    id_solicitacao INTEGER IDENTITY PRIMARY KEY,
    tipo VARCHAR(100),
    data_solicitada_inicio DATE,
    data_solicitada_fim DATE,
    motivo VARCHAR(200),
    statuss BIT,
    fk_id_usuario INTEGER,
    fk_id_escala INTEGER
);


/* Relacionamento entre Solicitação e Usuário */
ALTER TABLE Solicitacao
ADD CONSTRAINT FK_Solicitacao_Usuario
FOREIGN KEY (fk_id_usuario)
REFERENCES Usuario_Escala(id_usuario)
ON DELETE NO ACTION;


/* Relacionamento entre Solicitação e Escala */
ALTER TABLE Solicitacao
ADD CONSTRAINT FK_Solicitacao_Escala
FOREIGN KEY (fk_id_escala)
REFERENCES Escala(id_escala)
ON DELETE NO ACTION;

/* Usuários */
INSERT INTO Usuario_Escala
(nome, email, senha, tipo_usuario)
VALUES
('Ana Souza', 'ana.souza@email.com', '12345678', 'Funcionário'),
('Carlos Oliveira', 'carlos.oliveira@email.com', '87654321', 'Funcionário'),
('Mariana Santos', 'mariana.santos@email.com', '11223344', 'Gestor'),
('João Pereira', 'joao.pereira@email.com', '55667788', 'Funcionário'),
('Beatriz Lima', 'beatriz.lima@email.com', '99887766', 'Gestor');


/* Escalas */
INSERT INTO Escala
(data_inicio, data_fim, baixada, statuss)
VALUES
('2026-09-01', '2026-09-07', 'Sim', 1),
('2026-09-08', '2026-09-14', 'Não', 1),
('2026-09-15', '2026-09-21', 'Não', 1),
('2026-09-22', '2026-09-28', 'Não', 1),
('2026-09-29', '2026-10-05', 'Não', 0);


/* Solicitações */
INSERT INTO Solicitacao
(tipo, data_solicitada_inicio,
 data_solicitada_fim, motivo, statuss,
 fk_id_usuario, fk_id_escala)
VALUES
('Folga', '2026-09-10', '2026-09-11',
 'Compromisso pessoal', 0, 1, 2),

('Troca de Escala', '2026-09-12', '2026-09-13',
 'Necessidade de trocar o turno', 1, 2, 2),

('Folga', '2026-09-16', '2026-09-17',
 'Consulta e compromisso pessoal', 0, 4, 3),

('Troca de Escala', '2026-09-23', '2026-09-24',
 'Conflito de horário', 1, 1, 4),

('Folga', '2026-09-30', '2026-10-01',
 'Motivo familiar', 0, 2, 5);