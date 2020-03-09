  var test_data = [
      {
        firstName: 'Rob',
        lastName: 'Tweed',
        city: 'Redhill',
        gender: 'Male'
      },
      {
        firstName: 'Simon',
        lastName: 'Tweed',
        city: 'St Albans',
        gender: 'Male'
      },
      {
        firstName: 'Susanne',
        lastName: 'Salling',
        city: 'Redhill',
        gender: 'Female'
      },
      {
        firstName: 'Chris',
        lastName: 'Munt',
        city: 'Banstead',
        gender: 'Male'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        city: 'London',
        gender: 'Female'
      },
      {
        firstName: 'Ian',
        lastName: 'Jones',
        city: 'Edinburgh',
        gender: 'Male'
      },
      {
        firstName: 'Michael',
        lastName: 'Ryan',
        city: 'Leeds',
        gender: 'Male'
      },
      {
        firstName: 'Jane',
        lastName: 'Tweed',
        city: 'Redhill',
        gender: 'Female'
      },
    ];
    
    
    module.exports = function(args, finished) {

      var personDoc = this.documentStore.use('person');
      var dataDoc = personDoc.$('data');
      var indexDoc = personDoc.$(['index', 'by_name_and_city']);
      // create the database if it doesn't already exist
      if (!personDoc.exists) {
        test_data.forEach(function(record) {
          var id = personDoc.$('next_id').increment();
          dataDoc.$(id).setDocument(record);
          indexDoc.$([record.lastName, record.city, id]).value = '';
        });
      }

      // get matches from the database, using the lastname & city index
      var results = [];
      indexDoc.$([args.lastName, args.town]).forEachChild(function(id) {
        results.push(dataDoc.$(id).getDocument());
      });

      finished({
        dbWork: true,
        output: results
      });
    };