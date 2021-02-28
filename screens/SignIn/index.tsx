import * as React from "react";
import { StyleSheet } from "react-native";
import {
  SubmitButton,
  FormInput,
  Form,
  AcceptButton,
  DenyButton,
  Aside,
} from "./styles";

import { Text, View } from "../../components/Themed";
import { useState } from "react";
import _ from "lodash";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [foundUserTip, setFoundUserTip] = useState("");

  const [message, setMessage] = useState("");
  const [showTip, setShowTip] = useState(false);

  const users = [
    {
      id: 1,
      login: "arthur",
      password: "arthur",
      tip: "Nome do Aluno",
    },
    {
      id: 2,
      login: "juca",
      password: "juca",
      tip: "Bala",
    },
    {
      id: 3,
      login: "wolf",
      password: "wolf",
      tip: "Sobrenome do Professor",
    },
  ];

  function handleSubmit() {
    setShowTip(false);
    setFoundUserTip("");

    let foundUser = {};

    const userLogin = _.lowerCase(login);

    users.map((user) => {
      if (user.login === userLogin) foundUser = user;
    });

    if (_.isEmpty(foundUser)) setMessage("Usuário inexistente");
    else if (foundUser.password !== password) {
      setMessage("Senha incorreta! Gostaria de ver a dica de senha?");
      setFoundUserTip(foundUser.tip);
    } else if (foundUser.password === password) setMessage("Usuário logado!");
  }

  function handleConfirmClick() {
    setShowTip(true);
  }

  function handleDenyClick() {
    setFoundUserTip("");
    setShowTip(false);
    setMessage("Senha incorreta!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça Login no Aplicativo</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Form>
        <FormInput
          icon="mail-outline"
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
        />
        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
        />
        <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
      </Form>
      <Text style={styles.message}>{message}</Text>
      {foundUserTip ? (
        <Aside>
          <AcceptButton onPress={handleConfirmClick}>Sim</AcceptButton>
          <DenyButton onPress={handleDenyClick}>Não</DenyButton>
        </Aside>
      ) : null}
      {showTip ? (
        <Text style={styles.message}>{`Dica: ${foundUserTip}`}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  message: {
    marginTop: 20,
  },
});
