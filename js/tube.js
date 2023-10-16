
const loadCategory = async ()=>{

    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()
    const categoryData = data.data

    // Tab List
    const tabList = document.getElementById("tab");

    categoryData.forEach(category => {
        const div = document.createElement("div")
        div.innerHTML = `
        <a onclick="handleSortView('${category.category_id}')" class="btn btn-active px-6">${category.category}</a>
        `;
        tabList.appendChild(div)
    });
}

// convert time
function showTime(sec) {
    const hours = (sec / 3600).toFixed();
    const remainingSecound = sec % 3600;
    const minutes = (remainingSecound / 60).toFixed();
    const time = `${hours} hrs ${minutes} min ago`;
    return time;
  }


  
const handleSortView = async(categoryId) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data =  await res.json();
   const cardData   =data.data;
   
   const CategoryContainer = document.getElementById("category-container")
   CategoryContainer.innerHTML = "";
   
   cardData.forEach(card => {
    // console.log(card)
    const cardDiv = document.createElement('div')
    cardDiv.classList=`card ml-10 w-64 bg-gray-100 shadow-xl`
    cardDiv.innerHTML=`

     <figure><img class=" h-44 w-64 rounded-xl " src="${card.thumbnail}" /></figure>

      <p>${card?.others.posted_date? showTime(card.others.posted_date) : ""}</p>
   <div class="card-body">
      <div class="flex">
         <img class="h-10 w-10 rounded-full" src="${card?.authors[0]?.profile_picture}">
         <h2 class="text-black text-2xl  mx-3 font-bold">${card.title}</h2>
         </div>
    <div class="flex">
     <p>${card?.authors[0]?.profile_name}</p>

     
</p>
</div>
<div>

<p>Total views: ${card.others.views}</p>
</div>
</div>

`
CategoryContainer.appendChild(cardDiv)

});

}




handleSortView(1000)
loadCategory();