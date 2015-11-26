angular.module('firebase.config', [])
  .constant('FBURL', 'https://blazing-torch-6786.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])

  .constant('loginRedirectPath', '/login');
