// Variáveis globais
let canvas = document.getElementById("graficoIMC");
let ctx = canvas.getContext("2d");
let alturaInput = document.getElementById("altura");
let pesoInput = document.getElementById("peso");
let calcularBtn = document.getElementById("calcularBtn");
let limparBtn = document.getElementById("limparBtn");
let resultadoDiv = document.getElementById("resultado");

// Função para calcular IMC e riscos à saúde
function calcularIMC() {
    let altura = parseFloat(alturaInput.value);
    let peso = parseFloat(pesoInput.value);

    if (isNaN(altura) || isNaN(peso)) {
        alert("Por favor, insira valores válidos para altura e peso.");
        return;
    }

    let imc = peso / (altura * altura);
    let imcData = [imc.toFixed(2)];

    // Exibir resultado do IMC e avaliação de riscos à saúde
    let resultado = `Seu IMC é: ${imc.toFixed(2)}. `;
    if (imc < 18.5) {
        resultado += "Você está abaixo do peso. Isso pode indicar desnutrição ou outros problemas de saúde. ";
    } else if (imc < 24.9) {
        resultado += "Seu peso está dentro da faixa saudável. Continue assim! ";
    } else if (imc < 29.9) {
        resultado += "Você está com sobrepeso. Isso pode aumentar o risco de problemas de saúde. ";
    } else if (imc < 34.9) {
        resultado += "Você está com obesidade grau 1. Isso pode aumentar o risco de doenças cardiovasculares. ";
    } else if (imc < 39.9) {
        resultado += "Você está com obesidade grau 2. Isso pode aumentar significativamente o risco de doenças graves. ";
    } else {
        resultado += "Você está com obesidade grau 3 (mórbida). Isso pode levar a sérios problemas de saúde e requer intervenção médica urgente. ";
    }

    // Dicas de saúde e bem-estar
    resultado += "\n\nDicas de saúde e bem-estar:\n";
    if (imc < 18.5) {
        resultado += "- Consuma alimentos ricos em nutrientes e calorias para aumentar o peso de forma saudável.\n";
        resultado += "- Consulte um nutricionista para orientações específicas sobre dieta e suplementos.";
    } else if (imc < 24.9) {
        resultado += "- Continue mantendo uma dieta equilibrada e praticando atividades físicas regularmente.\n";
        resultado += "- Faça exames de saúde regulares para monitorar seu estado de saúde.";
    } else {
        resultado += "- Priorize uma alimentação saudável, com foco em vegetais, frutas, proteínas magras e carboidratos integrais.\n";
        resultado += "- Inicie um programa de exercícios regularmente e consulte um profissional de saúde para orientações adicionais.";
    }

      // Avaliação de outros fatores de risco à saúde
    resultado += "\n\nOutros fatores de risco à saúde:\n";
    let idade = parseInt(prompt("Qual é a sua idade?"));
    let historicoFamiliar = prompt("Você tem histórico familiar de doenças crônicas? (sim/não)").toLowerCase();
    let tabagismo = prompt("Você é fumante? (sim/não)").toLowerCase();
    let consumoAlcool = prompt("Você consome álcool regularmente? (sim/não)").toLowerCase();

    if (idade >= 40) {
        resultado += "- Idade avançada: Pessoas com mais de 40 anos têm maior risco de desenvolver doenças crônicas. ";
    }
    if (historicoFamiliar === "sim") {
        resultado += "- Histórico familiar de doenças crônicas: Ter parentes de primeiro grau com doenças crônicas aumenta o risco de desenvolver essas doenças. ";
    }
    if (tabagismo === "sim") {
        resultado += "- Tabagismo: Fumar aumenta significativamente o risco de várias doenças, incluindo câncer, doenças cardíacas e respiratórias. ";
    }
    if (consumoAlcool === "sim") {
        resultado += "- Consumo excessivo de álcool: O consumo regular e excessivo de álcool pode levar a uma série de problemas de saúde, incluindo doenças hepáticas, cardiovasculares e mentais. ";
    }

    // Exibir resultado e avaliação de outros fatores de risco à saúde
    resultadoDiv.textContent = resultado;

    // Ativar a exibição do gráfico
    canvas.style.display = "block";

    // Desenhar o gráfico
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Seu IMC'],
            datasets: [{
                label: 'IMC',
                data: imcData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 90 // Definir um limite superior maior para o eixo Y
                    }
                }]
            }
        }
    });
}

// Função para limpar campos
function limparCampos() {
    alturaInput.value = "";
    pesoInput.value = "";
    resultadoDiv.textContent = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
}

// Adicione listeners de eventos aos botões
calcularBtn.addEventListener("click", calcularIMC);
limparBtn.addEventListener("click", limparCampos);
