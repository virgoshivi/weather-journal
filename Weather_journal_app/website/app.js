/* Global Variables */
const endpoint = "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "3d1a9f5574d6f59179c7381203bbf515";
var zip;
const entries = [];

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
document.getElementById("generate").addEventListener('click', performAction);

async function performAction (e) {
    e.preventDefault();
    e.stopPropagation();
    zip = document.getElementById("zip").value;
    const content = document.getElementById('feelings').value;
    const data = await getData(endpoint, zip, key);
    Object.assign(data, { 
        newDate,
        content
    });
    const entry = await postData('/', data);
    const element = document.getElementById("entryHolder");
    elementKeys = Object.keys(entry);
    elementKeys.forEach(info => {
        let upperCase = info.toUpperCase();
        document.getElementById(info).innerHTML = upperCase + ' is ' + entry[info];
 

    });
};


const getData = async (endpoint, zip, key) => {
    const fetchApi = endpoint+zip+",us&appid="+key;
    const res = await fetch(fetchApi);
    try {
            const data = await res.json();
            console.log(data)
            return data;
        }
    catch(error){
            console.log("error", error);
        }
};


// POST to store locally user-input data

const postData = async(url ='/', data = {})=>{
    console.log(JSON.stringify(data));
    const res = await fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log("Client" , newData);
        return newData;
    }
catch(error){
        console.log("error", error);
    }
};



