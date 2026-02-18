"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Container,
  Title,
  Stack,
  Group,
  Button,
  TextInput,
  NumberInput,
  Paper,
  Center,
  Loader,
} from "@mantine/core";
import { createItem } from "@/modules/item/itemThunks";
import type { AppDispatch } from "@/core/store/store";
import type { CriarItemDTO } from "@/modules/item/types/item.dto";

export default function NovoItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(id);

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [valorUnitario, setValorUnitario] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descricao.trim()) {
      alert("Descrição é obrigatória");
      return;
    }

    if (quantidade <= 0) {
      alert("Quantidade deve ser maior que zero");
      return;
    }

    if (valorUnitario <= 0) {
      alert("Valor unitário deve ser maior que zero");
      return;
    }

    setLoading(true);

    const dto: CriarItemDTO = {
      orcamentoId,
      descricao,
      quantidade,
      valorUnitario,
    };

    try {
      await dispatch(
        createItem({
          orcamentoId,
          dto,
        })
      ).unwrap();

      router.push(`/orcamentos/${orcamentoId}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={2}>Novo Item</Title>
        <Paper p="lg" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Descrição"
                placeholder="Ex: Cimento CP32"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />

              <NumberInput
                label="Quantidade"
                placeholder="0"
                value={quantidade}
                onChange={(val) => setQuantidade(Number(val) || 0)}
                min={0}
                required
              />

              <NumberInput
                label="Valor Unitário (R$)"
                placeholder="0,00"
                value={valorUnitario}
                onChange={(val) => setValorUnitario(Number(val) || 0)}
                min={0}
                step={0.01}
                decimalScale={2}
                required
              />

              <Button type="submit" loading={loading}>
                Salvar Item
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
