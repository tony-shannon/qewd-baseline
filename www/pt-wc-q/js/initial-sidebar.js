export function define_initial_sidebar() {

  let component = {
    componentName: 'adminui-sidebar-brand',
    state: {
      title: 'PulseTile WC',
      icon: 'bezier-curve',
      contentPage: 'dashboard',
    }
  };

  return {component};
};
