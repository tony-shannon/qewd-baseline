import {webComponents} from '../../mg-webComponents.js';
import {QEWD} from '../../qewd-client.js';

import {login_modal_assembly} from './login-modal.js';
import {logout_modal_assembly} from './logout-modal.js';
import {initial_sidebar_assembly} from './initial-sidebar.js';
import {main_sidebar_assembly} from './main-sidebar.js';
import {topbar_assembly} from './topbar.js';
import {footer_assembly} from './footer.js';

import {crud_assembly} from '../../components/adminui/components/adminui-crud.js';

document.addEventListener('DOMContentLoaded', function() {

  QEWD.on('ewd-registered', function() {

    QEWD.log = true;

    webComponents.addComponent('login_modal', login_modal_assembly(QEWD));
    webComponents.addComponent('logout_modal', logout_modal_assembly(QEWD));
    webComponents.addComponent('initial_sidebar', initial_sidebar_assembly());
    webComponents.addComponent('main_sidebar', main_sidebar_assembly());
    webComponents.addComponent('topbar', topbar_assembly());
    webComponents.addComponent('footer', footer_assembly());

    let adminPageState = {
      assemblyName: 'admin',
      name: 'admin',
      title: 'User Administration',
      summary: {
        title: 'People you administer',
        titleColour: 'info',
        btnIcon: 'user-plus',
        disableAdd: true,
        headers: ['Last Name', 'First Name', 'Postcode', 'Set Password'],
        data_properties: ['lastName', 'firstName', 'postcode'],
        qewd: {
          getSummary: 'getUsersForAdmin',
          getDetail: 'getUserAdminInfo'
        },
        rowBtnIcon: 'user-edit',
        rowBtnColour: 'info',
        enableDelete: false,
      },
      detail: {
        cardWidth: '500px',
        //newRecordTitle: 'Enter New Person',
        titleColour: 'info',
        btnIcon: 'user-cog',
        btnColour: 'success',
        btnTooltip: 'Edit Admin Details',
        disableEdit: false,
        title_data_property: function() {
          return this.record.firstName + ' ' + this.record.lastName;
        },
        fields: [
          {
            name: 'password1',
            data_property: 'password1',
            label: 'Password',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'password2',
            data_property: 'password2',
            label: 'Re-enter Password',
            type: 'text',
            labelWidth: 4
          }
        ]
      },
      update: {
        btnText: 'Save',
        btnColour: 'warning',
        qewd: {
          save: 'updatePassword'
        }
      }
    };

    webComponents.addComponent('admin', crud_assembly(QEWD, adminPageState));


    let peoplePageState = {
      assemblyName: 'people',
      name: 'people',
      title: 'People',
      summary: {
        title: 'People in your area',
        titleColour: 'info',
        btnIcon: 'user-plus',
        btnColour: 'success',
        btnTooltip: 'Add a New Person',
        headers: ['Last Name', 'First Name', 'Postcode'],
        data_properties: ['lastName', 'firstName', 'postcode'],
        qewd: {
          getSummary: 'getPeople',
          getDetail: 'getPersonInfo',
          delete: 'deletePerson'
        },
        rowBtnIcon: 'user-edit',
        rowBtnColour: 'info',
        enableDelete: function() {
          return (this.context.role === 'admin');
        },
        disableAdd: function() {
          return (this.context.role !== 'admin');
        },
        deleteConfirmText: function() {
          return this.row.firstName + ' ' + this.row.lastName;
        }
      },
      detail: {
        cardWidth: '500px',
        newRecordTitle: 'Enter New Person',
        titleColour: 'info',
        disableEdit: function() {
          return (this.context.role !== 'admin');
        },
        btnIcon: 'user-cog',
        //btnColour: 'success',
        //btnTooltip: 'Edit Details',
        title_data_property: function() {
          return this.record.firstName + ' ' + this.record.lastName;
        },
        fields: [
          {
            name: 'firstName',
            data_property: 'firstName',
            label: 'First Name',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'lastName',
            data_property: 'lastName',
            label: 'Last Name',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'email',
            data_property: 'email',
            label: 'Email',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'phone',
            data_property: 'phone',
            label: 'Telephone',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'gender',
            data_property: 'gender',
            label: 'Gender',
            type: 'select',
            labelWidth: 4,
            options: [
              {text: 'Male', value: 'm'},
              {text: 'Female', value: 'f'},
              {text: 'Not Specified', value: 'x'}
            ]
          },
          {
            name: 'yob',
            data_property: 'yob',
            label: 'Year of Birth',
            type: 'number',
            placeholder: 'Enter Year of Birth',
            labelWidth: 4
          },
          {
            name: 'address1',
            data_property: 'address1',
            label: 'Address Line 1',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'address2',
            data_property: 'address2',
            label: 'Address Line 2',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'city',
            data_property: 'city',
            label: 'City/Town',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'county',
            data_property: 'county',
            label: 'County',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'postcode',
            data_property: 'postcode',
            label: 'Postcode',
            type: 'text',
            labelWidth: 4
          },
          {
            name: 'labels',
            data_property: 'labels',
            label: 'Labels',
            type: 'checkboxes',
            checkboxes: [
              {text: 'Administrator', value: 'admin', if: function() {
                return (this.context.role === 'admin');
              }},
              {text: 'Vulnerable', value: 'volnerable'},
              {text: 'Carer', value: 'carer'},
              {text: 'Key Worker', value: 'keyworker'},
              {text: 'Volunteer', value: 'volunteer'},
              {text: 'Application User', value: 'user'}
            ]
          },
          {
            name: 'comments',
            data_property: 'comments',
            label: 'Comments',
            type: 'textarea',
            labelWidth: 4,
            height: 6
          }
        ]
      },
      update: {
        btnText: 'Save',
        btnColour: 'warning',
        qewd: {
          save: 'updatePerson'
        }
      }
    };

    webComponents.addComponent('people', crud_assembly(QEWD, peoplePageState));


    webComponents.register('people', webComponents.components.people);
    webComponents.register('admin', webComponents.components.admin);

    // create the context for running the web components

    let context = {
      paths: {
        adminui: './components/adminui/components/'
      },
      resourcePath: '/components/adminui/',
      readyEvent: new Event('ready')
    };

    // this mainview function will be used by the login hook - it will pick it up
    // from the context object

    function loadMainView() {
      let body = document.getElementsByTagName('body')[0];
      let root = webComponents.getComponentByName('adminui-root', 'root');
      let components = webComponents.components;
      webComponents.loadGroup(components.main_sidebar, root.sidebarTarget, context);
      webComponents.loadGroup(components.topbar, root.topbarTarget, context);
      webComponents.loadGroup(components.people, root.contentTarget, context);
      webComponents.loadGroup(components.logout_modal, body, context);
    }
    context.loadMainView = loadMainView;

    // set up the initial display prior to login

    let body = document.getElementsByTagName('body')[0];

    document.addEventListener('ready', function() {
      let modal = webComponents.getComponentByName('adminui-modal-root', 'modal-login');
      modal.show();
    });
    
    // now load up the initial view

    webComponents.loadWebComponent('adminui-root', body, context, function(root) {
      let components = webComponents.components;
      webComponents.loadGroup(components.initial_sidebar, root.sidebarTarget, context);
      webComponents.loadGroup(components.login_modal, body, context);
      webComponents.loadGroup(components.footer, root.footerTarget, context);
    });

  });

  QEWD.start({
    application: 'covid'
  });

});
