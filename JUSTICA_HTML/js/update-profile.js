const token = localStorage.getItem('token');
        //console.log('token is '+token);
        if(!token)
        {
            window.location.href = "login.html";
            document.getElementById("login-error-msg").innerHTML('Session expired, Please login again.');
            document.getElementById("login-error-msg").hidden=false;
        }

        const updateProfileErrorMsg = document.getElementById("update-profile-error-msg");

        

        async function sendRequestWithToken(apiPath,data)
        {
            const reponse= await fetch("http://localhost:8081/api/"+apiPath,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token':''+localStorage.getItem('token')+'',
                },
                body: JSON.stringify(data)
            });
        
            var data=reponse.json();
            return data;
            
        } 
        async function sendRequestWithOutToken(apiPath,data)
        {
            const reponse= await fetch("http://localhost:8081/api/"+apiPath,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            var data=reponse.json();
            return data;
            
        }


        const namev= document.getElementById("update-profile-name");        
        const emailv= document.getElementById("update-profile-email");        
        const mobilev= document.getElementById("update-profile-mobile");        
        const Malev= document.getElementById("update-profile-male");        
        const Femalev= document.getElementById("update-profile-female");        
        const experiencev= document.getElementById("update-profile-experience");        
        const dobv= document.getElementById("update-profile-dob");        
        const streetv= document.getElementById("update-profile-address");        
        const submitbtn= document.getElementById("update-profile-submitbtn");        
        const cancelbtn= document.getElementById("update-profile-cancelbtn");        
        const successMsg= document.getElementById("update-profile-success-msg");        
        const errorMsg= document.getElementById("update-profile-error-msg");        
        const selectCountryv= document.getElementById("update-profile-selectCountry");        
        const selectStatev= document.getElementById("update-profile-selectState");        
        const selectCityv= document.getElementById("update-profile-selectCity");        

        cancelbtn.addEventListener("click",(e)=>{
            window.location.href="profile-home.html";
        });



var selectCountry=sendRequestWithOutToken("country/getCountryList",{} );

var selectCity=sendRequestWithOutToken("country/getCountryList",{} );
var profileOutput=sendRequestWithToken("lawyer/getProfile",{} );

selectCountry.then(data=>{
    //data.obj;

    for (const element of data.obj) {
        //console.log(data.obj[i].name);
        var option = document.createElement("option");
        option.value = element.id;
        option.text = element.name;
        selectCountryv.add(option);
    }
});

selectCountryv.addEventListener("change",(e)=>{
    console.log("click ont the country,");
    if(selectCountryv.value !="None")
    {
        console.log(selectCountryv.value);
        var StateData=sendRequestWithOutToken("state/getStateListByCountryId",{countryId:selectCountryv.value});
        console.log(StateData);
        StateData.then(data=>{
            console.log(data.code);
            if(data.code=="200")
            {
                console.log(data.obj);

                selectStatev.innerHTML=null;
                var option = document.createElement("option");
                option.value ='None';
                option.text = 'None';
                
                selectStatev.add(option);
                for (const element of data.obj) 
                {
                    console.log(element.name);
                    var option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.name;
                    
                    selectStatev.add(option);
                    // html += '<option value='+data.obj[i].id+' >' + data.obj[i].name + '</option>';
                }
            }else{
                successMsg.hidden=true;
                errorMsg.innerHTML = data.obj;
                errorMsg.hidden = false;
            }
        });
    }else
    {
        successMsg.hidden=true;
        errorMsg.innerHTML = "Please Select Country.";
        errorMsg.hidden = false;
    }
    

});

selectStatev.addEventListener("change",(e)=>{
    console.log("click on the State,");
    if(selectCountryv.value !="None")
    {
        console.log(selectStatev.value);
        var StateData=sendRequestWithOutToken("city/getCityListByStateId",{stateId:selectStatev.value});
        console.log(StateData);
        StateData.then(data=>{
            console.log(data.code);
            if(data.code=="200")
            {
                console.log(data.obj);

                selectCityv.innerHTML=null;
                var option = document.createElement("option");
                option.value ='None';
                option.text = 'None';
                
                selectCityv.add(option);
                for (const element of data.obj) 
                {
                    console.log(element.name);
                    var option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.name;
                    
                    selectCityv.add(option);
                    // html += '<option value='+data.obj[i].id+' >' + data.obj[i].name + '</option>';
                }
            }else{
                successMsg.hidden=true;
                errorMsg.innerHTML = data.obj;
                errorMsg.hidden = false;
            }
        });
    }else
    {
        successMsg.hidden=true;
        errorMsg.innerHTML = "Please Select State.";
        errorMsg.hidden = false;
    }

});


// submitbtn.addEventListener("click", (e)=>{
    

//     // profileOutput.then((e=>{

//     // }));
//     var data={
//         name:namev.value,
//         email:emailv.value,
//         experience: experiencev.value,
//         mobile:mobilev.value,
//         gender:genderv,
//     }
// });




profileOutput.then((dataString=>{
    if(dataString.code=="200")
    {
        //console.log(dataString);
        
        namev.value=dataString.obj.name;
        emailv.value=dataString.obj.email;
        mobilev.value=dataString.obj.mobile;
        dobv.value=dataString.obj.dob;
        experiencev.value=dataString.obj.experience;
        streetv.value=dataString.obj.address;

    }else{
        errorMsg.innerText=dataString.obj;
        errorMsg.hidden=false;
    }

}));


submitbtn.addEventListener("click",(e=>{
    console.log(selectCityv.value);
    if(selectCityv.value=="None"){
        successMsg.hidden=true;
        errorMsg.innerHTML = "Please Select city.";
        errorMsg.hidden = false;
    }else{
        var gendervalue;
    
        if(Malev.checked){
            gendervaluegendervalue=Malev.value;
        }else{
            gendervaluegendervalue=Femalev.value;
        }
        var data={
            id: null,
            name:namev.value,
            email:emailv.value,
            mobile:mobilev.value,
            experience:experiencev.value,
            gender:gendervalue,
            dob:dobv.value,
            city_id:parseInt(selectCityv.value),
            address:streetv.value

        }
        var profileMesssage=sendRequestWithToken("lawyer/updateProfile",data );

        profileMesssage.then((dataString=>{
            if(dataString.code=="200")
            {
                errorMsg.hidden=true;
                successMsg.innerText=dataString.obj;
                successMsg.hidden=false;
                alert(dataString.obj);
                window.location.href = 'profile-home.html';

            }else
            {
                successMsg.hidden=true;
                errorMsg.innerText=dataString.obj;
                errorMsg.hidden=false;
            }
        }));
    }
    
    
    
}));