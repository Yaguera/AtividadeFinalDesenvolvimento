Parse.initialize("mqfqFoDGEld8041WYS4D8UUUkqUlNQGJcrKHvuD5", "NZunwBuAWmcS7L7E8Dezcyd0IrKX3RjSARPBJA75");
Parse.serverURL = "https://parseapi.back4app.com/";


//========== Criar Produto ==========
const createProduto = async (e) => {
    // evitar que a pagina recarege na hora que o produto for cadastrado
    e.preventDefault();

    const nomeValue = document.getElementById('nome').value;
    const tipoValue = document.getElementById('tipo').value;
    const quantidadeValue = Number(document.getElementById('quantidade').value);
    const dataValue = new Date(document.getElementById('validade').value);

    const myNewObject = new Parse.Object('Produtos');
    myNewObject.set('nome', nomeValue);
    myNewObject.set('tipo', tipoValue);
    myNewObject.set('quantidade', quantidadeValue);
    myNewObject.set('validade', dataValue);

    try {
      const result = await myNewObject.save();
      console.log('Produto criado', result);
      alert("Produto Cadastrado com Sucesso ❤️")
      // Criar uma função para limpar os imputes depois do submite 💡
    } catch (error) {
      console.error('Erro ao criar Produto: ', error);
    }
  }

//========== Mostra Produtos ==========

  const readingProduto = async () => {
    const Produtos = Parse.Object.extend('Produtos');
    const query = new Parse.Query(Produtos);

    try {
      const results = await query.find();
      for (const object of results) {
        // Acesse os atributos Parse Object usando o Método .GET
        const nome = object.get('nome');
        const tipo = object.get('tipo');
        const validade = object.get('validade');
        const quantidade = object.get('quantidade');
        const objectId = object.id;
        const listaProdutos = document.getElementById('listasDeProdutos');
        listaProdutos.insertAdjacentHTML('afterbegin',  `
        <li>
          <h2>${nome}</h2>
          <p> Tipo: ${tipo}</p>
          <p>Data de Validade: ${validade}</p>
          <p>Quantidade em Kg: ${quantidade}</p>
          <div>
          <button class= "btn-delete" >Deletar</button>
          <button class= "btn-edit">Editar</button>
          </div>
        </li>
        ` );

        document.querySelector('.btn-delete').addEventListener('click', async () => {
          await deleteProduto(objectId);
          alert('Produto excluido com Sucesso Atalize a Pagina')
        })
        
        document.querySelector('.btn-edit').addEventListener('click', async () => {
          await updateProduto(objectId)
          alert()  
        });
      
      }
    } catch (error) {
      console.error('Error while fetching Produtos', error);
    }
  };

  readingProduto()

//========== Atualizar Produtos ==========

const updateProduto = async (objectId) => {
  const Produtos = Parse.Object.extend('Produtos');
    const query = new Parse.Query(Produtos);
    try {

      const object = await query.get(objectId);
      object.set('nome', nome);
      object.set('tipo', tipo);
      object.set('validade', validade);
      object.set('quantidade', quantidade);
      try {
        const response = await object.save();
        // You can use the "get" method to get the value of an attribute
        // Ex: response.get("<ATTRIBUTE_NAME>")
        // Access the Parse Object attributes using the .GET method
        console.log(response.get('nome'));
        console.log(response.get('tipo'));
        console.log(response.get('validade'));
        console.log(response.get('quantidade'));
        console.log('Produtos updated', response);
      } catch (error) {
        console.error('Error while updating Produtos', error);
        }
      } catch (error) {
        console.error('Error while retrieving object Produtos', error);
      }
  };
//========== Deletar Produto ==========

const deleteProduto = async (objectId) => {
    const query = new Parse.Query('Produtos');
    try {
      const object = await query.get(objectId);
      try {
        const response = await object.destroy();
        console.log('Deletado ParseObject', response);
        // pensar em adicionar alguma maneira de recarega a lista 💡
      } catch (error) {
        console.error('Erro ao excluir ParseObject', error);
      }
    } catch (error) {
      console.error('Erro ao recuperar ParseObject', error);
    }
};