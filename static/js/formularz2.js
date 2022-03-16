// selectors 

const artKindDivs = document.querySelectorAll('.art-kind-options');
const promotionDivs = document.querySelectorAll('.promotion-options')
const knowFromDivs = document.querySelectorAll('.know-from-options')

const withWhoDiv = document.querySelector('#with-who-div');
const withWhoDivTeam = document.querySelector('#team-with-who-div');

const sections = document.querySelectorAll('.section-form');

const nameInput = document.querySelector("input[id='name']");

const addedIntytutionsTeam = document.querySelector('#team-working-with-instytutions');
const addedIntytutions = document.querySelector('#working-with-instytutions');
const addedMembersBornDates = document.querySelector('#members-year-born-date');
const addedLivingPlacesTeam = document.querySelector('#team-living-place');

const typeInputs = document.querySelector("#mode-input");
let typeInput = typeInputs.querySelector('input[type="radio"]:checked') 

const submitButton = document.querySelector('#submit-button');
const firstSectionButton = document.querySelector('#section-1-next-button');

const nextStageButtons = document.querySelectorAll('.next-stage');
const previousStageButtons = document.querySelectorAll('.previous-stage');

const lastPreviousButton = document.querySelector('#last-previous-button');

const validateSection = document.querySelector('#fill-everything-confirm');
const validateButton = document.querySelector('#close-validate-section');
const sendingSuccesSection = document.querySelector('#section-sending-succes-div');
const finishButton = document.querySelector('#close-sending-succes-section');

const fillEmptyOptionDiv = document.querySelector('#fill-empty-input-confirm');
const fillEmptyOptionCloseButton = document.querySelector('#close-fill-empty-input-confirm');

const failedSendingDiv = document.querySelector("#section-sending-failed-div");
const failedSendingAgain = document.querySelector('#close-sending-failed-section-again');
const failedSendingHome = document.querySelector('#close-sending-failed-section-home');

const teamSizeInput = document.querySelector('#team-size');

const bornDateInput = document.querySelector('#date-born');

// global variables 
let current = 0;
const pageUrl = '/'

// data to form 
const artKinds = {'Muzyka' : false, 'Fotografia' : false, 'Grafika' : false, 'Malarstwo' : false,'Rysunek' : false, 'Literatura' : false, 'Poezja' : false, 'Rzeźba' : false, 'Taniec' : false, 'Teatr' : false};
const promotionTypes = {'Występ w namiocie (Koneser)' : false, 'Występ na koncercie' : false, 'Wystawy w kawiarniach' : false, 'Muzyka w tle w kawiarniach' : false, 'Wystawienie fragmentów twórczości literackiej / poetyckiej w kawiarnich' : false, 'Występ w filmie o artystach' : false, 'Sesja zdjęciowa na media społecznościowe' : false, 'Udostępnienie na mediach społecznościowych' : false};
const knowFrom = {'Facebook' : false, 'Instagram' : false, 'YouTube' : false, 'Strona internetowa' : false, 'Przyjaciele, Znajomi, Rodzina' : false, 'Byłam / byłem na jedej z poprzednich edycji' : false};

const Instytutions = [];
const teamMembersBorndate = [];
const teamLivingPlaces = [];

const aloneInputs = {
    nick : document.querySelector('input[id="nick"]'),
    dateBorn : document.querySelector('input[id="date-born"]'),
    livingPlace : document.querySelector('input[id="living-place"]'),
    socialChannel : document.querySelector('input[id="working-place"]'),
    about : document.querySelector('#about'),
    artKindMore : document.querySelector('#art-kind-more'),
};

const teamInputs = {
    teamName : document.querySelector('input[id="team-name"]'),
    teamSize : document.querySelector('input[id="team-size"]'),
    teamAbout : document.querySelector('#team-about'),
    artKindMore : document.querySelector('#team-art-kind-more'),
    socialChannel : document.querySelector("#team-working-place"),
}

// functions

