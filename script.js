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
        initCadastroProdutoPage();
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

     // Navega para a página
     setTimeout(() => { window.location.href = page; }, 100); // 🔥 Pequeno atraso para garantir a atualização
}


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
    let savedMenu = localStorage.getItem('openMenu');
    if (savedMenu) {
        let menu = document.getElementById(savedMenu);
        if (menu) {
            menu.style.display = 'block';
            menu.classList.add('open');
        }
    }
});
