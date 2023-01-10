export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: "10000mb", // Set desired value here
    },
  },
};

export default function ReceiveBase64(req, res) {
  const method = req.method;
  try {
    if (method == "POST") {
      const tabelasCsv = RetornaTabelsCsv(req.body.base64);

      const usersCsv = tabelasCsv.usuarios;
      const furosCsv = tabelasCsv.furos;
      const amostrasCsv = tabelasCsv.amostras;
      const chipBoxCsv = tabelasCsv.chipbox;

      const usuariosList = CsvToList(usersCsv);
      const furosList = CsvToList(furosCsv);
      const amostrasList = CsvToList(amostrasCsv);
      const chipBoxList = CsvToList(chipBoxCsv);

      res.json({
        success: true,
        message: "Informações recebidas com sucesso!",
        data: {
          usuarios: usuariosList,
          furos: furosList,
          amostras: amostrasList,
          chipBox: chipBoxList,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// Converte os dados recebidos em CSV
function RetornaTabelsCsv(dbEncoded) {
  const dbDecoded = Buffer.from(dbEncoded, "base64").toString("utf-8");
  const dbJson = JSON.parse(dbDecoded);

  return dbJson;
}

function CsvToList(csvFile) {
 const csv =  csvFile.replaceAll('"','')
  const list = [];
  const linhas = csv.split("\n");
  const header = linhas.shift().split(",");

  linhas.map((linha, index) => {
    let itensLinha = linha.split(",");

    let obj;
    header.map((coluna, i) => {
      //console.log(`COLUNA: ${coluna} ITEM: ${itensLinha[i]}`);

      obj = { ...obj, [coluna]: itensLinha[i] };
    });
    list.push(obj);

    obj = {};
  });

  // Retorna a lista removendo itens vazio caso exista
  return list.filter((i) => i.id !== "");
}