import products from '../data/data.js';

// 아이템 리스트 생성 함수
const renderProducts = (products) => {
  products.forEach((product) => {
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
  });
};

// 모달 내용 입력
const renderModals = (product) => {
  const modalTitle = document.querySelector('.modal-product-title');
  const modalPrice = document.querySelector('.modal-product-price');
  const modalCook = document.querySelector('.modal-product-cook');
  const modalKeep = document.querySelector('.modal-product-keep');
  const modalImg = document.querySelector('.img-box2');

  modalTitle.textContent = `${product.title}`;
  modalPrice.textContent = `${product.price}원`;
  modalCook.textContent = `${product.text.cook}`;
  modalKeep.textContent = `${product.text.keep}`;
  modalImg.setAttribute('src', `${product.url}`);
};

// 상품 클릭하면 모달 내용 생성 후 보여주기
const getId = () => {
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    article.onclick = (e) => {
      const modalContainer = document.querySelector('.modal-container');
      const dataId = e.target.closest('article').dataset.id;
      const clickedItem = products.find((product) => product.id === Number(dataId));
      renderModals(clickedItem);
    };
  });
};

// 필터 선택시 250ms 후 내용 보여주기
const setTimeRender = (items) => {
  setTimeout(() => {
    renderProducts(items);
    getId();
  }, 250);
};

// 아이템 필터에 설정 함수
const filterChange = () => {
  const filterOptions = document.querySelectorAll('.filter-item');
  const itemList = document.querySelector('.item-list');

  filterOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      const value = e.target.textContent;
      if (value === 'all') {
        itemList.innerHTML = '';
        setTimeRender(products);
      } else {
        itemList.innerHTML = '';
        const selected = products.filter((item) => item.type === value);
        setTimeRender(selected);
      }
    });
  });
};

// 초기 실행
renderProducts(products);
filterChange();
getId();
