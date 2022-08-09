zipForm.addEventListener("submit", async function(e){
    e.preventDefault();
    searchInputValue = parseInt(searchInput.value)

    // fetch city by Zip Code API
    let data = await getCityByZip(searchInputValue);
    console.log(data)
    let businesses;
    if(data){
        businesses = await getBusinessByLocation(data);
        console.log(businesses)
        if(businesses){
            gridWrapper.innerHTML = "";
            businesses.forEach(business => {
                // entering template literal to create the grid
                let businessCard = `
                <div class="business-card">

                </div>
                `;

                gridWrapper.innerHTML += businessCard;
            }
            )
        }
    }

})
