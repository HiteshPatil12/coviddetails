import axios from 'axios';
import { useState } from 'react';


const CovidCaseDetails = () =>{
    const [cases, getCovidDetailsByCountry] = useState("")
    const getCovidDataByCountry = async (e) => {
        e.preventDefault();
        const url = `https://api.covid19api.com/summary`
        const countryName = e.target.elements.country.value;
        const response = await axios.get(url);
        if(response.data.Message == "Caching in progress"){
            alert(response.data.Message + ', please try after sometime.')
        }
        else{
            var totalCountries = response.data.Countries.length;
            for (let i = 0; i < totalCountries; i++) {
                if(response.data.Countries[i].Country == countryName){
                    getCovidDetailsByCountry({
                        country: response.data.Countries[i].Country,
                        totalConfirmed: response.data.Countries[i].TotalConfirmed,
                        totalDeaths: response.data.Countries[i].TotalDeaths,
                    })
                }
                // else {
                //     alert('Invalid')
                // }
            }
        }
    }

    const ShowDetails = () =>{
        return(
            <div>
                <h1>Country name : {cases.country}</h1>
                <h1>Total confirmed : {cases.totalConfirmed}</h1>
                <h2>Total deaths : {cases.totalDeaths}</h2>
            </div>
        )
    }
    return(
        <div>
            <form onSubmit={getCovidDataByCountry}>
                <input type="text" placeholder="Enter Country" name="country" required></input>
                <button>Request Data</button>
            </form>
            <ShowDetails/>
        </div>
    )
}

export default CovidCaseDetails;