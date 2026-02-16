export interface Orcamento {
    id: number;
    numeroProtocolo: string;
    tipoOrcamento: string;
    valorTotal: number;
    status: "ABERTO" | "FINALIZADO";
  }
  