function addOption (parent) {
    let generateType = parent.classList[0];
    let listToAdd;

    switch (parent.classList[0]) {
        case 'know-from-options':
            listToAdd = knowFrom; 
            break;

        case 'promotion-options':
            listToAdd = promotionTypes;
            break;
        case 'art-kind-options':
            listToAdd = artKinds;
            break
    }

    let from = `${parent.getAttribute('type')}-${generateType}`;

    let newOptionDiv = document.createElement('div');
    newOptionDiv.classList.add(`${from}-element`);
    newOptionDiv.classList.add('instytutions-element');
    newOptionDiv.classList.add(`last-element`);

    let newOptionInput = document.createElement('input');
    newOptionInput.setAttribute('type', 'text');
    newOptionInput.setAttribute('id', `${generateType}-new-option-input`);
    newOptionInput.setAttribute('name', `${generateType}-new-option-input`)
    newOptionInput.setAttribute('placeholder', 'twoja inna opcja');

    let newOptionButton = document.createElement('button');
    newOptionButton.setAttribute('id', `${generateType}-new-option-button`);
    newOptionButton.classList.add('add-option-button');
    newOptionButton.setAttribute('name', `${generateType}-new-option-button`);
    newOptionButton.setAttribute('add-to', `${generateType}`);
    newOptionButton.setAttribute('input', `${generateType}-new-option-input`);
    newOptionButton.innerText = 'Dodaj';

    newOptionButton.addEventListener('click', (e) => {
        let to = e.target.getAttribute('add-to');
        let newOptionValue = document.getElementById(e.target.getAttribute('input'));
        if (newOptionValue.value === '') {
            showFillEmptyInputPromt();
        } else {
            let listToAdd;
            switch (to) {
                case 'know-from-options':
                    listToAdd = knowFrom; 
                    break;
                case 'promotion-options':
                    listToAdd = promotionTypes;
                    break;
                case 'art-kind-options':
                    listToAdd = artKinds;
                    break
            }
            listToAdd[`${newOptionValue.value}`] = true;
        }
        genCheckBoxex(e.target.parentElement.parentElement, e.target.parentElement.parentElement.classList[0]);
    })

    newOptionDiv.appendChild(newOptionInput);
    newOptionDiv.appendChild(newOptionButton);

    parent.appendChild(newOptionDiv);

}

function genCheckBoxex (parent, generateType) {

    parent.querySelectorAll('*').forEach(n => n.remove());

    let from = `${parent.getAttribute('type')}-${generateType}`;

    let end;
    let labelTextFrom;

    switch (generateType) {
        case 'promotion-options':
            end = promotionTypes.length;
            labelTextFrom = promotionTypes;
            break;

        case 'art-kind-options':
            end = artKinds.length;
            labelTextFrom = artKinds;
            break;   
        case 'know-from-options':
            end = knowFrom.length;
            labelTextFrom = knowFrom;
            break;
    }
    let elem;
    for (let i = 0; i < Object.keys(labelTextFrom).length; i++) {
        elem = Object.keys(labelTextFrom)[i];
        let tempInputId = `${from}-${elem.toLowerCase()}`;

        let positionHolder = document.createElement('div');
        positionHolder.classList.add(`${from}-element`);

        // check box
        let input = document.createElement('input');
        input.setAttribute ('type', 'checkbox');
        input.setAttribute ('id', tempInputId);
        input.setAttribute ('name', tempInputId);
        input.setAttribute('value', elem);
        input.addEventListener('click', (e) => {
            switch (e.target.parentElement.parentElement.classList[0]) {
                case 'know-from-options':
                    listToAdd = knowFrom; 
                    break;
        
                case 'promotion-options':
                    listToAdd = promotionTypes;
                    break;
                case 'art-kind-options':
                    listToAdd = artKinds;
                    break
            }
            if (e.target.checked) {
                listToAdd[e.target.getAttribute('value')] = true;
            } else {
                listToAdd[e.target.getAttribute('value')] = false;
            }
        })
        if (labelTextFrom[elem] === true) {
            input.checked = true;
        }

        // label 
        let label = document.createElement('label');
        label.setAttribute('for', tempInputId);
        label.innerText = elem;

        positionHolder.appendChild(input);
        positionHolder.appendChild(label);

        parent.appendChild(positionHolder);
    }

    
    let addOptionDiv = document.createElement('div');
    addOptionDiv.classList.add(`${from}-element`);

    // checkbox 
    let but = document.createElement('button');
    but.setAttribute ('id', `${from}-add-option`);
    but.setAttribute ('name', `${from}-add-option`);
    but.classList.add('add-option-button');
    but.setAttribute('from', from);
    but.innerText = 'Dodaj opcję';

    but.addEventListener('click', (e) => {

        addOption(e.target.parentElement.parentElement);
        e.target.remove();
    }) 

    addOptionDiv.appendChild(but);
    parent.appendChild(addOptionDiv);    

}

