// Verifica qual página está sendo carregada
document.addEventListener('DOMContentLoaded', function() {
    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;
        })
        .then(() => {
            applyMenuState();
        });
    // Verifica se está na página de login
    if (document.getElementById('btnEntrar')) {
        initLoginAndRecoverPage();
    }

    // Verifica se está na página de Recuperar
    if (document.getElementById('btnConfirmar')) {
        initLoginAndRecoverPage();
    }

    // Verifica se está na página de estoque
    if (document.querySelector('.content-table') && document.querySelector('.sidebar-item.active .icon-estoque')) {
        initEstoquePage();
    }

    // Verifica se está na página de reposição
    if (document.getElementById('btnFinalizar')) {
        initReposicaoPage();
    }

    // Verifica se está na página de usuários
    if (document.getElementById('btnAddUsuario')) {
        initUsuariosPage();
    }

    // Verifica se está na página de fornecedores
    if (document.getElementById('btnAddFornecedor')) {
        initFornecedoresPage();
    }

    // Verifica se está na página de cadastro
    if (document.getElementById('btnSalvarCadastro')) {
        initCadastroPage();
    }

    // Verifica se está na página de cadastro de produto
    if (document.getElementById('btnSalvarProduto')) {
        document.getElementById("btnSalvarProduto").addEventListener("click", function () {
            let descricao = document.getElementById("descricao").value;
            let quantidade = document.getElementById("quantidadeProduto").value;
            let local = document.getElementById("localProduto").value;
            let precoVenda = document.getElementById("precoVenda").value;
    
            if (!descricao || !quantidade || !local || !precoVenda) {
                alert("Preencha todos os campos obrigatórios!");
                return;
            }
    
            let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
            produtos.push({ nome: descricao, quantidade, local, precoVenda });
            localStorage.setItem("produtos", JSON.stringify(produtos));
    
            // Redireciona para a tela de estoque
            window.location.href = "estoque.html";
        });
    }

    // Verifica se está na página de cadastro de usuário
    if (document.getElementById('btnSalvarUsuarioCadastro')) {
        initCadastroUsuarioPage();
    }
});

// Funções para página de login e recuperar senha
function initLoginAndRecoverPage() {
    const recoverLink = document.getElementById('recoverLink');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const btnEntrar = document.getElementById('btnEntrar');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const btnReturn = document.getElementById('btnReturn');
    const returnLogin = document.getElementById('returnLogin');
    const recoverModal = document.getElementById('recoverModal');
    const cadastrarModal = document.getElementById('cadastrarModal');
    const confirmModal = document.getElementById('confirmModal');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const cpfInput = document.getElementById('cpf');
    const closeCadastrarModal = document.getElementById("closeCadastrarModal");

    if (returnLogin) {
        returnLogin.addEventListener('click', function(event) {
            event.preventDefault();
            recoverModal.style.display = 'none';
        });
    }

    if (btnReturn) {
        btnReturn.addEventListener('click', function() {
            window.location.href = "index.html";
        });
    }

    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            if (cpfInput && !cpfInput.value.trim()) {
                alert('Por favor, digite seu CPF');
                return;
            }

            if (recoverModal) recoverModal.style.display = "none";
            if (cadastrarModal) cadastrarModal.style.display = "none";

            // Exibe o modal de confirmação
            if (confirmModal) confirmModal.style.display = "flex";
            

            if (cpfInput) {
                cpfInput.value = '';
            }
        });
    }

    if (btnEntrar) {
        btnEntrar.addEventListener('click', function() {
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value.trim() : '';

            if (!email || !password) {
                alert('Por favor, preencha todos os campos');
                return;
            }

            // Simulação de login
            if (email === 'adm@adm.com' && password === 'admin123') {
                window.location.href = 'estoque.html';
            } else {
                alert('Email ou senha incorretos');
            }
        });
    }

    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', function(event) {
            event.preventDefault();
            cadastrarModal.style.display = 'flex';
        });
    }

    if (closeCadastrarModal && cadastrarModal) {
        closeCadastrarModal.addEventListener("click", function () {
            cadastrarModal.style.display = "none"; // Fecha o modal
        });
    }

    if (btnSalvarUsuarioCadastro) {
        btnSalvarUsuarioCadastro.addEventListener("click", function () {
            // Captura os campos do formulário
            const nome = document.getElementById("nomeUsuario").value.trim();
            const cpf = document.getElementById("cpfUsuario").value.trim();
            const email = document.getElementById("emailUsuario").value.trim();
            const senha = document.getElementById("senhaUsuario").value.trim();
            const funcao = document.getElementById("funcaoUsuario").value.trim();

            // Verifica se algum campo está vazio
            if (!nome || !cpf || !email || !senha || !funcao) {
                alert("Por favor, preencha todos os campos");
                return;
            }

            // Se todos os campos estiverem preenchidos, pode prosseguir
            alert("Cadastro realizado com sucesso!");
            cadastrarModal.style.display = "none";
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === recoverModal) {
            recoverModal.style.display = 'none';
        }
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
        if (event.target === cadastrarModal) {
            cadastrarModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (recoverModal) recoverModal.style.display = 'none';
            if (confirmModal) confirmModal.style.display = 'none';
            if(cadastrarModal) cadastrarModal.style.display = 'none';
        }
    });
}

