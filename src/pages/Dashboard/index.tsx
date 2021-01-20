import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url || 'https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4'}} />
        </ProfileButton>
      </Header>

      <ProvidersList
        keyExtractor={provider => provider.id}
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>
            Cabeleireiros
          </ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => {navigateToCreateAppointment(provider.id)}}>
            <ProviderAvatar  source={{ uri: provider.avatar_url || 'https://avatars0.githubusercontent.com/u/49538119?s=400&u=39a6291923942b4f7cc8fcb4bce259d116807701&v=4'}}/>
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000"/>
                <ProviderMetaText>
                  Segunda à sexta
                </ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000"/>
                <ProviderMetaText>
                  8h às 18h
                </ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}

      />
    </Container>
  )
}

export default Dashboard;
