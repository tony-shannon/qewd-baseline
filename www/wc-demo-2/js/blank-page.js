export function define_blank_page() {

  let component = {
    componentName: 'contentPage',
    state: {
      name: 'blank',
      title: 'Blank',
      cardTitle: 'Blank Card',
      cardTitleColour: 'info',
      cardName: 'blank-card',
      text: 'This is the Blank Page content....'
    },
    children: [
      {
      componentName: 'adminui-button',
      state: {
      name: 'Button2Dev',
      text: 'Button2_4Dev'
      },
      hooks: ['addButtonHandler']
      }
    ]
  };

//localdata stuff here
let storeZ = store.get('user_2').address.city
//


  let hooks = {
    'adminui-button': {
        addButtonHandler: function() {
        let fn = function(e) {
        console.log('you clicked the button');
        console.log("& got this value in blank from user2 via store_local.js " + storeZ)
        };
        this.addHandler(fn);
        }
      }
    };

  return {component, hooks};
};
