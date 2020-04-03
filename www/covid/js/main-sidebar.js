export function main_sidebar_assembly() {

  let component = [
    {
      componentName: 'adminui-sidebar-divider',
      state: {
        isTop: true
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      if: function(context) {
        return (context.role === 'admin');
      },
      state: {
        title: 'User Admin',
        icon: 'admin',
        contentPage: 'admin'
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'People',
        icon: 'users',
        contentPage: 'people',
        active: true
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Orgs',
        icon: 'users',
        contentPage: 'orgs',
        active: true
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Issues',
        icon: 'users',
        contentPage: 'issues',
        active: true
      }
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Tasks',
        icon: 'users',
        contentPage: 'tasks',
        active: true
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-nav-item',
      state: {
        title: 'Logout',
        icon: 'power-off',
        use_modal: 'modal-logout'
      }
    },
    {
      componentName: 'adminui-sidebar-divider',
    },
    {
      componentName: 'adminui-sidebar-toggler',
    }
  ];

  return {component};

};
