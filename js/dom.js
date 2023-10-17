function createCardEl(children) {
  return createElement({
    tag: "div",
    classList: ["card", "h-100"],
    children,
    childrenAction: "append",
  });
}

function creatImgEl(image) {
  return createElement({
    tag: "img",
    attributes: [{ prop: "src", value: image }],
    classList: ["card-img-top", "image__item"],
  });
}

function createCardBodyEl(children) {
  return createElement({
    tag: "div",
    classList: ["card-body"],
    children,
    childrenAction: "append",
  });
}

function createCardTopEl(children) {
  return createElement({
    tag: "div",
    classList: ["card-top"],
    children,
    childrenAction: "append",
  });
}

function createCardTitleEl(title) {
  return createElement({
    tag: "h5",
    classList: ["card-title"],
    textContent: title,
  });
}

function createCardTextEl(text) {
  return createElement({
    tag: "p",
    classList: ["card-text"],
    textContent: text,
  });
}

function createCardButtomEl(children) {
  return createElement({
    tag: "div",
    classList: ["card-buttom"],
    children,
    childrenAction: "append",
  });
}

function createCardPriceEl(price) {
  return createElement({
    tag: "p",
    attributes: [{ prop: "id", value: "price" }],
    classList: ["card-buttom__elem"],
    textContent: `Price: ${price}$`,
  });
}

function createCardRatingEl(rating) {
  return createElement({
    tag: "p",
    attributes: [{ prop: "id", value: "rating" }],
    classList: ["card-buttom__elem"],
    textContent: `Rating: ${rating}`,
  });
}

function createCardButtonEl(handlers) {
  return createElement({
    tag: "button",
    attributes: [{ prop: "type", value: "button" }],
    classList: ["btn", "btn-primary", "card-btn"],
    textContent: "Add to card",
    handlers,
  });
}

function createColItem(children) {
  return createElement({
    tag: "div",
    classList: ["col"],
    children,
    childrenAction: "append",
  });
}

// !creation of sidebar item

function createSidebarCard(children) {
  return createElement({
    tag: "div",
    classList: ["sidebar-card"],
    children,
    childrenAction: "append",
  });
}

function createSidebarCardLeftPart(children) {
  return createElement({
    tag: "div",
    classList: ["sidebar-card-left-part"],
    children,
    childrenAction: "append",
  });
}

function createSidebarImage(image) {
  return createElement({
    tag: "img",
    classList: ["sidebar-image"],
    attributes: [{ prop: "src", value: image }],
  });
}

function createSidebarItemName(name) {
  return createElement({
    tag: "p",
    classList: ["sidebar-item-name"],
    textContent: name,
  });
}

function createSidebarRightPart(children) {
  return createElement({
    tag: "div",
    classList: ["sidebar-card-right-part"],
    children,
    childrenAction: "append",
  });
}

function createSidebarBtnMinus(handlers) {
  return createElement({
    tag: "button",
    classList: ["btn", "btn-secondary", "sidebar-btn-minus"],
    textContent: "-",
    attributes: [{ prop: "disabled", value: null }],
    handlers,
  });
}

function createSidebarCuontityAndPrice(cuontity, price) {
  return createElement({
    tag: "button",
    classList: ["btn", "btn-primary", "sidebar-cuontity-and-price"],
    textContent: `${cuontity} x ${price}`,
  });
}

function createSidebarBtnPlus(handlers) {
  return createElement({
    tag: "button",
    classList: ["btn", "btn-secondary", "sidebar-btn-plus"],
    textContent: "+",
    handlers,
  });
}

function createSidebarBtnRemove(handlers) {
  return createElement({
    tag: "button",
    classList: ["btn", "btn-danger", "sidebar-btn-remove"],
    textContent: "Remove from order",
    handlers,
  });
}
