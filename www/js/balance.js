
$('input[name=sexe]').change(function(){
var value = $( 'input[name=sexe]:checked' ).val();
alert(value);
});
$('#commobibity').change(function(){
    alert($(this).val());
})
$('#region').change(function(){
    alert($(this).val());
})

// Initialize echart object, based on the prepared DOM.
var myChart = echarts.init(document.getElementById('main'));
// var myChart = echarts.init($('#main').get(0));

// Costumize the options and data of the chart.
var option = {};

fetch("https://raw.githubusercontent.com/oalam/covid-analytics/main/data/incidence_rea_reg_cl_age-2021-05-14.csv") // L'url du service REST
    .then(response => response.text())
    .then(data => {
        // create empty array
        const csvData = [];

        // this will return each line as an individual String
        const lines = data.split("\n");

        for (let i = 0; i < lines.length; i++) {
            csvData[i] = lines[i].split(",");
        }
        console.log(csvData);
       /* let option = {
            series: [
                {
                    type: 'line',
                    data: r.values, // on lit un bout du JSON, là
                },
            ]
        };
        myChart.setOption(option);*/
    });

// Render the chart on page, using the former data and options.
myChart.setOption(option);