"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Title,
  Stack,
  Group,
  Button,
  Paper,
  TextInput,
  NumberInput,
  Card,
  Text,
  Badge,
  Alert,
  Loader,
  Center,
  Divider,
  Center as MantineCenter,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type { AppDispatch, RootState } from "@/core/store/store";
import { fetchItensPorOrcamento } from "@/modules/item/itemThunks";
import { createMedicao } from "@/modules/medicao/medicaoThunks";

export default function NovaMedicaoPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(id);

  const itens = useSelector((state: RootState) => state.item.lista);
  const loading = useSelector((state: RootState) => state.item.loading);

  const [observacao, setObservacao] = useState("");
  const [itensSelecionados, setItensSelecionados] = useState<{
    [key: number]: number;
  }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;
    dispatch(fetchItensPorOrcamento(orcamentoId));
  }, [dispatch, orcamentoId]);

  const handleQuantidadeChange = (itemId: number, valor: number) => {
    setItensSelecionados((prev) => ({
      ...prev,
      [itemId]: Math.max(0, valor),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itensParaEnviar = Object.entries(itensSelecionados)
      .filter(([_, quantidade]) => quantidade > 0)
      .map(([itemId, quantidade]) => ({
        itemOrcamentoId: Number(itemId),
        quantidadeMedida: quantidade,
      }));

    if (itensParaEnviar.length === 0) {
      alert("Selecione ao menos um item com quantidade válida.");
      return;
    }

    setSaving(true);

    try {
      await dispatch(
        createMedicao({
          orcamentoId,
          dto: {
            observacao,
            itens: itensParaEnviar,
          },
        })
      ).unwrap();

      router.push(`/orcamentos/${orcamentoId}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar medição");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  const itensSemMedicao = itens.filter(
    (item) => item.quantidade > item.quantidadeAcumulada
  );

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        {itensSemMedicao.length === 0 ? (
          <Alert
            icon={<IconAlertCircle />}
            color="yellow"
            title="Aviso"
          >
            Todos os itens já foram medidos completamente. Não é possível criar uma nova medição.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Paper p="lg" radius="md" withBorder>
                <Stack gap="md">
                  <div>
                    <Text size="sm" fw={500} mb="xs">
                      Observação (Opcional)
                    </Text>
                    <TextInput
                      placeholder="Digite uma observação sobre esta medição"
                      value={observacao}
                      onChange={(e) => setObservacao(e.target.value)}
                    />
                  </div>
                </Stack>
              </Paper>

              <div>
                <Title order={3} mb="md">
                  Itens Disponíveis para Medição
                </Title>

                {itensSemMedicao.length === 0 ? (
                  <Card p="lg" radius="md" withBorder>
                    <MantineCenter>
                      <Text c="dimmed">Nenhum item disponível para medir</Text>
                    </MantineCenter>
                  </Card>
                ) : (
                  <Stack gap="sm">
                    {itensSemMedicao.map((item) => {
                      const quantidadeDisponivel =
                        item.quantidade - item.quantidadeAcumulada;
                      const quantidadeMedido =
                        itensSelecionados[item.id] || 0;

                      return (
                        <Paper
                          key={item.id}
                          p="md"
                          radius="md"
                          withBorder
                        >
                          <Stack gap="md">
                            <Group justify="space-between" align="flex-start">
                              <div style={{ flex: 1 }}>
                                <Text fw={500}>{item.descricao}</Text>
                                <Group gap="xl" mt="xs">
                                  <div>
                                    <Text size="sm" c="dimmed">
                                      Quantidade Total
                                    </Text>
                                    <Text size="sm" fw={500}>
                                      {item.quantidade} unidades
                                    </Text>
                                  </div>
                                  <div>
                                    <Text size="sm" c="dimmed">
                                      Já Medido
                                    </Text>
                                    <Badge size="sm" color="blue">
                                      {item.quantidadeAcumulada}
                                    </Badge>
                                  </div>
                                  <div>
                                    <Text size="sm" c="dimmed">
                                      Disponível para Medir
                                    </Text>
                                    <Badge size="sm" color="green">
                                      {quantidadeDisponivel}
                                    </Badge>
                                  </div>
                                </Group>
                              </div>
                            </Group>

                            <Divider />

                            <Group gap="md" align="flex-end">
                              <NumberInput
                                label="Quantidade a Medir"
                                placeholder="0"
                                value={quantidadeMedido}
                                onChange={(val) =>
                                  handleQuantidadeChange(item.id, Number(val) || 0)
                                }
                                min={0}
                                max={quantidadeDisponivel}
                                style={{ flex: 1, minWidth: 150 }}
                              />
                              <Text size="sm" c="dimmed">
                                Valor Unitário: R${" "}
                                {item.valorUnitario.toFixed(2)}
                              </Text>
                              {quantidadeMedido > 0 && (
                                <div>
                                  <Text size="sm" c="dimmed">
                                    Subtotal
                                  </Text>
                                  <Text
                                    fw={500}
                                    c="green"
                                    size="lg"
                                  >
                                    R${" "}
                                    {(
                                      quantidadeMedido * item.valorUnitario
                                    ).toFixed(2)}
                                  </Text>
                                </div>
                              )}
                            </Group>
                          </Stack>
                        </Paper>
                      );
                    })}
                  </Stack>
                )}
              </div>

              <Divider />

              <Group justify="flex-end" gap="sm">
                <Button type="submit" loading={saving}>
                  Criar Medição
                </Button>
              </Group>
            </Stack>
          </form>
        )}
      </Stack>
    </Container>
  );
}


