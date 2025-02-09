import Car, { ICar } from "../model/car"
async function getCar(id: string){
    const carDoc = await Car.findById(id)
    return carDoc
}

async function createCar(car: ICar){
    const carDoc = await Car.create(car)
    return carDoc
}

export { 
    getCar,
    createCar
}