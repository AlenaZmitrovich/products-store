//! products search

function searchProducts(arr, container, createProductItem) {
  const searchInput = document.querySelector(
    'input.form-control.header__input.header__button'
  );

  const searchButton = document.querySelector(
    'button.btn.btn-outline-success.header__button'
  );

  searchInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchButton.click();
    }
  });

  searchInput.addEventListener('input', getSearchInputValue);
  searchButton.addEventListener('click', showSearchedItem);

  let searchedProducts = [];
  let searchInputValue = '';

  function getSearchInputValue(event) {
    searchInputValue = event.target.value?.trim()?.toLowerCase();

    searchedProducts = arr.filter(
      (element) =>
        element.title?.toLowerCase().includes(searchInputValue) ||
        element.description?.toLowerCase().includes(searchInputValue)
    );
  }

  function showSearchedItem() {
    container.innerHTML = '';

    searchedProducts.forEach((product, index) => {
      const productItem = createProductItem(searchedProducts, index);
      container.append(productItem);
    });
  }
}

// ! creation of sidebar

const yourCartButton = document.querySelector(
  'button.btn.btn-success.header__button'
);
const sidebarHTML = document.querySelector('div.sidebar');
const closeModal = document.querySelector('div.closeModal');

yourCartButton.addEventListener('click', openSidebar);
closeModal.addEventListener('click', closeSidebar);

function openSidebar() {
  sidebarHTML.classList.remove('closed');
}

function closeSidebar() {
  sidebarHTML.classList.add('closed');
}

const sidebarContainer = document.querySelector('div.sidebar-container');
const sidebarCardContainer = document.querySelector(
  'div.sidebar-card-container'
);
const sidebarOrderButton = document.querySelector(
  'button.btn.btn-primary.sidebar-btn'
);
let totalPrice = 0;
let priceOfProduct = 0;
let cuontity = 0;

function addToCart(event) {
  const cardButton = event.target;
  const cardBody = cardButton.parentElement;
  const cardTitle = cardBody.querySelector('h5.card-title');

  const priceContent = cardBody.querySelector('#price').textContent.split(' ');
  priceContent.forEach((element) => {
    if (!Number.isNaN(parseFloat(element))) {
      totalPrice = totalPrice + parseFloat(element);
      showTotalPrice();
    }
  });

  if (!cardButton.classList.contains('clicked')) {
    const imageContent = cardBody.parentElement
      .querySelector('img.card-img-top.image__item')
      .getAttribute('src');

    const nameContent = cardTitle.textContent;

    cuontity = 1;

    getPriceOfProduct(priceContent);

    const sidebarItem = createSidebarItem(
      imageContent,
      nameContent,
      cuontity,
      priceOfProduct
    );
    sidebarCardContainer.append(sidebarItem);

    cardButton.classList.add('clicked');
  } else {
    const arrSidebarNames = document.querySelectorAll('p.sidebar-item-name');

    arrSidebarNames.forEach((name) => {
      if (name.textContent === cardTitle.textContent) {
        const sidebarMinusButton =
          name.parentElement.parentElement.querySelector(
            'button.btn.btn-secondary.sidebar-btn-minus'
          );

        sidebarMinusButton.removeAttribute('disabled');

        cuontity = name.parentElement.parentElement
          .querySelector('button.btn.btn-primary.sidebar-cuontity-and-price')
          .textContent.split(' ')[0];

        cuontity++;

        getPriceOfProduct(priceContent);

        const priceAndCuontity = name.parentElement.parentElement.querySelector(
          'button.btn.btn-primary.sidebar-cuontity-and-price'
        );

        priceAndCuontity.textContent = `${cuontity} x ${priceOfProduct}`;
      }
    });
  }
}

