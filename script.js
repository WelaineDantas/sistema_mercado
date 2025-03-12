// Verifica qual página está sendo carregada
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se está na página de login
    if (document.getElementById('btnEntrar')) {
        initLoginPage();
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

// Funções para página de login
function initLoginPage() {
    const recoverLink = document.getElementById('recoverLink');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const btnEntrar = document.getElementById('btnEntrar');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const btnReturn = document.getElementById('btnReturn');
    const returnLogin = document.getElementById('returnLogin');
    const recoverModal = document.getElementById('recoverModal');
    const confirmModal = document.getElementById('confirmModal');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const cpfInput = document.getElementById('cpf');

    if (recoverLink) {
        recoverLink.addEventListener('click', function(event) {
            event.preventDefault();
            recoverModal.style.display = 'flex';
        });
    }

    if (returnLogin) {
        returnLogin.addEventListener('click', function(event) {
            event.preventDefault();
            recoverModal.style.display = 'none';
        });
    }

    if (btnReturn) {
        btnReturn.addEventListener('click', function() {
            confirmModal.style.display = 'none';
        });
    }

    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            if (cpfInput && !cpfInput.value.trim()) {
                alert('Por favor, digite seu CPF');
                return;
            }

            recoverModal.style.display = 'none';
            confirmModal.style.display = 'flex';

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
        btnCadastrar.addEventListener('click', function() {
            alert('Redirecionando para página de cadastro...');
            // Em um sistema real, isso seria:
            // window.location.href = 'cadastro-usuario.html';
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
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (recoverModal) recoverModal.style.display = 'none';
            if (confirmModal) confirmModal.style.display = 'none';
        }
    });
}

// Funções para página de estoque
function initEstoquePage() {
    const btnAddItem = document.getElementById('btnAddItem');
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-delete');
    const closeEditModal = document.getElementById('closeEditModal');
    const btnSalvarEdit = document.getElementById('btnSalvarEdit');
    const btnConfirmDelete = document.getElementById('btnConfirmDelete');
    const btnCancelDelete = document.getElementById('btnCancelDelete');
    const btnSuccessOk = document.getElementById('btnSuccessOk');
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const successModal = document.getElementById('successModal');
    const successMessage = document.getElementById('successMessage');

    // Variável para armazenar o ID do item a ser excluído
    let itemToDelete = null;

    if (btnAddItem) {
        btnAddItem.addEventListener('click', function() {
            window.location.href = 'cadastro-produto.html';
        });
    }

    // Adicionar eventos aos botões de edição
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.id;
            // Em um sistema real, buscaríamos as informações do item no servidor
            // Simulando preenchimento dos campos de edição
            document.getElementById('editNome').value = 'Produto ' + itemId;
            document.getElementById('editLocal').value = 'Depósito 2';
            document.getElementById('editPrecoVenda').value = 'R$ 000,00';

            editModal.style.display = 'flex';
        });
    });

    // Adicionar eventos aos botões de exclusão
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            itemToDelete = this.dataset.id;
            deleteModal.style.display = 'flex';
        });
    });

    // Fechar modal de edição
    if (closeEditModal) {
        closeEditModal.addEventListener('click', function() {
            editModal.style.display = 'none';
        });
    }

    // Salvar edição
    if (btnSalvarEdit) {
        btnSalvarEdit.addEventListener('click', function() {
            // Em um sistema real, enviaríamos os dados para o servidor
            editModal.style.display = 'none';
            successMessage.textContent = 'Produto editado com sucesso!';
            successModal.style.display = 'flex';
        });
    }

    // Confirmar exclusão
    if (btnConfirmDelete) {
        btnConfirmDelete.addEventListener('click', function() {
            // Em um sistema real, enviaríamos a solicitação de exclusão para o servidor
            deleteModal.style.display = 'none';
            successMessage.textContent = 'Exclusão realizada com sucesso!';
            successModal.style.display = 'flex';
        });
    }

    // Cancelar exclusão
    if (btnCancelDelete) {
        btnCancelDelete.addEventListener('click', function() {
            deleteModal.style.display = 'none';
            itemToDelete = null;
        });
    }

    // Fechar modal de sucesso
    if (btnSuccessOk) {
        btnSuccessOk.addEventListener('click', function() {
            successModal.style.display = 'none';
            // Em um sistema real, recarregaríamos os dados ou redirecionaríamos
            // Simulando atualização da página
            alert("A tabela seria atualizada em um sistema real.");
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
            itemToDelete = null;
        }
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (editModal) editModal.style.display = 'none';
            if (deleteModal) {
                deleteModal.style.display = 'none';
                itemToDelete = null;
            }
            if (successModal) successModal.style.display = 'none';
        }
    });
}

