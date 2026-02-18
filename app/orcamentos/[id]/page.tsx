"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Title,
  Stack,
  Group,
  Badge,
  Text,
  Button,
  Card,
  Loader,
  Center,
  Table,
  ActionIcon,
  Tooltip,
  Paper,
  Grid,
  Divider,
} from "@mantine/core";
import { IconEdit, IconTrash, IconPlus, IconCheck } from "@tabler/icons-react";

import { orcamentoService } from "@/modules/orcamento/services/orcamentoService";
import { finalizeOrcamento } from "@/modules/orcamento/orcamentoThunks";
import { fetchItensPorOrcamento, deleteItem, updateItem } from "@/modules/item/itemThunks";
import {
  fetchMedicoesPorOrcamento,
  validarMedicao,
} from "@/modules/medicao/medicaoThunks";
import { formatDatePtBr } from "@/core/utils/dateFormatter";

import type { AppDispatch, RootState } from "@/core/store/store";

export default function DetalheOrcamento() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(id);

  const itens = useSelector((state: RootState) => state.item.lista);
  const loadingItens = useSelector((state: RootState) => state.item.loading);

  const medicoes = useSelector((state: RootState) => state.medicao.lista);
  const loadingMedicoes = useSelector((state: RootState) => state.medicao.loading);

  const [orcamento, setOrcamento] = useState<any>(null);
  const [loadingOrcamento, setLoadingOrcamento] = useState(true);

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;

    async function carregarOrcamento() {
      try {
        const data = await orcamentoService.buscarPorId(orcamentoId);
        setOrcamento(data);
      } finally {
        setLoadingOrcamento(false);
      }
    }

    carregarOrcamento();
  }, [orcamentoId]);

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;
    dispatch(fetchItensPorOrcamento(orcamentoId));
  }, [dispatch, orcamentoId]);

  useEffect(() => {
    if (!Number.isFinite(orcamentoId)) return;
    dispatch(fetchMedicoesPorOrcamento(orcamentoId));
  }, [dispatch, orcamentoId]);
  
  const handleFinalizar = async () => {
    await dispatch(finalizeOrcamento(orcamentoId)).unwrap();
  };
  
  if (loadingOrcamento) return (
    <Center py="xl">
      <Loader />
    </Center>
  );
  if (!orcamento) return (
    <Center py="xl">
      <Text c="dimmed">Orçamento não encontrado</Text>
    </Center>
  );

  const isFinalized = orcamento.status === "FINALIZADO";

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <Stack gap="sm">
            <Title order={1}>Detalhe do Orçamento</Title>
            <Text size="lg" fw={500}>{orcamento.numeroProtocolo}</Text>
          </Stack>
          <Badge 
            color={isFinalized ? "red" : "green"}
            size="lg"
          >
            {orcamento.status}
          </Badge>
        </Group>

        <Paper p="lg" radius="md" withBorder>
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Tipo:</Text>
                  <Text size="sm" fw={500}>
                    {orcamento.tipoOrcamento?.descricao}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Valor Total:</Text>
                  <Text size="sm" fw={500}>R$ {orcamento.valorTotal.toFixed(2)}</Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Data de Criação:</Text>
                  <Text size="sm">{formatDatePtBr(orcamento.dataCriacao)}</Text>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={2}>Itens ({itens.length})</Title>
            {!isFinalized && (
              <Button
                leftSection={<IconPlus size={16} />}
                size="sm"
                onClick={() => router.push(`/orcamentos/${orcamentoId}/itens/novo`)}
              >
                Novo Item
              </Button>
            )}
          </Group>

          {loadingItens ? (
            <Center py="lg">
              <Loader size="sm" />
            </Center>
          ) : itens.length === 0 ? (
            <Card padding="lg" radius="md" withBorder>
              <Center>
                <Text c="dimmed">Nenhum item cadastrado</Text>
              </Center>
            </Card>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <Table striped highlightOnHover style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "left" }}>Descrição</Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "right" }}>Quantidade</Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "right" }}>Valor Unit.</Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "right" }}>Total</Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "right" }}>Acumulada</Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "center" }}>Ações</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {itens.map((item) => (
                    <Table.Tr key={item.id} style={{ background: "#ffffff", borderRadius: 8 }}>
                      <Table.Td style={{ padding: "12px 16px" }}>
                        <Text size="sm">{item.descricao}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Text size="sm">{item.quantidade}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Text size="sm">R$ {item.valorUnitario.toFixed(2)}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Text size="sm" fw={500}>R$ {item.valorTotal.toFixed(2)}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Badge size="sm" color="blue">
                          {item.quantidadeAcumulada}
                        </Badge>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "center" }}>
                        <Group gap="xs" justify="center">
                          {!isFinalized && (
                            <Tooltip label="Editar">
                              <ActionIcon
                                size="sm"
                                color="blue"
                                variant="light"
                                onClick={() => router.push(`/orcamentos/${orcamentoId}/itens/${item.id}/editar`)}
                              >
                                <IconEdit size={14} />
                              </ActionIcon>
                            </Tooltip>
                          )}
                          {!isFinalized && (
                            <Tooltip label="Excluir">
                              <ActionIcon
                                  size="sm"
                                  color="red"
                                  variant="light"
                                  onClick={async () => {
                                    const ok = confirm("Deseja realmente excluir este item?");
                                    if (!ok) return;

                                    const itensMedidos = medicoes
                                      .flatMap((m) => m.itens ?? [])
                                      .filter((mi) => mi.itemOrcamento?.id === item.id);

                                    const totalMedido = itensMedidos.reduce(
                                      (s, mi) => s + (mi.quantidadeMedida ?? 0),
                                      0
                                    );

                                    if (totalMedido === 0) {
                                      await dispatch(deleteItem({ orcamentoId, itemId: item.id })).unwrap();
                                    } else {
                                      const confirmUpdate = confirm(
                                        `Item possui medições associadas (quantidade medida: ${totalMedido}). Deseja ajustar a quantidade do item para ${totalMedido}?`
                                      );
                                      if (!confirmUpdate) return;

                                      try {
                                        await dispatch(
                                          updateItem({
                                            orcamentoId,
                                            dto: {
                                              itemId: item.id,
                                              descricao: item.descricao,
                                              quantidade: totalMedido,
                                              valorUnitario: item.valorUnitario,
                                            },
                                          })
                                        ).unwrap();

                                        await Promise.all([
                                          dispatch(fetchItensPorOrcamento(orcamentoId)),
                                          dispatch(fetchMedicoesPorOrcamento(orcamentoId)),
                                        ]);
                                      } catch (error) {
                                        console.error(error);
                                      }
                                    }
                                  }}
                                >
                                  <IconTrash size={14} />
                                </ActionIcon>
                            </Tooltip>
                          )}
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          )}
        </Stack>

        <Divider />

        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={2}>Medições ({medicoes.length})</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              size="sm"
              onClick={() => router.push(`/orcamentos/${orcamentoId}/medicoes/nova`)}
            >
              Nova Medição
            </Button>
          </Group>

          {loadingMedicoes ? (
            <Center py="lg">
              <Loader size="sm" />
            </Center>
          ) : medicoes.length === 0 ? (
            <Card padding="lg" radius="md" withBorder>
              <Center>
                <Text c="dimmed">Nenhuma medição cadastrada</Text>
              </Center>
            </Card>
          ) : (
            <Stack gap="md">
              {medicoes.map((medicao) => (
                <Card key={medicao.id} p="lg" radius="md" withBorder>
                  <Stack gap="sm">
                    <Group justify="space-between" align="center">
                      <Text fw={600}>{medicao.numeroMedicao}</Text>
                      <Badge
                        color={medicao.status === "ABERTA" ? "blue" : "green"}
                      >
                        {medicao.status}
                      </Badge>
                    </Group>

                    <Group justify="space-between" grow>
                      <div>
                        <Text size="sm" c="dimmed">Data:</Text>
                        <Text size="sm">{formatDatePtBr(medicao.dataMedicao)}</Text>
                      </div>
                      <div>
                        <Text size="sm" c="dimmed">Valor Total:</Text>
                        <Text size="sm" fw={500}>R$ {medicao.valorTotal.toFixed(2)}</Text>
                      </div>
                    </Group>

                    {medicao.observacao && (
                      <>
                        <Divider />
                        <div>
                          <Text size="sm" c="dimmed">Observação:</Text>
                          <Text size="sm">{medicao.observacao}</Text>
                        </div>
                      </>
                    )}

                    <Group gap="sm" justify="flex-end">
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => router.push(`/orcamentos/${orcamentoId}/medicoes/${medicao.id}`)}
                      >
                        Detalhar
                      </Button>
                      {medicao.status === "ABERTA" && (
                        <Button
                          leftSection={<IconCheck size={14} />}
                          color="green"
                          size="sm"
                          onClick={async () => {
                            const ok = confirm("Deseja realmente validar esta medição?");
                            if (!ok) return;

                            try {
                              await dispatch(validarMedicao({ orcamentoId, medicaoId: medicao.id })).unwrap();

                              await Promise.all([
                                dispatch(fetchMedicoesPorOrcamento(orcamentoId)),
                                dispatch(fetchItensPorOrcamento(orcamentoId)),
                              ]);
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                        >
                          Validar
                        </Button>
                      )}
                    </Group>
                  </Stack>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>

        <Divider />

        <Group justify="flex-end" gap="sm">
          {!isFinalized && (
            <>
              <Button
                variant="default"
                onClick={() => router.push(`/orcamentos/${orcamentoId}/editar`)}
              >
                Editar
              </Button>
              <Button 
                color="red"
                onClick={handleFinalizar}
              >
                Finalizar Orçamento
              </Button>
            </>
          )}
        </Group>
      </Stack>
    </Container>
  );
}
