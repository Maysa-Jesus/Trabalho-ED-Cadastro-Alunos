// -----------------------------------------
// VARIÁVEIS GLOBAIS
// -----------------------------------------
let nome = "", ra = 0, idade = 0, sexo = "", media = 0, resultado = "";
let arrayObj = [];

// -----------------------------------------
// REFERÊNCIAS DE ELEMENTOS
// -----------------------------------------
const infos = document.getElementById('infos');
const saida = document.getElementById('saidaInfos');
const fecharBtn = document.getElementById('fechar-btn');

// -----------------------------------------
// FUNÇÕES DE CADASTRO E VALIDAÇÃO
// -----------------------------------------

// Função para cadastrar um aluno
function cadastrar() {
    // Referências de elementos
    const inputNome = document.getElementById("nome");
    const inputRA = document.getElementById("ra");
    const inputIdade = document.getElementById("idade");
    const inputSexo = document.getElementById("sexo");
    const inputMedia = document.getElementById("media");
    const inputResultado = document.getElementById("resultado");

    // Obtem os valores dos inputs
    nome = inputNome.value.trim();
    ra = Number(inputRA.value.trim());
    idade = Number(inputIdade.value.trim());
    sexo = inputSexo.value.trim();
    media = parseFloat(inputMedia.value.trim());
    resultado = inputResultado.value.trim();

    // Limpa mensagens de erro e a marcação nas bordas
    mensagemFormulario.innerHTML = '';
    limparBordasErro();

    // Valida os dados do formulário
    if (nome === '') {
        mostrarMensagemFormulario("Preencha o campo do Nome!", inputNome, 'erro');
        return;
    }
    if (isNaN(ra) || ra <= 0 || ra.toString().length < 5) {
        mostrarMensagemFormulario("Preencha o RA corretamente!<br>(maior que 0 e com no mínimo 5 dígitos)", inputRA, 'erro');
        return;
    }
    if (isNaN(idade) || idade <= 0) {
        mostrarMensagemFormulario("Preencha a Idade corretamente! (maior que 0)", inputIdade, 'erro');
        return;
    }
    if (sexo === '') {
        mostrarMensagemFormulario("Selecione o Sexo!", inputSexo, 'erro');
        return;
    }
    if (isNaN(media) || media < 0 || media > 10) {
        mostrarMensagemFormulario("Preencha a Média corretamente! (entre 0 e 10)", inputMedia, 'erro');
        return;
    }
    if (resultado === '') {
        mostrarMensagemFormulario("Selecione o Resultado!", inputResultado, 'erro');
        return;
    }

    // Criação de um objeto com os dados
    let novoObjeto = {
        nome: nome,
        ra: ra,
        idade: idade,
        sexo: sexo,
        media: media,
        resultado: resultado
    };

    // Adiciona o novo aluno ao array de objetos
    arrayObj.push(novoObjeto);

    // Limpa todos os campos do formulário
    document.querySelectorAll('.input').forEach(input => input.value = '');

    // Mensagem de sucesso no cadastro
    let msg = `<p><strong>Aluno "${nome}" Cadastrado com Sucesso!!</strong></p>`
    mostrarMensagemFormulario(msg, null, 'sucesso');

    if(infos.style.display === 'block'){
        fecharInfos()
    }
}

// -----------------------------------------
// FUNÇÕES DE ORDENAÇÃO E FILTRAGEM
// -----------------------------------------

// Função de ordenação genérica usando o quickSort)
function ordenacao(vetor, chave, crescente = true) {
    quickSort(vetor, (elem1, elem2) => {
        const valor1 = elem1[chave];
        const valor2 = elem2[chave];

        // Verifica se é comparação de strings
        if (typeof valor1 === 'string' && typeof valor2 === 'string') {
            if (crescente) return valor2.localeCompare(valor1) <= 0;
            else return valor1.localeCompare(valor2) <= 0;
        } else {
            if (crescente) return valor1 > valor2;
            else return valor1 < valor2;
        }
    });
    return vetor;
}

// Função para ordenar por nome em ordem crescente e mostrar na tela
function ordenacaoNome() {
    let ordenadoNome = ordenacao(arrayObj, 'nome', true);
    mostrarArray("Relatório de Alunos em ordem crescente por Nome:", ordenadoNome);
}

// Função para ordenar por RA em ordem decrescente e mostrar na tela
function ordenacaoRA() {
    let ordenadoRA = ordenacao(arrayObj, 'ra', false);
    mostrarArray("Relatório de Alunos em ordem decrescente por RA:", ordenadoRA);
}