function changeSection (to) {
    let toSection;
    let currentSection = sections[current];
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].classList.contains(`section-${to}`)) {
            toSection = sections[i];
        }
    }
    toSection.classList.add('top')
    currentSection.classList.remove('top');
    currentSection.classList.add('out');
    window.scrollTo(0, 0);
    current = to;
    if (current === 4) {
        renderInstances(addedLivingPlacesTeam);
        renderInstances(addedMembersBornDates);
    }
}

function sendPostRequest () {
    let responseJSON = {};

    responseJSON.name = nameInput.value;

    if (typeInputs.querySelector('input[type="radio"]:checked').value === "sam/sama") {
        responseJSON.mode = 'osoba';
        let keys = Object.keys(aloneInputs);
        for (let i = 0; i < keys.length; i++) {
            input = keys[i]
            responseJSON[`${input}`] = aloneInputs[`${input}`].value;
        }
        if (document.querySelector('#with-who-alone').checked === true) {
            responseJSON.withWho = 'artystka / artysta niezrzeszona / niezrzeszony';
        } else {
            responseJSON.withWho = Instytutions;
        }
    } else {
        responseJSON.mode = 'zespół';
        let keys = Object.keys(teamInputs);
        for (let i = 0; i < keys.length; i++) {
            input = keys[i]
            responseJSON[`${input}`] = teamInputs[`${input}`].value;
        }
        if (document.querySelector('#team-with-who-alone').checked === true) {
            responseJSON.withWho = 'artystka / artysta niezrzeszona / niezrzeszony';
        } else {
            responseJSON.withWho = Instytutions;
        }
        responseJSON.livingPlace = teamLivingPlaces;
        responseJSON.dateBorn = teamMembersBorndate;
    }
    responseJSON.artkinds = {};

    let keys = Object.keys(artKinds);
    for (let i = 0; i < keys.length; i++) {
        if (artKinds[keys[i]]) {
            responseJSON.artkinds[`${keys[i]}`] = true;
        }
    }
    responseJSON.promotiontypes = {};
    keys = Object.keys(promotionTypes);
    for (let i = 0; i < keys.length; i++) {
        if (promotionTypes[keys[i]]) {
            responseJSON.promotiontypes[`${keys[i]}`] = true;
        }
    }
    
    responseJSON.knowform = {}
    keys = Object.keys(knowFrom);
    for (let i = 0; i < keys.length; i++) {
        if (knowFrom[keys[i]]) {
            responseJSON.knowform[`${keys[i]}`] = true;
        }
    }

    responseJSON.komunikacja = document.querySelector('#tel-number').value;
    responseJSON.writeCheckBox = document.querySelector('#rodo-write-super').checked;
    responseJSON.notes = document.querySelector('#rodo-notes').value;
    responseJSON.mail = document.querySelector('#mail').value;
    responseJSON.mailRepeat = document.querySelector('#mail-repeat').value;

    console.log(responseJSON)

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(responseJSON),
        dataType: 'json',
        url: pageUrl,
        success : () => {
            showSendingSuccesPromt();
        },
        error: (error) => {
            showSendingFailedPromt();
            console.log(error)
        }    
    });
}

