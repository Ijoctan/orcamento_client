"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrcamentos } from "@/modules/orcamento/orcamentoThunks";
import { RootState, AppDispatch } from "@/core/store/store";
import {
  Container,
  Title,
  Button,
  Card,
  SimpleGrid,
  Badge,
  Text,
  Stack,
  Loader,
  Center,
  Group,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { lista, loading } = useSelector(
    (state: RootState) => state.orcamento
  );

  useEffect(() => {
    dispatch(fetchOrcamentos());
  }, [dispatch]);

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Orçamentos</Title>
          <Link href="/orcamentos/novo" style={{ textDecoration: "none" }}>
            <Button
              leftSection={<IconPlus size={16} />}
              variant="filled"
              size="sm"
            >
              Novo Orçamento
            </Button>
          </Link>
        </Group>

        {loading ? (
          <Center py="xl">
            <Loader />
          </Center>
        ) : lista.length === 0 ? (
          <Center py="xl">
            <Text c="dimmed">Nenhum orçamento cadastrado</Text>
          </Center>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {lista.map((orcamento) => (
              <Link
                key={orcamento.id}
                href={`/orcamentos/${orcamento.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  component="div"
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  style={{ cursor: "pointer", height: "100%" }}
                  className="hover:shadow-md transition"
                >
                  <Stack gap="sm">
                    <Text fw={600} size="lg" lineClamp={2}>
                      {orcamento.numeroProtocolo}
                    </Text>

                    <Badge color="blue">
                      {typeof orcamento.tipoOrcamento === "object"
                        ? orcamento.tipoOrcamento.descricao
                        : orcamento.tipoOrcamento}
                    </Badge>

                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                          Valor Total:
                        </Text>
                        <Text fw={500}>
                          R$ {orcamento.valorTotal.toFixed(2)}
                        </Text>
                      </Group>

                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                          Status:
                        </Text>
                        <Badge
                          color={
                            orcamento.status === "ABERTO"
                              ? "green"
                              : "red"
                          }
                        >
                          {orcamento.status}
                        </Badge>
                      </Group>

                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                          Data de Criação:
                        </Text>
                        <Text size="sm">{orcamento.dataCriacao}</Text>
                      </Group>
                    </Stack>
                  </Stack>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}
