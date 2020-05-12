export function define_charts_page(QEWD) {

  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'charts'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Charts'
        }
      },
      {
        componentName: 'adminui-content-card',
        state: {
          name: 'charts-card'
        },
        children: [
          {
            componentName: 'adminui-content-card-header',
            state: {
              title: 'Charts Card',
              title_colour: 'warning'
            }
          },
          {
            componentName: 'adminui-content-card-body',
            children: [
              {
                componentName: 'adminui-chart',
                hooks: ['getChartData']
              }
            ]
          }
        ]
      },

      {
        componentName: 'adminui-content-card',
        state: {
          name: 'chart-card-detail'
          
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
                  name: "chart-detail",
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
    'adminui-chart': {
      getChartData: function() {
        let _this = this;
        let config = {
          type: 'doughnut',
          data: {
            labels: ["Direct", "Referral", "Social"],
            datasets: [{
              data: [55, 30, 15],
              backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
              hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
              hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
          },
          options: {
            maintainAspectRatio: false,
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: '#dddfeb',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              caretPadding: 10,
            },
            legend: {
              display: false
            },
            cutoutPercentage: 80,
            
            onClick: (evt, item) => { // this is standard syntax for ChartJS events
              console.log("evt is " + evt + " & item is: " + item ); // both of these are objects
              
              // as difficult to stringify item (circular object) found this replacer function which helps via cache
              // https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format
              var cache = [];
              JSON.stringify(item, (key, value) => {
                  if (typeof value === 'object' && value !== null) {
                    // Duplicate reference found, discard key
                    if (cache.includes(value)) return;

                    // Store value in our collection
                    cache.push(value);
                  }
                  return null;
                  //return value;
               });
               console.log(cache); // we can inspect the cached object from here
               cache = null; //

               // we have used the cache view to inspect the chart object to log these ...
               console.log("Chart Type = " + item[0]._chart.config.type);
               let ix = item[0]._index;
               console.log("ChartIndex = " + ix);
               //console.log("Labels = " + item[0]._chart.config.data.labels); 
               console.log("Label = " + item[0]._chart.config.data.labels[ix]);
               console.log("Data = " + item[0]._chart.config.data.datasets[0].data[ix]);
               let div = _this.getComponentByName('adminui-div', 'chart-detail');
               //div.setState({text: 'added by event - from click from ' + cell.data()});
               div.setState({text: 'Label :' + item[0]._chart.config.data.labels[ix] + " & Data :" + item[0]._chart.config.data.datasets[0].data[ix]});


             }
          },
        };

        this.draw(config);
      }
    }
  };

  return {component, hooks};
};
