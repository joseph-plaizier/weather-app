class Forecast{
    constructor(){
        this.key = 'QOYkAAaYUOdV5e1P3o7LhUl4F2gXeeAe';
        this.weatherBase = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityBase = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity (city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        return {cityDets, weather};
    }
    async getWeather (id){
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherBase + query);
        const data = await response.json();

        return data[0];
    }
    async getCity (city){
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityBase + query);
        const data = await response.json();

        return data[0];
    }
}