// Funções para página de reposição
function initReposicaoPage() {
    const btnFinalizar = document.getElementById('btnFinalizar');
    const successModal = document.getElementById('successModal');
    const btnSuccessOk = document.getElementById('btnSuccessOk');

    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', function() {
            // Validação simples
            const produto = document.getElementById('produto').value.trim();
            const codigoBarra = document.getElementById('codigoBarra').value.trim();
            const deposito = document.getElementById('deposito').value.trim();
            const quantidade = document.getElementById('quantidade').value.trim();

            if (!produto || !codigoBarra || !deposito || !quantidade) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Em um sistema real, enviaríamos os dados para o servidor
            successModal.style.display = 'flex';
        });
    }

    if (btnSuccessOk) {
        btnSuccessOk.addEventListener('click', function() {
            successModal.style.display = 'none';
            // Limpar formulário
            document.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (successModal) successModal.style.display = 'none';
        }
    });
}

// Funções para página de usuários
function initUsuariosPage() {
    const btnAddUsuario = document.getElementById('btnAddUsuario');
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-danger');
    const closeEditUsuarioModal = document.getElementById('closeEditUsuarioModal');
    const closeAddUsuarioModal = document.getElementById('closeAddUsuarioModal');
    const btnSalvarUsuario = document.getElementById('btnSalvarUsuario');
    const btnCadastrarUsuario = document.getElementById('btnCadastrarUsuario');
    const btnConfirmDeleteUsuario = document.getElementById('btnConfirmDeleteUsuario');
    const btnCancelDeleteUsuario = document.getElementById('btnCancelDeleteUsuario');
    const btnUsuarioSuccessOk = document.getElementById('btnUsuarioSuccessOk');
    const editUsuarioModal = document.getElementById('editUsuarioModal');
    const addUsuarioModal = document.getElementById('addUsuarioModal');
    const deleteUsuarioModal = document.getElementById('deleteUsuarioModal');
    const successUsuarioModal = document.getElementById('successUsuarioModal');
    const successUsuarioMessage = document.getElementById('successUsuarioMessage');

    // Variável para armazenar o ID do usuário a ser excluído
    let userToDelete = null;

    if (btnAddUsuario) {
        btnAddUsuario.addEventListener('click', function() {
            addUsuarioModal.style.display = 'flex';
        });
    }

    // Adicionar eventos aos botões de edição
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.dataset.id;
            // Em um sistema real, buscaríamos as informações do usuário no servidor
            // Simulando preenchimento dos campos de edição
            document.getElementById('editNomeUsuario').value = 'Usuário ' + userId;
            document.getElementById('editFuncao').value = 'Estoquista';
            document.getElementById('editEmail').value = 'usuario' + userId + '@sistema.com';
            document.getElementById('editSenha').value = '';

            editUsuarioModal.style.display = 'flex';
        });
    });

    // Adicionar eventos aos botões de exclusão
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            userToDelete = this.dataset.id;
            deleteUsuarioModal.style.display = 'flex';
        });
    });

    // Fechar modal de edição
    if (closeEditUsuarioModal) {
        closeEditUsuarioModal.addEventListener('click', function() {
            editUsuarioModal.style.display = 'none';
        });
    }

    // Fechar modal de adição
    if (closeAddUsuarioModal) {
        closeAddUsuarioModal.addEventListener('click', function() {
            addUsuarioModal.style.display = 'none';
        });
    }

    // Salvar edição
    if (btnSalvarUsuario) {
        btnSalvarUsuario.addEventListener('click', function() {
            // Em um sistema real, enviaríamos os dados para o servidor
            editUsuarioModal.style.display = 'none';
            successUsuarioMessage.textContent = 'Usuário editado com sucesso!';
            successUsuarioModal.style.display = 'flex';
        });
    }

    // Cadastrar novo usuário
    if (btnCadastrarUsuario) {
        btnCadastrarUsuario.addEventListener('click', function() {
            // Em um sistema real, enviaríamos os dados para o servidor
            addUsuarioModal.style.display = 'none';
            successUsuarioMessage.textContent = 'Usuário cadastrado com sucesso!';
            successUsuarioModal.style.display = 'flex';
        });
    }

    // Confirmar exclusão
    if (btnConfirmDeleteUsuario) {
        btnConfirmDeleteUsuario.addEventListener('click', function() {
            // Em um sistema real, enviaríamos a solicitação de exclusão para o servidor
            deleteUsuarioModal.style.display = 'none';
            successUsuarioMessage.textContent = 'Exclusão realizada com sucesso!';
            successUsuarioModal.style.display = 'flex';
        });
    }

    // Cancelar exclusão
    if (btnCancelDeleteUsuario) {
        btnCancelDeleteUsuario.addEventListener('click', function() {
            deleteUsuarioModal.style.display = 'none';
            userToDelete = null;
        });
    }

    // Fechar modal de sucesso
    if (btnUsuarioSuccessOk) {
        btnUsuarioSuccessOk.addEventListener('click', function() {
            successUsuarioModal.style.display = 'none';
            // Em um sistema real, recarregaríamos os dados ou redirecionaríamos
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === editUsuarioModal) {
            editUsuarioModal.style.display = 'none';
        }
        if (event.target === addUsuarioModal) {
            addUsuarioModal.style.display = 'none';
        }
        if (event.target === deleteUsuarioModal) {
            deleteUsuarioModal.style.display = 'none';
            userToDelete = null;
        }
        if (event.target === successUsuarioModal) {
            successUsuarioModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (editUsuarioModal) editUsuarioModal.style.display = 'none';
            if (addUsuarioModal) addUsuarioModal.style.display = 'none';
            if (deleteUsuarioModal) {
                deleteUsuarioModal.style.display = 'none';
                userToDelete = null;
            }
            if (successUsuarioModal) successUsuarioModal.style.display = 'none';
        }
    });
}

