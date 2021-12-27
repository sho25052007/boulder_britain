const Boulder = require('./models/boulder');
const Location = require('./models/location');
const mongoose = require('mongoose');

if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/boulderBritain';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connect('mongodb://localhost:27017/boulderBritain', { useNewUrlParser:true, useUnifiedTopology:true })
.then(() => { console.log("MONGO CONNECTED!") })
.catch(err => { console.log("ERROR OCCURRED!", err) })

const locations = [
    {
        area: "The South West",
        place: "Clodgy",
        latitude: 50.214577,
        longitude: -5.48471
    },
    {
        area: "The South West",
        place: "Godrevy",
        latitude: 50.238669,
        longitude: -5.392967
    },
    {
        area: "The South West",
        place: "Carn Brea",
        latitude: 50.221463,
        longitude: -5.246336
    },
    {
        area: "The South West",
        place: "Helman Tor",
        latitude: 50.420372,
        longitude: -4.729421
    },
    {
        area: "The South West",
        place: "Downderry",
        latitude: 50.361534,
        longitude: -4.365483
    },
    {
        area: "The South West",
        place: "Pednvounder",
        latitude: 50.050264,
        longitude: -5.641587
    },
    {
        area: "The South West",
        place: "Gwynver",
        latitude: 50.088767,
        longitude: -5.685592
    },
    {
        area: "The South West",
        place: "Pentire",
        latitude: 50.585253,
        longitude: -4.916897
    },
    {
        area: "The South West",
        place: "Mother Ivey's Bay",
        latitude: 50.540749,
        longitude: -5.014679
    },
    {
        area: "The South West",
        place: "Tintagel North",
        latitude: 50.667403,
        longitude: -4.753218
    },
    {
        area: "The South West",
        place: "Northcott Mouth",
        latitude: 50.847322,
        longitude: -4.553007
    },
    {
        area: "The South West",
        place: "Hartland Quay",
        latitude: 50.99427,
        longitude: -4.534049
    },
    {
        area: "The South West",
        place: "Combeshead Tor",
        latitude: 50.506013,
        longitude: -4.019934
    },
    {
        area: "The South West",
        place: "Bonehill Rocks",
        latitude: 50.583128,
        longitude: -3.791614
    },
    {
        area: "The South West",
        place: "Hound Tor",
        latitude: 50.598984,
        longitude: -3.78244
    },
    {
        area: "The South West",
        place: "Saddle Tor",
        latitude: 50.571709,
        longitude: -3.769319
    },
    {
        area: "The South West",
        place: "Honeybag Tor",
        latitude: 50.593790,
        longitude: -3.797950
    },
    {
        area: "The South West",
        place: "Smallacombe",
        latitude: 50.590836,
        longitude: -3.760322
    },
    {
        area: "The South West",
        place: "Bearacleave",
        latitude: 50.601948,
        longitude: -3.670868
    },
    {
        area: "The South West",
        place: "Stonelands",
        latitude: 50.605162,
        longitude: -3.669762
    },
    {
        area: "The South West",
        place: "Cuttings",
        latitude: 50.539827,
        longitude: -2.431565
    },
    {
        area: "The South West",
        place: "Neddyfields",
        latitude: 50.531468,
        longitude: -2.437876
    },
    {
        area: "The South West",
        place: "The Agglestone",
        latitude: 50.636656,
        longitude: -1.977239
    },
    {
        area: "The South West",
        place: "Lynmouth",
        latitude: 51.230827,
        longitude: -3.830945
    },
    {
        area: "The South West",
        place: "Guernsey",
        latitude: 49.496843,
        longitude: -2.569343
    },
    {
        area: "The South West",
        place: "Jersey",
        latitude: 49.206742,
        longitude: -2.126073
    },
    {
        area: "The South West",
        place: "Biblins Cave",
        latitude: 51.837554,
        longitude: -2.657955
    },
    {
        area: "The South West",
        place: "Huntsham",
        latitude: 51.849389,
        longitude: -2.640377
    },
    {
        area: "The South West",
        place: "Haresfield",
        latitude: 51.775886,
        longitude: -2.24546
    },
    {
        area: "The South West",
        place: "Gollum's Cave",
        latitude: 51.458683,
        longitude: -2.626607
    },
    {
        area: "The South West",
        place: "The New Quarry",
        latitude: 51.467353,
        longitude: -2.632411
    },
    {
        area: "The South West",
        place: "Bourton Combe",
        latitude: 51.418265,
        longitude: -2.708044
    },
    {
        area: "The South West",
        place: "Toll Road Crags",
        latitude: 51.358209,
        longitude: -2.991323
    },
    {
        area: "The South West",
        place: "Bathford",
        latitude: 51.382649,
        longitude: -2.29758
    },
    {
        area: "Wales",
        place: "Porth Ysgo",
        latitude: 52.810261,
        longitude: -4.654065
    },
    {
        area: "Wales",
        place: "Bryn Hel",
        latitude: 53.089739,
        longitude: -4.049782
    },
    {
        area: "Wales",
        place: "Cromlech",
        latitude: 53.089739,
        longitude: -4.049782
    },
    {
        area: "Wales",
        place: "Wavelength",
        latitude: 53.090687,
        longitude: -4.053311
    },
    {
        area: "Wales",
        place: "Dinas Mot",
        latitude: 53.089739,
        longitude: -4.049782
    },
    {
        area: "Wales",
        place: "Mallory Boulder",
        latitude: 53.083515,
        longitude: -4.000669
    },
    {
        area: "Wales",
        place: "RAC Boulders",
        latitude: 53.095764,
        longitude: -3.94796
    },
    {
        area: "Wales",
        place: "Caseg Area",
        latitude: 53.176399,
        longitude: -4.051037
    },
    {
        area: "Wales",
        place: "Sheep Pen",
        latitude: 53.139817,
        longitude: -4.029536
    },
    {
        area: "Wales",
        place: "Ogwen Gems",
        latitude: 53.123057,
        longitude: -3.998285
    },
    {
        area: "Wales",
        place: "Caseg Fraith",
        latitude: 53.123419,
        longitude: -3.966365
    },
    {
        area: "Wales",
        place: "Elephantitus",
        latitude: 53.052174,
        longitude: -4.016733
    },
    {
        area: "Wales",
        place: "Crafnant",
        latitude: 53.124561,
        longitude: -3.884306
    },
    {
        area: "Wales",
        place: "Rhiw Goch",
        latitude: 53.068855,
        longitude: -3.851499
    },
    {
        area: "Wales",
        place: "Carraeg Hylldrem",
        latitude: 52.967445,
        longitude: -4.063557
    },
    {
        area: "Wales",
        place: "The Tubes",
        latitude: 53.068806,
        longitude: -3.790208
    },
    {
        area: "Wales",
        place: "Cae Du",
        latitude: 52.632412,
        longitude: -4.115539
    },
    {
        area: "Wales",
        place: "Moelfre",
        latitude: 53.352306,
        longitude: -4.236367
    },
    {
        area: "Wales",
        place: "Parisella's Cave",
        latitude: 53.332532,
        longitude: -3.831528
    },
    {
        area: "Wales",
        place: "The Gop",
        latitude: 53.307603,
        longitude: -3.365908
    },
    {
        area: "Wales",
        place: "Tremeirchion",
        latitude: 53.252234,
        longitude: -3.381215
    },
    {
        area: "Wales",
        place: "Pantymwyn",
        latitude: 53.173068,
        longitude: -3.209295
    },
    {
        area: "South Wales",
        place: "Mynydd Dinas",
        latitude: 51.994341,
        longitude: -4.890547
    },
    {
        area: "South Wales",
        place: "Maiden Castle",
        latitude: 51.888028,
        longitude: -4.971871
    },
    {
        area: "South Wales",
        place: "Plumstone",
        latitude: 51.870059,
        longitude: -5.024625
    },
    {
        area: "South Wales",
        place: "Pembroke",
        latitude: 51.838431,
        longitude: -5.110769
    },
    {
        area: "South Wales",
        place: "Bacon Hole",
        latitude: 51.567114,
        longitude: -4.087728
    },
    {
        area: "South Wales",
        place: "Dinas Rock",
        latitude: 51.759394,
        longitude: -3.578711
    },
    {
        area: "South Wales",
        place: "Ogmore-by-Sea",
        latitude: 51.460612,
        longitude: -3.631411
    },
    {
        area: "The North West",
        place: "Fairy Steps",
        latitude: 54.20214,
        longitude: -2.803059
    },
    {
        area: "The North West",
        place: "Torwbarrow",
        latitude: 54.171981,
        longitude: -2.796471
    },
    {
        area: "The North West",
        place: "Woodwell",
        latitude: 53.252234,
        longitude: -3.381215
    },
    {
        area: "The North West",
        place: "Warton",
        latitude: 54.145049,
        longitude: -2.772009
    },
    {
        area: "The North West",
        place: "Farleton",
        latitude: 54.208515,
        longitude: -2.722163
    },
    {
        area: "The North West",
        place: "Hutton Roof",
        latitude: 54.1986,
        longitude: -2.660065
    },
    {
        area: "The North West",
        place: "Heysham Head",
        latitude: 54.045286,
        longitude: -2.900133
    },
    {
        area: "The North West",
        place: "Thorn Crag",
        latitude: 53.993253,
        longitude: -2.658375
    },
    {
        area: "The North West",
        place: "Craig-y-Longridge",
        latitude: 53.839171,
        longitude: -2.583311
    },
    {
        area: "The North West",
        place: "Brownstones",
        latitude: 53.607066,
        longitude: -2.482798
    },
    {
        area: "The North West",
        place: "Pex Hill",
        latitude: 53.391243,
        longitude: -2.755612
    },
    {
        area: "The North West",
        place: "Frodsham",
        latitude: 53.276069,
        longitude: -2.743149
    },
    {
        area: "The North West",
        place: "Harmer's Wood",
        latitude: 53.269782,
        longitude: -2.757311
    },
    {
        area: "The North West",
        place: "The Breck",
        latitude: 53.419124,
        longitude: -3.060336
    },
    {
        area: "The Lakes",
        place: "St Bees",
        latitude: 54.515801,
        longitude: -3.626261
    },
    {
        area: "The Lakes",
        place: "Carrock Fell",
        latitude: 54.688472,
        longitude: -3.000158
    },
    {
        area: "The Lakes",
        place: "Thirlmere",
        latitude: 54.532262,
        longitude: -3.067796
    },
    {
        area: "The Lakes",
        place: "Rolling Rock",
        latitude: 54.508636,
        longitude: -2.911708
    },
    {
        area: "The Lakes",
        place: "Gillercombe",
        latitude: 54.511341,
        longitude: -3.199875
    },
    {
        area: "The Lakes",
        place: "Honister Boulders",
        latitude: 54.522875,
        longitude: -3.240066
    },
    {
        area: "The Lakes",
        place: "Bowderstone",
        latitude: 54.541688,
        longitude: -3.155458
    },
    {
        area: "The Lakes",
        place: "Fisherground",
        latitude: 54.387111,
        longitude: -3.316905
    },
    {
        area: "The Lakes",
        place: "Sampson's Stones",
        latitude: 54.397116,
        longitude: -3.227593
    },
    {
        area: "The Lakes",
        place: "Harter Gold",
        latitude: 54.385674,
        longitude: -3.179422
    },
    {
        area: "The Lakes",
        place: "Langdale Boulders",
        latitude: 54.443824,
        longitude: -3.05907
    },
    {
        area: "The Lakes",
        place: "Virtual Crag",
        latitude: 54.399747,
        longitude: -3.069955
    },
    {
        area: "The Lakes",
        place: "Lad Stones",
        latitude: 54.399747,
        longitude: -3.069955
    },
    {
        area: "The Lakes",
        place: "Badger Rock",
        latitude: 54.429263,
        longitude: -2.839864
    },
    {
        area: "The Lakes",
        place: "Little Font",
        latitude: 54.429263,
        longitude: -2.839864
    },
    {
        area: "The Lakes",
        place: "Brant Fell",
        latitude: 54.357254,
        longitude: -2.904267
    },
    {
        area: "The Lakes",
        place: "Armathwaite",
        latitude: 54.806399,
        longitude: -2.767138
    },
    {
        area: "The Lakes",
        place: "Christianbury",
        latitude: 55.119524,
        longitude: -2.753259
    },
    {
        area: "Northumberland",
        place: "Kyloe Crag",
        latitude: 55.65222,
        longitude: -1.945133
    },
    {
        area: "Northumberland",
        place: "Kyloe in the Woods",
        latitude: 55.644395,
        longitude: -1.945674
    },
    {
        area: "Northumberland",
        place: "Bowden Doors",
        latitude: 55.583475,
        longitude: -1.88452
    },
    {
        area: "Northumberland",
        place: "Back Bowden",
        latitude: 55.591345,
        longitude: -1.892384
    },
    {
        area: "Northumberland",
        place: "Dovehole",
        latitude: 55.622581,
        longitude: -2.056332
    },
    {
        area: "Northumberland",
        place: "Hepburn",
        latitude: 55.516982,
        longitude: -1.887932
    },
    {
        area: "Northumberland",
        place: "The Stell",
        latitude: 55.331122,
        longitude: -1.885177
    },
    {
        area: "Northumberland",
        place: "Ravensheugh",
        latitude: 55.291775,
        longitude: -1.942778
    },
    {
        area: "Northumberland",
        place: "High Crag",
        latitude: 55.180909,
        longitude: -2.301330
    },
    {
        area: "Northumberland",
        place: "Callerhues",
        latitude: 55.153349,
        longitude: -2.238679
    },
    {
        area: "Northumberland",
        place: "Queens Crag",
        latitude: 55.027407,
        longitude: -2.299039
    },
    {
        area: "Northumberland",
        place: "Rothley",
        latitude: 55.201063,
        longitude: -1.931233
    },
    {
        area: "Northumberland",
        place: "Shaftoe",
        latitude: 55.135077,
        longitude: -1.903467
    },
    {
        area: "Yorkshire",
        place: "Stoupe Brow",
        latitude: 54.407600,
        longitude: -0.521544
    },
    {
        area: "Yorkshire",
        place: "Bridestones",
        latitude: 54.302409,
        longitude: -0.652699
    },
    {
        area: "Yorkshire",
        place: "Clemmitt's Wood",
        latitude: 54.423075,
        longitude: -0.914226
    },
    {
        area: "Yorkshire",
        place: "Park Nab",
        latitude: 54.468925,
        longitude: -1.067144
    },
    {
        area: "Yorkshire",
        place: "Wainstones",
        latitude: 54.423025,
        longitude: -1.118846
    },
    {
        area: "Yorkshire",
        place: "Scugdale",
        latitude: 54.39374,
        longitude: -1.206865
    },
    {
        area: "Yorkshire",
        place: "Goldsborough Carr",
        latitude: 54.557431,
        longitude: -2.077618
    },
    {
        area: "Yorkshire",
        place: "Slipstones",
        latitude: 54.228163,
        longitude: -1.777167
    },
    {
        area: "Yorkshire",
        place: "Ash Head",
        latitude: 54.187034,
        longitude: -1.795091
    },
    {
        area: "Yorkshire",
        place: "Kilnsey",
        latitude: 54.115967,
        longitude: -2.044417
    },
    {
        area: "Yorkshire",
        place: "Brimham",
        latitude: 54.076614,
        longitude: -1.682625
    },
    {
        area: "Yorkshire",
        place: "Simon's and Lord's",
        latitude: 54.028318,
        longitude: -1.904669
    },
    {
        area: "Yorkshire",
        place: "Crookrise",
        latitude: 53.985771,
        longitude: -2.003031
    },
    {
        area: "Yorkshire",
        place: "Ilkley",
        latitude: 53.916475,
        longitude: -1.800202
    },
    {
        area: "Yorkshire",
        place: "Caley Crag",
        latitude: 53.896942,
        longitude: -1.65031
    },
    {
        area: "Yorkshire",
        place: "Caley Roadside",
        latitude: 53.896942,
        longitude: -1.65031
    },
    {
        area: "Yorkshire",
        place: "Shipley Glen",
        latitude: 53.847501,
        longitude: -1.802541
    },
    {
        area: "Yorkshire",
        place: "Wetherby",
        latitude: 53.926411,
        longitude: -1.384041
    },
    {
        area: "Yorkshire",
        place: "Earl Crag",
        latitude: 53.884212,
        longitude: -2.011810
    },
    {
        area: "Yorkshire",
        place: "Widdop",
        latitude: 53.791323,
        longitude: -2.096243
    },
    {
        area: "Yorkshire",
        place: "Bridestones",
        latitude: 53.741871,
        longitude: -2.109439
    },
    {
        area: "Yorkshire",
        place: "Woodhouse Scar",
        latitude: 54.707707,
        longitude: -1.876388
    },
    {
        area: "Yorkshire",
        place: "West Vale",
        latitude: 53.689255,
        longitude: -1.860144
    },
    {
        area: "Yorkshire",
        place: "Church Crag",
        latitude: 53.650557,
        longitude: -1.262908
    },
    {
        area: "The Peak",
        place: "Stanage Plantation",
        latitude: 53.350705,
        longitude: -1.644752
    },
    {
        area: "The Peak",
        place: "Apparent North",
        latitude: 53.341226,
        longitude: -1.623831
    },
    {
        area: "The Peak",
        place: "Burbage North",
        latitude: 53.343378,
        longitude: -1.60984
    },
    {
        area: "The Peak",
        place: "Millstone Area",
        latitude: 53.317143,
        longitude: -1.623297
    },
    {
        area: "The Peak",
        place: "Curbar",
        latitude: 53.268742,
        longitude: -1.608167
    },
    {
        area: "The Peak",
        place: "Gardom's",
        latitude: 53.262088,
        longitude: -1.584038
    },
    {
        area: "The Peak",
        place: "Yarncliffe",
        latitude: 53.311151,
        longitude: -1.618213
    },
    {
        area: "The Peak",
        place: "Stoney Middleton",
        latitude: 53.276955,
        longitude: -1.661328
    },
    {
        area: "The Peak",
        place: "Rubicon",
        latitude: 53.251016,
        longitude: -1.741333
    },
    {
        area: "The Peak",
        place: "Raven Tor",
        latitude: 53.255612,
        longitude: -1.775537
    },
    {
        area: "The Peak",
        place: "Blackwell Dale",
        latitude: 53.249460,
        longitude: -1.803800
    },
    {
        area: "The Peak",
        place: "Lees Bottom",
        latitude: 53.229171,
        longitude: -1.744289
    },
    {
        area: "The Peak",
        place: "Robin Hood's Stride",
        latitude: 53.158815,
        longitude: -1.669149
    },
    {
        area: "The Peak",
        place: "Cratcliffe",
        latitude: 53.153835,
        longitude: -1.659257
    },
    {
        area: "The Peak",
        place: "The P",
        latitude: 53.131923,
        longitude: -1.557723
    },
    {
        area: "The Peak",
        place: "The Roaches",
        latitude: 53.156164,
        longitude: -1.995478
    },
    {
        area: "The Peak",
        place: "Ramshaw",
        latitude: 53.155109,
        longitude: -1.975307
    },
    {
        area: "The Peak",
        place: "Newstones Area",
        latitude: 53.169556,
        longitude: -1.974535
    },
    {
        area: "The Peak",
        place: "Hobson Moor",
        latitude: 53.466144,
        longitude: -2.018562
    },
    {
        area: "The Peak",
        place: "Wimberry",
        latitude: 53.527784,
        longitude: -1.981101
    },
    {
        area: "The Midlands",
        place: "Grinshill",
        latitude: 53.809429,
        longitude: -2.70592
    },
    {
        area: "The Midlands",
        place: "Nesscliffe",
        latitude: 53.772032,
        longitude: -2.915754
    },
    {
        area: "The Midlands",
        place: "The Churnet",
        latitude: 52.985935,
        longitude: -1.908703
    },
    {
        area: "The Midlands",
        place: "Pleasley Vale",
        latitude: 53.180302,
        longitude: -1.213163
    },
    {
        area: "The Midlands",
        place: "Anston Stones",
        latitude: 53.339673,
        longitude: -1.196181
    },
    {
        area: "The Midlands",
        place: "Cademan Woods",
        latitude: 52.747651,
        longitude: -1.360465
    },
    {
        area: "The Midlands",
        place: "Forest Rock",
        latitude: 52.722615,
        longitude: -1.214531
    },
    {
        area: "The Midlands",
        place: "Beacon Hill",
        latitude: 52.72743,
        longitude: -1.246964
    },
    {
        area: "The Midlands",
        place: "Slawstone Bridge",
        latitude: 52.532644,
        longitude: -0.847793
    },
    {
        area: "Southern Sandstone",
        place: "Edridge Rocks",
        latitude: 51.097806,
        longitude: 0.218713
    },
    {
        area: "Southern Sandstone",
        place: "Harrison's Rocks",
        latitude: 51.106176,
        longitude: 0.188892
    },
    {
        area: "Southern Sandstone",
        place: "Bowles Rocks",
        latitude: 51.07624,
        longitude: 0.218713
    },
    {
        area: "Southern Sandstone",
        place: "Stone Farm",
        latitude: 51.095814,
        longitude: -0.026007
    },
    {
        area: "Scotland",
        place: "Reiff in the Woods",
        latitude: 58.033099,
        longitude: -5.233698
    },
    {
        area: "Scotland",
        place: "Applecross",
        latitude: 57.409831,
        longitude: -5.644484
    },
    {
        area: "Scotland",
        place: "Torridon",
        latitude: 57.542687,
        longitude: -5.500631
    },
    {
        area: "Scotland",
        place: "Brin",
        latitude: 57.336992,
        longitude: -4.2133
    },
    {
        area: "Scotland",
        place: "Ruthven",
        latitude: 57.322721,
        longitude: -4.26321
    },
    {
        area: "Scotland",
        place: "Glen Nevis",
        latitude: 56.770753,
        longitude: -5.036845
    },
    {
        area: "Scotland",
        place: "Coire Lagan",
        latitude: 57.201771,
        longitude: -6.284923
    },
    {
        area: "Scotland",
        place: "Arisaig Cave",
        latitude: 56.893423,
        longitude: -5.862408
    },
    {
        area: "Scotland",
        place: "Loch Buie",
        latitude: 56.356183,
        longitude: -5.872946
    },
    {
        area: "Scotland",
        place: "Loch Katrine",
        latitude: 56.229934,
        longitude: -4.42027
    },
    {
        area: "Scotland",
        place: "Dumbarton",
        latitude: 55.937556,
        longitude: -4.562609
    }

]

