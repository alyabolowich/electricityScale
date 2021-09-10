/* Dictionary of electric power plants. Keys are the names of the 
power plants, values are an array, where the first value is the output (in MWh),
the second is the location, and the third is the land area (for PV/Wind). */

var plants = {
    "hydro": [
        {name: "Pico Hydro Schemes", value: 1, region: "anywhere"},
        {name: "Hoover Dam", value: 11000, region: "USA"},
        {name: "Three Gorges Dam", value: 270000, region: "China"},
        {name: "Itaipu Dam", value: 282000, region: "Brazil"}
    ],

    "nuclear": [
        {name: "Kaiga", value: 6100, region: "India"},
        {name: "Torness", value: 26000, region: "UK"},
        {name: "Nine Mile Point", value: 38000, region: "USA"},
        {name: "Civaux", value: 65000, region: "France"},
        {name: "Fukushima", value: 95000,region: "Japan"},
        {name: "Bruce", value: 138000, region: "Canada"},
    ],

    "naturalGas": [
        {name: "Jebel Ali", value: 100, region: "UAE"},
        {name: "Surgut-2", value: 100, region: "Russia"},
        {name: "Battle River", value: 100, region: "Canada"},
        {name: "Volta Power", value: 100, region: "Germany"},
    ],

    "coal": [
        {name: "Kahone", value: 1600, region: "Senegal"},
        {name: "Arnot", value: 36000, region: "South Africa"},
        {name: "Gibson", value: 51000, region: "USA"},
        {name: "Mundra Thermal Station", value: 71000, region: "India"},
        {name: "Tuoketuo", value: 100, region: "China"}
    ],

    "geothermal": [
        {name: "The Geysers", value: 23000, region: "USA"},
        {name: "San Martino", value: 700, region: "Italy"}
    ],

    "onshoreWind": [
        {name: "Alta Energy Center", value: 7342, region: "USA", landarea: "13 km\u33A2"},
        {name: "Muppandal Farm", value: 5400, region: "India", landarea: "0 km\u33A2"}, //need to fix land area
        {name: "Whitelee Farm", value: 3500, region: "UK", landarea: "55 km\u33A2"},
        {name: "Mt Stuart Farm", value: 70, region: "New Zealand", landarea: "<1 km\u33A2"}
    ],

    "solarPV": [
        {name: "Bhadla Solar Park", value: 100, region: "India", landarea: "0 km\u33A2"},
        {name: "Tengger Desert", value: 7200, region: "China", landarea: "43 km\u33A2"},
        {name: "Topaz", value: 3466, region: "USA", landarea: "24.6 km\u33A2"},
        {name: "Quaid-e-Azam", value: 2740, region: "Pakistan", landarea: "26 km\u33A2"},
        {name: "Jarqavieh", value: 48, region: "Iran", landarea: "0.2 km\u33A2"}
    ],

    "offshoreWind": [
        {name: "London Array", value: 6800, region: "UK", landarea: "122 km\u33A2"},
        {name: "Anholt Farm", value: 4675, region: "Denmark", landarea: "116km\u33A2"},
        {name: "DanTysk", value: 3562, region: "Germany", landarea: "66km\u33A2"},
        {name: "Thanet Farm", value: 2247, region: "UK", landarea: "35km\u33A2"},
        {name: "Utgrunden Farm", value: 80, region: "Sweden", landarea: "<1km\u33A2"}
    ]};

const DUMMY_DATA = [
    {id: 'd1', value: 10, region: 'USA'},
    {id: 'd2', value: 11, region: 'India'},
    {id: 'd3', value: 13, region: 'China'},
    {id: 'd4', value: 9, region: 'Germany'}
]

// Funcntion to calculate position on x axis

// scale band, means all bars will ahve same width
// rangeround will tell which space is available. from->0 array of size available
// padding defines a % padding between items

/*8
const xScale = d3.scaleBand()
                .domain(plants.(datapt => Object.keys(plants)))
                .rangeRound([0,250])
                .padding(0.1);
                */

// scale linear deals with y axis. calculate the right height for the datapoints
// domain allows us to specify the min/max values 
// range fills in actual available space in pixels. start iwth max val and go to bottom
// range starts at top because d3 uses top left corner of coordinate system
const yScale = d3.scaleLinear().domain([0,15]).range([200,0]);

const container = d3.select('svg')
    .classed('container', true);


const bars = container
    .selectAll('.bar')
    .data(plants)
    .enter() // gives all elements that are not yet rendered
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth()) // takes avail width and divides by # datapts including padding
    .attr('height', (data) => 200-yScale(data.value))
    .attr('x', data => xScale(data.region)) // becuase we used regions as domain for xscale, so d3 knows of region names
    .attr('y', data => yScale(data.value)); // account for range and min/max values

