const Url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdowns=document.querySelectorAll(".From-To select");
const btn=document.querySelector("form button");
const msg=document.querySelector(".msg");
const fcurr=document.querySelector(".from select");
const tcurr=document.querySelector(".to select");
const coins=new Audio('mario_coin_sound.mp3');
for(let select of dropdowns){
    for(currency in countryList)
    {
        let newOpt=document.createElement("option");
        newOpt.innerText=currency;
        newOpt.value=currency;
        if(select.name==="from" && currency==="USD")
        {
            newOpt.selected="selected";
        }
        else if(select.name==="to" && currency==="INR"){
            newOpt.selected="selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
};
const updateflag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    nsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=nsrc;
};
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amt=document.querySelector(".Amount input");
    let amtval=amt.value;
    if(amtval==="" || amtval<1)
    {
        amtval=1;
        amt.value="1";
    }
    const URL=`https://v6.exchangerate-api.com/v6/afb0ebb9d423e2a361ce8d20/latest/${fcurr.value.toLowerCase()}`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate=data.conversion_rates[tcurr.value];
    let finalamt=amtval*rate;
    msg.innerText=`${amtval} ${fcurr.value} = ${finalamt} ${tcurr.value}`;
    coins.play();
});