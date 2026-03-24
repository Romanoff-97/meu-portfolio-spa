/* =========================================
   1. TROCA DE TEMA (DARK/LIGHT MODE)
   ========================================= */

// Captura o botão e a tag <html> (root) onde controlaremos o data-theme
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Verifica no localStorage se o usuário possuía preferência guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    rootElement.setAttribute('data-theme', 'dark');
}

themeToggleBtn.addEventListener('click', () => {
    // Verifica qual tema está ativo e faz a troca
    const currentTheme = rootElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        rootElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

/* =========================================
   2. VALIDAÇÃO DE FORMULÁRIO E MODAis
   ========================================= */

const form = document.getElementById('contact-form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const msgInput = document.getElementById('mensagem');

// Elementos do Modal
const modal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal');

// Expressão Regular (RegEx) para validar formato de e-mail 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Função utilitária para limpar erro visual
function clearError(inputElement) {
    const formGroup = inputElement.parentElement;
    formGroup.classList.remove('invalid');
}

// Função utilitária para mostrar erro visual
function showError(inputElement) {
    const formGroup = inputElement.parentElement;
    formGroup.classList.add('invalid');
}

// Escutador do evento de "submit" (envio) do formulário
form.addEventListener('submit', (evento) => {
    // Previne o recarregamento natural do navegador (SPA)
    evento.preventDefault();

    let isFormValid = true;

    // 1. Validação de Nome (não pode estar vazio)
    if (nomeInput.value.trim() === '') {
        showError(nomeInput);
        isFormValid = false;
    } else {
        clearError(nomeInput);
    }

    // 2. Validação de E-mail (não pode estar vazio e precisa respeitar a RegEx)
    if (emailInput.value.trim() === '' || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput);
        isFormValid = false;
    } else {
        clearError(emailInput);
    }

    // 3. Validação da Mensagem
    if (msgInput.value.trim() === '') {
        showError(msgInput);
        isFormValid = false;
    } else {
        clearError(msgInput);
    }

    // Se todos os campos passaram nas validações
    if (isFormValid) {
        // Simulação de envio: mostra modal de sucesso
        modal.classList.add('show');

        // Limpa os campos do formulário para nova inserção
        form.reset();
    }
});

// Remove os erros em tempo real ao digitar (User Experience)
nomeInput.addEventListener('input', () => clearError(nomeInput));
emailInput.addEventListener('input', () => clearError(emailInput));
msgInput.addEventListener('input', () => clearError(msgInput));

// Lógica de fechamento do Modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Fechar modal caso clique fora do container central (na área cinza)
window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.classList.remove('show');
    }
});

/* =========================================
   3. ANO DINÂMICO NO RODAPÉ
   ========================================= */
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}
