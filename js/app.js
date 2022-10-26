document.addEventListener('DOMContentLoaded',() =>{

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const formulario = document.querySelector('#formulario')
    const inputEmail = document.querySelector('#email')
    const inputCc = document.querySelector('#cc')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    inputEmail.addEventListener('input',validar)
    inputCc.addEventListener('input',validarCc)
    inputAsunto.addEventListener('blur',validar)
    inputMensaje.addEventListener('blur',validar)

    formulario.addEventListener('submit',enviarEmail)

    btnReset.addEventListener('click', (e)=>{
        e.preventDefault()
        resetFormulario()
    })

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = ''
            comprobarEmail()
            return
        }
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement)
            email[e.target.name] =''
            comprobarEmail()
            return
        }
        limpiarAlerta(e.target.parentElement)
        email[e.target.name] = e.target.value.trim().toLowerCase()
        comprobarEmail()
    }

    function validarCc(e) {
        if (e.target.value.trim() === '') {
            limpiarAlerta(e.target.parentElement)
            email[e.target.name] =''
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled = false
            return
        }
        if (e.target.id === 'cc' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement)
            email[e.target.name] =''
            comprobarEmail()
            return
        }
        limpiarAlerta(e.target.parentElement)
        email[e.target.name] = e.target.value.trim().toLowerCase()
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)
        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600','text-white','p-2','text-center','alerta')
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.alerta')
        if (alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return
        }

        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false
    }

    function enviarEmail(e) {
        e.preventDefault()
        spinner.classList.add('flex')
        spinner.classList.remove('hidden')
        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')
            resetFormulario()

            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase')
            alertaExito.textContent= "Mensaje enviado Correctamente"
            formulario.appendChild(alertaExito)

            setInterval(() => {
                alertaExito.remove()
            }, 2000);
        }, 3000);
    }

    function resetFormulario() {
        email.email= ''
        email.asunto= ''
        email.mensaje= ''
        formulario.reset()
        comprobarEmail()
        quitarAlertar()
    }

    function quitarAlertar() {
        const alertas = document.querySelectorAll('.alerta')
        if (alertas.length > 0) {
            alertas.forEach(e => {
                e.remove()
            });
        }
    }

})

