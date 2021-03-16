import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Text } from './styles';

export default function Button({ children = String, loading = false, textColor = "#fff", disabled = false, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={{color: textColor}}>{children}</Text>
      )}
    </Container>
  );
}