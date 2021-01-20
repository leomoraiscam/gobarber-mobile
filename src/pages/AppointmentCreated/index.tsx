import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../hooks/auth';

const AppointmentCreated: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button title="Sair" onPress={signOut} />
    </View>
  )
}

export default AppointmentCreated;
