import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import {
  Container,
  CnpjContainer,
  FormInput,
  SearchButton,
  SelectButton,
} from "./styles";
import api from "../../services/api";
import { Text, View } from "../../components/Themed";

import { useState } from "react";

export default function CnpjAndCpfValidator({navigation}) {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [situacaoDoCpnj, setSituacaoDoCpnj] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [showCnpj, setShowCnpj] = useState(false);
  const [cnpjSearchLoading, setCnpjSearchLoading] = useState(false);
  const [cnpjNotFound, setCnpjNotFound] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showCnpjSearch, setShowCnpjSearch] = useState(false);

  async function loadCnpj() {
    setCnpjSearchLoading(true);
    try {
      const response = await api.get(
        `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
      );

      if (response.data.status !== "ERROR") {
        setRazaoSocial(response.data.nome);
        setSituacaoDoCpnj(response.data.situacao);
        setBairro(response.data.bairro);
        setLogradouro(response.data.logradouro);
        setNumero(response.data.numero);
        setMunicipio(response.data.municipio);
        setEstado(response.data.uf);
        setShowCnpj(true);
        setSuccess(true);
        setCnpjNotFound(false);
      } else {
        setCnpjNotFound(true);
        setShowCnpj(false);
        setSuccess(false);
      }
    } catch (e) {
      console.error(e);
    }
    setCnpjSearchLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <Text style={styles.title}>Validar CNPJ e CPF</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <SelectButton
          onPress={() =>
            setShowCnpjSearch((prevState) => setShowCnpjSearch(!prevState))
          }
          style={{ backgroundColor: "orange" }}
        >
          Validar CNPJ
        </SelectButton>
        <SelectButton
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Validar Cpf", {
              link: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp'
            })
          }
          style={{ backgroundColor: "blue" }}
        >
          Validar CPF
        </SelectButton>
        {showCnpjSearch && (
          <CnpjContainer>
            <Text style={styles.message}>CNPJ</Text>
            <FormInput
              placeholder={"CNPJ"}
              defaultValue={cnpj}
              editable={true}
              maxLength={14}
              minLength={14}
              keyboardType={"number-pad"}
              textContentType={"postalCode"}
              autoCompleteType={"postal-code"}
              onChangeText={setCnpj}
            />
            {cnpjNotFound && (
              <Text style={styles.required}>CNPJ não encontrado</Text>
            )}
            <SearchButton
              onPress={loadCnpj}
              textColor={"black"}
              loading={cnpjSearchLoading}
            >
              Validar
            </SearchButton>
            {showCnpj && (
              <>
                <Text style={styles.messageTitle}>Razão Social</Text>
                <Text style={styles.message}>{razaoSocial}</Text>
                <Text style={styles.messageTitle}>Situação do CNPJ</Text>
                <Text style={styles.message}>{situacaoDoCpnj}</Text>
                <Text style={styles.messageTitle}>Endereço</Text>
                <Text
                  style={styles.message}
                >{`${logradouro} - Nr ${numero}`}</Text>
                <Text style={styles.message}>{bairro}</Text>
                <Text style={styles.message}>{`${municipio} - ${estado}`}</Text>
              </>
            )}
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </CnpjContainer>
        )}
      </Container>
      {success && <Text style={styles.success}>CNPJ é válido!</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 80,
  },
  separator: {
    marginTop: 20,
    height: 1,
    width: "80%",
  },
  separator2: {
    marginTop: 20,
    marginBottom: 10,
    height: 1,
    width: "80%",
  },
  message: {
    marginTop: 5,
  },

  messageTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  required: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
  },
  success: {
    marginTop: 5,
    marginBottom: 5,
    color: "green",
  },
  section: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