// Função de busca sequencial, filtra com base em uma função de comparação
function buscaSequencial(vetor, fnComp) {
    const resultado = [];
    for (let i = 0; i < vetor.length; i++) {
        if (fnComp(vetor[i])) resultado.push(vetor[i]);
    }
    return resultado;
}

// Função para comparar alunos aprovados
function compararAprovados(obj) {
    return obj.resultado.toLowerCase() === "aprovado";
}

// Função para ordenar por nome (crescente) e exibir apenas alunos aprovados
function ordenacaoAprovadosNome() {
    let ordenadoNome = ordenacao(arrayObj, 'nome', true);
    let ordenadoNomesAprovados = buscaSequencial(ordenadoNome, compararAprovados);
    mostrarArray("Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados:", ordenadoNomesAprovados);
}

// -----------------------------------------
// FUNÇÕES DE ORDENAÇÃO (ALGORITMO QUICKSORT)
// -----------------------------------------

// Função de ordenação quickSort
function quickSort(vetor, fnComp, ini = 0, fim = vetor.length - 1) {
    if (fim <= ini) return

    const pivot = fim
    let div = ini - 1

    for (let i = ini; i < fim; i++) {
        if (fnComp(vetor[pivot], vetor[i])) {
            div++
            if (div !== i) {
                [vetor[div], vetor[i]] = [vetor[i], vetor[div]]
            }
        }
    }

    div++

    if (fnComp(vetor[div], vetor[pivot]) && div !== pivot) {
        [vetor[div], vetor[pivot]] = [vetor[pivot], vetor[div]]
    }

    quickSort(vetor, fnComp, ini, div - 1)
    quickSort(vetor, fnComp, div + 1, fim)
}

// -----------------------------------------
// FUNÇÕES DE EXIBIÇÃO E INTERAÇÃO
// -----------------------------------------

// Função para exibir o array formatado
function mostrarArray(texto, array) {
    let conteudo = `<strong>${texto}</strong><br>`;

    // Verifica se o array está vazio
    if (array.length === 0) {
        conteudo += "<p>Nenhum dado encontrado.</p>";
    } else {
        array.forEach((item, index) => {
            conteudo += `
                <p><strong>Aluno ${index + 1}</strong></p>
                <p>Nome: ${item.nome}</p>
                <p>RA: ${item.ra}</p>
                <p>Idade: ${item.idade}</p>
                <p>Sexo: ${item.sexo}</p>
                <p>Média: ${item.media}</p>
                <p>Resultado: ${item.resultado}</p>
                <hr>
            `;
        });
    }

    // Mostra o array formatado na tela
    mostrarInfos(conteudo);
}

// Função para mostrar informações na tela
function mostrarInfos(texto = "Infos:") {
    saida.innerHTML = texto;
    infos.style.display = 'block';
    fecharBtn.style.display = 'inline';

}

// Função para fechar a exibição das informações
function fecharInfos() {
    infos.style.display = 'none';
    saida.innerHTML = '';
    fecharBtn.style.display = 'none';
}

// Função para exibir mensagens de erro e destacar campos inválidos
function mostrarMensagemFormulario(mensagem, input = null, tipo = 'erro') {
    const mensagemFormulario = document.getElementById('mensagemFormulario');
    // Definir a cor da mensagem com base no tipo (erro ou sucesso)
    if (tipo === 'erro') {
        mensagemFormulario.style.color = 'darkred';
        if (input !== null) {
            input.classList.add('erro');
            input.style.border = '2px solid darkred';
            input.focus();
        }
    } else if (tipo === 'sucesso') {
        mensagemFormulario.style.color = 'darkgreen';
        setTimeout(() => {
            mensagemFormulario.innerHTML = '';
        }, 3000);
    }

    // Mostrar a mensagem
    mensagemFormulario.innerHTML = mensagem;
}

// Função para limpar bordas dos campos
function limparBordasErro() {
    let inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        input.classList.remove('erro');
        input.style.border = '';
    });
}

// Função para configurar o foco nos inputs
function configurarFoco() {
    const inputs = document.querySelectorAll('.input');
    const cadastrarBtn = document.getElementById('cadastrarBtn');

    inputs[0].focus();

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();

                if (i < inputs.length - 1) {
                    inputs[i + 1].focus();
                } else {
                    cadastrarBtn.focus();
                }
            }
        });
    }

    cadastrarBtn.addEventListener('click', () => {
        let inputsErro = document.querySelectorAll('.input.erro');

        if (inputsErro.length > 0) {
            inputsErro[0].focus();
        } else  {
            inputs[0].focus();
        }
    });
}

// -----------------------------------------
// INICIALIZAÇÃO
// -----------------------------------------
function inicializar() {
    configurarFoco();
}

window.onload = inicializar;