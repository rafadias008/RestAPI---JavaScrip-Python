// Adição da função de salvar o carro no array da API

async function saveCar(){

    // Cria o objeto carro com as entradas do usuário
    const car = {

        car_id: Date.now(), // Gera um ID único com base no timestamp
        car_maker: document.getElementById('car_maker').value, // document.getElementById('car_maker').value captura o valor do campo de entrada do formulario com id especificado
        car_model: document.getElementById('car_model').value,
        car_kilometers: document.getElementById('car_kilometers').value,
        car_color: document.getElementById('car_color').value,
        car_price: document.getElementById('car_price').value,
        car_year: document.getElementById('car_year').value
    };

    // Envia o objeto carro para a API usando fetch
    try{
        // O método fetch é usado para fazer uma requisição HTTP para a rota '/produtos/addcar/' da API, 
        // passando o objeto carro no corpo da requisição em formato JSON. O método POST é utilizado para indicar que estamos enviando dados para a API.
        const response = await fetch('/produtos/addcar/', {
            // O método HTTP da requisição é definido como POST, indicando que estamos enviando dados para a API.
            method: 'POST',
            // O cabeçalho 'Content-Type' é definido como 'application/json' para informar à API que o corpo da requisição está no formato JSON.
            headers: {
                'Content-Type': 'application/json'
            },
            // O corpo da requisição é convertido para uma string JSON usando JSON.stringify(car) e enviado para a API.
            body: JSON.stringify(car)
        });

        // A resposta da API é aguardada e convertida de volta para um objeto JavaScript usando response.json(). O resultado é armazenado na variável data.
        const data = await response.json();
        // Log de exemplo para verificar a resposta da API no console do navegador. Isso pode ser útil para depuração e para confirmar que o carro foi adicionado com sucesso.
        console.log(data);

    } 
    // O bloco catch é usado para capturar e lidar com quaisquer erros que possam ocorrer durante a requisição fetch. 
    // Se ocorrer um erro, ele será registrado no console do navegador usando console.error().
    catch (error) {
        console.error('Erro ao adicionar o carro:', error);
    }
}

// Função para buscar e exibir os carros cadastrados

async function renderCars() {

    // A função renderCars é responsável por buscar os carros cadastrados na API e exibi-los na página.
    try{

        // O método fetch é usado para fazer uma requisição HTTP para a rota '/produtos' da API, que retorna a lista de carros cadastrados. 
        // A resposta é aguardada e convertida para um objeto JavaScript usando response.json(). O resultado é armazenado na variável cars.
        const response = await fetch('/produtos');
        const cars = await response.json();

        // O elemento HTML com o ID 'car-list' é selecionado e seu conteúdo é limpo para preparar a exibição dos carros.
        const container = document.getElementById('car-list');
        container.innerHTML = '';

        // Se a lista de carros estiver vazia, uma mensagem informando que nenhum carro foi cadastrado é exibida. 
        // Caso contrário, uma tabela é criada para exibir os detalhes de cada carro.
        if (cars.length === 0) {
            container.innerHTML = '<p>Nenhum carro cadastrado.</p>';
            return;
        }

        // Uma tabela HTML é criada dinamicamente para exibir os detalhes dos carros. 
        // A primeira linha da tabela é o cabeçalho, que define as colunas para ID, Marca, Modelo, KMs, Cor, Preço e Ano.
        const table = document.createElement('table');
        // O cabeçalho da tabela é criado usando um elemento 'tr' (table row) e preenchido com os títulos das colunas.
        const header = document.createElement('tr');
        // O conteúdo do cabeçalho é definido usando innerHTML, onde cada título de coluna é envolvido por uma tag 'th' (table header).
        header.innerHTML = `
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>KMs</th>
            <th>Cor</th>
            <th>Preço</th>
            <th>Ano</th>
        `;
        // O cabeçalho é adicionado à tabela usando appendChild.
        table.appendChild(header);

        // Para cada carro na lista de carros, uma nova linha é criada na tabela.
        cars.forEach(car => {
            // Para cada carro, um elemento 'tr' é criado para representar uma linha da tabela.
            const row = document.createElement('tr');
            // O conteúdo da linha é preenchido com os detalhes do carro usando innerHTML, onde cada detalhe é envolvido por uma tag 'td' (table data).
            row.innerHTML = `
                <td>${car.car_id}</td>
                <td>${car.car_maker}</td>
                <td>${car.car_model}</td>
                <td>${car.car_kilometers}</td>
                <td>${car.car_color}</td>
                <td>${car.car_price}</td>
                <td>${car.car_year}</td>
            `;
            // Cada linha é adicionada à tabela usando appendChild.
            table.appendChild(row);
        });
        // Finalmente, a tabela completa é adicionada ao contêiner na página usando appendChild.
        container.appendChild(table);
    } catch (error) {
        console.error('Erro ao buscar os carros:', error);
    }
}