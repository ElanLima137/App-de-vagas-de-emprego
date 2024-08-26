import { supabase } from '../client/inisSupabase';

/**
 * Função para fazer upload de um currículo para o Supabase.
 * @param {Uint8Array} pdf - O conteúdo do PDF a ser enviado.
 * @returns {Promise} - Uma Promise que resolve com os dados do upload ou rejeita com um erro.
 */
export async function uploadCurriculo(pdf) {
    try {
        console.log('Iniciando upload do currículo...');

        const { data, error } = await supabase
            .storage
            .from('curriculo')
            .upload('nome_do_arquivo.pdf', pdf, {
                cacheControl: '3600', // opcional
                contentType: 'application/pdf' // opcional
            });

        if (error) {
            console.error('Erro durante o upload do currículo:', error.message);
            throw error;
        }

        console.log('Upload bem sucedido:', data);
        return data; // Retorna os dados do upload
    } catch (error) {
        console.error('Erro ao fazer upload do currículo:', error.message);
        throw error; // Rejeita a Promise com o erro
    }
}
