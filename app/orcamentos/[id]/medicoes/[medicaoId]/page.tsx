"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedicaoById,
  validarMedicao,
} from "@/modules/medicao/medicaoThunks";
import type { RootState, AppDispatch } from "@/core/store/store";

export default function DetalheMedicaoPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(params.id);
  const medicaoId = Number(params.medicaoId);

  const medicao = useSelector((state: RootState) => state.medicao.medicaoSelecionada);

  useEffect(() => {
    dispatch(fetchMedicaoById({ orcamentoId, medicaoId }));
  }, [dispatch, orcamentoId, medicaoId]);

  const handleValidar = async () => {
    await dispatch(validarMedicao({ orcamentoId, medicaoId })).unwrap();
  };

  if (!medicao) return <p>Carregando...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>{medicao.numeroMedicao}</h1>
      <p>Status: {medicao.status}</p>
      <p>Valor Total: {medicao.valorTotal}</p>
      <p>Observação: {medicao.observacao}</p>

      {medicao.status === "ABERTA" && (
        <button onClick={handleValidar}>Validar</button>
      )}
    </main>
  );
}
