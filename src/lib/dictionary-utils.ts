/**
 * Gera um link direto para o dicionário zdic.net para um caractere ou palavra específica.
 * Caso a entrada seja nula, indefinida ou vazia, retorna a página principal do site.
 * 
 * @param character O caractere chinês ou palavra para buscar.
 * @returns A URL parametrizada e codificada para o caractere no zdic.net.
 */
export function getZhongwenLink(character?: string | null): string {
  if (!character) {
    return 'https://zdic.net/';
  }
  return `https://zdic.net/hans/${encodeURIComponent(character)}`;
}
