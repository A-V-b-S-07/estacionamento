
async function loadCarros() {    const response = await fetch('http://localhost:3002/ESTACIONAMENTO');
    const data = await response.json();
    const tbody = document.getElementById('listaCarros');
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(publicacao => {
            const linha = document.createElement('div');
            linha.classList.add('post-item');
            linha.innerHTML = `
                <div class="post-title">${Carro.placa}</div>
                <div class="post-content">${Carro.Proprietario}</div>
                <div class="post-actions">
                    <button onclick="editBook(${Carro.id})">Editar</button>
                    <button onclick="deleteBook(${Carro.id})">Deletar</button>
                </div>
            `;
            tbody.appendChild(linha);
        });
    }
}


document.getElementById("postForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const Carro = document.getElementById('Placa').value;
    const Proprietário = document.getElementById('Proprietario').value;

    await fetch('http://localhost:3002/ESTACIONAMENTO', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Placa, Proprietario})
    });

    document.getElementById('postForm').reset();
    loadCarros();
});


async function editCarros(id) {
    const Carro = prompt("Novo carro");
    const Proprietário = prompt("Novo proprietario");

    await fetch(`http://localhost:3002/ESTACIONAMENTO/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Carro, Proprietário})
    });

    loadCarros();
}


async function deleteCarros(id) {
    await fetch(`http://localhost:3002/ESTACIONAMENTO/${id}`, {
        method: 'DELETE'
    });
    loadCarros();
}

loadCarros();

window.location.assign('carro.html'); 