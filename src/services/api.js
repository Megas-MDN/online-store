export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const resposta = await fetch(URL);
  const dados = await resposta.json();
  return dados;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL_QUERY = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const URL_CAT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const URL = (categoryId) ? URL_CAT : URL_QUERY;

  const resposta = await fetch(URL);
  const dados = await resposta.json();
  return dados;
}

export async function getProductById(id) {
  const URL = `https://api.mercadolibre.com/items/${id}`;

  const resposta = await fetch(URL);
  const dados = await resposta.json();
  return dados;
}
