// setup Région options
html = "";
obj_old = {
    "1": "Guadeloupe",
    "2": "Martinique",
    "3": "Guyane",
    "4": "La Réunion",
    "6": "Mayotte",
    "11": "Île-de-France",
    "24": "Centre-Val-de-Loire",
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

obj = {
    "11": "Île-de-France",
    "24": "Centre-Val-de-Loire",
    "27": "Bourgogne-Franche-Comté",
    "28": "Normandie",
    "32": "Hauts-de-France",
    "44": "Grand Est",
    "52": "Pays de la Loire",
    "53": "Bretagne",
    "75": "Nouvelle-Aquitaine",
    "76": "Occitanie",
    "84": "Auvergne-Rhône-Alpes",
    "93": "Provence-Alpes-Côte d'Azur"
}
var i =0;
for(var key in obj) {
    html += "<option value=" + key  + ">" + obj[key] + "</option>"
}
document.getElementById("region").innerHTML = html;
$("#select_region select").val("11");

$('input, select').change(updateBalance);


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


// setup comorbidité
html = "";
obj = {
    "Aucune": "1",
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

$("#sexe select").val("f");

var astrazeneca_risk = {
    29: 5.8,
    39: 4.6,
    49: 5.8,
    59: 3.2,
    69: 3,
    79: 2.2,
    89: 1.2
}

var arn_risk = 1.0

incidence_boost = {
    'high': 1.5,
    'medium': 1,
    'low': 0.5
}

vaccine_efficacity = {
    'astrazeneca' : 0.76,
    'arn': 0.95
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
var vaccin = 'astrazeneca'
var note = ''
var warning = '<b>Avertissements</b><br/>Du côté des bénéfices, seules les admissions en réanimation évitées par la vaccination sont prises en compte. Les autres bénéfices, en particulier les cas de Covid long évités ou la protection de proches vulnérables, n\'ont pas été intégrés.<br/><br/>Du côté des risques, nous avons également pris en compte les cas d\'accidents allergiques graves. Toutefois, ce risque peut drastiquement diminuer pour une personne sans aucun antécédent connu d\'allergie et qui se fait vacciner dans un centre muni d\'auto-injecteurs d\'adrénaline.';
var article_link = '<br/><br/><a href="https://github.com/oalam/covid-analytics/" target="_blank">Voir le code source</a><br/> <a href="https://www.mediapart.fr/journal/france/120521/vaccins-covid-calculez-votre-balance-benefice-risque-personnelle" target="_blank">Voir notre méthodologie</a>'

var warning_arn_neg = '<br/><b>Attention: </b>les risques représentent ici les cas d\'accidents allergiques graves. Nous révisons actuellement nos calculs pour pondérer ce risque en fonction des antécédents allergiques. Pour une personne sans aucun antécédent connu d\'allergie et qui se fait vacciner dans un centre muni d\'auto-injecteurs d\'adrénaline, le risque est inférieur à celui indiqué ici.'

function updateBalance() {
    var formData = $('form').serializeArray();
    for(var d in formData){
        switch(formData[d].name){
            case "sexe":
                sexe = formData[d].value;
                break;
            case "vaccin":
                vaccin = formData[d].value;
                break;
            case "commobibity":
                commobibity = formData[d].value;
                break;
            case "boost":
                boost = formData[d].value;
                break;
            case "region":
                region = formData[d].value;
                break;
            case "cl_age90":
                cl_age90 = formData[d].value;
                break;
        }
    }
    console.log(formData);


   for (let i = 1; i < csvData.length; i++) {

        if( csvData[i][0] == region && csvData[i][1] == cl_age90 ){
            if(sexe == 'f'){
                if(vaccin == 'astrazeneca'){
                    option.series[0].data[0].value = 0.76 * incidence_boost[boost] * commobibity * csvData[i][3] / astrazeneca_risk[cl_age90];
                }else{
                    option.series[0].data[0].value = 0.95 * incidence_boost[boost] * commobibity * csvData[i][3] / 0.4;
                }
            }

            else{
                 if(vaccin == 'astrazeneca'){
                    option.series[0].data[0].value = 0.76 * incidence_boost[boost] *  commobibity * csvData[i][2] / astrazeneca_risk[cl_age90];
                 }else{
                    option.series[0].data[0].value = 0.95 * incidence_boost[boost] *  commobibity * csvData[i][2] / 0.4;
                 }
            }
            break;
        }
   }
   myChart.setOption(option, true);
   var value = option.series[0].data[0].value;

   if(value<=1){
    note = '<b>Résultat :</b> le nombre d\'admissions en réanimation que cette vaccination permet d\'éviter durant quatre mois est <b>inférieur</b> aux risques graves liés aux injections du vaccin.';    
    if(vaccin=='arn')
        note += warning_arn_neg;
   }else if(value <=2){
    note = '<b>Résultat :</b> le nombre d\'admissions en réanimation que cette vaccination permet d\'éviter durant quatre mois est <b>du même ordre de grandeur</b> que les risques graves liés aux injections du vaccin.';
   }else{
    note = '<b>Résultat :</b> le nombre d\'admissions en réanimation que cette vaccination permet d\'éviter durant quatre mois est <b>plus de deux fois supérieur</b> aux risques graves liés aux injections du vaccin.';
   }

   $("#warning").html(warning+article_link);
   $("#note").html(note);
}

// Initialize echart object, based on the prepared DOM.
var myChart = echarts.init(document.getElementById('main'),{width:'600px',height:'300px'});


// Costumize the options and data of the chart.
var option = {
    series: [{
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 4,
        splitNumber: 8,
        axisLine: {
            lineStyle: {
                width: 6,
                color: [
                    [0.25, '#CB1500'],
                    [0.50,  '#067F9D'],
                    [1,'#008537' ]
                ]
            }
        },
        pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 25,
            offsetCenter: [0, '-55%'],
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
            align: 'center',
            color: '#464646',
            fontSize: 14,
            distance: -85,
            formatter: function (value) {
                if (value === 0.5) {
                    return 'balance\nnégative';
                }
                else if (value === 1.5) {
                    return 'balance\nneutre';
                }
                else if (value === 3) {
                    return 'balance\npositive';
                }
            }
        },
        title: {
            offsetCenter: [0, '-5%'],
            fontSize: 20
        },
        detail: {
            fontSize: 50,
            offsetCenter: [0, '0%'],
            valueAnimation: true,
            formatter: function (value) {
                return value.toFixed(2);
            },
            color: 'auto',
            show: false
        },
        data: [{
            value: 0.70,
            name: 'Risque / \nBénéfice'
        }]
    }]
};

fetch("https://raw.githubusercontent.com/oalam/covid-analytics/main/data/balance.csv") // L'url du service REST
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