function applyMenuState() {
    let savedMenu = localStorage.getItem("openMenu");
    let activeSubItem = localStorage.getItem("activeSubItem");
    let activeMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
        let menu = document.getElementById(savedMenu);
        if (menu) {
            menu.style.display = "block";
            menu.classList.add("open");

            // Garante que o item pai do submenu também tenha a classe 'open'
            let parentItem = menu.previousElementSibling;
            if (parentItem && parentItem.classList.contains("sidebar-item")) {
                parentItem.classList.add("open");
            }

        }
    }

     // Recupera o item ativo do submenu
     if (activeSubItem) {
        document.querySelectorAll('.sidebar-subitem').forEach(item => {
            if (item.textContent.trim() === activeSubItem) {
                item.classList.add('active');
            }
        });
    }

    // Mantém a cor do menu ativo (Fornecedor)
    if (activeMenu) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            if (item.textContent.trim() === activeMenu) {
                item.classList.add('active');
            } else {
                item.classList.remove('active'); // 🔥 Garante que os outros menus voltem à cor original
            }
        });
    }
}


function toggleSubMenu(menuId) {
    let menu = document.getElementById(menuId);
    localStorage.removeItem("activeMenu");
    let parentItem = menu.previousElementSibling;

    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        menu.style.display = "none";

        if (parentItem) {
            parentItem.classList.remove("open");
        }
        localStorage.removeItem("openMenu");
    } else {
        // Fecha todos os outros submenus antes de abrir este
        document.querySelectorAll('.sidebar-subnav').forEach(sub => {
            sub.classList.remove("open");
            sub.style.display = "none";
        });
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove("open");
        });

        menu.classList.add("open");
        menu.style.display = "block";

        if (parentItem) {
            parentItem.classList.add("open"); // 🔥 Aqui garantimos que o Estoque receba a cor imediatamente
        }
        localStorage.setItem("openMenu", menuId);
    }
}


function navigateTo(page) {
    window.location.href = page;
}

function setActiveMenu(page, element) {
    // Remove 'active' de todos os itens principais do menu
    document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));

    // Adiciona 'active' ao item clicado
    element.classList.add('active');

    // Salva no localStorage para manter após recarregar
    localStorage.setItem('activeMenu', element.textContent.trim());

    localStorage.removeItem("activeSubItem");
    localStorage.removeItem("openMenu");

     // Navega para a página
     setTimeout(() => { window.location.href = page; }, 100); // 🔥 Pequeno atraso para garantir a atualização
}

