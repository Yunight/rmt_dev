import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    state,
} from "../common.js";

import renderJoblist from './JobList.js';

const clickHandler = event => {

    event.preventDefault();
    //get clicked btn element
    const clickedButtonEl = event.target.closest('.sorting__button');


    //stop if not clicked button element
    if (!clickedButtonEl) return;

    //check if intention is recent or relevant sorting

    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    //make sorting button active
    if (recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    //sort the job items 
    if (recent) {
        state.searchJobItem.sort((a, b) => {
            return a.daysAgo - b.daysAgo;
        });

    } else {
        state.searchJobItem.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore;
        });
    }

    //render jobitems in list
    renderJoblist();
};

sortingEl.addEventListener('click', clickHandler);