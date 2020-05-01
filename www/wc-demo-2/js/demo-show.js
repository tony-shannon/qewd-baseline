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
//


  let hooks = {
    'adminui-button': {
        addButtonHandler: function() {
        let fn = function(e) {
        console.log('you clicked the button');
        console.log("& got this value in demo from user2 via store_local.js " + storeZ)
        };
        this.addHandler(fn);
        }
      }
    };

  return {component, hooks};
};
