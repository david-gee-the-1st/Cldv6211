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
    document.getElementById('root').innerHTML = categories.map((item) =>
    {
        var{image,title,price} = item;
        return(
            `<div class='box'>
                <div class = 'img-box'>
                <img class='images' src=${image}"></img>
            </div>

            <div class = 'bottom'>
            <p>${title}</p>
            <h2>${price}.00</h2>` + "<button onclick = 'addtocart("+(i++)+")'>Add to cart</buttonn>" + `<div>
            </div>`
        )

        
    }).join('')