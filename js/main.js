'use strict';
const url = 'https://gradistore-spi.herokuapp.com';

// Add Open & Close Footer columns functionality
document.querySelectorAll('footer .columns .column .title').forEach(el => {
    el.addEventListener('click', () => {el.classList.toggle('open')});
});
// Update Copyright year
document.querySelector('footer #copyright .year').innerText = new Date().getFullYear();


// Fetch sold products
fetch(`${url}/orders`)
    .then((response) => {
        
        if (!response.ok) {
            alert('Error fetching data. Please try again')
            throw new Error('Network response was not ok');
          }
        return response.json();
    })
    .then((data) => {
        const orders = data.orders?.nodes || {};
        let totalItemsSold = 0;
        
        orders.forEach(order => {
            let orderItems =  order.lineItems?.nodes || [];
            totalItemsSold += orderItems.length;
        });
        document.querySelector('.banner-info .text .main span.total').innerText = totalItemsSold;
    })
    .catch(err => {
        console.warn('Error Fetching Data');
    })
