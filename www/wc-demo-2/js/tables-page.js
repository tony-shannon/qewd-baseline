export function define_tables_page(QEWD) {

  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'tables'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Tables'
        }
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
                  name: "table-detail",
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
      }
    ]
  };

  let hooks = {
    'adminui-datatables': {
      getTableData: async function() {
        let _this = this;
 //       let responseObj = await QEWD.reply({
//          type: 'getTableData',
 //         ref: this.name
 //       });
         // let obj = responseObj.message.data;
         // _this.render(obj);
          let obj2 = store.get('dataT');
          _this.render(obj2);

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
            
            //let row = cell.row();
            let rowIx = cell.index().row;
            console.log("rowIx = " + rowIx);
            console.log(cell.row(rowIx).data());
            //cell.data('New Value');
            let div = _this.getComponentByName('adminui-div', 'table-detail');
            //div.setState({text: 'added by event - from click from ' + cell.data()});
            div.setState({text: 'added by event - from click from ' + cell.row(rowIx).data()});
            //cell.draw();
          };

        //});
      }
    }
  };

  return {component, hooks};
};



//let div = _this.getComponentByName('adminui-div', 'detail');
//div.setState({text: 'added by event - from click from ' + this.name });