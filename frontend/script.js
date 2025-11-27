const api = 'http://localhost:3001';

function showSection(id) {
  document.querySelectorAll('.tela').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Clientes
async function carregarClientes() {
  const res = await fetch(api + '/clientes');
  const clientes = await res.json();
  const lista = document.getElementById('listaClientes');
  lista.innerHTML = '';
  clientes.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.id} - ${c.nome} (${c.telefone})`;
    lista.appendChild(li);
  });
  // Preencher selects
  const selectClienteVeiculo = document.getElementById('selectClienteVeiculo');
  const selectClienteOrdem = document.getElementById('selectClienteOrdem');
  const selectRelatorioCliente = document.getElementById('selectRelatorioCliente');
  [selectClienteVeiculo, selectClienteOrdem, selectRelatorioCliente].forEach(sel => {
    sel.innerHTML = '<option value="">Selecione</option>';
    clientes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.nome;
      sel.appendChild(opt);
    });
  });
}
document.getElementById('formCliente').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  await fetch(api + '/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: form.nome.value, telefone: form.telefone.value })
  });
  form.reset();
  carregarClientes();
};

// Veículos
async function carregarVeiculos() {
  const res = await fetch(api + '/veiculos');
  const veiculos = await res.json();
  const lista = document.getElementById('listaVeiculos');
  lista.innerHTML = '';
  veiculos.forEach(v => {
    const li = document.createElement('li');
    li.textContent = `${v.id} - ${v.placa} (${v.modelo}, ${v.ano}) - Cliente: ${v.Cliente ? v.Cliente.nome : ''}`;
    lista.appendChild(li);
  });
  // Preencher select
  const selectVeiculoOrdem = document.getElementById('selectVeiculoOrdem');
  const selectRelatorioVeiculo = document.getElementById('selectRelatorioVeiculo');
  [selectVeiculoOrdem, selectRelatorioVeiculo].forEach(sel => {
    sel.innerHTML = '<option value="">Selecione</option>';
    veiculos.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = `${v.placa} (${v.modelo})`;
      sel.appendChild(opt);
    });
  });
}
document.getElementById('formVeiculo').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  await fetch(api + '/veiculos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      placa: form.placa.value,
      modelo: form.modelo.value,
      ano: form.ano.value,
      ClienteId: form.ClienteId.value
    })
  });
  form.reset();
  carregarVeiculos();
};

// Peças
async function carregarPecas() {
  const res = await fetch(api + '/pecas');
  const pecas = await res.json();
  const lista = document.getElementById('listaPecas');
  lista.innerHTML = '';
  pecas.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.id} - ${p.nome} (Estoque: ${p.estoque}, Mínimo: ${p.estoqueMinimo})`;
    if (p.estoque <= p.estoqueMinimo) {
      li.style.color = 'red';
      li.textContent += ' - ESTOQUE BAIXO!';
    }
    lista.appendChild(li);
  });
  // Preencher select
  const selectPecaEntrada = document.getElementById('selectPecaEntrada');
  selectPecaEntrada.innerHTML = '<option value="">Selecione</option>';
  pecas.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.nome;
    selectPecaEntrada.appendChild(opt);
  });
}
document.getElementById('formPeca').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  await fetch(api + '/pecas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: form.nome.value,
      estoque: form.estoque.value,
      estoqueMinimo: form.estoqueMinimo.value
    })
  });
  form.reset();
  carregarPecas();
};

// Funcionários
async function carregarFuncionarios() {
  const res = await fetch(api + '/funcionarios');
  const funcionarios = await res.json();
  const lista = document.getElementById('listaFuncionarios');
  if (lista) {
    lista.innerHTML = '';
    funcionarios.forEach(f => {
      const li = document.createElement('li');
      li.textContent = `${f.id} - ${f.nome}`;
      lista.appendChild(li);
    });
  }
  // Preencher selects de funcionários
  const selectFuncionarioOrdem = document.getElementById('selectFuncionarioOrdem');
  if (selectFuncionarioOrdem) {
    selectFuncionarioOrdem.innerHTML = '<option value="">Selecione</option>';
    funcionarios.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.nome;
      selectFuncionarioOrdem.appendChild(opt);
    });
  }
}
document.getElementById('formFuncionario').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  await fetch(api + '/funcionarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: form.nome.value })
  });
  form.reset();
  carregarFuncionarios();
};

// Ordens de Serviço
async function carregarOrdens() {
  const res = await fetch(api + '/ordens');
  const ordens = await res.json();
  const lista = document.getElementById('listaOrdens');
  lista.innerHTML = '';
  ordens.forEach(o => {
    const li = document.createElement('li');
    li.innerHTML = `#${o.id} - ${o.descricao} [${o.status}]<br>Cliente: ${o.Cliente ? o.Cliente.nome : ''} | Veículo: ${o.Veiculo ? o.Veiculo.placa : ''} | Funcionário: ${o.Funcionario ? o.Funcionario.nome : ''}`;
    li.onclick = () => mostrarDetalheOrdem(o);
    lista.appendChild(li);
  });
}
document.getElementById('formOrdem').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  await fetch(api + '/ordens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      descricao: form.descricao.value,
      ClienteId: form.ClienteId.value,
      VeiculoId: form.VeiculoId.value,
      FuncionarioId: form.FuncionarioId.value,
      status: 'aberta'
    })
  });
  form.reset();
  carregarOrdens();
};