const names = [

    "Superpower", "Outliers", "The World is Yours", "Flip Off at the Opera", "Ambition", "Vombadil", "The Boss", "Traniquillitas", "Star Power", "Long Night", "Limit Breaker", "Rocket Science",
    "Voyager Sit Start", "Pilgramage", "Monk Life", "7 of 9", "Mortal Immortal", "Leviathan", "Hobbie Noble", "WADzilla", "Master of Stone", "Sanctum", "The Last Dance", "Das Pumpenhausen", "Blue Eyes",
    "Exit Wounds", "Merlin's Beard", "The Vault", "Infamous", "Kraken", "High Fidelity", "Cypher", "The Ace", "Pool of Bethesda", "Isla de Encanta", "Keen Roof", "Pressure", "Fat Lip", "Super Fury Animal", "Anasthesia",
    "Empty the Bones", "Diluvian", "Ropes of Maui", "The Barrel", "Enter the Dragon", "Floodgate", "Blood Sport", "Ivan Dobsky", "The Bitch", "Mutton Busting", "Sean's Roof", "Mr.Fantastic", "Carpenter's Apprentice",
    "Wife of Fyfe", "Downset", "8 Ball", "Catapult", "Little Women", "Super Submarine", "Bonnie", "Drink Driving", "Ark Royal", "Bigger Belly", "Compact Culture", "Toe-Fu", "Inertia Reel Trav", "Shallow Groove", "Full Traverse", "Excalibur", "Brutality",
    "Godzilla", "Biblins", "Supercede", "Thick End of the Wedge", "Tourniquet", "Will", "Requiem for a Dream", "Ken Masters", "Careless Torque", "Diesel Power", "Queen Kong", "XXXX", "Preparation", "The Joker", "All Elements", "Cross Therapy", "The Fonz",
    "Westworld", "Ranieri's Reach", "Caseg Groove", "Sabotage", "Sway On", "Mako", "Guy Fawkes", "The Crack in the Shadow", "Red Dragon", "Abba Gold", "Menace", "Dead Baron", "Endangered", "Stokes Croft", "The Revolution is Coming", "No Bad Neigh", "Humble Pie",
    "Devon Sent", "Gun Shy", "The Darkside", "Louis South", "Butternut Squash", "Binka", "Bacon Oil", "Gleaming Pinch", "Sutty's Punch", "Stoned Temple Pilots", "Corridors of Power", "Chun-Li", "Jason's Roof", "Eyes of Silence", "Lou Ferrino", "100mph", "Main Vein",
    "Monoblock", "Groove is in the Heart", "Monoblock", "Tsunami", "Providence", "The Trip", "Psycho Boy", "Ben's Roof", "I am Curious Yellow", "Sparks", "The Only Way", "Trigger Cut", "Rational Bandit", "Thug Mental", "Porn Makes Me Horny", "Pump up the Power",
    "The Magician", "Gerry's Problem", "Knights of the Round Table", "The Power", "Haston Dyno", "Colorado Dreaming", "The Keel", "Silverback", "Cruel Intentions", "ToeJam", "Special K", "Lizard King", "Daze of the Weak", "Gruffalo", "Karma of Trees",
    "Cosmic Wheels", "Nazgul's Traverse", "36 Chambers", "Silicon Slave", "Paint It Black", "Big Kicks", "Tusk", "Tetris", "Be Ruthless", "Cowboy Junkie", "Little Northumberland", "Blockbuster", "Fat Cat Roof", "Ben's Wall", "Beetle Back", "Blacking out the Friction",
    "Gloss Over the Mat", "Bus Stop", "Lock Stock", "Ivory Mountain", "Red Quinne", "Love Pie", "The Wave", "Brad Pit", "Powerband", "Vitruvian Man", "Not Bad Dave", "In Bloom", "The End is Nigh", "J-Lo", "Tim's Crack", "Improper Opera", "Ache Ball", "Niche Dyno",
    "Terry", "Crouching Tiger", "Lipo Suction", "Smackhead", "Pinch Hitter", "Crack A No-Go", "Lady Grey", "Cruella", "Wonderwall", "Smoke a Bloke", "The Essence", "West Side Story", "Bad Moon Landing", "Inaudible", "Vaudeville", "Yorkshireman", "Mr Creosote", "Ram Air",
    "Dialogue", "The Shield", "Prime Time", "Beth's Traverse", "Hitchhiker's Direct", "Ringpiece", "Secret Garden", "Cubby's Lip", "Simple Simon", "School of Buri", "Liquid Sunshine", "Worldline", "Main Issue", "Mile High Guy", "Voodoo People", "No Country for Old Men",
    "Funky Worm", "Heartache", "Bandwagon", "Diamond", "R.E.M", "Overseer", "Tokyo Invention", "Hyper", "Two Souls", "Your Hand in Mine", "Anthrax", "Black Shadow", "Sheriff","Pandora", "Avatarium", "Melody", "Righteous", "Salad Days", "Crown Heights", "Clutch",
    "White Line Fever", "Pressure Cooking", "Farewell", "Art Lover", "Fontaine", "Silencers", "Eastbourne", "Complete Control", "Pumped Up Kicks", "Radiohead", "Atmosphere", "Dog and Butterfly", "Bangles", "The Dark End", "The Educated", "Underground", "Minimalist",
    "Presley", "Pantyhose", "Smog", "Throwing Bricks", "Future of the Left", "Free Harbour", "Panic Room", "Winter Mountain", "Mostly Autumn", "Manic Preachers", "Circus", "Original Stuntmaster", "Tattooed", "Pretenders", "Peas", "Mr Waterproof", "Rhythm", "Flytronix",
    "A Trick of the Light", "Cantaloupe", "Breach", "Bloody Valentine", "Lazarus", "The Joint is Jumping", "Monster Magnet", "Delusional", "Plasmatics", "Burn", "Chewing Gum Wrapper", "Clouds", "Silver Apples", "Keep on Knockin", "Wasteland", "Mountain Time",
    "Lonesome Dreams", "Swinghammer", "Hooked", "Chromeo", "Helicopters", "Crazed Institution", "Kind and Generous", "Midnite", "Disney Girls", "Beach Boys", "Trouble on the Mountain", "Sherlock Holmes", "Suede", "The Coldest Night", "Cockburn", "Devotion", "Nomad",
    "Butcher's Birthday Present", "No Return", "Brakes", "Scottish Pop", "Spearmint", "Vanilla", "Gorgeous", "Babybird", "Mogwai", "Blue Dragon", "Weaver's Answer", "Family", "Buzzcocks", "Dancing in the Street", "Down to the River to Pray", "Float On", "Floaters",
    "Hunting For Witches", "Muppets", "Mama Papa", "Masters of War", "Half Man", "Waxwing", "Chest Fever", "Rainy Day", "London Social Degree", "Plateau", "Meat Puppets", "Gravity's Angel", "Grumpy Old Men", "Halo", "Sister Sledge", "Over the Wall", "Echo and the Bunnymen",
    "Record Shop", "Pablo", "Carriage Clock", "The King in the Tree", "Shoegazer", "Tiger Mountain", "Bush", "Silgen", "Mongol", "Overnight", "Devil With the Blue Dress", "Horse With No Name", "Mahjong", "Sound System", "Wang Dang Doodle", "Forqueray", "Roots", "Daisy Bell",
    "Promises", "Jamaican Farewell", "Bamba", "Painted It White", "Hotel California", "Eagles", "I'll Wear It Proudly", "Primal Scream", "Macarena", "Woody", "Road Block", "Stromae", "Ghetto Land", "Wonder", "Vogue", "Madonna", "Discovery", "Adagio", "Barber", "Pumpkin Pie",
    "Control", "Reflections", "Runaway", "Sweet Home", "Somewhere Only We Know", "King of the Barley", "Summer", "Goldsboro", "The Cutty Wren", "Priest", "Crowns", "Pierces", "Don't Eat Stuff Off the Sidewalk", "Cramps", "The Folk Police", "Love Candle", "Man of the Hour",
    "Athens Queen", "Alligator Eating Dog", "Come Dancing", "Turtles", "Highway Kind", "Next to the Trash", "Punch Brothers", "Next Year People", "Plow to the End of the Row", "Put Your Lights On", "Everlast", "Rad Gumbo", "Little Feat", "Rented Room", "Souvenirs", "Space City",
    "Tall Tom", "Gun in My Hand", "Gibbs", "Ravi Raman", "Wonderful", "Everclear", "Hansard Glen", "Toffee Boy", "Iron and Wine", "Effect and Cause", "Making Pies", "Neko", "Small Things", "The Devil", "Alice's Arete", "Beeswing", "Justice", "Longdog", "Show of Hands",
    "Mingulay Boat", "Mixed Up", "Shook Up Girl", "Abahachi", "Memphis", "Old Crow", "Springsteen", "Farmer", "Pull Down Lads", "The Riddle", "Two Left Feet", "Two Lovers", "Tree Demon", "Chicken and Egg", "Beirut", "Free Your Dreams", "Snarky Puppy", "Herbert's Peak",
    "Wilderness", "Radio Song", "Spalding", "Reach Out", "Four Tops", "Magicman", "The Honeymooners", "Lucky Jim", "Getting Closer", "Escape Myself", "Sound", "Vanwolf", "Obstacles", "Fuel", "Secret Island", "Swell", "State Violence", "Discharge", "Boogie", "Baccara",
    "Zarathistra", "Flat Frog", "Black Combe", "Life in a Northern Town", "Dream Academy", "Nostalgia", "Bishbosh", "Man I Feel Like a Woman", "BlackCombe", "Mongulu", "Garifuna Collective", "Makinavaja", "Song of a Baker", "Small Faces", "Laibach", "Mnemonic",
    "The Sound of Gyroscopes", "Hopper", "You Don't Own Me", "The Drowning Man", "Cure", "Legend of Xanadu", "Stealing in the Name of the Lord", "Warnings", "Toast", "Street Band", "Viking Bones", "Waste of Wealth", "Flawless", "Ones", "El Salvador", "Insane", "Makinavaja",
    "Hysteria", "Partisans", "Abahachi", "Mayday", "Mighty and Superior", "Conflict", "Nothing", "Vice Squad", "Our Wedding", "Crass", "Square One", "Restarts", "Vinyl Fetishists", "Darcey's Dad", "Watch Your Back", "Cock Sparrer", "Closing Time", "Captain Soup",
    "Femme Fatale", "Seasick", "Snooks", "Mardi Gras"
]

