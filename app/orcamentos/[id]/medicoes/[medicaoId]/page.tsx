"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Title,
  Stack,
  Group,
  Badge,
  Text,
  Paper,
  Center,
  Loader,
  Table,
  Divider,
  Card,
  Button,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import {
  fetchMedicaoById,
  validarMedicao,
  fetchMedicoesPorOrcamento,
} from "@/modules/medicao/medicaoThunks";
import { fetchItensPorOrcamento } from "@/modules/item/itemThunks";
import type { RootState, AppDispatch } from "@/core/store/store";
import { formatDatePtBr } from "@/core/utils/dateFormatter";

export default function DetalheMedicaoPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const orcamentoId = Number(params.id);
  const medicaoId = Number(params.medicaoId);

  const medicao = useSelector(
    (state: RootState) => state.medicao.medicaoSelecionada
  );
  const loading = useSelector((state: RootState) => state.medicao.loading);

  useEffect(() => {
    dispatch(fetchMedicaoById({ orcamentoId, medicaoId }));
  }, [dispatch, orcamentoId, medicaoId]);

  const handleValidar = async () => {
    const ok = confirm("Deseja realmente validar esta medição?");
    if (!ok) return;

    try {
      await dispatch(validarMedicao({ orcamentoId, medicaoId })).unwrap();
      await Promise.all([
        dispatch(fetchMedicaoById({ orcamentoId, medicaoId })),
        dispatch(fetchMedicoesPorOrcamento(orcamentoId)),
        dispatch(fetchItensPorOrcamento(orcamentoId)),
      ]);
    } catch (error) {
      console.error(error);
      alert("Erro ao validar medição");
    }
  };

  if (loading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (!medicao) {
    return (
      <Center py="xl">
        <Text c="dimmed">Medição não encontrada</Text>
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <Stack gap="sm">
            <Group gap="sm" align="center">
              <Title order={1}>Detalhe da Medição</Title>
            </Group>
          </Stack>
          <Badge
            color={medicao.status === "ABERTA" ? "blue" : "green"}
            size="lg"
          >
            {medicao.status}
          </Badge>
        </Group>

        <Paper p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">
                  Número da Medição
                </Text>
                <Text fw={500}>{medicao.numeroMedicao}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Data
                </Text>
                <Text fw={500}>{formatDatePtBr(medicao.dataMedicao)}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Valor Total
                </Text>
                <Text fw={500} size="lg" c="green">
                  R$ {medicao.valorTotal.toFixed(2)}
                </Text>
              </div>
            </Group>

            {medicao.observacao && (
              <>
                <Divider />
                <div>
                  <Text size="sm" c="dimmed">
                    Observação
                  </Text>
                  <Text>{medicao.observacao}</Text>
                </div>
              </>
            )}
          </Stack>
        </Paper>

        <Stack gap="md">
          <Title order={2}>Itens Medidos</Title>

          {medicao.itens && medicao.itens.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <Table
                striped
                highlightOnHover
                style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "left" }}>
                      Descrição
                    </Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "right" }}>
                      Quantidade Medida
                    </Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "right" }}>
                      Valor Unitário
                    </Table.Th>
                    <Table.Th style={{ padding: "10px 16px", textAlign: "right" }}>
                      Total
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {medicao.itens.map((item) => (
                    <Table.Tr
                      key={item.id}
                      style={{ background: "#ffffff", borderRadius: 8 }}
                    >
                      <Table.Td style={{ padding: "12px 16px" }}>
                        <Text size="sm">{item.itemOrcamento.descricao}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Text size="sm" fw={500}>
                          {typeof item.quantidadeMedida !== "undefined"
                            ? item.quantidadeMedida
                            : item.itemOrcamento?.quantidade ?? "-"}
                        </Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Text size="sm">
                          R$ {item.itemOrcamento.valorUnitario.toFixed(2)}
                        </Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Text size="sm" fw={500}>
                          R$ {item.valorTotalMedido.toFixed(2)}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          ) : (
            <Card p="lg" radius="md" withBorder>
              <Center>
                <Text c="dimmed">Nenhum item medido</Text>
              </Center>
            </Card>
          )}
        </Stack>

        {medicao.status === "ABERTA" && (
          <Group justify="flex-end" gap="sm">
            <Button
              leftSection={<IconCheck size={16} />}
              color="green"
              onClick={handleValidar}
            >
              Validar Medição
            </Button>
          </Group>
        )}
      </Stack>
    </Container>
  );
}
