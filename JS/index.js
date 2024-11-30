const loadPhone = async (phoneName, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    // console.log(data.status)
    // console.log(data.data)
    displayPhone(data.data, isShowAll)
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container before display new item/ adding new item
    phoneContainer.textContent = '';
    const showAllPhoneBtn = document.getElementById('show-all-phone-btn');

    //    display hidden show all button when item is 0
    if (phones.length > 12) {
        showAllPhoneBtn.classList.remove('hidden');
    }
    else {
        showAllPhoneBtn.classList.add('hidden')
    }
    // Show all items in a page
    if (!isShowAll) {
        phones = phones.slice(0, 12);

    }
    // show fixed number phone
    // console.log(phones.length);

    phoneContainer.classList = "grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `bg-base-100 shadow-xl card"`;
        phoneCard.innerHTML = `
                        <figure class="px-10 pt-10 flex items-cent justify-center">
                        <img src=${phone.image}
                            alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="items-center text-center card-body">
                            <h2 class="card-title">${phone.phone_name}</h2>
                            <p>Brand: ${phone.brand}</p>
                            <p>${phone.slug}</p>
                            <div class="card-actions">
                                <button onclick="handleDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                            </div>
                        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading bars
    toggleLoadingBars(false)

}


const handleSearch = (isShowAll) => {
    toggleLoadingBars(true)
    const searchInputFieldElement = document.getElementById('search-input-field');
    const searchText = searchInputFieldElement.value.toLowerCase();
    loadPhone(searchText, isShowAll);
}

const toggleLoadingBars = (isLoading) => {
    const loadingBars = document.getElementById('loading-bars');
    if (isLoading) {
        loadingBars.classList.remove('hidden');

    }
    else {
        loadingBars.classList.add('hidden')
    }
}
// Show phone details
const handleDetails = async (identity) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/phone/${identity}`);
    const data = await response.json();
    console.log(data)
    showPhoneDetails(data.data);
}

// show phone details
const showPhoneDetails = (phone) => {
    console.log(phone)
    show_details_modal.showModal();

    const showPhoneDetailContainer = document.getElementById('show-phone-detail-container');
    showPhoneDetailContainer.innerHTML = `
    <div class="flex justify-center items-center">
        <img src="${phone.image}" alt=""/>
    </div>
    <div class="mt-5">
        <h3 class="font-bold text-2xl ">${phone.name}</h3>
        <p>Memory: 
            <span class="text-sm">${phone.mainFeatures.memory}</span>
        </p>
        <p>Storage: ${phone.mainFeatures.storage}</p>
        <p>Display-Size: ${phone.mainFeatures.displaySize}</p>
        <p>Slug: ${phone.slug}</p>
        <p>Bluetooth: ${phone.others.Bluetooth}</p>
        <p>GPS: ${phone.others.GPS}</p>
        <p>USB: ${phone.others.USB}</p>
        <p>WLAN: ${phone.others.WLAN}</p>
        <p>Release-Date: ${phone.releaseDate}</p>
    </div>
    `
}

// show all phone
const showAllPhone = () => {
    handleSearch(true);
}

