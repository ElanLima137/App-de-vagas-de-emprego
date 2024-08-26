export async function validateCpf(cpf) {
    if (cpf.length !== 11) {
        return {erro: true, msg: 'Tamanho do cpf inválido'};
    }

    arr = []; //cpf array 
    for (i = 0; i< 11; i++){
      if(isNaN(cpf[i])){
        return {erro: true, msg: 'Valor do cpf deve ser numérico'}
      }
        arr[i] = parseInt(cpf[i]);
    }

    arr_digits = [arr[9], arr[10]]; // original array digits
    val_digits = [0, 0]; //algoritm digits 

    end = 9;
    mul = 10;
    result = 0;

    for(i = 0; i < end; i++){
        result +=arr[i] * mul;
        mul--;
    }
    result = result % 11;

    if (result < 2){
        val_digits[0] = 0;
    }else{
        val_digits[0] = 11 - result;
    }

    end = 10;
    mul = 11;
    result = 0;

    arr[9] = val_digits[0];
    
    for(i = 0; i < end; i++){
        result += arr[i] * mul;
        mul--;
    }
    result = result % 11;

    if (result < 2){
        val_digits[1] = 0;
    }else{
        val_digits[1] = 11 - result;
    }

    valido = arr_digits[0] === val_digits[0] && arr_digits[1] === val_digits[1];
    if(!valido){
      return {erro: true, msg: 'Digitos inválidos'};
    }
    return {erro: false}
}