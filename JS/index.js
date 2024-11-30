const loadPhone = async (phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    // console.log(data.status)
    // console.log(data.data)
    displayPhone(data.data)
}

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container before display new item/ adding new item
    phoneContainer.textContent = '';

    phoneContainer.classList = "grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `bg-base-100 shadow-xl w-96 card"`;
        phoneCard.innerHTML = `
                        <figure class="px-10 pt-10">
                        <img src=${phone.image}
                            alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="items-center text-center card-body">
                            <h2 class="card-title">${phone.phone_name}</h2>
                            <p>Brand: ${phone.brand}</p>
                            <p>${phone.slug}</p>
                            <div class="card-actions">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });

}


const handleSearch = () => {
    const searchInputFieldElement = document.getElementById('search-input-field');
    const searchText = searchInputFieldElement.value;
    loadPhone(searchText);
    console.log(searchText);
}