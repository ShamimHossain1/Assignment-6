const loadAiApi = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    aiData(data.data.tools, dataLimit);
    // console.log(data.data.tools);

}



const aiData = (aiData, dataLimit) => {

    const dataContainer = document.getElementById('ai-container');


    const showAll = document.getElementById('show-btn');
    if (dataLimit && aiData.length > 5) {
        aiData = aiData.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // short by date
    function byDate(a, b) {
        return new Date(a.published_in).valueOf() - new Date(b.published_in).valueOf();
    }

    document.getElementById('sort').addEventListener('click', function () {

        const dataSort = (aiData.sort(byDate));
        console.log(dataSort);
        dataContainer.innerHTML = "";
        aiData.forEach(data => {

            const aiDiv = document.createElement('Div');
            aiDiv.innerHTML = `<div class="col ">
        <div class="card p-lg-4 rounded-4">
       
          <img style="height:300px" class=" img-fluid  rounded-4"  src="${data.image}" class="card-img-top" alt="...">
         <div class=" p-3" >
          <h3 class="fw-bold my-4">Features</h3>
    <div class="px-6">
        <ol class="list-decimal text-secondary fs-5 fw-semibold">
            <li>${data.features[0]}</li>
            <li>${data.features[1]}</li>
            <li>${data.features[2]}</li>
           
        </ol>
    </div>
    <hr class="mt-2">
    <div class="d-flex justify-content-between align-items-center mt-3">
        <div>
            <h3 class="fw-bold">${data.name}</h3>

            <div class="d-flex gap-2 align-items-center">
                <img style="height:30px" class="" src="./icons/callender_icon.png">
                <p class="mt-2 fs-6 fw-semibold">${data.published_in}</p>
            </div>
        </div>
       <button class="border border-0 bg-white">
         <img href="#" onclick="loadAiDetails('${data.id}')" 
         data-bs-toggle="modal" data-bs-target="#aiDetails" style="height:65px" class="" data-bs-toggle="modal" data-bs-target="#exampleModal" src="./icons/arrow_icon.png" alt="">
               </button>        
        </div>
        </div>
      </div>`;



            dataContainer.appendChild(aiDiv);

        });
    })

    aiData.forEach(data => {

        const aiDiv = document.createElement('Div');
        aiDiv.innerHTML = `<div class="col ">
        <div class="card p-lg-4 rounded-4">
       
          <img style="height:300px" class=" img-fluid  rounded-4"  src="${data.image}" class="card-img-top" alt="...">
         <div class=" p-3" >
          <h3 class="fw-bold my-4">Features</h3>
    <div class="px-6">
        <ol class="list-decimal text-secondary fs-5 fw-semibold">
            <li>${data.features[0]}</li>
            <li>${data.features[1]}</li>
            <li>${data.features[2]}</li>
           
        </ol>
    </div>
    <hr class="mt-2">
    <div class="d-flex justify-content-between align-items-center mt-3">
        <div>
            <h3 class="fw-bold">${data.name}</h3>

            <div class="d-flex gap-2 align-items-center">
                <img style="height:30px" class="" src="./icons/callender_icon.png">
                <p class="mt-2 fs-6 fw-semibold">${data.published_in}</p>
            </div>
        </div>
       <button class="border border-0 bg-white">
         <img href="#" onclick="loadAiDetails('${data.id}')" 
         data-bs-toggle="modal" data-bs-target="#aiDetails" style="height:65px" class="" data-bs-toggle="modal" data-bs-target="#exampleModal" src="./icons/arrow_icon.png" alt="">
               </button>        
        </div>
        </div>
      </div>`;



        dataContainer.appendChild(aiDiv);

    });
    toggleSpinner(false);


}






// --------------------- loader--------------------------------

const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    }
    else {
        loadingSpinner.classList.add('d-none');
    }
}



//----------------- show all-----------------------

document.getElementById('showAll-btn').addEventListener('click', function () {

    // loader show
    toggleSpinner(true);

    loadAiApi();


});


//------------- Phone details----------------------

const loadAiDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayAiDetails(details.data);


}

const displayAiDetails = details => {
    console.log(details);


    document.getElementById('ai-description').innerText = `${details.description}`;
    document.getElementById('price1').innerText = `${details.pricing ? details.pricing[0].price : 'No data found '}`;
    document.getElementById('price2').innerText = `${details.pricing ? details.pricing[1].price : 'No data found'}`;
    document.getElementById('price3').innerText = `${details.pricing ? details.pricing[2].price : 'No data found'}`;
    document.getElementById('plan1').innerText = `${details.pricing ? details.pricing[0].plan : ''}`;
    document.getElementById('plan2').innerText = `${details.pricing ? details.pricing[1].plan : ''}`;
    document.getElementById('plan3').innerText = `${details.pricing ? details.pricing[2].plan : ''}`;
    document.getElementById('Features').innerHTML = `
 <li class="text-start pt-2 ">${details.features[1].feature_name}</li>
 <li class="text-start pt-2 ">${details.features[2].feature_name}</li>
 <li class="text-start pt-2 ">${details.features[3].feature_name}</li>`;
    document.getElementById('text-start').innerHTML = `
        <h3 class="text-start fs-5">Integrations</h3>
        <p id="no-data" class="d-none text-light-emphasis fw-semibold">ss</p>
        <ul id="data-found" class="features-list text-light-emphasis fw-semibold">
            <li class="text-start pt-2 ">${details.integrations && details.integrations[0] ? details.integrations[0] : 'No data Found'}</li>
            <li class="text-start pt-2 ">${details.integrations && details.integrations[1] ? details.integrations[1] : 'No data Found'}</li>
            <li class="text-start pt-2 ">${details.integrations && details.integrations[2] ? details.integrations[2] : 'No data Found'}</li>
        </ul>`

    document.getElementById('modal-image').innerHTML = `<img  class="modal-img img-fluid rounded-4" src="${details.image_link[0]}" alt="">
        <p id="accuracy" class="accuracy">% Accuracy</p>`;
    document.getElementById('question').innerText = `${details.input_output_examples ? details.input_output_examples[0].input : 'Can you give any example?'}`;
    document.getElementById('ans').innerText = `${details.input_output_examples ? details.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}`;




    // integrations no data

    const integrations = details.integrations;
    const noDataElement = document.getElementById('no-data');
    const dataElement = document.getElementById('data-found')
    const listItems = document.querySelectorAll('.features-list li');

    if (integrations) {
        for (let i = 0; i < integrations.length && i < listItems.length; i++) {
            listItems[i].textContent = integrations[i];
        }
    } else {
        noDataElement.textContent = 'No data found.';
        noDataElement.classList.remove('d-none');
        dataElement.classList.add('d-none')

    }

    // accuracy function
    const accuracyScore = details.accuracy.score;
    const accuracyElement = document.getElementById('accuracy');

    if (accuracyScore) {
        const percentage = accuracyScore * 100;
        accuracyElement.textContent = `${percentage}% Accuracy`;
    } else {
        accuracyElement.classList.add('d-none');
    }

}



toggleSpinner(true);
loadAiApi(6);