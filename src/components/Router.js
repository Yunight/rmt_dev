import {
    jobDetailsContentEl,
    BASE_URL_API,
    getData,
    state,
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';

const loadHashChangeHandler = async () => {
    //get id from url
    const id = location.hash.substring(1);
    if (id) {

        //remove the active class from previously active job item
        document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));

        //remove previous job details content
        jobDetailsContentEl.innerHTML = '';

        //add spinners
        renderSpinner('job-details');
        try {

            const data = await getData(`${BASE_URL_API}/jobs/job/${id}`);

            const { jobItem } = data;

            //update store
            state.activeJobItem = jobItem;

            //render earch job list
            renderJobList();

            //remove spinners
            renderSpinner('job-details');

            //render job details
            renderJobDetails(jobItem);
        } catch (error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);