const steps = ['1', '2', '3']

const swalQueueStep = Swal.mixin({
    confirmButtonText: 'Continuar',
    cancelButtonText: 'Atrás',
    progressSteps: steps,
    input: 'text',
    inputAttributes: {
        required: true
    },
    validationMessage: 'Campo requerido'
})

async function backAndForth() {
    const values = [];
    let currentStep;
    
    for (currentStep = 0; currentStep < steps.length;) {
        const result = await swalQueueStep({
            title: 'Paso ' + steps[currentStep],
            inputValue: values[currentStep],
            showCancelButton: currentStep > 0,
            currentProgressStep: currentStep
        })
    
        if (result.value) {
            values[currentStep] = result.value
            currentStep++
        } else if (result.dismiss === 'cancel') {
            currentStep--
        }
    }
    Swal(JSON.stringify(values))
}

backAndForth()
