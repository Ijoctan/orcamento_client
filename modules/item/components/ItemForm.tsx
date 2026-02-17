interface ItemFormProps {
    onSubmit: (data: {
      descricao: string
      quantidade: number
      valorUnitario: number
    }) => void
    loading?: boolean
  }
  