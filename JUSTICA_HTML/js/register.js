
const URL="http://localhost:8081/api/"; 


const registrationForm = document.getElementById("registration-form");
const registrationButton = document.getElementById("registration-form-submit");
const registrationErrorMsg = document.getElementById("registration-error-msg");
const registrationFormSelectCountry = document.getElementById("registration-form-selectCountry");
const registrationFormSelectState = document.getElementById("registration-form-selectState");
const registrationFormSelectCity = document.getElementById("registration-form-selectCity");


var html = '';

fetch(URL + 'country/getCountryList', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(null)
}).then((response) => response.json())
// Then with the data from the response in JSON....then((data) => {
    .then((data) => {
    //console.log('Success:', data);
    //console.log('Success:', data.obj);
    data.obj;

    for (var i = 0; i < data.obj.length; i++) {
        console.log(data.obj[i].name);
        var option = document.createElement("option");
        option.value = data.obj[i].id;
        option.text = data.obj[i].name;
        registrationFormSelectCountry.add(option);
        // html += '<option value='+data.obj[i].id+' >' + data.obj[i].name + '</option>';
    }

    // Rdata = data;
});

registrationFormSelectCountry.addEventListener("change", (e) => {
    console.log('click in country');


    var selectedvalue = registrationFormSelectCountry.value;
    if (selectedvalue == 'None') {
        registrationErrorMsg.innerHTML = "Please select Country.";
        registrationErrorMsg.hidden = false;
    } else {
        fetch(URL + 'state/getStateListByCountryId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({countryId:selectedvalue})
        }).then((response) => response.json())
        // Then with the data from the response in JSON....then((data) => {
            .then((data) => {
            //console.log('Success:', data);
            console.log('Success:', data.obj);
            //data.obj;
            if (data.code == "200") {
                var html = '';
                registrationFormSelectState.innerHTML=null;
                var option = document.createElement("option");
                option.value ='None';
                option.text = 'None';
                
                registrationFormSelectState.add(option);
                for (var i = 0; i < data.obj.length; i++) {
                    console.log(data.obj[i].name);
                    var option = document.createElement("option");
                    option.value = data.obj[i].id;
                    option.text = data.obj[i].name;
                    
                    registrationFormSelectState.add(option);
                    // html += '<option value='+data.obj[i].id+' >' + data.obj[i].name + '</option>';
                }
            } else {
                registrationErrorMsg.innerHTML = list.obj;
                registrationErrorMsg.hidden = false;
            }   
            

            // Rdata = data;
        }).catch((error) => {
            console.error('Error:', error);
            registrationErrorMsg.innerHTML = error;
            registrationErrorMsg.hidden = false;;
        });
    }
})


registrationFormSelectState.addEventListener("change", (e) => {
    console.log('click in State');


    var selectedvalue = registrationFormSelectState.value;
    if (selectedvalue == 'None') {
        registrationErrorMsg.innerHTML = "Please select State.";
        registrationErrorMsg.hidden = false;
    } else {
        fetch(URL + 'city/getCityListByStateId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({stateId:selectedvalue})
        }).then((response) => response.json())
        // Then with the data from the response in JSON....then((data) => {
            .then((data) => {
            //console.log('Success:', data);
            console.log('Success:', data.obj);
            //data.obj;
            if (data.code == "200") {
                var html = '';
                registrationFormSelectCity.innerHTML=null;
                var option = document.createElement("option");
                option.value ='None';
                option.text = 'None';
                
                registrationFormSelectCity.add(option);
                for (var i = 0; i < data.obj.length; i++) {
                    console.log(data.obj[i].name);
                    var option = document.createElement("option");
                    option.value = data.obj[i].id;
                    option.text = data.obj[i].name;
                    
                    registrationFormSelectCity.add(option);
                    // html += '<option value='+data.obj[i].id+' >' + data.obj[i].name + '</option>';
                }
            } else {
                registrationErrorMsg.innerHTML = list.obj;
                registrationErrorMsg.hidden = false;
            }
            

            // Rdata = data;
        }).catch((error) => {
            console.error('Error:', error);
            registrationErrorMsg.innerHTML = error;
            registrationErrorMsg.hidden = false;
        });
    }
})


// Registration API
registrationButton.addEventListener("click", (e) => { // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const varname = registrationForm.name.value;
    console.log(name);
    const varemail = registrationForm.email.value;
    const varmobile = registrationForm.mobile.value;
    const varpassword = registrationForm.password.value;
    const varlicenseNo = registrationForm.licenseNo.value;
    // const varaddress = registrationForm.address.value;
    const vardob = registrationForm.dob.value;
    if(registrationFormSelectCity.value=='None')
    {
        registrationErrorMsg.innerHTML = 'Please select location properly.';
        registrationErrorMsg.hidden = false;
    }

    const data = {
        email: varemail,
        name: varname,
        mobile: varmobile,
        password: varpassword,
        dob: vardob,
        experience: null,
        licenseNo: varlicenseNo,
        fees: null,
        image: null,
        address: registrationForm.address.value,
        city_id: registrationFormSelectCity.value

    }
    console.log(data);
    fetch(URL + 'lawyer/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
    // Then with the data from the response in JSON....then((data) => { // console.log('Success:', data);
        if (data.code == '201') {
            console.log(data.obj);
            registrationErrorMsg.innerHTML = data.obj;
            registrationErrorMsg.hidden = false;

        } else if (data.code == '200') {
            console.log(data.obj);
            window.location.href = 'login.html';
            alert("You have Registered successfully.");
        }
    });
    // Then with the error genereted....catch((error) => {
       
    // if (varusername !=null && varpassword !=null) { // If the credentials are valid, show an alert box and reload the page


    //     //httpPost("https://localhost:44325/api/admin/login")
    //     //alert("You have successfully logged in.");
    //     //location.reload();
    // } else { // Otherwise, make the login error message show (change its oppacity)
    //     loginErrorMsg.style.opacity = 1;
    // }


/* #endregion */
