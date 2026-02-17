export interface CriarItemDTO {
    orcamentoId: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  }
  
  export type AtualizarItemDTO = {
    itemId: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  };
  