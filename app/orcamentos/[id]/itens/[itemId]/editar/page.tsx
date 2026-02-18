"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/core/store/store";

import { itemService } from "@/modules/item/services/itemService";
import { updateItem } from "@/modules/item/itemThunks";
import type { AtualizarItemDTO } from "@/modules/item/types/item.dto";
import { Button, Container, NumberInput, Paper, Stack, TextInput, Title } from "@mantine/core";

export default function EditarItemPage() {
  const params = useParams<{ id: string; itemId: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(params?.id);
  const itemId = Number(params?.itemId);
  
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [valorUnitario, setValorUnitario] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!params?.id || !params?.itemId) {
      setLoading(false);
      return;
    }
  
    const orcamentoIdParsed = Number(params.id);
    const itemIdParsed = Number(params.itemId);
  
    if (!Number.isFinite(orcamentoIdParsed) || !Number.isFinite(itemIdParsed)) {
      setLoading(false);
      return;
    }
  
    async function carregar() {
      try {
        const item = await itemService.buscarPorId(
          orcamentoIdParsed,
          itemIdParsed
        );
  
        setDescricao(item.descricao ?? "");
        setQuantidade(Number(item.quantidade ?? 0));
        setValorUnitario(Number(item.valorUnitario ?? 0));
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar item");
      } finally {
        setLoading(false);
      }
    }
  
    carregar();
  }, [params]);
  

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

    setSaving(true);

    try {
      const dto: AtualizarItemDTO = {
        itemId: itemId,
        descricao,
        quantidade,
        valorUnitario,
      };

      await dispatch(updateItem({ orcamentoId, dto })).unwrap();
      router.push(`/orcamentos/${orcamentoId}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando item...</p>;

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        <Title order={2}>Editar Item</Title>

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

              <Button type="submit" loading={saving}>
                Salvar Item
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}
