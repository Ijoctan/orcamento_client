interface AlertMessageProps {
  message: string | null;
  onClose?: () => void;
}

export default function AlertMessage({ message, onClose }: AlertMessageProps) {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffe5e5",
        color: "#b30000",
        padding: "12px",
        borderRadius: "6px",
        marginBottom: "16px",
        border: "1px solid #ffcccc",
        position: "relative",
      }}
    >
      <button
        aria-label="Fechar alerta"
        onClick={onClose}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          background: "transparent",
          border: "none",
          fontSize: 16,
          cursor: "pointer",
          color: "#b30000",
        }}
      >
        ×
      </button>
      <div>{message}</div>
    </div>
  );
}
  