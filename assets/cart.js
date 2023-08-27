let form = document.getElementById('productsAllForm');
let cartDrawwer = document.querySelector('.cart-drawer');
let carts = []

function getSelectedQuantity2() {
    var radios = document.querySelectorAll(".quantity-radio");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return parseInt(radios[i].value, 10);
      }
    }
    return null;
  }

  var selectedQuantity2 = getSelectedQuantity2();

// Get all input elements with class "myCheckbox"
const checkboxes2 = document.querySelectorAll(".products__all--input");

// Iterate through the checkboxes2
checkboxes2.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
    const parentDiv = this.closest(".product-item");
    if (this.checked) {
      parentDiv.style.border = "1px solid #000"; // Change color when checkbox is checked
    } else {
      parentDiv.style.border = "1px solid transparent"; // Change color back when checkbox is unchecked
    }
  });
});

form.addEventListener('submit', (e) => {
var productCheckboxes  = document.querySelectorAll('.variant-id');
var quantityInputs = document.querySelectorAll('.quantity-input');
var productsToAdd = [];
var totalQuantity = 0;

productCheckboxes.forEach(function(checkbox, index) {
    if (checkbox.checked) {
      var variantId = checkbox.value;
      var quantity = parseInt(quantityInputs[index].value, 10);
     
      if (!isNaN(quantity) && quantity > 0) {
        totalQuantity += quantity;
        productsToAdd.push({ id: variantId, quantity: quantity });
      }
    }
  });

  function getSelectedQuantity() {
    var radios = document.querySelectorAll(".quantity-radio");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return parseInt(radios[i].value, 10);
      }
    }
    return null;
  }

  var selectedQuantity = getSelectedQuantity();

  if (totalQuantity === selectedQuantity) {
    var requestOptions = {
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

// form.addEventListener('submit', async(e) => {
//     // let selectedVariants = [];
//     // const totalQuantity = 3;
//     // let variant_id = document.querySelector('.products__all--input:checked')
//     // let variant_count = document.querySelector('.productQuantity')

//     // const cartItem = {
//     //     'items': [
//     //         {
//     //             id: Math.round(Math.random(10)*100)+1,
//     //             quantity: 1,
//     //             variants: selectedVariants
//     //         }
//     //     ]}
//     // carts.push(cartItem)
//     // const selectVariants = (variantId)=>{
//     //     if(selectedVariants.length<totalQuantity){
//     //         selectedVariants.push(variantId)
//     //     }else{
//     //         alert('total variants added')
//     //         // activateAddToCard()
//     //     }
//     // }
//     // selectVariants(variant_id)
//     // console.log(carts)
//     var productItems = document.querySelectorAll(".product-item");
//       var productsToAdd = [];

//       productItems.forEach(function(productItem) {
//         var variantId = productItem.querySelector(".variant-id").value;
//         var quantityInput = productItem.querySelector(".quantity-input");
//         var quantity = parseInt(quantityInput.value, 10);

//         if (!isNaN(quantity) && quantity > 0) {
//           productsToAdd.push({ id: variantId, quantity: quantity });
//         }
//       });
//     // let formData = {
//     //     'items': [
//     //         {
//     //             'id': variant_id.value,
//     //             'quantity': variant_count.value
//     //         }
//     //     ]
//     // }

//     await fetch(window.Shopify.routes.root + 'cart/add.js', {
//         method: 'POST',
//         headers: {
//             Accept: "application/json",
//             'Content-Type': 'application/json'
//         },
//         body: productsToAdd
//     }).then(res => {
//         console.log(res)
//         return res.json()
//     })
//     .catch((error) => {
//         console.log('Error: ', error)
//     })
// })