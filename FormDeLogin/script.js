const fields = document.querySelectorAll("[required]");

function validateField(field) {
    //Verificar os erros
    function verifyError() {
        let foundError = false;

        for (let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid) {
                foundError = error;
            };
        };

        return foundError;
    };

    //Customizar Mensagem
    function customMessage (typeError){
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Por favor, preencha este campo",
                typeMismatch: "Por favor, preencha um email válido"
            }
        };

        return messages[field.type][typeError];
    };

    //Setar a custom message

    function setCustomMessage (message) {
        const spamError = field.parentNode.querySelector("span.error");

        if (message) {
            spamError.classList.add("active");
            spamError.innerHTML = message;
        } else {
            spamError.classList.remove("active");
            spamError.innerHTML = "";
        };
    };

    return function() {
        const error = verifyError();

        if(error){
            const message = customMessage(error);

            field.style.borderColor = "red";
            setCustomMessage(message);
        } else {
            field.style.borderColor = "green";
            setCustomMessage();
        };
    };
};


function customValidation(event) {
    const field = event.target;
    const validation = validateField(field);

    validation();
}


for (let field of fields) {
    field.addEventListener("invalid", event => {
        event.preventDefault();
        customValidation();
    })
    field.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
});