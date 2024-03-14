"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var sqlite3 = require("sqlite3");
// Função para inserir dados na tabela produtos
var insertProdutos = function (db, produtos) {
    var stmt = db.prepare("INSERT INTO produtos VALUES (\n        $ID, $sCodInterno, $sCodBarras, $bAtivo, $sDescricao, $sDescrPDV, $iGrupo, $iDepto, $iSessao, $iFamilia, $bPesado, $bEnviaBalanca, $bSemelhante, $bPermDesconto, \n        $bPastaCaixa, $bFabricado, $sUndMedida, $sTipoAliquota, $rTaxaAliquota, $sST, $rPreco_Compra, $rPreco_Custo, $b3CasasDec, $rPreco_Venda1, \n        $rPreco_Venda2, $rPreco_Venda3, $iTipoPromo, $iQtdePromo, $rPreco_Promo, $rEstoqueAtual, $rEstoqueMinimo, $rEstoquePAF, $rValComissaoVend, \n        $sImpConsumo, $bBebidaAlcoolica, $sNCM, $rIBPTax, $rIBPTaxE, $rIBPTaxM, $rAliqRed, $rPis, \n        $rCofins, $sCSTPisCofins, $sCEST, $sCFOP, $sBalUnit, $sAux, $bDesonerado, \n        $sCks, $sCodBenef\n    )");
    produtos.forEach(function (produto) {
        stmt.run({
            $ID: produto.jsonb_build_object.sCodInterno,
            $sCodInterno: produto.jsonb_build_object.sCodInterno,
            $sCodBarras: produto.jsonb_build_object.sCodBarras,
            $bAtivo: produto.jsonb_build_object.bAtivo,
            $sDescricao: produto.jsonb_build_object.sDescricao,
            $sDescrPDV: produto.jsonb_build_object.sDescrPDV,
            $iGrupo: produto.jsonb_build_object.iGrupo,
            $iDepto: produto.jsonb_build_object.iDepto,
            $iSessao: produto.jsonb_build_object.iSessao,
            $iFamilia: produto.jsonb_build_object.iFamilia,
            $bPesado: produto.jsonb_build_object.bPesado,
            $bEnviaBalanca: produto.jsonb_build_object.bEnviaBalanca,
            $bSemelhante: produto.jsonb_build_object.bSemelhante,
            $bPermDesconto: produto.jsonb_build_object.bPermDesconto,
            $bPastaCaixa: produto.jsonb_build_object.bPastaCaixa,
            $bFabricado: produto.jsonb_build_object.bFabricado,
            $sUndMedida: produto.jsonb_build_object.sUndMedida,
            $sTipoAliquota: produto.jsonb_build_object.sTipoAliquota,
            $rTaxaAliquota: produto.jsonb_build_object.rTaxaAliquota,
            $sST: produto.jsonb_build_object.sST,
            $rPreco_Compra: produto.jsonb_build_object.rPreco_Compra,
            $rPreco_Custo: produto.jsonb_build_object.rPreco_Custo,
            $b3CasasDec: produto.jsonb_build_object.b3CasasDec,
            $rPreco_Venda1: produto.jsonb_build_object.rPreco_Venda1,
            $rPreco_Venda2: produto.jsonb_build_object.rPreco_Venda2,
            $rPreco_Venda3: produto.jsonb_build_object.rPreco_Venda3,
            $iTipoPromo: produto.jsonb_build_object.iTipoPromo,
            $iQtdePromo: produto.jsonb_build_object.iQtdePromo,
            $rPreco_Promo: produto.jsonb_build_object.rPreco_Promo,
            $rEstoqueAtual: produto.jsonb_build_object.rEstoqueAtual,
            $rEstoqueMinimo: produto.jsonb_build_object.rEstoqueMinimo,
            $rEstoquePAF: produto.jsonb_build_object.rEstoquePAF,
            $rValComissaoVend: produto.jsonb_build_object.rValComissaoVend,
            $sImpConsumo: produto.jsonb_build_object.sImpConsumo,
            $bBebidaAlcoolica: produto.jsonb_build_object.bBebidaAlcoolica,
            $sNCM: produto.jsonb_build_object.sNCM,
            $rIBPTax: produto.jsonb_build_object.rIBPTax,
            $rIBPTaxE: produto.jsonb_build_object.rIBPTaxE,
            $rIBPTaxM: produto.jsonb_build_object.rIBPTaxM,
            $rAliqRed: produto.jsonb_build_object.rAliqRed,
            $rPis: produto.jsonb_build_object.rPis,
            $rCofins: produto.jsonb_build_object.rCofins,
            $sCSTPisCofins: produto.jsonb_build_object.sCSTPisCofins,
            $sCEST: produto.jsonb_build_object.sCEST,
            $sCFOP: produto.jsonb_build_object.sCFOP,
            $sBalUnit: produto.jsonb_build_object.sBalUnit,
            $sAux: produto.jsonb_build_object.Aux,
            $bDesonerado: produto.jsonb_build_object.bDesonerado,
            $sCks: produto.jsonb_build_object.sCks,
            $sCodBenef: produto.jsonb_build_object.sCodBenef
        });
    });
    stmt.finalize();
};
// Função para inserir dados na tabela AuxProduto
var insertAuxProduto = function (db, auxData) {
    var stmt = db.prepare("INSERT INTO AuxProduto (ID_Produtos, sCodInterno, sCodAux) VALUES (?, ?, ?)");
    auxData.forEach(function (codigoAux) {
        stmt.run(codigoAux.sCodInterno, codigoAux.sCodInterno, codigoAux.sCodAux);
    });
    stmt.finalize();
};
// Função para carregar dados do JSON para o banco de dados
var loadJSONToDB = function () {
    // Leitura do arquivo JSON
    var jsonData = fs.readFileSync('D://Backend//xlsx-json//carga_produtos//produto.json', 'utf8');
    var data = JSON.parse(jsonData);
    // Caminho do banco de dados SQLite
    var dbPath = 'D://Backend//xlsx-json//carga_produtos//pdv_cad.s3db';
    // Conexão com o banco de dados SQLite
    var db = new sqlite3.Database(dbPath);
    // Deletar dados das tabelas produtos e AuxProduto
    db.run("DELETE FROM produtos", function (err) {
        if (err) {
            console.error('Erro ao deletar dados da tabela produtos:', err.message);
            return;
        }
        console.log('Dados da tabela produtos deletados com sucesso.');
    });
    db.run("DELETE FROM AuxProduto", function (err) {
        if (err) {
            console.error('Erro ao deletar dados da tabela AuxProduto:', err.message);
            return;
        }
        console.log('Dados da tabela AuxProduto deletados com sucesso.');
    });
    // Inserir dados na tabela produtos
    insertProdutos(db, data.produtos);
    // Inserir dados na tabela AuxProduto
    insertAuxProduto(db, data.codigos_auxiliares);
    // Fechar conexão com o banco de dados
    db.close(function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Conexão com o banco de dados fechada.');
    });
};
// Chamada da função para carregar dados do JSON para o banco de dados
loadJSONToDB();
