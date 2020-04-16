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


export function map_page_assembly(QEWD) {

    let component = {
      componentName: 'adminui-content-page',
      state: {
        name: 'map'
      },
      children: [
        {
          componentName: 'adminui-content-page-header',
          state: {
            title: 'Map'
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
                title: 'Map Card 1',
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
                  hooks: ['getMap']
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
      await this.renderMap(51.505, -0.09, 13);
      console.log("in the map");
      let marker = this.setMarker(51.505, -0.09);
      this.addPopup('Hello to Marker #1', marker);
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

      var someFeatures = [{
          "type": "Feature",
          "properties": {
              "name": "Coors Field",
              "show_on_map": true
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-104.99404, 39.75621]
          }
      }, {
          "type": "Feature",
          "properties": {
              "name": "Busch Field",
              "show_on_map": true
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-104.98404, 39.74621]
          }
      }];
      
      this.leaflet.geoJSON(someFeatures, {
          filter: function(feature, layer) {
              return feature.properties.show_on_map;
          }
      }).addTo(this.map);


      console.log("after marketSet");
          }
        }
      };
  
    return {component, hooks};
  };
  