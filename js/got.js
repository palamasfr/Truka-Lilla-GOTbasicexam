function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    showCharactersList(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    showAliveCharacters(userDatas);
    sortByName(userDatas);
    showCharacterList(userDatas);
    searchCharacter(userDatas);
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/aJsonFileodNeve.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function showAliveCharacters(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].dead !== true) {
            result.push(arr[i]);
        }
    }
    return result;
}

function sortByName(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var orderedCharacters = arr[i].name.localeCompare(arr[j].name);
            if (orderedCharacters > 0) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

/**
 * @param {Array} listSource
 */

function showCharactersList(listSource) {
    var container = document.querySelector('.left');
    var listDiv = createListDiv(container);
    for (let i = 0; i < listSource.length; i++) {
        createPortrait(listDiv, listSource[i]);
    }
}

function createListDiv(container) {
    var listDiv = container.querySelector('.list-div');
    if (!listDiv) {
        listDiv = document.createElement('div');
        listDiv.className = 'list-div';
        container.appendChild(listDiv);
    }
    return listDiv;
}

function createPortrait(list, portrait) {
    var itemDiv = document.createElement('div');
    itemDiv.className = 'character-portrait';
    itemDiv.image = portrait;
    itemDiv.onclick = function (ev) {
        createOnePortrait(this.image);
    }

    var img = document.createElement('img');
    img.src = '/img/' + portrait.image;
    img.alt = portrait.name;

    var span = document.createElement('span');
    span.innerHTML = portrait.model;

    itemDiv.appendChild(img);
    itemDiv.appendChild(span);

    list.appendChild(itemDiv);

}

function searchCharacter() {
    var inputValue = document.querySelector('#search-text').value;
    var list = document.querySelector('.right');
    for (var i = 0; i < list.length; i++) {
        if (list[i].arr.name.toLoweCase().indexOf(this.value.toLowerCase()) < 0) {
            list[i].style.display = 'none';
            alert('Character not found')
        } else {
            list[i].style.display = 'block';
        }
    }
}

document.querySelector('#search-button').onclick = searchCharacter;