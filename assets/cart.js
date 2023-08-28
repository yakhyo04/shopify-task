let form = document.getElementById('productsAllForm');
let cartDrawwer = document.querySelector('.cart-drawer');
const checkboxes = document.querySelectorAll(".variant-id");
let totalCount = 0;
let countInputs = document.querySelectorAll('.quantity-input');
console.log(countInputs.length)

function openCartDrawer() {
    document.querySelector(".cart-drawer").classList.add("cart-drawer--active");
  }
  
function closeCartDrawer() {
    document
    .querySelector(".cart-drawer")
    .classList.remove("cart-drawer--active");
}

checkboxes.forEach((checkbox, index) => {
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
        closeCartDrawer()
        alert("Please select 3, 6, or 12 products.")
    }
})