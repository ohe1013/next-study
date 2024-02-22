interface Transaction {
  idx: number
  do: Function
  undo: Function
  state: 'pending' | 'done' | 'error'
}

export const useTransaction = () => {
  const transactionList: Transaction[] = []

  let currentDoIdx = 0

  const addTransaction = (transaction: Transaction) => {
    transactionList.push(transaction)
  }

  const auto = () => {
    transactionList[currentDoIdx].do()
  }

  const clearTransaction = () => {
    while (transactionList.length > 0) {
      const transaction = transactionList.pop() as Transaction
      transaction.undo()
    }
  }

  return {
    addTransaction,
    clearTransaction,
  }
}
