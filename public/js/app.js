console.log('Client side javascript is loaded')


const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent the browser to reload on form submit

    const location = searchValue.value

    document.getElementById('one').innerHTML = "Loading..."

    fetch(`http://localhost:3000/weather?adresse=${location}`)
    .then((res) => { 
        res.json()
        .then((data) => { 
            if(data.error) {
                document.getElementById('one').innerHTML = `<div class="ellOne">${data.error}</div>`
            } else {
                document.getElementById('one').innerHTML = `<div class="ellOne"><b>Location: </b> ${data.location} <br><br><b>Forecast: </b> ${data.forecast} </div>`
            }
        });
    })
    
})