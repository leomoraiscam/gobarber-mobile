import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation()

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
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
    </Container>
  )
}

export default Dashboard;
