import { Alert } from "react-native";
import { supabase } from "../client/inisSupabase";

export async function cadastrarUsuario(dados){
  if(dados === null){
    Alert.alert('O formulário está vazio!');
  }

  const {data, error} = await supabase.auth.signUp({
    email: dados.email,
    password: dados.password
  })

  if(error) Alert.alert(error.message);
  console.log(data);
}