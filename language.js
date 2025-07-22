document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.querySelector('.language-switcher');

    const setLanguage = (lang) => {
        // Percorre todos os elementos que têm a chave de tradução
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            // Verifica se a tradução para o idioma e a chave existem
            if (translations[lang] && translations[lang][key]) {
                // Substitui o conteúdo do elemento pela tradução
                element.innerHTML = translations[lang][key];
            }
        });

        // Atualiza o atributo 'lang' da tag <html> para acessibilidade
        document.documentElement.lang = lang;

        // Salva a preferência de idioma no navegador do usuário
        localStorage.setItem('language', lang);

        // Atualiza qual bandeira aparece como "ativa"
        languageSwitcher.querySelectorAll('img').forEach(img => {
            if (img.getAttribute('data-lang') === lang) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    };

    // Adiciona o "ouvinte" de cliques no container das bandeiras
    languageSwitcher.addEventListener('click', (event) => {
        // Pega o idioma do atributo 'data-lang' da imagem clicada
        const lang = event.target.getAttribute('data-lang');
        if (lang) {
            setLanguage(lang);
        }
    });

    // Define o idioma inicial ao carregar a página
    // 1. Tenta usar o idioma salvo anteriormente
    // 2. Se não houver, tenta usar o idioma do navegador
    // 3. Se não for compatível, usa 'pt-BR' como padrão
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language || navigator.userLanguage; // pt-BR, en-US, etc.
    
    setLanguage(savedLang || Object.keys(translations).find(k => browserLang.startsWith(k.split('-')[0])) || 'pt-BR');
});