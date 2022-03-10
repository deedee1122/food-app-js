/**
 * ! Selectors from HTML
 */

let results = document.getElementById('results')


/**
 * ! API Generation with base & API
 */
let base = "https://api.edamam.com/api/food-database/v2/parser"
let app_id = '0946a05f'
let app_key = "737585e65aced03943914aef289d9e14"
let ingr 
let nutrition_type = "cooking"
// https://api.edamam.com/api/food-database/v2/parser?
// app_id=8d962084&
// app_key=9778af1eb3e31be68da813e507455d6f&
// ingr=beef&
// nutrition-type=cooking
/**
 * ! This function fetches data from the API
 */

let fetchData = async (e)=>{
   ingr = e.value
   let api = `${base}?app_id=${app_id}&app_key=${app_key}&ingr=${ingr}&nutrition-type=${nutrition_type}`

   await fetch(api)
   .then(res=>res.json())
   .then(res=>template(res))
   .catch(err=>console.log(err))
}

// let getNextPage = async ()=>{
//    console.log('this is working ')
//    // await fetch(pageLink)
//    // .then(res=>res.json)
//    // .then(res=> template(res))
//    // .catch(err=>console.log(err))
// }

/**
 * ! Prints the result on the result browser screen
 */

let template = (res)=>{
   console.log(res)
   let {hints, parsed, text, _links} = res

   if(hints.length === 0){
      results.innerHTML = "<div class='text-center mt-3'> No recipes Found, Please try Again</div>"
   }
   // <button onClick='${()=>getNextPage()}' class="btn btn-primary">Next</button>
      
   else{
      results.innerHTML = `
      
      <div class='food-row'>
         ${hints.map((x,y)=>{
            return `
            <div class="food-card p-4">
               <img class="w-100" src=${x.food.image} alt="" />
               <div class="text-center fw-bold">${x.food.label}</div>
               <div class="">Calories : ${x.food.nutrients.ENERC_KCAL}</div>
               
            </div>`
         }).join('')}
      </div>
      `
   }
}

