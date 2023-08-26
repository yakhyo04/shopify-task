let form = document.getElementById('productsAllForm');

let carts = []
let variantsId = document.querySelector('.products__all--input:checked')

form.addEventListener('submit', async(e) => {
    let selectedVariants = [];
    const totalQuantity = 3;
    let variant_id = document.querySelectorAll('.products__all--input:checked')
    let variant_count = document.querySelector('.productQuantity')

    const cartItem = {
        id: Math.round(Math.random(10)*100)+1,
        quantity: 1,
        variants: selectedVariants
    }

    const selectVariants = (variantId) => {
        if(selectedVariants.length < totalQuantity){
            selectedVariants.push(variantId)
        }else{
            alert('total variants added')
        }
    }
    carts.push(cartItem)
    selectVariants(variant_id)
    console.log(carts)

    let formData = {
        'items': [
            {
                'id': variant_id.value,
                'quantity': variant_count.value
            }
        ]
    }

    await fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
            'Accept': `application/json`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
    }).then(res => {
        console.log(res)
        return res.json()
    })
    .catch((error) => {
        console.log('Error: ', error)
    })
})
