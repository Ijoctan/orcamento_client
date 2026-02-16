export function handleApiError(error: any): string {
    if (error?.response) {
      const data = error.response.data;
  
      if (typeof data === "string") {
        return data;
      }
  
      if (data?.message) {
        return data.message;
      }
  
      if (data?.error) {
        return data.error;
      }
  
      return "Erro retornado pelo servidor.";
    }
  
    if (error?.message) {
      return error.message;
    }
  
    return "Erro inesperado ao comunicar com o servidor.";
  }
  