//seleciona os elementos do form
const amount = document.getElementById("amount")

//captura o evento de input para formatar o valor
amount.oninput = () => {
  //recebe o valor do input, remove as letras e
  let value = amount.value.replace(/\D/g, "")

  //transforma o valor em centavos
  value = Number(value) / 100

  //devolve o valor corrigido
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
  //formata o valor no padrão brasileiro
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return value
}