function renderInstances (parent) {

    let type = parent.getAttribute('n');
    let addToList;
    let text; 

    switch (type) {
        case 'instytutions':
            addToList = Instytutions;
            text = 'Instytucja / organizacja';
            break;
        case 'year-born-dates':
            addToList = teamMembersBorndate;
            text = 'Rok';
            break;
        case 'living-places':
            addToList = teamLivingPlaces;
            text = 'Miejsce zamieszkania'
            break;
    }

    parent.querySelectorAll('*').forEach(n => n.remove());

    let from = `${parent.getAttribute('type')}-${type}`;
    for (let i = 0; i < addToList.length; i++) {
        elem = addToList[i];
        let positionHolder = document.createElement('div');
        positionHolder.classList.add(`${type}-element`);

        let positionValue = document.createElement('p');
        positionValue.innerText = `${text}: ${elem}`;
    
        let positionButton = document.createElement('button');
        positionButton.setAttribute('val', elem);
        positionButton.classList.add('btn-remove');
        positionButton.innerText = 'Usuń';

        positionButton.addEventListener('click', (e) => {
            addToList.splice(addToList.indexOf(e.target.getAttribute('val')), 1);
            e.target.parentElement.remove();
        })

        positionHolder.appendChild(positionValue);
        positionHolder.appendChild(positionButton);

        parent.appendChild(positionHolder)
    }
    let addOptionDiv = document.createElement('div');
    addOptionDiv.classList.add(`${type}-element`);

    // checkbox 
    let but = document.createElement('button');
    but.setAttribute ('id', `${type}-add-option`);
    but.setAttribute ('name', `${type}-add-option`);
    but.classList.add('add-option-button');
    but.setAttribute('from', type);
    but.setAttribute('n-button', type);
    but.innerText = 'Dodaj opcję';

    but.addEventListener('click', (e) => {

        addInstance(e.target.parentElement.parentElement);
        e.target.parentElement.remove();
    }) 

    addOptionDiv.appendChild(but);
    parent.appendChild(addOptionDiv);    
}

function addInstance (parent) {

    let type = parent.getAttribute('n');
    let addToList;

    switch (type) {
        case 'instytutions':
            addToList = Instytutions;
            break;
        case 'year-born-dates':
            addToList = teamMembersBorndate;
            break;
        case 'living-places':
            addToList = teamLivingPlaces;
            break;
    }

    let newOptionDiv = document.createElement('div');
    newOptionDiv.classList.add(`${type}-element`);
    newOptionDiv.classList.add(`last-element`);

    let newOptionInput = document.createElement('input');
    if (type != 'year-born-dates') {
        newOptionInput.setAttribute('type', 'text');
    } else {
        newOptionInput.setAttribute('type', 'date');
        newOptionInput.setAttribute('min', '1995-01-01');
        newOptionInput.setAttribute('max', '2006-12-31');
    }
    newOptionInput.setAttribute('id', `${type}-new-option-input`);
    newOptionInput.setAttribute('name', `${type}-new-option-input`)
    newOptionInput.setAttribute('placeholder', 'twoja inna opcja');

    let newOptionButton = document.createElement('button');
    newOptionButton.setAttribute('id', `${type}-new-option-button`);
    newOptionButton.setAttribute('name', `${type}-new-option-button`);
    newOptionButton.classList.add('add-option-button');
    newOptionButton.setAttribute('add-to', `${type}`);
    newOptionButton.setAttribute('input', `${type}-new-option-input`);
    newOptionButton.innerText = 'Dodaj';

    newOptionButton.addEventListener('click', (e) => {
        let newOptionInput = document.getElementById(e.target.getAttribute('input'));
        // if (newOptionInput.getAttribute('type') === 'date') {
        //     checkDateValue(newOptionInput);
        // }
        let newOptionValue = newOptionInput.value;
        console.log(newOptionInput.value);
        if (newOptionValue != '') { 
            addToList.push(newOptionValue);
        } else {
            showFillEmptyInputPromt();
        }
        renderInstances(e.target.parentElement.parentElement);
    })

    newOptionDiv.appendChild(newOptionInput);
    newOptionDiv.appendChild(newOptionButton);

    parent.appendChild(newOptionDiv);
}

