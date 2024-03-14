"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
var fs = require("fs");
// Função para ler o arquivo Excel e converter para JSON
function excelToJson(filePath) {
    var workbook = XLSX.readFile(filePath);
    var sheetName = workbook.SheetNames[0]; // Assumindo que você tem apenas uma planilha
    var worksheet = workbook.Sheets[sheetName];
    var jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    return jsonData;
}
// Função para formatar os dados conforme o formato desejado
function formatData(data) {
    var formattedJson = '[';
    data.forEach(function (item, index) {
        formattedJson += "{\n    \"barcode\": \"".concat(item.barcode, "\",\n    \"barcode_auxiliary\": \"").concat(item.barcode_auxiliary, "\"\n  }");
        if (index < data.length - 1) {
            formattedJson += ',';
        }
    });
    formattedJson += ']';
    return formattedJson;
}
// Função para salvar o JSON em um arquivo
function saveToJsonFile(data, outputPath) {
    fs.writeFileSync(outputPath, data);
}
// Arquivo Excel de entrada
var inputFilePath = "D://Backend//xlsx-json//auxiliar_barcode//code_auxiliar.xlsx";
// Caminho para salvar o arquivo JSON de saída
var outputFilePath = "D://Backend//xlsx-json//auxiliar_barcode//code_auxiliar.json";
// Ler o arquivo Excel e converter para JSON
var jsonData = excelToJson(inputFilePath);
// Formatar os dados
var formattedData = formatData(jsonData);
// Salvar o JSON em um arquivo
saveToJsonFile(formattedData, outputFilePath);
console.log('Conversão concluída!');