document.addEventListener("DOMContentLoaded", function () {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Renderiza os produtos salvos no localStorage
    function renderizarProdutos() {
        const tabela = document.querySelector(".content-table");
        tabela.innerHTML = `
            <div class="table-header">
                <div class="col-item">Item</div>
                <div class="col-quantidade">Quantidade</div>
                <div class="col-local">Local</div>
                <div class="col-acoes">Ações</div>
            </div>
        `;

        produtos.forEach((produto, index) => {
            const row = document.createElement("div");
            row.classList.add("table-row");
            row.innerHTML = `
                <div class="row-main">
                    <div class="col-item">${produto.nome}</div>
                    <div class="col-quantidade">${produto.quantidade}</div>
                    <div class="col-local">${produto.local}</div>
                    <div class="col-acoes">
                        <button class="btn-icon btn-edit" data-id="${index}">Editar</button>
                        <button class="btn-icon btn-delete" data-id="${index}">Excluir</button>
                    </div>
                </div>
            `;
            tabela.appendChild(row);
        });

        adicionarEventos();
    }

    // Abre o modal de edição e carrega os dados do produto
    function abrirModalEdicao(index) {
        const produto = produtos[index];
        document.getElementById("editNome").value = produto.nome;
        document.getElementById("editLocal").value = produto.local;
        document.getElementById("editPrecoVenda").value = produto.precoVenda;
        document.getElementById("btnSalvarEdit").setAttribute("data-id", index);
        document.getElementById("editModal").style.display = "flex";
    }

    // Salva as edições do produto
    document.getElementById("btnSalvarEdit").addEventListener("click", function () {
        setTimeout(() => {
            successModal.style.display = "flex"; // Exibe o modal de sucesso
        }, 200);
        const index = this.getAttribute("data-id");
        produtos[index].nome = document.getElementById("editNome").value;
        produtos[index].local = document.getElementById("editLocal").value;
        produtos[index].precoVenda = document.getElementById("editPrecoVenda").value;

        localStorage.setItem("produtos", JSON.stringify(produtos));
        renderizarProdutos();
        document.getElementById("editModal").style.display = "none";
    });

    btnSuccessOk.addEventListener("click", function () {
        successModal.style.display = "none"; // Fecha o modal ao clicar no botão OK
    });

    // Abre o modal de exclusão
    function abrirModalExclusao(index) {
        document.getElementById("btnConfirmDelete").setAttribute("data-id", index);
        document.getElementById("deleteModal").style.display = "flex";
    }

    // Confirma a exclusão do produto
    document.getElementById("btnConfirmDelete").addEventListener("click", function () {
        const index = this.getAttribute("data-id");
        produtos.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        renderizarProdutos();
        document.getElementById("deleteModal").style.display = "none";
    });

    // Fecha os modais ao cancelar ou clicar fora
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", function (e) {
            if (e.target.classList.contains("modal")) {
                modal.style.display = "none";
            }
        });
    });

    document.getElementById("btnCancelDelete").addEventListener("click", function () {
        document.getElementById("deleteModal").style.display = "none";
    });

    document.getElementById("closeEditModal").addEventListener("click", function () {
        document.getElementById("editModal").style.display = "none";
    });

    // Adiciona eventos de clique em botões de edição/exclusão
    function adicionarEventos() {
        document.querySelectorAll(".btn-edit").forEach(button => {
            button.addEventListener("click", function () {
                abrirModalEdicao(this.getAttribute("data-id"));
            });
        });

        document.querySelectorAll(".btn-delete").forEach(button => {
            button.addEventListener("click", function () {
                abrirModalExclusao(this.getAttribute("data-id"));
            });
        });
    }

    // Adiciona novo item ao estoque
    document.getElementById("btnAddItem").addEventListener("click", function () {
        // Define apenas o menu "Cadastros" como ativo
        localStorage.setItem("openMenu", "submenu-cadastros");

        // Remove a seleção de "Usuário" e "Fornecedor"
        localStorage.removeItem("activeMenu");

        //const novoProduto = {
          //  nome: "Novo Produto",
            //quantidade: 0,
            //local: "Depósito",
            //precoVenda: "0,00"
        //};
        window.location.href = "cadastro-produto.html";

        //produtos.push(novoProduto);
        //localStorage.setItem("produtos", JSON.stringify(produtos));
        //renderizarProdutos();
    });

    renderizarProdutos();
});



