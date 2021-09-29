const openCountersTab = document.querySelector('.open-counters-box');
const closeCountersTab = document.querySelector('.close-counters-box');
const countersTab = document.querySelector('.counters-box');
const mainData = document.querySelector('.data');

const personsTable = document.querySelector(".table-persons");
const teamsTable = document.querySelector(".table-teams");
const persons = document.querySelectorAll(".row-data-person");
const teams = document.querySelectorAll(".row-data-team");

const sortButtons = document.querySelectorAll('.sort');

const fileContentSelectors = document.querySelectorAll(".file-selectors");
const downloadSelectedBtn = document.querySelector("#download-selected-file");
const openDownloadSelector = document.querySelector("#select-for-file");
const closeDownloadSelector = document.querySelector(".close-download-box");
const downloadSelectorDiv = document.querySelector(".file-download");

const downloadAllBtn = document.querySelector("#download-all");

const selectOnePromt = document.querySelector(".selectors-promt");
const closeSelectOnePromt = document.querySelector(".close-download-promt");

const downloadStartedPromt = document.querySelector("#download-started");
const downloadFailedPromt = document.querySelector("#download-failed");
const pageUrl = '/download/selected/excel';

function closePromt (promt) {
    promt.classList.remove("active");
    mainData.classList.remove('fade-out');
}

function showPromt (promt) {
    promt.classList.add('active');
    mainData.classList.add('fade-out');
}

const keys = {
    'person' : {
        'index' : 'Numer',
        'for-name' : 'Imię',
        'last-name' : 'Nazwisko',
        'nick' : 'Pseudonim',
        'living-place' : 'Miejsce zamieszkania',
        'mail' : 'E-mail',
        'phone-number' : 'Numer Telefonu',
        'social-channel' : 'Linki - kontakt',
        'about' : 'Opis',
        'link' : 'Linki - prace',
        'notes' : 'Notatki',
        'year-born' : 'Rok urodzenia',
        'date-register' : 'Data zarejerstrowania',
    },
    'team' : {
        'index' : 'Numer',
        'for-name' : 'Imię',
        'last-name' : 'Nazwisko',
        'name' : 'Pseudonim',
        'size' : 'Miejsce zamieszkania',
        'mail' : 'E-mail',
        'phone-number' : 'Numer Telefonu',
        'social-channel' : 'Linki - kontakt',
        'about' : 'Opis',
        'link' : 'Linki - prace',
        'notes' : 'Notatki',
        'date-register' : 'Data zarejerstrowania',
    }
}

const sortRows = (arr, keyPrefix, key, parentDiv) => {

    let keyItemA;
    let keyItemB;

    Array.from(arr).sort((a, b) => {
        keyItemA = a.querySelector(`.${keyPrefix}-${key}`).innerText;
        keyItemB = b.querySelector(`.${keyPrefix}-${key}`).innerText;

        if (key === 'index' || key === 'phone-number') {
            keyItemA = parseInt(keyItemA);
            keyItemB = parseInt(keyItemB);
        } else if (key === 'year-born' || key === 'date-register') {
            console.log(keyItemA, keyItemB)
            keyItemA = new Date(keyItemA);
            keyItemB = new Date(keyItemB);
            return keyItemB - keyItemA;
        } else {
            keyItemA = keyItemA.toLowerCase();
            keyItemB = keyItemB.toLowerCase();
        }
        return keyItemA < keyItemB ? -1 : 1; 

    }).forEach (el => {
        // parentDiv.children[0].remove();
        parentDiv.appendChild(el);
    })
}

sortButtons.forEach( but => {
    but.addEventListener('click', (e) => {
        let button = e.target;
        let prefix = button.getAttribute('prefix');
        let key = button.getAttribute('to-sort');
        if (prefix === 'person') {
            sortRows(persons, prefix, key, personsTable);
        } else {
            sortRows(teams, prefix, key, teamsTable)
        }
        
    })
})


function askForFile (full) {

    responseJSON = {};

    let checked_counter = 0;

    for (let i = 0; i < fileContentSelectors.length; i++) {
        selectorName = fileContentSelectors[i].getAttribute("name");
        selectorState = fileContentSelectors[i].checked;
        if (full) {
            responseJSON[selectorName] = true;
        }
        else {
            if (selectorState) {
                checked_counter++;
            }
            responseJSON[selectorName] = selectorState;
        }
    }

    if ( checked_counter < 2 && (!full)) {
        showPromt(selectOnePromt);
        setTimeout( () => closePromt(selectOnePromt), 3000);
        return;
    } // check if any is selected

    console.log(responseJSON);

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var a;
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            // Trick for making downloadable link
            a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhttp.response);
            // Give filename you wish to download
            a.download = "dane_selected.xlsx";
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
        }
    };
    // Post data to URL which handles post request
    xhttp.open("POST", pageUrl);
    xhttp.setRequestHeader("Content-Type", "application/json");
    // You should set responseType as blob for binary responses
    xhttp.responseType = 'blob';
    xhttp.send(JSON.stringify(responseJSON));
}

downloadAllBtn.addEventListener("mouseenter", (e) => {
    fileContentSelectors.forEach(checkbox => {
        checkbox.checked = true;
    });
})
downloadAllBtn.addEventListener("mouseleave", (e) => {
    fileContentSelectors.forEach(checkbox => {
        checkbox.checked = false;
    });
})

openCountersTab.addEventListener('click', () => showPromt(countersTab) );
closeCountersTab.addEventListener('click', () => closePromt(countersTab) );
openDownloadSelector.addEventListener('click', () => showPromt(downloadSelectorDiv));
closeDownloadSelector.addEventListener('click', () => closePromt(downloadSelectorDiv));
downloadSelectedBtn.addEventListener('click', () => askForFile(false));
// downloadSelectedBtn.addEventListener('click', () => closePromt(downloadSelectorDiv));
// downloadAllBtn.addEventListener('click', () => closePromt(downloadSelectorDiv));
downloadAllBtn.addEventListener('click', () => askForFile(true));
closeSelectOnePromt.addEventListener('click', () => closePromt(selectOnePromt));

// ogarnąć backendową część pisania odpowiednich rzeczy do pliku