const grades = [
    "8C", "8B+", "8B", "8A+", "8A", "7C+", "7C", "7B+", "7B", "7A+", "7A", "6C+", "6C", "6B+", "6B", "6A+", "6A", "5+", "5", "4+", "4"
]

const randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}



// -----> everything below this line is to seed Boulders ---after that seed Location!

// const routeObj = function Object(name, grade, images, description, author) {
//     this.name = name;
//     this.grade = grade;
//     this.images = images;
//     this.description = description;
//     this.author = author;
// }

// const routeList = [];

// names.forEach(name => {
//         const randGrade = grades[randomNum(0, grades.length)];
//         const imageURL = [
//             {
//                 url: 'https://res.cloudinary.com/dkxsdiu0c/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1639925883/BoulderBritain/tolfq246vyifncnnrebi.jpg',
//                 filename: 'BoulderBritain/tolfq246vyifncnnrebi'
//             },
//             {
//                 url: 'https://res.cloudinary.com/dkxsdiu0c/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1639231343/BoulderBritain/byglckpjrexljbshy7ya.jpg',
//                 filename: 'BoulderBritain/byglckpjrexljbshy7ya'
//             }
//         ]
//         const descriptionText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio harum ea, magnam qui asperiores autem deleniti suscipit reprehenderit molestiae! Distinctio facere eaque debitis dolorum officia! Suscipit tenetur iure sapiente magni!'
//         const initialUser = '61c9e0b2dd5c0645409fb9e8' //change this ID to match an admin user
//         const route = new routeObj(name, randGrade, imageURL, descriptionText, initialUser);
//         routeList.push(route);
// })

