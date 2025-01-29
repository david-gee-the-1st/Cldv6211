/*
 (LearningAxis, 2022)
*/

const product = [
    {
        id: 0,
        image: 'https://cdn.shopify.com/s/files/1/2690/0106/files/Clay_Cup2.jpg?v=1632544385.jpg',
        title: 'LongPi Pottery Cup',
        price: 75
        
    },

    {
        id: 1,
        image:'https://cdn.shopify.com/s/files/1/2690/0106/files/Handmade_Box2.jpg?v=1632549443.jpg',
        title: 'Sabai Baskets',
        price: 299

    },

    {
        id: 2,
        image:'https://cdn.shopify.com/s/files/1/2690/0106/files/DSC04066.jpg?v=1632551880.jpg',
        title: 'Banjara Wooden Cup',
        price: 149
    }
];

const categories = [...new Set(product.map((item) => {return item}))]
    let i = 0;
    /*debugger;*/
    /*const roots = document.getElementsByClassName('root');*/
    document.getElementById('root').innerHTML = categories.map((item) =>
    {
        var{image,title,price} = item;
        return(
            `<div class='product-item'>
                <div class='box'>
                    <div class='img-box'>
                        <img class='images' src='${image}' />
                    </div>
                </div>
                <div class='bottom'>
                <p>${title}</p> 
                <h2>${parseFloat(price).toFixed(2)}</h2>
                <button onclick='addtocart("${i++}")'>Add to cart</button>
                </div>
            </div>`  
            
        )

        
    }).join('')

    var cart = [];

    function addtocart(a){
        cart.push({...categories[a]});
        displaycart();
    }

    function delElement(a){
        cart.splice(a, 1);
        displaycart();
    }
    

    function displaycart(a){
        let j = 0;
        total=0;
        document.getElementById("count").innerHTML=cart.length;
        if(cart.length == 0)
            {
                document.getElementById('cart-item').innerHTML = "Your cart is empty";
                document.getElementById("total").innerHTML = "R "+0+".00";
            }
            else
            {
                document.getElementById('cart-item').innerHTML = cart.map((items) =>
                {
                    var{image,title,price} = items;
                    total=total+price;
                    document.getElementById("total").innerHTML = "R "+total+".00";
                    return(
                        `<div class='cart-item'>
                        <div class='row-img'>
                            <img class='rowimg' src=${image}>
                        </div>
                        <p style='font-size:12px;'>${title}</p>
                        <h2 style='font-size: 15px;'>R ${parseFloat(price).toFixed(2)}</h2>`+
                        "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
                    );
                }).join('');
                }  
            }
