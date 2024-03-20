// Função para tratar o envio do formulário
const handlerSubmit = async (e) => {
    e.preventDefault();

    // Pegando os valores dos campos de entrada
    const nome = document.getElementById('nome');
    const endereco = document.getElementById('endereco');
    const email = document.getElementById('email')
    const cnpj = document.getElementById('cnpj');
    const errorMessage = document.getElementById('errorMessage')

    // Criando um novo objeto do Parse
    const myNewObject = new Parse.Object('Supermercado');
    myNewObject.set('nome', nome.value);
    myNewObject.set('endereco', endereco.value);
    myNewObject.set('email', email.value);
    myNewObject.set('cnpj', cnpj.value);

    try {
      // Salvando o objeto no Parse
      const result = await myNewObject.save();
      alert('Supermercado criado');
      clearInputs();
      // Recarregar a lista de supermercados após a criação bem-sucedida
    } catch (error) {
      errorMessage.innerHTML = 'Erro ao criar Supermercado';
    }
}

const clearInputs = () => {
    console.log('entrei aqui')
    nome.value = '';
    endereco.value = '';
    email.value ='';
    cnpj.value ='';
    errorMessage.innerHTML = '';
}

// Função para carregar e exibir a lista de supermercados

const listar = async () => {
    const list = document.getElementById('list')
    const Supermercado = Parse.Object.extend('Supermercado');
    const query = new Parse.Query(Supermercado);
    // You can also query by using a parameter of an object
    // query.equalTo('objectId', 'xKue915KBG');
    try {
      const results = await query.find();
      for (const object of results) {
        // Access the Parse Object attributes using the .GET method
        const nome = object.get('nome')
        const endereco = object.get('endereco')
        const email = object.get('email')
        const senha = object.get('senha')
        const cnpj = object.get('cnpj')
        const objectId = object.id;
        console.log(nome);
        const div = document.createElement('div')
        const elementoNome = document.createElement('p')
        elementoNome.textContent = nome

        
        div.appendChild(elementoNome)
        div.classList.add('item')
        console.log(endereco);
        const elementoEndereco = document.createElement('p')
        elementoEndereco.textContent = endereco
        div.appendChild(elementoEndereco)
        console.log(email);
        const elementoEmail = document.createElement('p')
        elementoEmail.textContent = email
        div.appendChild(elementoEmail)
        console.log(cnpj);
        const elementoCnpj = document.createElement('p')
        elementoCnpj.textContent = cnpj
        div.appendChild(elementoCnpj)
        // Criar botões de edição e exclusão
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        div.appendChild(editButton)
        editButton.addEventListener('click', () => {
          // Adicionar lógica para edição aqui
          
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.classList.add('delete-button');
        div.appendChild(deleteButton)
        deleteButton.addEventListener('click', async () => {
          // Adicionar lógica para exclusão aqui
          await deleteSupermercado(objectId);
          alert('Supermercado deletado com Sucesso')
        });


        list.appendChild(div)
      }
    } catch (error) {
      console.error('Error while fetching Supermercado', error);
    }
};

const deleteSupermercado = async (objectId) => {
    const supermercado = Parse.Object.extend('Supermercado');
    const query = new Parse.Query(supermercado);

    try {
      const objeto = await query.get(objectId);
      await objeto.destroy();
      console.log('Supermercado excluído:', objectId);
      // Recarregar a lista de supermercados após a exclusão bem-sucedida
      loadSupermercados();
    } catch (error) {
      console.error('Erro ao excluir supermercado:', error);
    }
}

window.onload(listar())