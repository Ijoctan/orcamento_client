export interface Item {
    id: number;
    orcamento?: {
      id: number;
    };
  
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
  
    quantidadeAcumulada: number;
  }
  
  export type CriarItemDTO = {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  };
  
  export type AtualizarItemDTO = {
    itemId: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  };
  