function setActiveAndNavigate(page, element, menuId) {
    localStorage.setItem("openMenu", menuId);
    localStorage.setItem('activeSubItem', element.textContent.trim()); // Salva o nome do item clicado

    // Remove 'active' de todos os itens
    document.querySelectorAll(".sidebar-subitem").forEach(item => item.classList.remove("active"));

    // Adiciona 'active' apenas ao item clicado
    element.classList.add("active");
    


    let menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = 'block';
        menu.classList.add('open');

         // Garante que o item principal (Estoque) mantenha a cor de fundo
         let parentItem = menu.previousElementSibling;
         if (parentItem && parentItem.classList.contains("sidebar-item")) {
             parentItem.classList.add("open");
         }
    }

    // Navega para a página
    window.location.href = page;
}

// Seleção de elementos centralizada
const elements = {
    btnSalvarUsuarioCadastro: document.getElementById('btnSalvarUsuarioCadastro'),
    successUsuarioCadastroModal: document.getElementById('successUsuarioCadastroModal'),
    btnUsuarioCadastroSuccessOk: document.getElementById('btnUsuarioCadastroSuccessOk'),
    nomeUsuario: document.getElementById('nomeUsuario'),
    cpfUsuario: document.getElementById('cpfUsuario'),
    emailUsuario: document.getElementById('emailUsuario'),
    senhaUsuario: document.getElementById('senhaUsuario'),
    cadastroForm: document.getElementById('cadastroForm'),
    deleteFornecedorModal: document.getElementById('deleteFornecedorModal'),
    editFornecedorModal: document.getElementById('editFornecedorModal')
};

// Função para fechar modal ao clicar fora
function closeModalOnClickOutside(modal) {
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Função para fechar modal com tecla Esc
function closeModalOnEsc(modal) {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
}

// Função para limpar inputs de um formulário
function clearFormInputs(form) {
    form.querySelectorAll('input').forEach(input => input.value = '');
}

// Adicionando eventos nos modais
closeModalOnClickOutside(elements.successUsuarioCadastroModal);
closeModalOnClickOutside(elements.deleteFornecedorModal);
closeModalOnClickOutside(elements.editFornecedorModal);

closeModalOnEsc(elements.successUsuarioCadastroModal);
closeModalOnEsc(elements.deleteFornecedorModal);
closeModalOnEsc(elements.editFornecedorModal);

// Evento de sucesso ao cadastrar usuário
elements.btnUsuarioCadastroSuccessOk.addEventListener('click', function() {
    elements.successUsuarioCadastroModal.style.display = 'none';
    clearFormInputs(elements.cadastroForm);
    document.querySelector('input[name="statusCadastroUsuario"][value="ativo"]').checked = true;
});

// Delegação de eventos para editar e excluir fornecedores
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-edit')) {
        const fornecedorId = event.target.dataset.id;
        document.getElementById('editRazaoSocial').value = 'Fornecedor ' + fornecedorId;
        elements.editFornecedorModal.style.display = 'flex';
    }

    if (event.target.classList.contains('btn-danger')) {
        fornecedorToDelete = event.target.dataset.id;
        elements.deleteFornecedorModal.style.display = 'flex';
    }
});

// Manter submenus expandidos ao clicar em um item
function setActiveAndNavigate(page, element, menuId) {
    document.querySelectorAll('.sidebar-subitem').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    localStorage.setItem('openMenu', menuId);
    window.location.href = page;
}

