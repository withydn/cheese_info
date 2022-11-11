'use strict';

// 카트리스트 html 생성
const createList = (item) => {
  const itemBox = document.querySelector('.item-box');
  const list = document.createElement('li');
  list.setAttribute('id', `${item.id}`);
  list.innerHTML = `
    <div class="close-container" data-id=${item.id}>x</div>
    <div class='img-box'><img class='item-img' src=${item.url} alt=${item.title}/></div>
    <div class="title">${item.title}</div>
    <div class="price">${item.price}</div>
    <div class="quantity">${item.quantity}</div>
    <div class="sum">${item.price * item.quantity}</div>
  `;
  itemBox.appendChild(list);
};

// 리스트 비우기
const createEmptyList = () => {
  const totalbox = document.querySelector('.total');
  const totalElement = document.querySelector('.total-price');
  const itemBox = document.querySelector('.item-box');
  itemBox.innerHTML = ``;
  totalElement.textContent = `0 원`;
  totalbox.style.borderTop = '1px solid rgb(153,153,153)';
};

// 카트리스트 보여주기
const renderCartList = () => {
  const getStoredItems = JSON.parse(localStorage.getItem('cart'));

  if (getStoredItems === null) {
    createEmptyList();
  } else {
    const mapped = getStoredItems.map((item) => {
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
    createEmptyList();
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

      const listId = document.getElementById(`${dataId}`);
      listId.remove();
      getTotalPrice();
    })
  );
};

//실행
renderCartList();
getTotalPrice();
buttonBuyClick();
removeItem();
