import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_URL_API,
    getData,
    state,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
} from "../common.js"

import renderError from "./Error.js";
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';


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

    //reset sorting active buttons
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    //render spinner
    renderSpinner('search');

    try {
        //fetch search results 
        const data = await getData(`${BASE_URL_API}/jobs?search=${searchText}`);

        const { jobItems } = data;

        //update state
        state.searchJobItems = jobItems;
        state.currentPage = 1;

        //remove spinner
        renderSpinner('search');

        //render number of results
        numberEl.textContent = jobItems.length;

        //reset pagination
        renderPaginationButtons();

        //render job items in search job list
        renderJobList();

    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }

};

searchFormEl.addEventListener("submit", submitHandler);