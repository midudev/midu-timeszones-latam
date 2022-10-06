let titulo = document.querySelector('.titulo'),
    resultado = document.querySelector('.resultado'),
    idioma = document.querySelector('.idioma'),
    link = document.querySelectorAll('a'),
    resultadoPlaceholder = document.querySelector('.resultadoPlaceholder')

link.forEach(element => {
    element.addEventListener('click', () => {
        let attr = element.getAttribute("lenguaje")
        titulo.textContent = data[attr].titulo
        resultado.textContent = data[attr].resultado
        idioma.textContent = data[attr].idioma
        resultadoPlaceholder.textContent = data[attr].resultadoPlaceholder
    })
});

let data = {
    es: { titulo: "Selecciona una fecha y una hora:", resultado: "Resultado:", idioma: "Selecciona el idioma de tu preferencia", resultadoPlaceholder: "Aquí aparece el resultado..." },
    pt: { titulo: "Por favor, selecione data e hora:", resultado: "Resultado:", idioma: "Selecione o idioma de sua preferência", resultadoPlaceholder: "Aqui está o resultado..." },
    en: { titulo: "Please select date and hour:", resultado: "Result:", idioma: "Select your language preference", resultadoPlaceholder: "Here is the result..." },
    fr: { titulo: "Veuillez choisir la date et l'heure:", resultado: "Résultat:", idioma: "Sélectionnez votre langue préférée", resultadoPlaceholder: "Voici le résultat..." }
}