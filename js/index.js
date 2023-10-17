fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;

    const productList = document.querySelector(
      'div.row.row-cols-1.row-cols-md-4.g-4.cards__centered'
    );

    let counter = 0;

    products.forEach(() => {
      const productItem = createProductItem(products, counter);
      productList.append(productItem);
      counter++;
    });

    function createProductItem(array, counter) {
      const imgEl = creatImgEl(array[counter].thumbnail);
      const cardTitleEl = createCardTitleEl(array[counter].title);
      const cardTextEl = createCardTextEl(array[counter].description);
      const cardPriceEl = createCardPriceEl(array[counter].price);
      const cardRatingEl = createCardRatingEl(array[counter].rating);
      const cardButtonEl = createCardButtonEl([
        { event: 'click', handler: addToCart },
      ]);
      const cardButtomEl = createCardButtomEl([cardPriceEl, cardRatingEl]);
      const cardTopEl = createCardTopEl([cardTitleEl, cardTextEl]);
      const cardBodyEl = createCardBodyEl([
        cardTopEl,
        cardButtomEl,
        cardButtonEl,
      ]);
      const cardEl = createCardEl([imgEl, cardBodyEl]);
      const colItem = createColItem([cardEl]);

      return colItem;
    }

    searchProducts(products, productList, createProductItem);
  });
