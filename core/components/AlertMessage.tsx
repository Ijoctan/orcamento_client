"use client";

import { Alert, Container } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface AlertMessageProps {
  message: string | null;
  onClose?: () => void;
}

export default function AlertMessage({ message, onClose }: AlertMessageProps) {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    setIsVisible(!!message);
  }, [message]);

  if (!isVisible || !message) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <Container size="xl" py="md">
      <Alert
        icon={<IconAlertCircle />}
        title="Erro"
        color="red"
        withCloseButton
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Container>
  );
}
  