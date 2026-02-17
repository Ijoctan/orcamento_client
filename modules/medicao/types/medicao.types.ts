export interface Medicao {
    id: number;
    numeroMedicao: string;
    dataMedicao: string;
    valorTotal: number;
    status: "ABERTA" | "VALIDADA";
    observacao: string;
  }
  