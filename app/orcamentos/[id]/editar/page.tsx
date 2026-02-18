"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateOrcamento } from "@/modules/orcamento/orcamentoThunks";
import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";
import { tipoOrcamentoService } from "@/modules/tipoOrcamento/services/tipoOrcamentoService";
import type { TipoOrcamento } from "@/modules/tipoOrcamento/types/tipoOrcamento.types";
import type { AppDispatch } from "@/core/store/store";
import {
  Container,
  Title,
  Stack,
  Select,
  NumberInput,
  Button,
  Group,
  Paper,
  Loader,
  Center,
} from "@mantine/core";

export default function EditOrcamentoPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [tipos, setTipos] = useState<TipoOrcamento[]>([]);
  const [tipoId, setTipoId] = useState<string | null>(null);
  const [valorTotal, setValorTotal] = useState<number | string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const [orcamentoData, tiposData] = await Promise.all([
          orcamentoService.buscarPorId(Number(id)),
          tipoOrcamentoService.listar(),
        ]);

        setTipos(tiposData.filter((t) => t.ativo));

        const t = (orcamentoData as any).tipoOrcamento;
        if (t && typeof t === "object") {
          setTipoId(String(t.id ?? t.tipoOrcamentoId ?? null));
        } else if (typeof t === "number") {
          setTipoId(String(t));
        } else {
          setTipoId(null);
        }

        setValorTotal(orcamentoData.valorTotal);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await dispatch(
        updateOrcamento({
          id: Number(id),
          tipoOrcamentoId: tipoId ? Number(tipoId) : 0,
          valorTotal: Number(valorTotal),
        })
      ).unwrap();

      router.push(`/orcamentos/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={1}>Editar Orçamento</Title>

        <Paper p="lg" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Select
                label="Tipo de Orçamento"
                placeholder="Selecione um tipo"
                data={tipos.map((tipo) => ({
                  value: String(tipo.id),
                  label: tipo.descricao,
                }))}
                value={tipoId}
                onChange={setTipoId}
                required
                searchable
              />

              <NumberInput
                label="Valor Total"
                placeholder="0.00"
                min={0}
                step={0.01}
                value={valorTotal}
                onChange={setValorTotal}
                required
                decimalSeparator=","
              />

              <Group justify="flex-end">
                <Button
                  variant="default"
                  onClick={() => router.back()}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" loading={submitting}>
                  Salvar
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
