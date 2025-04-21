# Sistema de Cadastro e Relatórios de Alunos

O presente projeto é uma aplicação web em JavaScript que permite cadastrar alunos, validar dados de entrada, exibir relatórios e ordenar informações dos alunos cadastrados.

## 📋 Funcionalidades

1. Cadastro de alunos com os campos: Nome, RA, Idade, Sexo, Média e Resultado.
2. Validação dos campos preenchidos no formulário.
3. Exibição de mensagens de erro e sucesso ao usuário.
4. Ordenação dos alunos:
    - Por Nome em ordem crescente.
    - Por RA em ordem decrescente.
    - Apenas alunos aprovados, ordenados por Nome.
5. Relatórios exibidos dinamicamente na tela.
6. Foco automático e navegação entre campos usando a tecla Enter.
7. Interface para exibição e fechamento dos relatórios.

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript

## 📂 Estrutura do Código

O projeto está organizado em seções:

- Variáveis Globais: Definem o estado geral do sistema.
- Referência de Elementos: Obtém os elementos da página HTML.
- Funções de Cadastro e Validação: Cadastro de novos alunos com verificação dos campos.
- Funções de Ordenação e Filtragem: Ordenação usando algoritmo QuickSort customizado e filtragem com busca sequencial.
- Funções de Exibição e Interação: Exibição dos dados e mensagens na interface.
- Inicialização: Define o foco inicial e configura a navegação entre os campos.

## ⚙️ Como Funciona

1. Preencha o formulário de cadastro do aluno.
2. Clique no botão Cadastrar.
3. Se os dados estiverem corretos, o aluno será adicionado à lista.
4. Utilize os botões de ordenação para gerar relatórios:
    - Ordenar por Nome (crescente).
    - Ordenar por RA (decrescente).
    - Mostrar apenas Aprovados ordenados por Nome (crescente).
5. Os relatórios serão exibidos em uma seção dinâmica da página.

## 📌 Regras de Validação

- Nome: não pode ser vazio.
- RA: número positivo com no mínimo 5 dígitos.
- Idade: número positivo.
- Sexo: deve ser selecionado.
- Média: número entre 0 e 10.
- Resultado: deve ser selecionado.

## 🖥️ Pré-requisitos

Não há pré-requisitos, uma vez que basta abrir o arquivo .html no navegador.
Todo o funcionamento é feito no front-end, sem necessidade de back-end ou servidor.

## 📄 Observações Importantes

- O sistema utiliza QuickSort personalizado para realizar ordenações flexíveis, tanto de números quanto de strings.
- A validação é feita antes de salvar os dados para garantir integridade.
- Existe um sistema de feedback visual (cores e mensagens) para melhorar a experiência do usuário.
- As funções são separadas para facilitar a manutenção e futuras melhorias.

## 🔥 Melhorias Futuras

- Implementar filtros mais avançados (ex: alunos reprovados, faixas de média, etc).
- Exportar o relatório para arquivo (PDF, CSV).
- Melhorar a responsividade do layout para dispositivos móveis.
- Persistir os dados localmente usando localStorage. 