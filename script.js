window.addEventListener('load' , covidData);
function covidData() {
    //getting data from API
    getData();
    //get state data
    getStateData();
    //getCharts
    getConfirmed();
}
//get country data
function getData() {
    /*
                <div class="col-6 col-lg-3 col-md-3 mt-3 text-center">
                    <h4 class="text-center text-warning">Confirmed</h4>
                    <p class="text-center text-warning inc-conf">[+918]</p>
                    <h5 class="text-center text-warning case-conf">10,78,000</h5>
                </div>
                <div class="col-6 col-lg-3 col-md-3 mt-3 text-center">
                    <h4 class="text-center text-primary">Active</h4>
                    <p class="text-center text-primary inc-act">[+918]</p>
                    <h5 class="text-center text-primary case-act">10,78,000</h5>
                </div>
                <div class="col-6 col-lg-3 col-md-3 mt-3 text-center">
                    <h4 class="text-center text-success">Recovered</h4>
                    <p class="text-center text-success inc-recd">[+918]</p>
                    <h5 class="text-center text-success case-recd">10,78,000</h5>
                </div>
                <div class="col-6 col-lg-3 col-md-3 mt-3 text-center">
                    <h4 class="text-center text-secondary">Deceased</h4>
                    <p class="text-center text-secondary inc-dec">[+918]</p>
                    <h5 class="text-center text-secondary case-dec">10,78,000</h5>
                </div>
    */
    fetch('https://api.covid19india.org/data.json')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let dataTime = data.statewise[0].lastupdatedtime.split(' ');
        let y = dataTime[1].split(':');
        let z = dataTime[0].split('/')
        let a = parseInt(z[1]);
        console.log(dataTime,y,z,a);
        const mainDiv = document.querySelector('.main-div');
        const updateDiv = document.createElement('div');
        updateDiv.className = 'text-center text-secondary';
        updateDiv.classList.add('update-time');
        updateDiv.innerText = ` last updated : \u00A0 ${z[0]} ${monthArr[a-1]} \u00A0 ${y[0]}:${y[1]}`;
        document.querySelector('.cont').appendChild(updateDiv);
        const div1 = document.createElement('div');
        div1.className = 'col-6 col-lg-3 col-md-3 mt-3 text-center';
        div1.style = "background-color : #ffcccb";
        const confirmed1 = document.createElement('h4');
        confirmed1.className = 'text-center text-danger mt-3';
        confirmed1.innerText = 'Confirmed';
        div1.appendChild(confirmed1);
        const incConf = document.createElement('p');
        incConf.className = 'text-center text-danger';
        incConf.classList.add('inc-conf');
        incConf.innerText = `+  ${indianSys(data.statewise[0].deltaconfirmed)}`;
        div1.appendChild(incConf);
        const caseConf = document.createElement('p');
        caseConf.className = 'text-center text-danger';
        caseConf.classList.add('case-conf');
        caseConf.innerText = `${indianSys(data.statewise[0].confirmed)}`;
        div1.appendChild(caseConf);
        mainDiv.appendChild(div1);
        //active
        const div2 = document.createElement('div');
        div2.className = 'col-6 col-lg-3 col-md-3 mt-3 text-center';
        div2.style = "background-color : #FFFF99";
        const active1 = document.createElement('h4');
        active1.className = 'text-center text-warning mt-4';
        active1.innerText = 'Active';
        div2.appendChild(active1);
        const caseAct = document.createElement('p');
        caseAct.className = 'text-center text-warning';
        caseAct.classList.add('case-act');
        caseAct.innerText = `${indianSys(data.statewise[0].active)}`;
        div2.appendChild(caseAct);
        mainDiv.appendChild(div2);
        //recovered
        const div3 = document.createElement('div');
        div3.className = 'col-6 col-lg-3 col-md-3 mt-3 text-center';
        div3.style = "background-color :  #99ffa0";
        const recovered1 = document.createElement('h4');
        recovered1.className = 'text-center text-success mt-3';
        recovered1.innerText = 'Recovered';
        div3.appendChild(recovered1);
        const incRecd = document.createElement('p');
        incRecd.className = 'text-center text-success';
        incRecd.classList.add('inc-recd');
        incRecd.innerText = `+  ${indianSys(data.statewise[0].deltarecovered)}`;
        div3.appendChild(incRecd);
        const caseRecd = document.createElement('p');
        caseRecd.className = 'text-center text-success';
        caseRecd.classList.add('case-recd');
        caseRecd.innerText = `${indianSys(data.statewise[0].recovered)}`;
        div3.appendChild(caseRecd);
        mainDiv.appendChild(div3);
        //deceased
        const div4 = document.createElement('div');
        div4.className = 'col-6 col-lg-3 col-md-3 mt-3 text-secondary';
        div4.style = "background-color :  #d3d3d3";
        const death1 = document.createElement('h4');
        death1.className = 'text-center text-secondary mt-3';
        death1.innerText = 'Deceased';
        div4.appendChild(death1);
        const incDec = document.createElement('p');
        incDec.className = 'text-center text-secondary';
        incDec.classList.add('inc-dec');
        incDec.innerText = `+  ${indianSys(data.statewise[0].deltadeaths)}`;
        div4.appendChild(incDec);
        const caseDec = document.createElement('p');
        caseDec.className = 'text-center text-secondary';
        caseDec.classList.add('case-dec');
        caseDec.innerText = `${indianSys(data.statewise[0].deaths)}`;
        div4.appendChild(caseDec);
        mainDiv.appendChild(div4);
    })
    .catch((err) => {
        alert(error);
    })
}
//get state data
function getStateData() {
   fetch('https://api.covid19india.org/data.json')
   .then((res) => res.json())
   .then((data) => {
       // console.log(data);
        getTable(data.statewise);
        /*
        for(let i=0;i<=data.statewise.length;i++) {
         const td1 = document.createElement('td');
         td1.innerText = data.statewise[i+1].state;
         tr1.appendChild(td1);
         const td2 = document.createElement('td');
         td2.innerText = data.statewise[i+1].confirmed;
         tr1.appendChild(td2);
         const td3 = document.createElement('td');
         td3.innerText = data.statewise[i+1].active;
         tr1.appendChild(td3);
         const td4 = document.createElement('td');
         td1.innerText = data.statewise[i+1].recovered;
         tr1.appendChild(td4);
         const td5 = document.createElement('td');
         td5.innerText = data.statewise[i+1].deaths;
         tr1.appendChild(td5);
         tr1.appendChild(table1);
        }
        */
   })
}
function getTable(data) {
    const table = document.querySelector('.state-list');
    console.log(data);
    for (let i = 1; i < data.length; i++){
        let row = ` 
                   <tr> 
                      <td>${data[i].state}</td>
                      <td style = "background: rgba(126, 41, 41, 0.3); ">
                      <div style = "color : red;">
                      +${data[i].deltaconfirmed}
                      </div>
                     ${indianSys(data[i].confirmed)}
                      </td>
                      <td style = "background: rgba(126, 110, 41, 0.3);">
                      ${indianSys(data[i].active)}
                      </td>
                      <td style = "background: rgba(41, 126, 41, 0.3);" >
                      <div style = "color : green;">
                      +${data[i].deltarecovered}
                      </div>
                      ${indianSys(data[i].recovered)}
                      </td>
                      <td style = "background: rgba(192,192,192,0.18);">
                      <div class = text-secondary">
                      +${data[i].deltadeaths}
                      </div>
                      ${indianSys(data[i].deaths)}
                      </td>
                   </tr> 
                  `       
        table.innerHTML += row;     
    }
}
function indianSys(x) {
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}
function getConfirmed() {
    
    fetch('https://api.rootnet.in/covid19-in/stats/history')
    .then((res) => res.json())
    .then((data) => {
        //console.log(data);
        const xlabel = [];
        for(let i =0;i<data.data.length;i++) {
            xlabel.push(data.data[i].day);
        }
        const dateArr = formatDate(xlabel);
        const data1 = [];
        for(let i =0;i<data.data.length;i++) {
            data1.push(data.data[i].summary.total);
        }

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'line',
    data: {
        labels: xlabel,
        datasets: [
            {
            label: 'confirmed cases in India',
            data: data1,
            backgroundColor: 'rgba(255, 99, 132, 0.45)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1
        },
    ]
    },
    options: {
        responsive : true,
        maintainAspectRatio : true,

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const data2 = [];
        for(let i =0;i<data.data.length;i++) {
            data2.push(data.data[i].summary.discharged);
        }

var ctx1 = document.getElementById('myChart1').getContext('2d');
        var myChart = new Chart(ctx1, {
        type: 'line',
    data: {
        labels: xlabel,
        datasets: [
            {
            label: 'recovered cases in India',
            data: data2,
            backgroundColor: 'rgba(99, 255, 132, 0.45)',
            borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1
        },
    ]
    },
    options: {
        responsive : true,
        maintainAspectRatio : true,

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const data3 = [];
        for(let i =0;i<data.data.length;i++) {
            data3.push(data.data[i].summary.deaths);
        }

var ctx2 = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx2, {
        type: 'line',
    data: {
        labels: xlabel,
        datasets: [
            {
            label: 'deceased cases in India',
            data: data3,
            backgroundColor: 'rgba(128,128,128,0.45)',
            borderColor: 'rgba(128,128,128, 1)',
            borderWidth: 1
        },
    ]
    },
    options: {
        responsive : true,
        maintainAspectRatio : true,

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

} 
)}
function formatDate(dateArray) {
    for (let i = 0; i < dateArray.length; i++) {
        str = dateArray[i].slice(5);
        dateArray[i] = str;
    }
    return dateArray;
}