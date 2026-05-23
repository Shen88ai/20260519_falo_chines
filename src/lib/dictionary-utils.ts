/**
 * Gera um link direto para o dicionário etimológico Zhongwen.com para um caractere ou palavra específica.
 * Caso a entrada seja nula, indefinida ou vazia, retorna a página principal do site.
 * 
 * @param character O caractere chinês ou palavra para buscar.
 * @returns A URL parametrizada e codificada para busca no Zhongwen.com.
 */
export function getZhongwenLink(character?: string | null): string {
  if (!character) {
    return 'https://zhongwen.com/';
  }
  return `https://zhongwen.com/cgi-bin/zipfind.cgi?terms=${encodeURIComponent(character)}`;
}
