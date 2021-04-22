import styled from "styled-components/native";

import Input from "../../components/Input";
import Button from "../../components/Button";

export const Container = styled.View`
  align-self: center;
  justify-content: center;
  width: 80%;
  flex: 1;
`;

export const CnpjContainer = styled.View`
  align-self: center;
  width: 100%;
  margin-top: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SearchButton = styled(Button)`
  margin-top: 10px;
  background-color: #eee;
`;

export const SelectButton = styled(Button)`
  margin-top: 10px;
  background-color: ${(props: { style: { backgroundColor: string; }; }) => props?.style?.backgroundColor ? props?.style?.backgroundColor : '#eee'};
`;