function showSendingSuccesPromt () {
    window.scrollTo(0, 0);
    sendingSuccesSection.classList.add('active');
    sendingSuccesSection.classList.add('top');
    sections[current].classList.add('fade-out');
    document.querySelectorAll('button').forEach ((btn) => {
        if (! (btn === finishButton)) {
            btn.disabled = true;
        }
    })
}

function showFillEmptyInputPromt () {
    window.scrollTo(0,0);
    sections[current].classList.add('fade-out');
    fillEmptyOptionDiv.classList.add('top');
    fillEmptyOptionDiv.classList.add('active');
    document.querySelectorAll('button').forEach ((btn) => {
        if (! (btn === fillEmptyOptionCloseButton)) {
            btn.disabled = true;
        }
    })
}

function closeFillEmptyPromt () {
    window.scrollTo(0,0);
    sections[current].classList.remove('fade-out');
    fillEmptyOptionDiv.classList.remove('top');
    fillEmptyOptionDiv.classList.remove('active');
    document.querySelectorAll('button').forEach ((btn) => {
        btn.disabled = false;
    })
}

function isValidate (section) {
    let rqText = section.querySelectorAll('input.req, textarea.req');
    let rqDivs = section.querySelectorAll('div.req');
    let istatus = true;
    let dstatus = [];
    rqText.forEach((input) => {
        if (input.value === '') {
            istatus = false;
            input.classList.add('rq-empty');
            document.querySelector('input[id="mail-repeat"]').classList.add('rq-empty');

        } else if (input.getAttribute('id') === 'mail'){
            if (document.querySelector('input[id="mail-repeat"]').value != input.value) {
                istatus = false;
                input.classList.add('rq-empty');
                document.querySelector('input[id="mail-repeat"]').classList.add('rq-empty');
                validateSection.querySelector('h2').innerText = 'Adresy e-mail nie są takie same';
            } else {
                document.querySelector('input[id="mail-repeat"]').classList.remove('rq-empty');
                //validateSection.querySelector('h2').innerText = 'Prosimy o uzupełnienie zaznaczonych pól!';
                input.classList.remove('rq-empty');
            }
        } else if (input === bornDateInput) {
            checkDateValue(input) ? input.classList.remove("rq-empty") : input.classList.add("rq-empty");
        } else {
            input.classList.remove('rq-empty'); 
        }
    });
    rqDivs.forEach((div, index) => {

        // check checkboxes 

        let nl = div.querySelectorAll('div')
        var arr = [];
        for(var i = nl.length; i--; arr.unshift(nl[i]));

        if (arr[arr.length - 1].classList.contains('last-element')) {
            arr.pop()
        }   
        
        dstatus.push(
            arr.some((childDiv) => {

                if (childDiv.querySelectorAll('*').length === 0) {
                    return true;
                }

                if (childDiv.querySelector('input[type="checkbox"]')) {
                    if (childDiv.querySelector('input').checked) {return true;} else {return false;}
                } else if (childDiv.querySelector('p')) {
                    if (childDiv.querySelector('p').innerText != "") {return true;} else {return false;}
                } else if (childDiv.querySelector('input[type="text"], input[type="date"]')) {
                    if (childDiv.querySelector('input').value != "") {return true;} else {return false;}
                } else {
                    return false;
                }
            })
        );
        // }
        if (!dstatus[index]) {
            div.classList.add('rq-empty');
        } else {
            div.classList.remove('rq-empty');
        }
    })    
    if (dstatus.length === 0) {
        dstatus = true;
    } else {
        dstatus = dstatus.every((n) => n === true);
    }
    let status = istatus && dstatus;

    if (!status) {
        window.scrollTo(0,0);
        sections[current].classList.add('fade-out');
        if (validateSection.classList.contains('out')) {
            validateSection.classList.remove('out');
        }
        validateSection.classList.add('top');
        validateSection.classList.add('active');
        document.querySelectorAll('button').forEach((btn) => {
            if (! (btn === validateButton)) {
                btn.disabled = true;
            }
        });
    }

    return status;
}

function closeSectionValidate () {
    validateSection.querySelector('h2').innerText = 'Prosimy o uzupełnienie zaznaczonych pól!';
    window.scrollTo(0,0);
    sections[current].classList.remove('fade-out');
    validateSection.classList.remove('top');
    validateSection.classList.remove('active');
    document.querySelectorAll('button').forEach ((btn) => {
        btn.disabled = false;
    })
}

