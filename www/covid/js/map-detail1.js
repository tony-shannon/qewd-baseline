/*

  Put the contents of this library under your Web Server root directory (eg ~/qewd/www) as:

    /components/leaflet

  Copy this file to /demo/js/map.js  (change demo to whatever your application folder is named)


 In your app.js:

import {map_page_assembly} from './map.js';

webComponents.addComponent('map_page', map_page_assembly());

webComponents.register('map', webComponents.components.map_page);


    let context = {
      paths: {
        adminui: './components/adminui/components/',
        leaflet: './components/leaflet/components/'
      },
      resourcePath: '/components/adminui/',
      leafletResourcePath: '/components/leaflet/',
      readyEvent: new Event('ready')
    };



  In your sidebar.js:

    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Map',
        icon: 'map',
        contentPage: 'map'
      }
    },


*/



export function map_detail_assembly(QEWD) {

    
 

    let component = {
      componentName: 'adminui-content-page',
      state: {
        name: 'map-detail'
      },
      children: [
        {
          componentName: 'adminui-content-page-header',
          state: {
            title: 'Map 2 Detail'
          }
        },
        {
          componentName: 'adminui-content-card',
          state: {
            name: 'map-card'
          },
          children: [
            {
              componentName: 'adminui-content-card-header',
              state: {
                title: 'Map Card 2',
                title_colour: 'warning'
              }
            },
            {
              componentName: 'adminui-content-card-body',
              children: [
                {
                  componentName: 'leaflet-root',
                  state: {
                    accessToken: 'pk.eyJ1IjoidG9ueXNoYW5ub24iLCJhIjoiY2s4cHptbWczMDA0ZzNlbnR4N3pjZzdkdSJ9.ItqV9g22EiJTU7kkuiI3tw',
                    height: '300px'
                  },
                  hooks: ['getMap', 'Map2Detail']
                }
              ]
            }
          ]
        },
        {
            componentName: 'adminui-content-card',
            state: {
              name: 'map-card-detail'
              
            },
            children: [
              {
                componentName: 'adminui-content-card-header',
                state: {
                  title: 'Map Card Detail',
                  title_colour: 'warning'
                }
              },
              {
                componentName: 'adminui-content-card-body',
                children: [
                  {
                    componentName: 'adminui-div',
                    state: {
                      name: "detail",
                      text: "We will aim for text to go here"
                    }
                  }
                ]
              },
              {
                componentName: 'adminui-content-card-footer',
                state: {
                  hidden: false
                },
                children: [
                  {
                    componentName: 'adminui-button',
                    state: {
                      text: 'ClickIt',
                      colour: 'success',
                      cls: 'btn-block'
                    },
                    hooks: ['save']
                  }
                ]
              }
            ]
          }


      ]
    };
  
   // let hooks = {
   //   'leaflet-root': {
    //    getMap: function() {
    //      this.renderMap(51.505, -0.09, 13);
     //     let _this = this;
     //     setTimeout(function(){_this.setMarker(51.5, -0.09)}, 1000);
     //   }
     // }
    //};

    let hooks = {


      'leaflet-root': {
      getMap: async function() {
      console.log("start of this getMap fxn");
      await this.renderMap(51.505, -0.09, 2);
      console.log("in the map");
      //let marker1 = this.setMarker(51.505, -0.09);
      //marker1.key="Keys to London";
      //marker1.name = "LondonTown#1";
      //console.log(marker1.name);
      //function onClick(e) {   
      //   alert(this.key); // i can expect my keys here
      //}
      //var markerA = this.setMarker(51.505, -0.09).on('mouseover', onClick);
     // markerA.key = "marker-1";
     let _this = this;

     function setMarker(name, key, lat, long) {
       let markerOut= new L.marker([lat, long]).addTo(_this.map).on('click', onClickIT);
       markerOut.key = key;
       markerOut.name = name;
       return markerOut;
      } 

      var markerB =new  L.marker([13.0101, 80.2157]).addTo(this.map).on('click', onClickIT);
      markerB.key = "marker-2";
      markerB.name = "India Place-B"

      var markerC = setMarker("NewPlace", "mystery", 12.0101, 70.2157);

      function setMarkerObj(params) {
        console.log(params);
        let markerPoint = new L.marker([params.lat, params.long]).addTo(_this.map).on('click', onClickIT);
        markerPoint.key = params.key;
        markerPoint.name = params.name;
      }


      var markerD= setMarkerObj(
        {"name":"Dublin",
         "region": "Europe",
         "key": "DUB",
         "type": "city",
         "weather": "mild",
         "lat": 53.35,
         "long":-6.26
         }
      )


      function onClickIT(e) {   
      console.log("Key is " + this.key + " & Name is " + this.name); // i can expect my keys here
      let div = _this.getComponentByName('adminui-div', 'detail');
      div.setState({text: 'added by event - from click from ' + this.name });
      }
      //let marker2 = this.setMarker(51.505, -0.06);
      //let marker3 = this.setMarker(51.495, -0.09);
      //let circlePopup = this.addPopup('Hello to Circle Marker', marker1);
      //let polygonPopup = this.addPopup('Hi to Polygon Marker', marker2);
      //let outsidePopup = this.addPopup('Outside Marker', marker3);
     // this.setPolygon([
     //   [51.509, -0.08],
     //   [51.503, -0.06],
     //   [51.51, -0.047]
     //   ]);
     // this.setCircle(51.505, -0.09, {
     //   color: 'red',
     //   fillColor: '#f03',
     //   fillOpacity: 0.5,
     //   radius: 500
     //   });

      var someFeatures = [
        {
          "type": "Feature",
          "properties": {
              "name": "GalwayA",
              "show_on_map": true
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-9.0567905, 53.270668]
          }
          },
          {
            "type": "Feature",
            "properties": {
                "name": "NY Queens",
                "show_on_map": true
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-73.935242, 40.730610 ]
            }
            },
          
        {
          "type": "Feature",
          "properties": {
              "name": "Coors_Field",
              "show_on_map": true
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-104.99404, 39.75621]
          }
      }, {
          "type": "Feature",
          "properties": {
              "name": "Busch_Field",
              "show_on_map": true
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-104.98404, 39.74621]
          }
      },  {
        "type": "Feature",
        "properties": {
            "name": "Bucky_Palace",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.128, 51.5034]
        }
    },
    {
      "type": "Feature",
      "properties": {
          "name": "Coors_Field_B",
          "show_on_map": true
      },
      "geometry": {
          "type": "Point",
          "coordinates": [-104.99503, 39.75122]
      }
  },
  {
    "type": "Feature",
    "properties": {
        "name": "Galway",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-9.0567905, 53.270668]
    }
    }
    
    ];
    
    var eireFeatures =  [
      {
        "type": "Feature",
        "properties": {
          "id": 1,
          "name": "Mount Juliet",
          "show_on_map": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [ -7.1801455000001795, 52.52280049908934]
        },
        "details": {
          "type": "Tourist",
          "sports": "Golf"

        }
      }
    ]


    // the first thing to do is check if there is data in Qewd with locations and if so 
    //  get the related JSON inc ID# + GPS coordinates and then project them on the map with markers that can be clicked on

    var eireFeaturesB =  [
      {
        "type": "Feature",
        "properties": {
          "id": 1,
          "name": "Mount Juliet",
          "show_on_map": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -7.1801455000001795,
            52.52280049908934
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 2,
          "name": "Glebe House",
          "show_on_map": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -7.947240500000189,
            54.99877149911397
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 3,
          "name": "Fota Arboretum",
          "show_on_map": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -8.29115200000018,
            51.89616799908417
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 4,
          "name": "Sligo Abbey",
          "show_on_map": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -8.440946500000196,
            54.28371799910617
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 5,
          "name": "Clare Co. Museum"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -9.052985000000179,
            52.842933499092155
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 6,
          "name": "Knappogue Castle (Bunratty)"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -8.829283000000201,
            52.7048034990909
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 7,
          "name": "Bantry House"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -9.496332000000196,
            51.69716249908263
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": 8,
          "name": "Newgrange"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -6.512144000000204,
            53.70262899910023
          ]
        }
      }
    ];


  const JSDBMapDetail = {
    "Name": "Big House",
    "id":  1,
    "where": "Cork",
    "why": "mindfulness",
    "how": "get train",
    "when": "soon as you can",
    "GPS": [5, 12],
    "Region": "Munster",
    "Country": "Ireland",
    "Continent": "Europe"
  }


    // the click event should then be the trigger to get more detail from the QewdDB
    
    function onEachFeature(feature, layer) {
        //bind click
        layer.on('click', async function (e) {
          // e = event
          console.log(e);
          console.log("Key is A " + " & Name is N  + this is :" + feature.properties.name + " @ " + feature.geometry.coordinates); // to edit
          let div = _this.getComponentByName('adminui-div', 'detail');
          div.setState({text: 'You clicked on :' + feature.properties.name + 'with this ID: ' + feature.properties.id + ' at this location ' + feature.geometry.coordinates});
          // check if ID and if so go search
          if (feature.properties.id) {
            console.log("Going to go to Qewd to find data on this ID: " + feature.properties.id);
                if(feature.properties.id===1){
                console.log(JSDBMapDetail);
                
            //Getfn; // getting from QewdJSDB    
            //async function getGeoJSON() {
                  console.log("Going to Qewd");
                  let responseObj = await QEWD.reply({
                   type: 'getGeoJSON',
                   params: {
                     id: feature.properties.id
                     }
                  });
             //     return responseObj.message;
            //    }
            }

            //getGeoJSON();

            console.log("goGetfn should have been triggered");
            };
          // now get more detail from Qewd & add to this Card for this location with this ID
          // You can make your ajax call declaration here
          //$.ajax(... 
        });
    
    }
    
    /*
    getGeoJSON: async function() {
      console.log("in Getfn fnx");
      let responseObj = await QEWD.reply({
        type: 'getGeoJSON'
        //params: {
        //  id: id
        //}
        
      });
      return responseObj;
    }
    */

  
    let geoJSON1=   this.leaflet.geoJSON(someFeatures, {
          filter: function(feature, layer) {
              console.log("in GeoJSON land");
              console.log(feature.properties.name);
              if (feature.properties.name === 'Bucky_Palace'){
                let div = _this.getComponentByName('adminui-div', 'detail');
                div.setState({text: 'We found :' + feature.properties.name + '; in the geoJSON'});
              }
              return feature.properties.show_on_map;
              
          },
          onEachFeature: onEachFeature
      }).addTo(this.map);
  /*
   */

  
      let geoJSON2=   this.leaflet.geoJSON(eireFeaturesB, {
        filter: function(feature, layer) {
            console.log("in GeoJSON land");
            console.log(feature.properties.name);
            if (feature.properties.name === 'Bucky_Palace'){
              let div = _this.getComponentByName('adminui-div', 'detail');
              div.setState({text: 'We found :' + feature.properties.name + '; in the geoJSON'});
            }
            console.log(feature.details);
            // feature.details.forEach(function(detail){
            //  console.log("Found this aspect " + detail);
            //})
            //feature.details.forEach(element => console.log(element));
            for (const property in feature.details) {
              console.log(`${property}: ${feature.details[property]}`);
            }
            Object.keys(feature).forEach(function(item){
              console.log(item);
              console.log(feature[item]);
              let div = _this.getComponentByName('adminui-div', 'detail');
              div.setState({text: 'We found :' + feature[item] + '; in the geoJSON'});
            });

            //console.log("Sport on offer is " + feature.details.sports)
            return feature.properties.show_on_map;
            
        },
        onEachFeature: onEachFeature
    }).addTo(this.map);
 /**/

     // let geoJ = this.leaflet.geoJSON;
     // let geoMarkerHandler = function(e) {
     //   console.log("GeoJSON event clicked");
     //   console.log("geoJ = " + geoJ);
     //   alert("You clicked on " + geoJ.feature.properties.name);
     //   console.log("End of geoJSON clicker");
     // }
     // this.addEventHandler(geoMarkerHandler);
      

      //let mapEventHandler = function(e) {
      //  console.log("Map click event clicked");
      //  alert("You clicked the map at " + e.latlng);
      //  let div = _this.getComponentByName('adminui-div', 'detail');
      //  console.log(1111);
      //  console.log(div);
      //  console.log(this.key);
       // circlePopup.setContent("You clicked the CirclePopup");
      //  div.setState({text: 'added by event - from click at ' + e.latlng });
      //  };
     // this.addEventHandler(mapEventHandler);

      //let mapEventHandler = function(e) {
      //  console.log("Map click event clicked");
      //  let x = document.getElementsByTagName('adminui-span');
      //  console.log(x);
      //  };
      //  this.addEventHandler(mapEventHandler);


      console.log("after marketSet");

        }, //end of getMap hook

      Map2Detail: function (textIn){
        console.log("M2D triggered : " + textIn );
      },
      
      createNewRecord: function() {
        let _this = this;
        let fn = function() {
          let card = _this.getComponentByName('adminui-content-card', state.name + '-details-card');
          let title = card.querySelector('adminui-content-card-button-title');
          title.setState({title: state.detail.newRecordTitle || 'New Record'});
       
          
        
          card.show();
     
       
         
        };
        
      }




      }

    }; //end of hooks
  
    return {component, hooks};
  };
  