// Expandir submenu ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    let openMenu = localStorage.getItem('openMenu');
    if (openMenu) {
        let menu = document.getElementById(openMenu);
        if (menu) {
            menu.classList.add("open");
            menu.style.display = "block";
            
            let parentItem = menu.previousElementSibling;
            if (parentItem) {
                parentItem.classList.add("open");
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    renderizarProdutos();
    if (document.getElementById("estoqueLista")) {
        carregarProdutosNaReposicao();
    }

    function carregarProdutosNaReposicao() {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        let tabela = document.getElementById("estoqueLista");

        if (!tabela) return;

        tabela.innerHTML = ""; // Limpa a tabela antes de inserir novos produtos

        if (produtos.length === 0) {
            tabela.innerHTML = "<p style='text-align: center; margin-top: 10px;'>Nenhum produto cadastrado.</p>";
            return;
        }

        produtos.forEach((produto, index) => {
            let row = document.createElement("div");
            row.classList.add("table-row");
            row.innerHTML = `
                <div class="row-main">
                    <div class="col-item">${produto.descricao || produto.nome}</div>
                    <div class="col-quantidade">${produto.quantidade}</div>
                    <div class="col-local">${produto.local || "Não especificado"}</div>
                    <div class="col-acoes">
                        <button class="btn-icon btn-repor" data-id="${index}">Repor</button>
                    </div>
                </div>
            `;
            tabela.appendChild(row);
        });

        adicionarEventosDeReposicao();
    }

    function adicionarEventosDeReposicao() {
        document.querySelectorAll(".btn-repor").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-id");
                let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

                let novaQuantidade = prompt(`Digite a quantidade a repor para ${produtos[index].descricao || produtos[index].nome}:`);
                if (novaQuantidade && !isNaN(novaQuantidade) && novaQuantidade > 0) {
                    produtos[index].quantidade = parseInt(produtos[index].quantidade) + parseInt(novaQuantidade);
                    localStorage.setItem("produtos", JSON.stringify(produtos));
                    carregarProdutosNaReposicao();

                    // Exibir modal de sucesso
                    document.getElementById("successModal").style.display = "flex";
                }
            });
        });

        // Fecha o modal de sucesso ao clicar no botão "OK"
        document.getElementById("btnSuccessOk").addEventListener("click", function () {
            document.getElementById("successModal").style.display = "none";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Pega o parâmetro 'produto' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const produtoNome = urlParams.get("produto");

    // Se houver um produto na URL, preenche o campo automaticamente
    if (produtoNome) {
        document.getElementById("produto").value = produtoNome;
    }

    // Evento de finalização da reposição
    document.getElementById("btnFinalizar").addEventListener("click", function () {
        const produto = document.getElementById("produto").value;
        const codigoBarra = document.getElementById("codigoBarra").value;
        const dataRecebimento = document.getElementById("dataRecebimento").value;
        const dataSaida = document.getElementById("dataSaida").value;
        const deposito = document.getElementById("deposito").value;
        const quantidade = document.getElementById("quantidade").value;

        if (!produto || !quantidade) {
            alert("Preencha os campos obrigatórios.");
            return;
        }

        // Atualiza a quantidade no estoque (localStorage)
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        let produtoIndex = produtos.findIndex(p => p.nome === produto);

        if (produtoIndex !== -1) {
            produtos[produtoIndex].quantidade = parseInt(produtos[produtoIndex].quantidade) + parseInt(quantidade);
            localStorage.setItem("produtos", JSON.stringify(produtos));
        }

        // Exibir modal de sucesso
        document.getElementById("successModal").style.display = "flex";
    });

    // Fecha o modal e volta para a tela de reposição
    document.getElementById("btnSuccessOk").addEventListener("click", function () {
        document.getElementById("successModal").style.display = "none";
        window.location.href = "reposicao.html";
    });
});





