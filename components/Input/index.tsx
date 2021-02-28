import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


import { Container, TInput } from './styles';

function Input({ style = [{}], icon = String, ...rest }, ref = null) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(0, 0, 0, 0.8)" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(Input);