"use client";

import { Button, Group, Container } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <Container size="xl">
      <Group py="md" justify="flex-end">
        <Button
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => router.back()}
          variant="light"
          size="sm"
        >
          Voltar
        </Button>
      </Group>
    </Container>
  );
}
