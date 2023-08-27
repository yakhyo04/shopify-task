let form = document.getElementById('productsAllForm');
let cartDrawwer = document.querySelector('.cart-drawer');
let carts = []

function getSelectedQuantity2() {
    let radios = document.querySelectorAll(".quantity-radio");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return parseInt(radios[i].value, 10);
      }
    }
    return null;
  }

  let selectedQuantity2 = getSelectedQuantity2();

    const checkboxes2 = document.querySelectorAll(".variant-id");
    let totalCount = 0;
    let countInputs = document.querySelectorAll('.quantity-input');
    checkboxes2.forEach((checkbox, index) => {
        checkbox.addEventListener("change", function() {
        const parentDiv = this.closest(".product-item");
        if(this.checked){
            parentDiv.style.border = "1px solid #000";
            var count = parseInt(countInputs[index].value, 10);
            if (!isNaN(count) && count > 0) {
                totalCount += count;
            }
        }else{
            parentDiv.style.border = "1px solid transparent";
        }
    });
    });

console.log(totalCount)

form.addEventListener('submit', (e) => {
let productCheckboxes  = document.querySelectorAll('.variant-id');
let quantityInputs = document.querySelectorAll('.quantity-input');
let productsToAdd = [];
let totalQuantity = 0;

productCheckboxes.forEach(function(checkbox, index) {
    if (checkbox.checked) {
      let variantId = checkbox.value;
      let quantity = parseInt(quantityInputs[index].value, 10);
     
      if (!isNaN(quantity) && quantity > 0) {
        totalQuantity += quantity;
        productsToAdd.push({ id: variantId, quantity: quantity });
      }
    }
  });

  function getSelectedQuantity() {
    let radios = document.querySelectorAll(".quantity-radio");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return parseInt(radios[i].value, 10);
      }
    }
    return null;
  }

  let selectedQuantity = getSelectedQuantity();

  console.log(totalQuantity)

  if (totalQuantity === selectedQuantity) {
    let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: productsToAdd }),
        };
        
        fetch('/cart/add.js', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Items added:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  } else {
    alert("Please select 3, 6, or 12 products.");
  }
})