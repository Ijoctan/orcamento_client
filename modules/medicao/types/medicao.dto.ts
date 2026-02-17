export interface CriarItemMedicaoDTO {
    itemOrcamentoId: number;
    quantidadeMedida: number;
  }
  
export interface CriarMedicaoDTO {
    observacao: string;
    itens: CriarItemMedicaoDTO[];
  }
