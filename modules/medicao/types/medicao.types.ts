export interface ItemOrcamentoResumo {
  id: number;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  quantidadeAcumulada: number;
}

export interface ItemMedido {
  id: number;
  quantidadeMedida: number;
  valorTotalMedido: number;
  itemOrcamento: ItemOrcamentoResumo;
}

export interface Medicao {
  id: number;
  numeroMedicao: string;
  dataMedicao: string;
  valorTotal: number;
  status: "ABERTA" | "VALIDADA";
  observacao: string;
  itens?: ItemMedido[];
}
  