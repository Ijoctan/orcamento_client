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
  
  
