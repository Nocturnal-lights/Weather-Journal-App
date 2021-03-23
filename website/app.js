//Event creation
document.getElementById('generate').addEventListener('click', performAction);
const getURL= 'http://localhost:8000/getRoute'
const postURL='http://localhost:8000/postRoute';
function performAction(e) {
    
    let d = new Date();
    let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
    
    let baseURL = "https://api.openweathermap.org/data/2.5/weather";
   const apiKey = "6e2d737f22dd43696fc08530d0f47763";
    let country_code = 'in';

    //Getting the content entered by user
    let zip_code = document.getElementById('zip').value;
    let user_input = document.getElementById('feelings').value;
    
    getWeatherInfo(baseURL, zip_code, country_code, apiKey)
        .then(function (data) {
            postData(postURL, { temperature: data.main.temp, date: newDate, content: user_input })

                .then(function () {
                    updateUI()
                })
        })
}



// Async GET call foe web api data
const getWeatherInfo = async (URL_value, zip_value, country_code, key_value)=>{
    
    const api_data= await fetch(`${URL_value}?zip=${zip_value},${country_code}&units=imperial&appid=${key_value}`)
    
    
    console.log(api_data);
    try {
        const data = await api_data.json();
        console.log("We are inside try block of GET func call");
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}


//Post route call
const postData = async (url = '', data = {}) => {
    const postRequestData = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log('We are inside try block of Post func call');
        const combined_data = await postRequestData.json();
        console.log(combined_data);
        return combined_data;
    }catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async () =>{
    const data_request = await fetch(getURL);
    try {
        const Update_data = await data_request.json();
    

        document.getElementById('date').innerHTML = 'Date: ' + Update_data.date;
        document.getElementById('temp').innerHTML = `It's ${Update_data.temperature} &#8457 outside` ;
        document.getElementById('content').innerHTML = Update_data.content;
    }
    catch (error) {
        console.log('error', error);
    }
}