// Funções para página de fornecedores
function initFornecedoresPage() {
    const btnAddFornecedor = document.getElementById('btnAddFornecedor');
    const editButtons = document.querySelectorAll('.btn-edit');
    const deleteButtons = document.querySelectorAll('.btn-danger');
    const closeEditFornecedorModal = document.getElementById('closeEditFornecedorModal');
    const closeAddFornecedorModal = document.getElementById('closeAddFornecedorModal');
    const btnSalvarFornecedor = document.getElementById('btnSalvarFornecedor');
    const btnCadastrarFornecedor = document.getElementById('btnCadastrarFornecedor');
    const btnConfirmDeleteFornecedor = document.getElementById('btnConfirmDeleteFornecedor');
    const btnCancelDeleteFornecedor = document.getElementById('btnCancelDeleteFornecedor');
    const btnFornecedorSuccessOk = document.getElementById('btnFornecedorSuccessOk');
    const editFornecedorModal = document.getElementById('editFornecedorModal');
    const addFornecedorModal = document.getElementById('addFornecedorModal');
    const deleteFornecedorModal = document.getElementById('deleteFornecedorModal');
    const successFornecedorModal = document.getElementById('successFornecedorModal');
    const successFornecedorMessage = document.getElementById('successFornecedorMessage');

    // Variável para armazenar o ID do fornecedor a ser excluído
    let fornecedorToDelete = null;

    if (btnAddFornecedor) {
        btnAddFornecedor.addEventListener('click', function() {
            addFornecedorModal.style.display = 'flex';
        });
    }

    // Adicionar eventos aos botões de edição
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fornecedorId = this.dataset.id;
            // Em um sistema real, buscaríamos as informações do fornecedor no servidor
            // Simulando preenchimento dos campos de edição
            document.getElementById('editRazaoSocial').value = 'Fornecedor ' + fornecedorId;
            document.getElementById('editTelefone').value = '(00) 0000-0000';
            document.getElementById('editRepresentante').value = 'XXXXX XXXXXX';
            document.getElementById('editEndereco').value = 'XXXx XXXXXXX';

            editFornecedorModal.style.display = 'flex';
        });
    });

    // Adicionar eventos aos botões de exclusão
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            fornecedorToDelete = this.dataset.id;
            deleteFornecedorModal.style.display = 'flex';
        });
    });

    // Fechar modal de edição
    if (closeEditFornecedorModal) {
        closeEditFornecedorModal.addEventListener('click', function() {
            editFornecedorModal.style.display = 'none';
        });
    }

    // Fechar modal de adição
    if (closeAddFornecedorModal) {
        closeAddFornecedorModal.addEventListener('click', function() {
            addFornecedorModal.style.display = 'none';
        });
    }

    // Salvar edição
    if (btnSalvarFornecedor) {
        btnSalvarFornecedor.addEventListener('click', function() {
            // Em um sistema real, enviaríamos os dados para o servidor
            editFornecedorModal.style.display = 'none';
            successFornecedorMessage.textContent = 'Fornecedor editado com sucesso!';
            successFornecedorModal.style.display = 'flex';
        });
    }

    // Cadastrar novo fornecedor
    if (btnCadastrarFornecedor) {
        btnCadastrarFornecedor.addEventListener('click', function() {
            // Em um sistema real, enviaríamos os dados para o servidor
            addFornecedorModal.style.display = 'none';
            successFornecedorMessage.textContent = 'Fornecedor cadastrado com sucesso!';
            successFornecedorModal.style.display = 'flex';
        });
    }

    // Confirmar exclusão
    if (btnConfirmDeleteFornecedor) {
        btnConfirmDeleteFornecedor.addEventListener('click', function() {
            // Em um sistema real, enviaríamos a solicitação de exclusão para o servidor
            deleteFornecedorModal.style.display = 'none';
            successFornecedorMessage.textContent = 'Exclusão realizada com sucesso!';
            successFornecedorModal.style.display = 'flex';
        });
    }

    // Cancelar exclusão
    if (btnCancelDeleteFornecedor) {
        btnCancelDeleteFornecedor.addEventListener('click', function() {
            deleteFornecedorModal.style.display = 'none';
            fornecedorToDelete = null;
        });
    }

    // Fechar modal de sucesso
    if (btnFornecedorSuccessOk) {
        btnFornecedorSuccessOk.addEventListener('click', function() {
            successFornecedorModal.style.display = 'none';
            // Em um sistema real, recarregaríamos os dados ou redirecionaríamos
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === editFornecedorModal) {
            editFornecedorModal.style.display = 'none';
        }
        if (event.target === addFornecedorModal) {
            addFornecedorModal.style.display = 'none';
        }
        if (event.target === deleteFornecedorModal) {
            deleteFornecedorModal.style.display = 'none';
            fornecedorToDelete = null;
        }
        if (event.target === successFornecedorModal) {
            successFornecedorModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (editFornecedorModal) editFornecedorModal.style.display = 'none';
            if (addFornecedorModal) addFornecedorModal.style.display = 'none';
            if (deleteFornecedorModal) {
                deleteFornecedorModal.style.display = 'none';
                fornecedorToDelete = null;
            }
            if (successFornecedorModal) successFornecedorModal.style.display = 'none';
        }
    });
}

