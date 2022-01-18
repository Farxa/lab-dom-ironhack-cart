// ITERATION 1

//const { product } = require("puppeteer");

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  //step 1: use DOM manipulation to get the elements that hold price and quantity
  const price = product.querySelector('.price span');
  // console.log(price);
  const quantity = product.querySelector('.quantity input');


  // step 2: extract the specific values from the previous elements (price and quantity)
  const priceValues = Number(price.innerHTML);
  //console.log(typeof priceValues);
  const quantityValues = quantity.value;

  // step 3 + 4:get the subtotal element using DOM manipulation then calculate the subtotal price
  let subtotalPrice = priceValues * quantityValues
  product.querySelector('.subtotal span').innerHTML = subtotalPrice;
  return subtotalPrice;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);
  // end of test
  let total = 0;
  
  // ITERATION 2
  const allProducts = document.getElementsByClassName('product');
  const allProductsArr = Array.from(allProducts);

 
  allProductsArr.forEach(function(product) {
    total += updateSubtotal(product); 
  })

  // ITERATION 3
  //get the totalPrice which is the sum of all subtotalPrices
  document.querySelector('#total-value span').innerHTML = total;

}

// ITERATION 4

function removeProduct(e) {
  const target = e.currentTarget;
  target.parentNode.parentNode.remove();

  calculateAll();
  
}

// ITERATION 5
function createProduct() {
  let productText = document.querySelector('.create-product input[type="text"]').value;
  let productNumber = document.querySelector('.create-product input[type="number"]').value;
  let productTable = document.querySelector('tbody');
  // let tableSection = document.querySelector('.product');
  let newRow = document.createElement('tr');
  newRow.classList.add('product');
  productTable.appendChild(newRow);
  newRow.innerHTML = ` <tr class="product">
  <td class="name">
    <span>${productText}</span>
  </td>
  <td class="price">$<span>${productNumber}</span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Quantity" />
  </td>
  <td class="subtotal">$<span>0</span></td>
  <td class="action">
    <button class="btn btn-remove">Remove</button>
  </td>
</tr>`
  calculateAll();
  removeButton();
  removeInputs();
}


window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  // Create Button
  const createButton = document.getElementById('create');
  createButton.addEventListener('click', createProduct);
  createButton.classList.add("btn")
  createButton.classList.add('btn-remove')
  removeButton();
});

function removeButton() {
  // Remove Button
  const removeButtons = document.querySelectorAll('.btn-remove');
  // console.log(removeButtons);
  for (let button of removeButtons) {
    console.log(button);
    button.addEventListener('click', removeProduct);
  }
}

function removeInputs() {
  document.querySelector('.create-product input[type="text"]').value = '';
  document.querySelector('.create-product input[type="number"]').value = 0;
}