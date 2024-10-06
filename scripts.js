//seleciona os elementos do form
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

//capturando o evento de submit do form para obter os valores
form.onsubmit = (event) => {
  //previne o comportamento padrão de fazer reload
  event.preventDefault()

  //cria objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  //chama função que adiciona o item na lista
  expenseAdd(newExpense)
}

function expenseAdd(newExpense)
{
  try {   
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas!")
    console.log(error)   
  }
}
