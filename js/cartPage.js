'use strict';

// element 생성
const createList = (item) => {
  const itemBox = document.querySelector('.item-box');
  const tr = document.createElement('tr');
  tr.setAttribute('id', `${item.id}`);
  tr.classList.add('cartItem');
  tr.innerHTML = `
    <td class="title">${item.title} 치즈</td>
    <td class="quantity">
    <i class="fa-regular fa-square-minus btn-minus"></i>
    <span>${item.quantity}</span>
    <i class="fa-regular fa-square-plus btn-plus"></i>
    </td>
    <td><span class="price">${item.price}</span></td>
    <td><i data-id=${item.id} class="fa-solid fa-trash-can close-container"></i></td>
  `;
  itemBox.appendChild(tr);

  addItemClick();
  minusItemClick();
  removeItem();
  getTotalPrice();
};

// element 제거
const deleteList = (selectedId) => {
  const listId = document.getElementById(selectedId);
  listId.remove();
  getTotalPrice();
};

// empty list
const createEmptyList = () => {
  const totalPrice = document.querySelector('.total-price');
  const itemBox = document.querySelector('.item-box');
  const cartItems = document.querySelectorAll('.cartItem');
  cartItems.forEach((cartItem) => itemBox.removeChild(cartItem));
};

// 카트리스트 보여주기
const renderCartList = () => {
  const getStoredItems = JSON.parse(localStorage.getItem('cart'));
  if (getStoredItems === null) {
    createEmptyList();
  } else {
    getStoredItems.forEach((item) => {
      createList(item);
    });
  }
};

// total 가격 구하기
const getTotalPrice = () => {
  const totalElement = document.querySelector('.total-price');
  const getStoredItems = JSON.parse(localStorage.getItem('cart'));

  if (getStoredItems !== null) {
    const totalPrice = getStoredItems.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
    totalElement.textContent = `${totalPrice} 원`;
  } else {
    totalElement.textContent = `0 원`;
  }
};

// 구매하기 이벤트
const buttonBuyClick = () => {
  const btnbuy = document.querySelector('.btn-buy');
  btnbuy.addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('cart')) === null) {
      alert('상품을 담아주세요');
    } else {
      alert('구매완료');
      localStorage.setItem('cart', null);
      renderCartList();
      getTotalPrice();
    }
  });
};

// 아이템 제거
const removeItem = () => {
  const btnRemove = document.querySelectorAll('.close-container');
  btnRemove.forEach((item) =>
    item.addEventListener('click', (e) => {
      const storedItem = JSON.parse(localStorage.getItem('cart'));
      const dataId = e.target.dataset.id;
      const filteredItem = storedItem.filter((item) => item.id !== Number(dataId));

      if (filteredItem.length === 0) {
        console.log('click1');
        localStorage.setItem('cart', null);
      } else {
        console.log('click2');
        localStorage.setItem('cart', JSON.stringify(filteredItem));
      }
      deleteList(dataId);
    })
  );
};

// order-date
const createOrderDate = () => {
  const calendar = new Date();
  const currentYear = calendar.getFullYear();
  const currentMonth = calendar.getMonth() + 1;
  const currentDate = calendar.getDate();
  const orderDate = document.querySelector('.order-date');
  orderDate.textContent = `${currentMonth} / ${currentDate} / ${currentYear}`;
};

// couter
const addItemClick = () => {
  const btnPlus = document.querySelectorAll('.btn-plus');
  btnPlus.forEach((btn) => {
    btn.onclick = (e) => {
      const dataId = e.target.closest('tr').id;
      const storedItems = JSON.parse(localStorage.getItem('cart'));

      const itemList = storedItems.map((storedItem) => {
        if (storedItem.id === Number(dataId)) {
          return {
            ...storedItem,
            quantity: storedItem.quantity + 1,
          };
        } else {
          return storedItem;
        }
      });
      localStorage.setItem('cart', JSON.stringify(itemList));
      createEmptyList();
      renderCartList();
    };
  });
};

const minusItemClick = () => {
  const btnPlus = document.querySelectorAll('.btn-minus');
  btnPlus.forEach((btn) => {
    btn.onclick = (e) => {
      const dataId = e.target.closest('tr').id;
      const storedItems = JSON.parse(localStorage.getItem('cart'));

      const itemList = storedItems.map((storedItem) => {
        if (storedItem.id === Number(dataId)) {
          if (storedItem.quantity - 1 === 0) {
            return storedItem;
          }
          return {
            ...storedItem,
            quantity: storedItem.quantity - 1,
          };
        } else {
          return storedItem;
        }
      });

      localStorage.setItem('cart', JSON.stringify(itemList));
      createEmptyList();
      renderCartList();
    };
  });
};

//실행
createOrderDate();
renderCartList();
getTotalPrice();
buttonBuyClick();