// // console.log(routeList);

// Boulder.insertMany(routeList)
// .then(res => console.log(res)).catch(err => console.log(err));



//-----> do everything above this line first to seed Boulders, then do below this line to seed Location!


// const setBouldersToLocations = async() => {
//     const allBoulders = await Boulder.find().exec()
//     console.log(allBoulders.length, 'boulders matched');

//     locations.forEach(async(location) => {
//         const random = randomNum(1, 5);
//         const area = location.area;
//         const place = location.place;
//         const latitude = location.latitude;
//         const longitude = location.longitude;
//         const image = {
//             url: 'https://res.cloudinary.com/dkxsdiu0c/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1639922527/BoulderBritain/jjfwfocltp1swemy0y0e.jpg',
//             filename: 'BoulderBritain/jjfwfocltp1swemy0y0e'
//         }
//         const boulderLocation = new Location({area: area, place: place, geometry: { type: 'Point', coordinates: [longitude, latitude]}, image: image});
//         const boulderSet = [];
//         for (let i = 0; i < random; i++) {
//             const boulderPop = allBoulders.pop()
//             boulderSet.push(boulderPop);
//         }
//         boulderLocation.boulders.push(...boulderSet);
//         await boulderLocation.save()
//         // console.log(boulderLocation);
//     });

//     allBoulders.forEach(async(leftover) => {
//         const leftoverBoulders = await Boulder.deleteOne({name: leftover.name})
//     })

// }

// setBouldersToLocations();