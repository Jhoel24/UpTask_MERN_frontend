const cambiarColorPrioridad = prioridad => {
    switch(prioridad){
        case 'Alta': 
            return 'text-red-500'
        case 'Media':
            return 'text-orange-500'
        case 'Baja':
            return 'text-green-500'
    }
}

export default cambiarColorPrioridad