const city = document.querySelector('#inputLocation');
const FindBtn = document.querySelector('#FindBtn');
const today = document.querySelector('#currentDay');
const nextDay = document.querySelector('#nextDay');
const comingDay = document.querySelector('#comingDay');
const currentDate = document.querySelector('#currentDate');
const cityName = document.querySelector('#cityName');
const temp = document.querySelector('#temp');
const text = document.querySelector('#text');
const tempIcon = document.querySelector('#tempIcon');

const nextTempIcon = document.querySelector('#nextTempIcon');
const secondTempBig = document.querySelector('#secondTempBig');
const secondTempsmall = document.querySelector('#secondTempsmall');
const secondText = document.querySelector('#secondText');

const thirdIcon = document.querySelector('#thirdIcon');
const thirdTempBig = document.querySelector('#thirdTempBig');
const thirdTempsmall = document.querySelector('#thirdTempsmall');
const thidText = document.querySelector('#thidText');


const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
// get current day
let currentDay = weekdays[d.getDay()];
today.innerHTML = currentDay;
//get next day
if(d.getDay() == 6){
    let tomorrow = weekdays[0];
    nextDay.innerHTML = tomorrow;
}
else{
    let tomorrow = weekdays[d.getDay()+1];
    nextDay.innerHTML = tomorrow;
}

// get day after tomorrow
if(d.getDay() == 5){
    let dayAfterTomorrow = weekdays[0];
    comingDay.innerHTML = dayAfterTomorrow;
}
else if(d.getDay() == 6){
    let dayAfterTomorrow = weekdays[1];
    comingDay.innerHTML = dayAfterTomorrow;
}
else{
    let dayAfterTomorrow = weekdays[d.getDay()+2];
    comingDay.innerHTML = dayAfterTomorrow;
}
// get the month
let month = months[d.getMonth()];
// get the number of the day
let dayNum = String(d).slice(8,10);

if(dayNum.startsWith('0',0)){
     dayNum = dayNum.slice(1);
    currentDate.innerHTML = dayNum +" "+month;
}
else{
    currentDate.innerHTML = dayNum +" "+month;
}


(async function(){
    var request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=17c9a96083434976b3d102920240912=cairo&days=3&aqi=no&alerts=no`);
    if(request.ok){
        var result = await request.json();
        cityName.innerHTML = result.location.name;
        temp.innerHTML = `${result.current.temp_c}<span id="dgree" class="position-relative">o</span>C`;
        text.innerHTML = result.current.condition.text;
        tempIcon.setAttribute('src',"https:"+result.current.condition.icon);

        nextTempIcon.setAttribute('src',"https:"+result.forecast.forecastday[1].day.condition.icon);
        secondTempBig.innerHTML = `${result.forecast.forecastday[1].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
        secondTempsmall.innerHTML = `${result.forecast.forecastday[1].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
        secondText.innerHTML = result.forecast.forecastday[1].day.condition.text;

        thirdIcon.setAttribute('src',"https:"+result.forecast.forecastday[2].day.condition.icon);
        thirdTempBig.innerHTML = `${result.forecast.forecastday[2].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
        thirdTempsmall.innerHTML = `${result.forecast.forecastday[2].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
        thidText.innerHTML = result.forecast.forecastday[2].day.condition.text;
    }
})();


city.addEventListener('keyup',getCityWeather);
city.addEventListener('blur',getCityWeather);
FindBtn.addEventListener('click',getCityWeather);
async function getCityWeather(){
    var request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1b62e163b4024e0e81a193317240601&q=${city.value}&days=3&aqi=no&alerts=no`);
    if(request.ok){
        var result = await request.json();
        cityName.innerHTML = result.location.name;
        temp.innerHTML = `${result.current.temp_c}<span id="dgree" class="position-relative">o</span>C`;
        text.innerHTML = result.current.condition.text;
        tempIcon.setAttribute('src',"https:"+result.current.condition.icon);

        nextTempIcon.setAttribute('src',"https:"+result.forecast.forecastday[1].day.condition.icon);
        secondTempBig.innerHTML = `${result.forecast.forecastday[1].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
        secondTempsmall.innerHTML = `${result.forecast.forecastday[1].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
        secondText.innerHTML = result.forecast.forecastday[1].day.condition.text;

        thirdIcon.setAttribute('src',"https:"+result.forecast.forecastday[2].day.condition.icon);
        thirdTempBig.innerHTML = `${result.forecast.forecastday[2].day.maxtemp_c}<span class="position-relative sec-dgree">o</span>C`;
        thirdTempsmall.innerHTML = `${result.forecast.forecastday[2].day.mintemp_c}<span class="position-relative third-dgree">o</span>`;
        thidText.innerHTML = result.forecast.forecastday[2].day.condition.text;
    }
};