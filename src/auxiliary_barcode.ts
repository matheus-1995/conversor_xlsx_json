import * as XLSX from 'xlsx';
import * as fs from 'fs';

// Definindo o tipo para os dados do Excel
interface ExcelData {
    barcode: string;
    barcode_auxiliary: string;
}

// Função para ler o arquivo Excel e converter para JSON
function excelToJson(filePath: string): ExcelData[] {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assumindo que você tem apenas uma planilha
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json<ExcelData>(worksheet, { raw: true });
    return jsonData;
}

// Função para formatar os dados conforme o formato desejado
function formatData(data: ExcelData[]): string {
    let formattedJson = '[';

    data.forEach((item, index) => {
        formattedJson += `{
    "barcode": "${item.barcode}",
    "barcode_auxiliary": "${item.barcode_auxiliary}"
  }`;

        if (index < data.length - 1) {
            formattedJson += ',';
        }
    });

    formattedJson += ']';

    return formattedJson;
}

// Função para salvar o JSON em um arquivo
function saveToJsonFile(data: string, outputPath: string): void {
    fs.writeFileSync(outputPath, data);
}

// Arquivo Excel de entrada
const inputFilePath = "D://Backend//xlsx-json//auxiliar_barcode//code_auxiliar.xlsx";
// Caminho para salvar o arquivo JSON de saída
const outputFilePath = "D://Backend//xlsx-json//auxiliar_barcode//code_auxiliar.json";

// Ler o arquivo Excel e converter para JSON
const jsonData = excelToJson(inputFilePath);

// Formatar os dados
const formattedData = formatData(jsonData);

// Salvar o JSON em um arquivo
saveToJsonFile(formattedData, outputFilePath);

console.log('Conversão concluída!');