function showSendingFailedPromt () {
    window.scrollTo(0,0);
    sections[current].classList.add('fade-out');
    failedSendingDiv.classList.add('top');
    failedSendingDiv.classList.add('active');
    document.querySelectorAll('button').forEach ((btn) => {
        if (! (btn === failedSendingAgain || btn === failedSendingDiv )) {
            btn.disabled = true;
        }
    })
}

function closeSendingFailedPromt () {
    window.scrollTo(0,0);
    sections[current].classList.remove('fade-out');
    failedSendingDiv.classList.remove('top');
    failedSendingDiv.classList.remove('active');
    document.querySelectorAll('button').forEach ((btn) => {
        btn.disabled = false;
    })
}

function checkNumberValue () {
    let inputValue = parseInt(teamSizeInput.value);
    if (inputValue < 1) {
        teamSizeInput.value = '1';
    } else if (inputValue > 9999) {
        teamSizeInput.value = '9999';
    }
}

function checkDateValue (input) {
    let inputValue = input.value;
    let year = parseInt(inputValue.slice(0, 4));
    console.log(year);
    if (year < 1995) {
        input.value = `${1995}${inputValue.slice(4, inputValue.length)}`;
    } else if (year > 2006) {
        input.value = `${2006}${inputValue.slice(4, inputValue.length)}`;
    } else {
        return true; // the date is correct 
    }
    return false; // date is not correct
}

submitButton.addEventListener('click', (e) => {
    if (isValidate(e.target.parentElement.parentElement)) {
        sendPostRequest();
    }
})

nextStageButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (isValidate(e.target.parentElement.parentElement)) {
            changeSection(button.getAttribute('to'));
        } else {
            // pokazać formę do uzupełnienia 
        }
    }) 
})
previousStageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        changeSection(button.getAttribute('to'));
    }) 
})

lastPreviousButton.addEventListener('click', (e) => {
    if (typeInputs.querySelector('input[type="radio"]:checked').value === "sam/sama"){
        changeSection(3);
    } else {
        changeSection(5);
    }
})

firstSectionButton.addEventListener ('click', (e) => {
    let to;
    typeInput = document.querySelector("input[name='section-1-radio']:checked");
    if (typeInput.value === "sam/sama") {
        to = 2;
    } else {
        to = 4;
    }
    if (isValidate(e.target.parentElement.parentElement)) {
        changeSection(to);
    } else {
        // pokazać okienko do uzupełnienia 
    }
})

artKindDivs.forEach((div) => {
    genCheckBoxex(div, 'art-kind-options');
})
promotionDivs.forEach((div) => {
    genCheckBoxex(div, 'promotion-options');
})
knowFromDivs.forEach((div) => {
    genCheckBoxex(div, 'know-from-options');
})

withWhoDiv.addEventListener('change', (e) => {
    if (document.querySelector('input[name="with-who-option"]:checked').value === 'with') {
        let parentDiv = e.target.parentElement;
        renderInstances(parentDiv.querySelector('div'))
        addedIntytutions.style.visibility = 'visible';
    } else {
        addedIntytutions.style.visibility = 'hidden';
    }
})
withWhoDivTeam.addEventListener('change', (e) => {
    if (document.querySelector('input[name="team-with-who-option"]:checked').value === 'with') {
        let parentDiv = e.target.parentElement;
        renderInstances(parentDiv.querySelector('div'))
        addedIntytutionsTeam.style.visibility = 'visible';
    } else {
        addedIntytutionsTeam.style.visibility = 'hidden';
    }
})

validateButton.addEventListener('click', () => closeSectionValidate() )

fillEmptyOptionCloseButton.addEventListener('click', () => closeFillEmptyPromt() )

failedSendingAgain.addEventListener('click', () => closeSendingFailedPromt() )

failedSendingHome.addEventListener('click', () => closeSendingFailedPromt() )

teamSizeInput.addEventListener('change', () => checkNumberValue()) 