import products from '../data/data.js';

console.log(products);

const renderProducts = (products) => {
  products.forEach((product) => {
    const itemList = document.querySelector('.item-list');
    const article = document.createElement('article');
    article.classList.add('buy-container');
    article.setAttribute('data-bs-toggle', 'modal');
    article.setAttribute('data-bs-target', '#exampleModal');
    const element = `
    <img src="./치즈01.jpg" alt="치즈" class="img img-box" />
    <h4 class="text-center">${product.title}</h4>
    <h3 class="text-center">${product.price}원</h3>
    `;
    article.innerHTML = element;
    itemList.appendChild(article);
  });
};

renderProducts(products);

const filterChange = () => {
  const filterOptions = document.querySelectorAll('.filter-item');
  const itemList = document.querySelector('.item-list');

  filterOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      const value = e.target.textContent;
      if (value === 'all') {
        itemList.innerHTML = '';
        renderProducts(products);
      } else {
        itemList.innerHTML = '';
        const selected = products.filter((item) => item.type === value);
        renderProducts(selected);
      }
    });
  });
};
filterChange();