function createSidebarItem(image, name, cuontity, price) {
  sidebarContainer.classList.add('closed');
  sidebarCardContainer.classList.add('scroll');

  sidebarOrderButton.removeAttribute('disabled');

  const sidebarBtnRemove = createSidebarBtnRemove([
    { event: 'click', handler: removeFromOrder },
  ]);
  const sidebarBtnPlus = createSidebarBtnPlus([
    { event: 'click', handler: addOne },
  ]);
  const sidebarCuontityAndPrice = createSidebarCuontityAndPrice(
    cuontity,
    price
  );
  const sidebarBtnMinus = createSidebarBtnMinus([
    { event: 'click', handler: restOne },
  ]);
  const sidebarRightPart = createSidebarRightPart([
    sidebarBtnMinus,
    sidebarCuontityAndPrice,
    sidebarBtnPlus,
    sidebarBtnRemove,
  ]);
  const sidebarItemName = createSidebarItemName(name);
  const sidebarImage = createSidebarImage(image);
  const sidebarCardLeftPart = createSidebarCardLeftPart([
    sidebarImage,
    sidebarItemName,
  ]);
  const sidebarCard = createSidebarCard([
    sidebarCardLeftPart,
    sidebarRightPart,
  ]);
  return sidebarCard;
}

function removeFromOrder(event) {
  const arrCardTitles = document.querySelectorAll('h5.card-title');
  const sidebarCardEl = event.target.parentElement.parentElement;
  const sidebarName = sidebarCardEl.querySelector('p.sidebar-item-name');

  arrCardTitles.forEach((title) => {
    if (title.textContent === sidebarName.textContent) {
      const cardAddButton = title.parentElement.parentElement.querySelector(
        'button.btn.btn-primary.card-btn'
      );

      cardAddButton.classList.remove('clicked');
    }
  });

  sidebarCardEl.remove();

  findSidebarCuontityAndPrice();

  totalPrice = totalPrice - cuontity * priceOfProduct;

  showTotalPrice();

  let doesSidebarHaveChildern = sidebarCardContainer.firstElementChild;

  if (!doesSidebarHaveChildern) {
    sidebarContainer.classList.remove('closed');
    sidebarCardContainer.classList.remove('scroll');
    sidebarOrderButton.setAttribute('disabled', 'null');
  }
}

function addOne(event) {
  const sidebarButtonMinus = event.target.parentElement.querySelector(
    'button.btn.btn-secondary.sidebar-btn-minus'
  );
  sidebarButtonMinus.removeAttribute('disabled');

  findSidebarCuontityAndPrice();

  cuontity++;

  calculateTotalPrice();
}

function restOne(event) {
  const sidebarMinusBtn = event.target;

  findSidebarCuontityAndPrice();

  cuontity--;

  if (cuontity < 2) {
    sidebarMinusBtn.setAttribute('disabled', 'null');
  }

  calculateTotalPrice();
}

function findSidebarCuontityAndPrice() {
  cuontity = event.target.parentElement
    .querySelector('button.btn.btn-primary.sidebar-cuontity-and-price')
    .textContent.split(' ')[0];

  priceOfProduct = event.target.parentElement
    .querySelector('button.btn.btn-primary.sidebar-cuontity-and-price')
    .textContent.split(' ')[2];

  return cuontity, priceOfProduct;
}

function getPriceOfProduct(priceContent) {
  priceContent.forEach((element) => {
    if (!Number.isNaN(parseFloat(element))) {
      priceOfProduct = parseFloat(element);
    }
  });
  return priceOfProduct;
}

function showTotalPrice() {
  const sidebarPriceHTML = document.querySelector('p.sidebar-price');
  let totalPriceStyled = totalPrice.toFixed(2);
  yourCartButton.textContent = `Your cart - ${totalPriceStyled}$`;
  sidebarPriceHTML.textContent = `Total: ${totalPriceStyled}$`;
}

function calculateTotalPrice() {
  const cuontityAndPriceButtonEl = event.target.parentElement.querySelector(
    'button.btn.btn-primary.sidebar-cuontity-and-price'
  );

  cuontityAndPriceButtonEl.textContent = `${cuontity} x ${priceOfProduct}`;

  totalPrice = 0;

  const arrCuontityAndPriceElements = document.querySelectorAll(
    'button.btn.btn-primary.sidebar-cuontity-and-price'
  );

  arrCuontityAndPriceElements.forEach((element) => {
    cuontity = element.textContent.split(' ')[0];
    priceOfProduct = element.textContent.split(' ')[2];
    totalPrice = totalPrice + cuontity * priceOfProduct;
  });
  showTotalPrice();
}
