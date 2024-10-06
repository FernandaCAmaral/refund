//seleciona os elementos do form
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// selecia os elemntos da lista de despesas
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

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

//adiciona novo item na lista
function expenseAdd(newExpense) {
  try {
    //cria o elemento li para adicionar o item na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //cria ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //cria a div da informação da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name
    
    //cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    //cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    //adiciona Name e Category na div Info
    expenseInfo.append(expenseName, expenseCategory)

    //adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //adiciona o item na lista
    expenseList.append(expenseItem)

    //atualiza os totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas!")
    console.log(error)   
  }
}

//atualiza os totais
function updateTotals() {
  try {
    //recupera todos os itens(li) da lista(ul)
    const items = expenseList.children

    //atualiza a quantidade de items da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    //variavel para incrementar o total
    let total = 0
    //percorre cada item(li) da lista(ul)
    for(let item =0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      //remove caracteres não numéricos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      value = parseFloat(value)

      //verifica se é um número válido
      if(isNaN(value)){
        return alert("Não foi possível calcular o total. O valor não parece ser um número")
      }

      //incrementa o valor total
      total += Number(value)
    }

    //cria span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    //formata o valor e remove o R$ que será exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    //limpa o conteúdo do elemento
    expensesTotal.innerHTML = ""

    //adiciona o símbolo da moeda e o valor total das despesas
    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    alert("Não foi possível atualizar os totais.")
    console.log(error)
  }
}

//evento que captura o clique nos items da lista
expenseList.addEventListener("click", function(event){

  //verifica se o elemento clicado é o ícone de remover
  if(event.target.classList.contains("remove-icon")){
    
    //obtém a li pai do elemento(remove-icon) clicado
    const item = event.target.closest(".expense")

    //remove o item da lista
    item.remove()
  }

  //atualiza o total
  updateTotals()
})