async function connectWithRetry(
  connectionFunction: () => void,
  retries: number = 5,
  interval: number = 5000
) {
    for( let i =  0; i < retries; i++){
        try {
            await connectionFunction()
            return 
        } catch (error) {
            console.error(`Erro ao tentar conectar. Tentativa:${i}. Causa: ${error}`)
            if(i < retries -1){
                console.log(`Nova tentativa em ${interval / 1000} segundos.`)
                await new Promise(resolve => setTimeout(resolve, interval))
            } else {
                throw new Error(`Não foi possível conectar após ${retries} tentativas.`)
            }
        }
    }
}

export { connectWithRetry };
