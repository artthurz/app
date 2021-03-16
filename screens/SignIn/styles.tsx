import styled from "styled-components/native";

import Input from "../../components/Input";
import Button from "../../components/Button";

export const Form = styled.View`
  align-self: center;
  margin-top: 50px;
  width: 80%;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const AcceptButton = styled(Button)`
  margin-top: 5px;
  min-width: 100px;
  background-color: rgb(48, 209, 88);
`;

export const DenyButton = styled(Button)`
  margin-top: 5px;
  min-width: 100px;
  background-color: rgb(255, 69, 58);
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  align-self: center;
`;

export const Aside = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 75%;
  margin-top: 20px;
`;
