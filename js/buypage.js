import products from '../data/data.js';

// 아이템 리스트 생엉
const createProducts = (product) => {
  const itemList = document.querySelector('.item-list');
  const article = document.createElement('article');

  article.classList.add('buy-container');
  article.setAttribute('data-bs-toggle', 'modal');
  article.setAttribute('data-bs-target', '#exampleModal');
  article.setAttribute('data-id', `${product.id}`);

  const element = `
  <img src=${product.url} alt="치즈" class="img img-box" />
  <h4 class="text-center">${product.title}</h4>
  <h3 class="text-center">${product.price}원</h3>
  `;

  article.innerHTML = element;
  itemList.appendChild(article);
};

// 아이템 리스트 랜더링
const renderProducts = (products) => {
  products.forEach((product) => createProducts(product));
};

// 모달 내용 입력
const createModals = (product) => {
  const modalTitle = document.querySelector('.modal-product-title');
  const modalPrice = document.querySelector('.modal-product-price');
  const modalCook = document.querySelector('.modal-product-cook');
  const modalKeep = document.querySelector('.modal-product-keep');
  const modalImg = document.querySelector('.img-box2');
  const btnBuy = document.querySelector('.buy-button');

  modalTitle.textContent = `${product.title}`;
  modalPrice.textContent = `${product.price}원`;
  modalCook.textContent = `${product.text.cook}`;
  modalKeep.textContent = `${product.text.keep}`;

  modalImg.setAttribute('src', `${product.url}`);
  btnBuy.setAttribute('data-indexid', `${product.id}`);
};

// 상품 클릭 이벤트 (모달 보여주기)
const renderModal = () => {
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    article.onclick = (e) => {
      const selectedId = e.target.closest('article').dataset.id;
      const selectedProduct = products.find((product) => product.id === Number(selectedId));

      createModals(selectedProduct);
    };
  });
};

// 모달에서 장바구니 담기
const btnBuy = document.querySelector('.buy-button');
btnBuy.onclick = () => {
  const dataId = btnBuy.dataset.indexid;
  const item = products.find((product) => product.id === Number(dataId));
  const storedItems = JSON.parse(localStorage.getItem('cart'));

  if (storedItems === null) {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: item.id, price: item.price, title: item.title, url: item.url, quantity: 1 }])
    );
  } else {
    const condition = storedItems.find((storeItem) => storeItem.id === item.id);
    if (condition) {
      const mapped = storedItems.map((storedItem) => {
        if (storedItem.id === item.id) {
          return {
            ...storedItem,
            quantity: storedItem.quantity + 1,
          };
        } else {
          return storedItem;
        }
      });
      localStorage.setItem('cart', JSON.stringify(mapped));
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([
          ...storedItems,
          { id: item.id, price: item.price, title: item.title, url: item.url, quantity: 1 },
        ])
      );
    }
  }
};

// 필터 선택시 250ms 후 아이템 보여주기
const setTimeRenderProducts = (items) => {
  setTimeout(() => {
    renderProducts(items);
    renderModal();
  }, 250);
};

// 아이템 필터 적용
const filterChange = () => {
  const options = document.querySelectorAll('.filter-item');
  const itemList = document.querySelector('.item-list');

  options.forEach((option) => {
    option.onclick = (e) => {
      const selectedOption = e.target.textContent;
      itemList.innerHTML = '';

      if (selectedOption === 'all') {
        setTimeRenderProducts(products);
      } else {
        const selectedProduct = products.filter((product) => product.type === selectedOption);
        setTimeRenderProducts(selectedProduct);
      }
    };
  });
};

// 실행
renderProducts(products);
filterChange();
renderModal();
