export interface CreateOrcamentoRequest {
    tipoOrcamentoId: number;
    valorTotal: number;
}   
  
export interface UpdateOrcamentoRequest {
    id: number;
    tipoOrcamentoId: number;
    valorTotal: number;
}
