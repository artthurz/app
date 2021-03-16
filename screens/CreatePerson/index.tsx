import * as React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import DateInput from "../../components/DateInput";
import {
  SubmitButton,
  FormInput,
  Form,
} from "./styles";
import api from '../../services/api';
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "../../components/Themed";

import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

export default function CreatePerson() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState(new Date);
  const [selectedUf, setSelectedUf] = useState(); 
  const [selectedCity, setSelectedCity] = useState();

  const [gender, setGender] = useState("Masculino");

  const [ufs, setUfs] = useState();
  const [citys, setCitys] = useState();
  const [loadingUfs, setLoadingUfs] = useState(false);
  const [loadingCitys, setLoadingCitys] = useState(false);
  const [nameRequired, setNameRequired] = useState(false);
  
  async function loadUfs() {
    setLoadingUfs(true);
    const response = await api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
    setUfs(response.data);
    setLoadingUfs(false);
  }

  useEffect(() => {
    if (isEmpty(ufs)){
      loadUfs();
    }
  })

  async function loadCitys() {
    setLoadingCitys(true);
    setCitys();
    const response = await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`);
    setCitys(response.data);
    setLoadingCitys(false);
  }

  useEffect(() => { 
    loadCitys();
  }, [selectedUf]);

  function handleSubmit() {
  }

  return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Cadastrar Pessoa</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <Form>
            <Text style={styles.section}>Dados Pessoais</Text>
            <FormInput
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            {nameRequired && 
              <Text style={styles.required}>O campo Nome é obrigatório</Text>
            }
            <FormInput
              placeholder="Sobrenome"
              value={surname}
              onChangeText={setSurname}
            />
            <FormInput
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
            />
            <Text style={styles.message}>Data de Nascimento</Text>
            <DateInput date={birthDate} onChange={setBirthDate} />
            <Text style={styles.message}>Sexo</Text>
            <Picker
              selectedValue={gender}
              mode="dropdown"
              style={{ height: 46, backgroundColor: "rgba(209, 209, 214, 0.2);"}}
              onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)
            }>
              <Picker.Item label="Masculino" value="1" />
              <Picker.Item label="Feminino" value="2" />
              <Picker.Item label="Indefinido" value="3" />
            </Picker>
            <View
              style={styles.separator2}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
            <Text style={styles.section}>Endereço</Text>
            <Text style={styles.message}>Estado</Text>
            <Picker
              selectedValue={selectedUf}
              mode="dropdown"
              enabled={!loadingUfs}
              style={{ height: 46, backgroundColor: "rgba(209, 209, 214, 0.2);"}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedUf(itemValue)
            }>
              {
                ufs && (ufs.map(e => 
                (<Picker.Item label={e.nome} value={e.id} />)))
              }
            </Picker>
            <Text style={styles.message}>Cidade</Text>
            <Picker
                selectedValue={selectedCity}
                enabled={!loadingCitys}
                mode="dropdown"
                style={{ height: 46, backgroundColor: "rgba(209, 209, 214, 0.2);"}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCity(itemValue)
            }>
              {
                citys && (citys.map(e => 
                (<Picker.Item label={e.nome} value={e.id} />)))
              }
            </Picker>
            <SubmitButton onPress={handleSubmit}>Criar</SubmitButton>
          </Form>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        </SafeAreaView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 80
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
  },
  required: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
  },
  section: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
