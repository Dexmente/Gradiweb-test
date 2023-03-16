// Fetch Products
fetch(`${url}/products/all`)
    .then((response) => {
        if (!response.ok) {
            alert('Error fetching data. Please try again')
            throw new Error('Network response was not ok');
          }
        return response.json();
    })
    .then((data) => {
        const products = data.products?.nodes || [];
        setProductCarrousel(products);
        setCarrousel();
    })
    .catch(err => {
        console.warn('Error Fetching Data');
    })


// Get discount value
function getDiscount(valMin, valMax) {
    valMin = (+valMin-100) || 0;
    if (valMin == valMax) return;
    valMax = +valMax || 0;
    return Math.abs(Math.round((valMin / valMax) * 100) - 100);
}
// Get currency value
function getCurrency(currency) {
    return (currency == 'EUR') ? '€' : '$';
}
// Populates the carrousel with fetched products
function setProductCarrousel (products) {
    console.log(products);
    const carrouselEl = document.querySelector('#slides-container.products');
    products.forEach(prod => {
        let prodEl = document.createElement('li');
        prodEl.classList.add('product');
        prodEl.classList.add('item');
        prodEl.classList.add('slide');
        
        let imageEl = document.createElement('div');
        imageEl.classList.add('image');

        let discountEl = document.createElement('div');
        discountEl.classList.add('discount');
        imageEl.appendChild(discountEl);

        let bgEl = document.createElement('div');
        bgEl.classList.add('bg');
        imageEl.appendChild(bgEl);
        
        let btnEl = document.createElement('div');
        btnEl.classList.add('btn');
        btnEl.classList.add('btn-secondary');
        btnEl.classList.add('swap');
        btnEl.innerText = "SEE MORE";
        imageEl.appendChild(btnEl);

        prodEl.appendChild(imageEl);

        
        let nameEl = document.createElement('div');
        nameEl.classList.add('name');
        nameEl.innerText = prod?.title || '';
        prodEl.appendChild(nameEl);

        let ratingEl = document.createElement('div');
        ratingEl.classList.add('rating');
        prodEl.appendChild(ratingEl);

        
        let ratePriceEl = document.createElement('div');
        ratePriceEl.classList.add('rating-price');
        ratePriceEl.appendChild(ratingEl);
        
        let starsEl = document.createElement('div');
        starsEl.classList.add('stars');
        
        

        let rating = Math.floor(prod.tags[0]/100) || 0;
        for (let index = 1; index < 6; index++) {
            const input = document.createElement('input');
            input.setAttribute('disabled', 'true');
            input.setAttribute('focusable', 'false');
            input.setAttribute('type', 'radio');
            input.setAttribute('id', `${prod.id}[${index}]`);
            if (index === rating)input.setAttribute('checked', `true`);
            starsEl.appendChild(input);
        }
        for (let index = 1; index < 6; index++) {
            const label  = document.createElement('label');
            if (index === rating)label.setAttribute('checked', `true`);
            label.setAttribute('for', `${prod.id}[${index}]`);
            starsEl.appendChild(label);
        }
        
        ratingEl.appendChild(starsEl);

        let rateEl = document.createElement('div');
        rateEl.classList.add('rate');
        rateEl.innerHTML = '(' + (prod.tags[0] || 0) +')';
        ratingEl.appendChild(rateEl);

        
        
        let priceEl = document.createElement('div');
        priceEl.classList.add('price');

        let minPrice = prod.prices?.max.amount || 0;
        let maxPrice = prod.prices?.max.amount || 0;

        discountEl.innerText = (getDiscount(minPrice, maxPrice)) ? getDiscount(minPrice, maxPrice) + '%' : '';

        minPrice = getCurrency(prod.prices?.min.currencyCode) + '' + minPrice;
        maxPrice = getCurrency(prod.prices?.max.currencyCode) + '' + maxPrice;

        let minPriceEl = document.createElement('span');
        minPriceEl.classList.add('min');

        let maxPriceEl = document.createElement('span');
        maxPriceEl.classList.add('max');

        maxPriceEl.innerText += maxPrice;
        minPriceEl.innerText += minPrice;

        priceEl.appendChild(maxPriceEl);
        priceEl.appendChild(minPriceEl);

        ratePriceEl.appendChild(priceEl);
        prodEl.appendChild(ratePriceEl);

        carrouselEl.appendChild(prodEl);
    });
}