// Funções para página de cadastro
function initCadastroPage() {
    const btnSalvarCadastro = document.getElementById('btnSalvarCadastro');
    const successCadastroModal = document.getElementById('successCadastroModal');
    const btnCadastroSuccessOk = document.getElementById('btnCadastroSuccessOk');

    if (btnSalvarCadastro) {
        btnSalvarCadastro.addEventListener('click', function() {
            // Validação simples
            const razaoSocial = document.getElementById('cadastroRazaoSocial').value.trim();
            const cnpj = document.getElementById('cadastroCNPJ').value.trim();
            const telefone = document.getElementById('cadastroTelefone').value.trim();

            if (!razaoSocial || !cnpj || !telefone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Em um sistema real, enviaríamos os dados para o servidor
            successCadastroModal.style.display = 'flex';
        });
    }

    if (btnCadastroSuccessOk) {
        btnCadastroSuccessOk.addEventListener('click', function() {
            successCadastroModal.style.display = 'none';
            // Limpar formulário
            document.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === successCadastroModal) {
            successCadastroModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (successCadastroModal) successCadastroModal.style.display = 'none';
        }
    });
}

// Funções para página de cadastro de produto
function initCadastroProdutoPage() {
    const btnSalvarProduto = document.getElementById('btnSalvarProduto');
    const successProdutoModal = document.getElementById('successProdutoModal');
    const btnProdutoSuccessOk = document.getElementById('btnProdutoSuccessOk');

    if (btnSalvarProduto) {
        btnSalvarProduto.addEventListener('click', function() {
            // Validação simples
            const descricao = document.getElementById('descricao').value.trim();
            const codigoBarraProduto = document.getElementById('codigoBarraProduto').value.trim();
            const quantidadeProduto = document.getElementById('quantidadeProduto').value.trim();

            if (!descricao || !codigoBarraProduto || !quantidadeProduto) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Em um sistema real, enviaríamos os dados para o servidor
            successProdutoModal.style.display = 'flex';
        });
    }

    if (btnProdutoSuccessOk) {
        btnProdutoSuccessOk.addEventListener('click', function() {
            successProdutoModal.style.display = 'none';
            // Limpar formulário
            document.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === successProdutoModal) {
            successProdutoModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (successProdutoModal) successProdutoModal.style.display = 'none';
        }
    });
}

// Funções para página de cadastro de usuário
function initCadastroUsuarioPage() {
    const btnSalvarUsuarioCadastro = document.getElementById('btnSalvarUsuarioCadastro');
    const successUsuarioCadastroModal = document.getElementById('successUsuarioCadastroModal');
    const btnUsuarioCadastroSuccessOk = document.getElementById('btnUsuarioCadastroSuccessOk');

    if (btnSalvarUsuarioCadastro) {
        btnSalvarUsuarioCadastro.addEventListener('click', function() {
            // Validação simples
            const nomeUsuario = document.getElementById('nomeUsuario').value.trim();
            const cpfUsuario = document.getElementById('cpfUsuario').value.trim();
            const emailUsuario = document.getElementById('emailUsuario').value.trim();
            const senhaUsuario = document.getElementById('senhaUsuario').value.trim();

            if (!nomeUsuario || !cpfUsuario || !emailUsuario || !senhaUsuario) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Em um sistema real, enviaríamos os dados para o servidor
            successUsuarioCadastroModal.style.display = 'flex';
        });
    }

    if (btnUsuarioCadastroSuccessOk) {
        btnUsuarioCadastroSuccessOk.addEventListener('click', function() {
            successUsuarioCadastroModal.style.display = 'none';
            // Limpar formulário
            document.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            // Redefinir radio buttons para 'ativo'
            document.querySelector('input[name="statusCadastroUsuario"][value="ativo"]').checked = true;
        });
    }

    // Fechar modais quando clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === successUsuarioCadastroModal) {
            successUsuarioCadastroModal.style.display = 'none';
        }
    });

    // Permitir fechar modais com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (successUsuarioCadastroModal) successUsuarioCadastroModal.style.display = 'none';
        }
    });
}

