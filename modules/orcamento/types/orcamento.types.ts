import { TipoOrcamento } from "../../tipoOrcamento/types/tipoOrcamento.types";

export interface Orcamento {
  id: number;
  numeroProtocolo: string;
  tipoOrcamento: TipoOrcamento;
  valorTotal: number;
  dataCriacao: string;
  status: string;
}