async function mostrarDetalheOrdem(ordem) {
  const div = document.getElementById('ordemDetalhe');
  div.innerHTML = `<h3>Ordem #${ordem.id}</h3>
    <p>${ordem.descricao}</p>
    <p>Status: ${ordem.status}</p>
    <form id="formLancamentoPeca">
      <select name="pecaId" id="selectPecaLancamento" required></select>
      <input name="quantidade" placeholder="Qtd" type="number" required>
      <input name="funcionarioId" placeholder="ID Funcionário" type="number" required>
      <button type="submit">Lançar Peça</button>
    </form>
    <ul id="listaPecasOrdem"></ul>`;
  // Preencher peças
  const resPecas = await fetch(api + '/pecas');
  const pecas = await resPecas.json();
  const selectPecaLancamento = document.getElementById('selectPecaLancamento');
  selectPecaLancamento.innerHTML = '<option value="">Selecione</option>';
  pecas.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.nome;
    selectPecaLancamento.appendChild(opt);
  });
  // Listar peças já lançadas
  if (ordem.Pecas) {
    const lista = document.getElementById('listaPecasOrdem');
    lista.innerHTML = '';
    ordem.Pecas.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nome} - Qtd: ${p.OrdemServicoPeca.quantidade}`;
      lista.appendChild(li);
    });
  }
  document.getElementById('formLancamentoPeca').onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const resp = await fetch(api + `/ordens/${ordem.id}/pecas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pecaId: form.pecaId.value,
        quantidade: form.quantidade.value,
        funcionarioId: form.funcionarioId.value
      })
    });
    const data = await resp.json();
    if (data.alerta) alert(data.alerta);
    carregarOrdens();
    carregarPecas();
    div.innerHTML = '';
  };
}

// Movimentação de Peças (Entrada)
document.getElementById('formEntradaPeca').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  await fetch(api + `/pecas/${form.pecaId.value}/entrada`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quantidade: form.quantidade.value,
      funcionarioId: form.funcionarioId.value
    })
  });
  form.reset();
  carregarPecas();
  carregarHistorico();
};

async function carregarHistorico() {
  const res = await fetch(api + '/historico');
  const hist = await res.json();
  const lista = document.getElementById('historicoEstoque');
  lista.innerHTML = '';
  hist.forEach(h => {
    const li = document.createElement('li');
    li.textContent = `${h.tipo.toUpperCase()} - ${h.Peca ? h.Peca.nome : ''} - Qtd: ${h.quantidade} - Por: ${h.Funcionario ? h.Funcionario.nome : ''} - ${new Date(h.data).toLocaleString()}`;
    lista.appendChild(li);
  });
}

// Relatórios

document.getElementById('formRelatorioCliente').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch(api + `/relatorio/cliente/${form.clienteId.value}`);
  const ordens = await res.json();
  const lista = document.getElementById('listaRelatorio');
  lista.innerHTML = '';
  ordens.forEach(o => {
    const li = document.createElement('li');
    li.textContent = `#${o.id} - ${o.descricao} (${o.status}) - Veículo: ${o.Veiculo ? o.Veiculo.placa : ''}`;
    lista.appendChild(li);
  });
};
document.getElementById('formRelatorioVeiculo').onsubmit = async e => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch(api + `/relatorio/veiculo/${form.veiculoId.value}`);
  const ordens = await res.json();
  const lista = document.getElementById('listaRelatorio');
  lista.innerHTML = '';
  ordens.forEach(o => {
    const li = document.createElement('li');
    li.textContent = `#${o.id} - ${o.descricao} (${o.status}) - Cliente: ${o.Cliente ? o.Cliente.nome : ''}`;
    lista.appendChild(li);
  });
};

async function carregarAlertas() {
  const res = await fetch(api + '/alertas/revisoes');
  const ordens = await res.json();
  const lista = document.getElementById('listaAlertas');
  lista.innerHTML = '';
  ordens.forEach(o => {
    const li = document.createElement('li');
    li.textContent = `Ordem #${o.id} aberta para ${o.Cliente ? o.Cliente.nome : ''} - Veículo: ${o.Veiculo ? o.Veiculo.placa : ''}`;
    lista.appendChild(li);
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarClientes();
  carregarVeiculos();
  carregarPecas();
  carregarOrdens();
  carregarFuncionarios();
  carregarHistorico();
  carregarAlertas();
});
