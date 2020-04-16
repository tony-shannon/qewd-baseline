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

const stateIn = {
name: "MapTextIn2"

};



export function map_detail_assembly(stateIn, QEWD) {

    
 

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
      let marker1 = this.setMarker(51.505, -0.09);
      marker1.key="Keys to London";
      marker1.name = "LondonTown#1";
      console.log(marker1.name);
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


      function onClickIT(e) {   
      console.log("Key is " + this.key + "Name is " + this.name); // i can expect my keys here
      let div = _this.getComponentByName('adminui-div', 'detail');
      div.setState({text: 'added by event - from click from ' + this.name });
      }
      //let marker2 = this.setMarker(51.505, -0.06);
      //let marker3 = this.setMarker(51.495, -0.09);
      //let circlePopup = this.addPopup('Hello to Circle Marker', marker1);
      //let polygonPopup = this.addPopup('Hi to Polygon Marker', marker2);
      //let outsidePopup = this.addPopup('Outside Marker', marker3);
      this.setPolygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
        ]);
      this.setCircle(51.505, -0.09, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
        });

      var someFeatures = [
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
      },
      {
        "type": "Feature",
        "properties": {
            "name": "Bucky_Palace",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [51.503, -0.12]
        }
    }
    ];
    
    
    
    let geoJSON1=   this.leaflet.geoJSON(someFeatures, {
          filter: function(feature, layer) {
              console.log("in GeoJSON land");
              console.log(feature.properties.name);
              if (feature.properties.name === 'Bucky_Palace'){
                let div = _this.getComponentByName('adminui-div', 'detail');
                div.setState({text: 'We found :' + feature.properties.name + '; in the geoJSON'});
              }
              return feature.properties.show_on_map;
              
          }
      }).addTo(this.map);

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
  