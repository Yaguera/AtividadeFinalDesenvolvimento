const cardProduto = (produto) => {
    return `
        <li>
            <h2>${produto.nome}</h2>
            <p> Tipo: ${produto.tipo}</p>
            <p>Data de Validade: ${produto.validade}</p>
            <p>Quantidade em Kg: ${produto.quantidade}</p>
            <div>
                <button class="btn-delete">Deletar</button>
                <button class="btn-edit">Editar</button>
            </div>
        </li>
    `;
}