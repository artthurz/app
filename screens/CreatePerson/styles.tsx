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
  margin-top: 20px;
`;