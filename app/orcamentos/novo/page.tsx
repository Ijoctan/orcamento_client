"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tipoOrcamentoService } from "@/modules/tipoOrcamento/services/tipoOrcamentoService";
import type { TipoOrcamento } from "@/modules/tipoOrcamento/types/tipoOrcamento.types";
import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";
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

export default function NovoOrcamento() {
  const router = useRouter();
  const [valorTotal, setValorTotal] = useState<number | string>("");
  const [tipos, setTipos] = useState<TipoOrcamento[]>([]);
  const [tipoId, setTipoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarTipos() {
      const data = await tipoOrcamentoService.listar();
      setTipos(data.filter((t) => t.ativo));
    }
    carregarTipos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await orcamentoService.criar({
        tipoOrcamentoId: tipoId ? Number(tipoId) : 0,
        valorTotal: Number(valorTotal),
      });

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={1}>Novo Orçamento</Title>

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
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" loading={loading}>
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
