interface AlertMessageProps {
    message: string | null;
  }
  
  export default function AlertMessage({ message }: AlertMessageProps) {
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
        }}
      >
        {message}
      </div>
    );
  }
  