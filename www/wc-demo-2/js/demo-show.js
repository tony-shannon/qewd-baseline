export function define_demo_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'demo',
      title: 'Demo',
      cardTitle: 'Demo Card',
      cardTitleColour: 'info',
      cardName: 'demo-card',
      text: 'This is the Demo Page content....'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Demo Cards'
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
              title: 'Top Card',
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
                title: '2nd Card',
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
                  hooks: ['ButtonHandlerA']
                }
              ]
            }
          ]
        },
        {
          componentName: 'adminui-content-card',
          state: {
            name: 'tables-card'
          },
          children: [
            {
              componentName: 'adminui-content-card-header',
              state: {
                title: 'Tables Card',
                title_colour: 'warning'
              }
            },
            {
              componentName: 'adminui-content-card-body',
              children: [
                {
                  componentName: 'adminui-datatables',
                  hooks: ['getTableData']
                }
              ]
            }
          ]
        }


    ]
    //children: [
    //  {
    //  componentName: 'adminui-button',
    //  state: {
    //  name: 'Button2Dev',
    //  text: 'Button2_4Dev'
    //  },
    //  hooks: ['addButtonHandler']
    //  }
    //]
  };

//localdata stuff here
let storeZ = store.get('user_2').address.city


let address2 = {
  "street": "Victor Plains",
  "suite": "Suite 879",
  "city": "Berlin",
  "zipcode": "90566-7771",
  "geo": {
    "lat": "-43.9509",
    "lng": "-34.4618"
  }
}
var whereiscity = address2.city


store.set('user_2', {address: address2}); 


console.log(store.get('user_2').address.city);
//


//console.log(_this.datatable);


  let hooks = {
    'adminui-button': {
        ButtonHandlerA: function() {
        let fn = function(e) {
        console.log('you clicked the button');
        console.log("& got this value in demo from user2 via store_local.js " + storeZ)
        };
        this.addHandler(fn);
        }
      },
      'adminui-datatables': {
        getTableData: async function() {
          let _this = this;
          //let responseObj = await QEWD.reply({
         //   type: 'getTableData',
          //  ref: this.name
         // });
          //  let obj = responseObj.message.data;
            let obj2 = store.get('dataT');
            //_this.render(obj);
            _this.render(obj2);
            console.log("dataT is");
            console.log(obj2);
            //_this.datatable.clear().draw();
            //_this.datatable.draw();
            /*
            setTimeout(function() {
              console.log('xxxxx');
              console.log(_this.datatable);
              //_this.datatable.clear().draw();
              //_this.remove();
            }, 4000);
            */
  
            _this.onCellClicked = function(cell) {
              console.log('clicked cell with value ' + cell.data());
              console.log(this);
              console.log(cell);
              console.log(cell.index());
              //cell.data('New Value');
              //cell.draw();
            };
  
          //});
        }
      }

    };

  return {component, hooks};
};