// Funções utilitárias para manipulação de elementos da sidebar
document.addEventListener('DOMContentLoaded', function() {
    // Expandir/colapsar submenus na sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const nextElement = this.nextElementSibling;

            if (nextElement && nextElement.classList.contains('sidebar-subnav')) {
                if (nextElement.style.display === 'block') {
                    nextElement.style.display = 'none';
                    this.querySelector('.dropdown-icon').textContent = '▼';
                } else {
                    // Esconder todos os outros submenus
                    document.querySelectorAll('.sidebar-subnav').forEach(subnav => {
                        subnav.style.display = 'none';
                    });
                    document.querySelectorAll('.dropdown-icon').forEach(icon => {
                        icon.textContent = '▼';
                    });

                    nextElement.style.display = 'block';
                    this.querySelector('.dropdown-icon').textContent = '▲';
                }
            }
        });
    });

    // Mostrar submenus para item ativo
    const activeItems = document.querySelectorAll('.sidebar-item.active');
    activeItems.forEach(item => {
        const nextElement = item.nextElementSibling;
        if (nextElement && nextElement.classList.contains('sidebar-subnav')) {
            nextElement.style.display = 'block';
            item.querySelector('.dropdown-icon').textContent = '▲';
        }
    });

    // Logout
    const logoutIcon = document.querySelector('.logout-icon');
    if (logoutIcon) {
        logoutIcon.addEventListener('click', function() {
            if (confirm('Deseja realmente sair do sistema?')) {
                window.location.href = 'index.html';
            }
        });
    }
});