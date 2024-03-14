import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';

// Caminho do banco de dados SQLite
const dbPath = 'D:/Backend/xlsx-json/carga_usuarios/pdv_opercx.s3db';

// Caminho do arquivo JSON
const jsonPath = 'D:/Backend/xlsx-json/carga_usuarios/usuarios.json';

// Função para ler o arquivo JSON
function readJSONFile(filePath: string): any {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(data);
}

// Função para excluir todos os dados da tabela operador
function deleteOperadorData(db: sqlite3.Database) {
    db.run(`DELETE FROM operador`, function(err) {
        if (err) {
            console.error('Erro ao excluir dados de operador:', err);
        } else {
            console.log('Dados de operador excluídos com sucesso!');
        }
    });
}

// Função para excluir todos os dados da tabela perfil_operador
function deletePerfilOperadorData(db: sqlite3.Database) {
    db.run(`DELETE FROM perfil_operador`, function(err) {
        if (err) {
            console.error('Erro ao excluir dados de perfil_operador:', err);
        } else {
            console.log('Dados de perfil_operador excluídos com sucesso!');
        }
    });
}

// Função para inserir dados de operador no banco de dados
function insertOperadorData(db: sqlite3.Database, operadores: any[]) {
    const stmt = db.prepare(`INSERT INTO operador (iNumero, sCodigo, sNome, sSenha, iPerfil) VALUES (?, ?, ?, ?, ?)`);
    operadores.forEach((operador) => {
        const { sNome, sSenha, iNumero, iPerfil, sCodigo } = operador.operador;
        stmt.run(iNumero, sCodigo, sNome, sSenha, iPerfil);
    });
    stmt.finalize();
    console.log('Dados de operador inseridos com sucesso!');
}

// Função para inserir dados de perfil_operador no banco de dados
function insertPerfilOperadorData(db: sqlite3.Database, perfilOperadores: any[]) {
    const stmt = db.prepare(`INSERT INTO perfil_operador (iNumero, iNivel, sAcesso) VALUES (?, ?, ?)`);
    perfilOperadores.forEach((perfilOperador) => {
        const { iNumero, iNivel, sAcesso } = perfilOperador.perfil_operador;
        stmt.run(iNumero, iNivel, sAcesso);
    });
    stmt.finalize();
    console.log('Dados de perfil_operador inseridos com sucesso!');
}

// Função principal para inserir dados do JSON no banco de dados
function insertDataFromJSON() {
    // Ler o arquivo JSON
    const jsonData = readJSONFile(jsonPath);

    // Iniciar conexão com o banco de dados
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Erro ao abrir o banco de dados:', err.message);
        } else {
            console.log('Conexão com o banco de dados estabelecida com sucesso!');
            // Excluir dados das tabelas antes de inserir novos dados
            deleteOperadorData(db);
            deletePerfilOperadorData(db);
            // Inserir dados de operador e perfil_operador
            insertOperadorData(db, jsonData);
            insertPerfilOperadorData(db, jsonData);
        }
    });

    // Fechar conexão com o banco de dados ao final
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados:', err.message);
        } else {
            console.log('Conexão com o banco de dados fechada com sucesso!');
        }
    });
}

// Chamada da função principal
insertDataFromJSON();
