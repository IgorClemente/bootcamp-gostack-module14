import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

import Background from '~/components/Background';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState();

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider: item })
              }
            >
              <Avatar
                source={{
                  uri: item.avatar
                    ? item.avatar.url
                    : `https://api.adorable.io/avatar/50/${item.name}.png`,
                }}
              />
              <Name>{item.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
