import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import createRoute from '~/routes';

function App() {
  const signed = useSelector(state => state.auth.signed);
  const Routes = createRoute(signed);

  useEffect(() => {
    OneSignal.init('d9514f4d-d209-4abe-a612-63ac9b9b9f9e');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }, []);

  useEffect(() => {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  });

  function onReceived(data) {}

  function onOpened(notification) {}

  function onIds(id) {}

  return <Routes />;
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
