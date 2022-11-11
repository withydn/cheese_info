import products from "../data/data.js";

// 아이템 리스트 생성
const createProducts = (product) => {
  const itemList = document.querySelector(".item-list");
  const article = document.createElement("article");

  article.classList.add("item-container");
  article.setAttribute("data-bs-toggle", "modal");
  article.setAttribute("data-bs-target", "#exampleModal");
  article.setAttribute("data-id", `${product.id}`);

  const element = `
  <div class="item-container-header">
    <img src=${product.url} alt="치즈" class="item-img" />
  </div>
  <div class="item-container-body">
    <h4 class="item-title">${product.title}</h4>
    <p class="item-price">${product.price} 원</p>
  </div>
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
  const modalTitle = document.querySelector(".modal-item-title");
  const modalPrice = document.querySelector(".modal-item-price");
  const modalCook = document.querySelector(".modal-item-cook");
  const modalKeep = document.querySelector(".modal-item-keep");
  const modalImg = document.querySelector(".modal-item-img");
  const btnBuy = document.querySelector(".buy-button");

  modalTitle.textContent = `${product.title} 치즈`;
  modalPrice.textContent = `${product.price} 원`;
  modalCook.textContent = `${product.text.cook}`;
  modalKeep.textContent = `${product.text.keep}`;

  modalImg.setAttribute("src", `${product.url}`);
  btnBuy.setAttribute("data-indexid", `${product.id}`);
};

// 상품 클릭 이벤트 (모달 보여주기)
const renderModal = () => {
  const articles = document.querySelectorAll("article");
  articles.forEach((article) => {
    article.onclick = (e) => {
      const selectedId = e.target.closest("article").dataset.id;
      const selectedProduct = products.find((product) => product.id === Number(selectedId));

      createModals(selectedProduct);
    };
  });
};

// 모달에서 장바구니 담기
const btnBuy = document.querySelector(".buy-button");
btnBuy.onclick = () => {
  const dataId = btnBuy.dataset.indexid;
  const item = products.find((product) => product.id === Number(dataId));
  const storedItems = JSON.parse(localStorage.getItem("cart"));

  if (storedItems === null) {
    localStorage.setItem(
      "cart",
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
      localStorage.setItem("cart", JSON.stringify(mapped));
    } else {
      localStorage.setItem(
        "cart",
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
  const options = document.querySelectorAll(".filter-item");
  const itemList = document.querySelector(".item-list");

  options.forEach((option) => {
    option.onclick = (e) => {
      options.forEach((item) => item.classList.remove("clicked"));
      e.target.classList.add("clicked");
      const selectedOption = e.target.textContent;
      itemList.innerHTML = "";

      if (selectedOption === "all") {
        setTimeRenderProducts(products);
      } else {
        const selectedProduct = products.filter((product) => product.type === selectedOption);
        setTimeRenderProducts(selectedProduct);
      }
    };
  });
};

const changeFliterStyle = () => {
  const options = document.querySelectorAll(".filter-item");
  options.forEach((option) => {
    option.onclick = (e) => {};
  });
};

// 실행
renderProducts(products);
filterChange();
renderModal();
