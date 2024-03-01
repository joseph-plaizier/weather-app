const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const forecast = new Forecast();

const updateUI = data => {
    //use destructuring to create new variables. Names must be same as on object.
    const { cityDets, weather } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="icon bg-light mx-auto text-center">
            <img src="">
        </div>
        <div class="temper my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
            <span> = ${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night/day & icon images
    const iconSrc = `img/weatherIcons/${weather.WeatherIcon}.png`;
    const icon = document.querySelector('.icon img');
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.webp' : 'img/night.webp';
    time.setAttribute('src', timeSrc);

    //remove the d-none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get input form value
    const city = cityForm.city.value.trim();
    //reset the form
    cityForm.reset();

    //update the user interface (UI) with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set the city value to local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}