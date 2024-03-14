import * as XLSX from 'xlsx';
import * as fs from 'fs';

// Função para ler o arquivo Excel e converter para JSON
function excelToJson(filePath: string): any[] {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assumindo que você tem apenas uma planilha
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    return jsonData;
}

// Função para formatar os dados conforme o formato desejado
function formatData(data: any[]): any[] {
    return data.map(item => ({
        barcode: item['barcode'],
        internal_code: item['internal_code'],
        sales_item: item['sales_item'],
        active_item: item['active_item'],
        description: item['description'],
        brief_description: item['brief_description'],
        category_one: item['category_one'],
        category_two: item['category_two'],
        category_three: item['category_three'],
        measures_id: item['measures_id'],
        purchase_price: parseFloat(item['purchase_price']),
        sale_price1: parseFloat(item['sale_price1']),
        sale_price2: parseFloat(item['sale_price2']),
        sale_price3: parseFloat(item['sale_price3']),
        brand_id: item['brand_id'],
        tax_group_id: item['tax_group_id'],
        ncm_code: item['ncm_code'],
        cest_code: item['cest_code'],
        product_scale: isNaN(parseInt(item['product_scale'])) ? item['product_scale'] : parseInt(item['product_scale']),
        validity: isNaN(parseInt(item['validity'])) ? item['validity'] : parseInt(item['validity']),
        status: item['status'],
        product_input_transformation: item['product_input_transformation'],
        marketplace: item['marketplace']
    }));
}

// Função para salvar o JSON em um arquivo
function saveToJsonFile(data: any[], outputPath: string): void {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}

// Arquivo Excel de entrada
const inputFilePath = 'D://Backend//xlsx-json//Exemplo de colunas par conversão.xlsx';
// Caminho para salvar o arquivo JSON de saída
const outputFilePath = 'D://Backend//xlsx-json//banco.json';

// Ler o arquivo Excel e converter para JSON
const jsonData = excelToJson(inputFilePath);

// Formatar os dados
const formattedData = formatData(jsonData);

// Salvar o JSON em um arquivo
saveToJsonFile(formattedData, outputFilePath);

console.log('Conversão concluída!');
