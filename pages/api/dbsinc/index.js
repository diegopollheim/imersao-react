import fs from "fs";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function DbSinc(req, res) {
  ConvertTablesToCsv();

  // Aguarda a criação dos arquivos csv para converter e enviar para o android
  setTimeout(function () {
    const dbBase64 = DataBaseToBase64();
    res.send(dbBase64);
  }, 2000);
}

// Uni todas as tabelas convertidas em csv, em
// um único arquivo e codifica em base64 para ser enviado para o android
function DataBaseToBase64() {
  const banco = {
    usuarios: fs.readFileSync("c:/dados/csv/usuarios.csv", "utf-8"),
    furos: fs.readFileSync("c:/dados/csv/furos.csv", "utf-8"),
    amostras: fs.readFileSync("c:/dados/csv/amostras.csv", "utf-8"),
    chipbox: fs.readFileSync("c:/dados/csv/chipbox.csv", "utf-8"),
  };

  //return banco;
  return Buffer.from(JSON.stringify(banco)).toString("base64");
}

// Executa comando que faz a conversão das tabelas do banco
// em arquivos csv e salva na pasta download do projeto.
// quando surgirem novas tabelas basta adicionar no array de tabelas
async function ConvertTablesToCsv() {
  let tabelas = ["usuarios", "furos", "amostras", "chipbox"];
  const exec = require("child_process").exec;

  tabelas.map((table) => {
    const command = `sqlite3 -header -csv c:/dados/OreDataDB.db "select * from ${table};" > c:/dados/csv/${table}.csv`;
    exec(command, (err, stdout, stderr) => {
      if (err) return console.error(err);
      // console.log(`${table} stdout: `, stdout);
      // console.log(`${table} stderr: `, stderr);
    });
  });

  return;
}