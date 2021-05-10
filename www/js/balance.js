// setup Région options
html = "";
obj = {
    "1": "Guadeloupe",
    "2": "Martinique",
    "3": "Guyane",
    "4": "La Réunion",
    "6": "Mayotte",
    "11": "Île-de-France",
    "24": "Centre-Val de Loire",
    "27": "Bourgogne-Franche-Comté",
    "28": "Normandie",
    "32": "Hauts-de-France",
    "44": "Grand Est",
    "52": "Pays de la Loire",
    "53": "Bretagne",
    "75": "Nouvelle-Aquitaine",
    "76": "Occitanie",
    "84": "Auvergne-Rhône-Alpes",
    "93": "Provence-Alpes-Côte d'Azur",
    "94": "Corse"
}
var i =0;
for(var key in obj) {
    html += "<option value=" + key  + ">" + obj[key] + "</option>"
}
document.getElementById("region").innerHTML = html;
$("#select_region select").val("11");
$('#region').change(function(){
    region = $(this).val();
    updateBalance()
})


// setup cl age
html = "";
obj = {
    "29": "20-29 ans",
    "39": "30-39 ans",
    "49": "40-49 ans",
    "59": "50-59 ans",
    "69": "60-69 ans",
    "79": "70- 79 ans",
    "89": "80-89 ans"
}
var i =0;
for(var key in obj) {
    html += "<option value=" + key  + ">" + obj[key] + "</option>"
}
document.getElementById("cl_age90").innerHTML = html;
$("#select_cl_age90 select").val("49");
$('#cl_age90').change(function(){
    cl_age90 = $(this).val();
    updateBalance()
})


// setup comorbidité
html = "";
obj = {
    "Aucun": "1",
    "Obésité": "1.63",
    "Diabète": "1.64",
    "Insuffisance cardiaque": "1.44",
    "AVC": "1.33",
    "Maladies respiratoires chroniques": "1.56",
    "Mucoviscidose": "3.74",
    "Embolie pulmonaire": "1.44",
    "Cancers actifs": "1.5",
    "Cancer du poumon actif": "2.6",
    "Polyarthrite rhumatoïde": "1.48",
    "Trisomie 21": "7.03",
    "Recours aux neuroleptiques":"1.61",
    "Epilepsie": "1.52",
    "Sclerose en plaque": "1.74",
    "Paraplégie": "1.95",
    "Myopathie": "1.37",
    "Parkinson": "1.52",
    "Démence": "2.04",
    "Retard mental": "3.83",
    "Hémophilie": "1.47",
    "VIH": "1.88",
    "Maladies du foie": "1.5",
    "Insuffisance rénale chronique terminale": "4.16",
    "Transplantation rénale": "4.55",
    "Transplantation cardiaque": "2.15",
    "Transplantation du poumon": "3.53"
}
var i =0;
for(var key in obj) {
    html += "<option value=" +  obj[key] + ">" + key + "</option>"
}
document.getElementById("commobibity").innerHTML = html;

$('#commobibity').change(function(){
    commobibity = $(this).val()
    updateBalance()
})


$("#sexe select").val("f");
$('input[name=sexe]').change(function(){
    var value = $( 'input[name=sexe]:checked' ).val();
    sexe = value;
    updateBalance()
});

$('input[name=boost]').change(function(){
    var value = $( 'input[name=boost]:checked' ).val();
    boost = value;
    updateBalance()
});

var astrazeneca_risk = {
    29: 5.8,
    39: 4.6,
    49: 5.8,
    59: 3.2,
    69: 3,
    79: 2.2,
    89: 1.2
}

incidence_boost = {
    'high': 1.5,
    'medium': 1,
    'low': 0.5
}

/**
  *
  *  Charting options
  *
  */
var boost = 'medium';
var sexe = 'f';
var cl_age90 = 49;
var commobibity = 1;
var region = 11;
var csvData = [];


function updateBalance() {


   for (let i = 1; i < csvData.length; i++) {

        if( csvData[i][0] == region && csvData[i][1] == cl_age90 ){
            if(sexe == 'f')
                option.series[0].data[0].value = incidence_boost[boost] * commobibity * csvData[i][3] - astrazeneca_risk[cl_age90];
            else
                option.series[0].data[0].value = incidence_boost[boost] *  commobibity * csvData[i][2] - astrazeneca_risk[cl_age90];
            break;
        }
   }


    myChart.setOption(option, true);
}

// Initialize echart object, based on the prepared DOM.
var myChart = echarts.init(document.getElementById('main'));

// Costumize the options and data of the chart.
var option = {
    series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: -65,
        max: 65,
        splitNumber: 5,
        axisLine: {
            lineStyle: {
                width: 6,
                color: [
                    [0.4, '#FF6E76'],
                    [0.6,  '#58D9F9'],
                    [1,'#7CFFB2' ]
                ]
            }
        },
        pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
                color: 'auto'
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            length: 20,
            lineStyle: {
                color: 'auto',
                width: 5
            }
        },
        axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            formatter: function (value) {
                if (value === 0.875) {
                    return '优';
                }
                else if (value === 0.625) {
                    return '中';
                }
                else if (value === 0.375) {
                    return '良';
                }
                else if (value === 0.125) {
                    return '差';
                }
            }
        },
        title: {
            offsetCenter: [0, '-20%'],
            fontSize: 30
        },
        detail: {
            fontSize: 50,
            offsetCenter: [0, '0%'],
            valueAnimation: true,
            formatter: function (value) {
                return Math.round(value);
            },
            color: 'auto'
        },
        data: [{
            value: 0.70,
            name: 'Bénéfice / Risque'
        }]
    }]
};

fetch("https://raw.githubusercontent.com/oalam/covid-analytics/main/data/balance_astrazeneca-2021-05-14.csv") // L'url du service REST
    .then(response => response.text())
    .then(data => {


        // this will return each line as an individual String
        const lines = data.split("\n");

        for (let i = 0; i < lines.length; i++) {
            csvData[i] = lines[i].split(",");
        }
        updateBalance();
    });

// Render the chart on page, using the former data and options.
myChart.setOption(option);