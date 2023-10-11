import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_URL_API,
    getData,
} from "../common.js"

import renderError from "./Error.js";
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';


const submitHandler = async event => {

    event.preventDefault();

    //get search text
    const searchText = searchInputEl.value;

    //validation (  regular expression)
    const forbiddenPattern = /[0-9]/;

    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your Search May not contain numbers');
        return;
    }

    //blur input
    searchInputEl.blur();

    //remove previous job items
    jobListSearchEl.innerHTML = '';

    //render spinner
    renderSpinner('search');

    try {
        //fetch search results 
        const data = await getData(`${BASE_URL_API}/jobs?search=${searchText}`);

        const { jobItems } = data;

        //remove spinner
        renderSpinner('search');

        //render number of results
        numberEl.textContent = jobItems.length;

        //render job items in search job list
        renderJobList(jobItems);

    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }

};

searchFormEl.addEventListener("submit", submitHandler);