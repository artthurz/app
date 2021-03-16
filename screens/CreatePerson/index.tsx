import * as React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import DateInput from "../../components/DateInput";
import { cpf } from 'cpf-cnpj-validator'; 
import {
  SubmitButton,
  FormInput,
  Form,
  SearchButton,
} from "./styles";
import api from '../../services/api';
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "../../components/Themed";

import { useState, useEffect } from "react";

export default function CreatePerson() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [typedCpf, setTypedCpf] = useState("");
  const [birthDate, setBirthDate] = useState(new Date);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedUf, setSelectedUf] = useState(""); 
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");
  const [gender, setGender] = useState("Masculino");
  const [cep, setCep] = useState("");
  const [showCep, setShowCep] = useState(false);

  const [cepSearchLoading, setCepSearchLoading] = useState(false);

  const [cepNotFound, setCepNotFound] = useState(false);
  const [nameRequired, setNameRequired] = useState(false);
  const [surnameRequired, setSurnameRequired] = useState(false);
  const [numberRequired, setNumberRequired] = useState(false);

  const [success, setSuccess] = useState(false);

  const [cpfFormatIsNotValid, setCpfFormatIsNotValid] = useState(false);
  

  async function loadCep() {
    setCepSearchLoading(true);
    try {
      const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response.data)
      setSelectedUf(response.data.uf)
      setSelectedCity(response.data.localidade)
      setSelectedStreet(response.data.logradouro)
      setShowCep(true)
      setCepNotFound(false)
    } catch (e) {
      setCepNotFound(true)
    }
    setCepSearchLoading(false)
  }

  useEffect(() => {
    if (cpf.isValid(typedCpf)) {
      setCpfFormatIsNotValid(false);
    }else if (!cpf.isValid(typedCpf) && typedCpf === "") {
      setCpfFormatIsNotValid(false);
    }else {
      setCpfFormatIsNotValid(true);
    }
  }, [typedCpf])


  function handleSubmit() {
    if (name === undefined || name === "") {
      setNameRequired(true);
      setSurnameRequired(false);
      setNumberRequired(false);
      setCepNotFound(false);
    } else if (surname === undefined || surname === ""){
      setSurnameRequired(true);
      setNameRequired(false);
      setNumberRequired(false);
      setCepNotFound(false);
    } else if (!cpf.isValid(typedCpf)) {
      setSurnameRequired(false);
      setNameRequired(false);
      setNumberRequired(false);
      setCpfFormatIsNotValid(true);
    } else if (!showCep) {
      setCepNotFound(true);
      setSurnameRequired(false);
      setNameRequired(false);
      setNumberRequired(false);
    } else if (number === undefined || number === "") {
      setNumberRequired(true);
      setCepNotFound(false);
      setSurnameRequired(false);
      setNameRequired(false);
    }else {
      setNameRequired(false);
      setSurnameRequired(false);
      setNumberRequired(false);
      setCpfFormatIsNotValid(false);
      setCepNotFound(false);
      setEmail("");
      setName("");
      setSurname("");
      setTypedCpf("");
      setSelectedUf("");
      setSelectedCity("");
      setSelectedStreet("");
      setCep("");
      setNumber("");
      setShowCep(false);
      setSuccess(true);
    }
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
              textContentType={"name"}
              autoCompleteType={"name"}
            />
            {nameRequired && 
              <Text style={styles.required}>O campo Nome é obrigatório</Text>
            }
            <FormInput
              placeholder="Sobrenome"
              value={surname}
              onChangeText={setSurname}
              textContentType={"familyName"}
              autoCompleteType={"name"}
            />
            {surnameRequired && 
              <Text style={styles.required}>O campo Sobrenome é obrigatório</Text>
            }
            <FormInput
              placeholder="CPF"
              value={typedCpf}
              onChangeText={setTypedCpf}
              keyboardType={"number-pad"}
              maxLength={11}
            />
            {cpfFormatIsNotValid && 
              <Text style={styles.required}>Este CPF não é válido</Text>
            }
            <FormInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCompleteType={"email"}
            />
            <Text style={styles.message}>Data de Nascimento</Text>
            <DateInput date={birthDate} onChange={setBirthDate}/>
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
            <Text style={styles.message}>CEP</Text>
            <FormInput
              placeholder={"CEP"}
              defaultValue={cep}
              editable={true}
              maxLength={8}
              keyboardType={"number-pad"}
              textContentType={"postalCode"}
              autoCompleteType={"postal-code"}
              onChangeText={setCep}
            />
            {cepNotFound && 
              <Text style={styles.required}>CEP não encontrado</Text>
            }
            <SearchButton onPress={loadCep} textColor={"black"} loading={cepSearchLoading}>Encontrar Endereço</SearchButton>
            {showCep && (
              <>
                <Text style={styles.message}>Estado</Text>
                <FormInput
                  placeholder={"UF"}
                  defaultValue={selectedUf}
                  editable={false}
                  maxLength={2}
                  onChangeText={setSelectedUf}
                />
                <Text style={styles.message}>Cidade</Text>
                <FormInput
                  placeholder={"Cidade"}
                  defaultValue={selectedCity}
                  editable={false}
                  onChangeText={setSelectedCity}
                />
                <Text style={styles.message}>Logradouro</Text>
                <FormInput
                  placeholder={"Logradouro"}
                  defaultValue={selectedStreet}
                  editable={false}
                  onChangeText={setSelectedStreet}
                />
                <Text style={styles.message}>Número</Text>
                <FormInput
                  placeholder={"Número"}
                  defaultValue={number}
                  maxLength={6}
                  editable={true}
                  onChangeText={setNumber}
                  keyboardType={"number-pad"}
                />
                {numberRequired && 
                  <Text style={styles.required}>O campo número é obrigatório</Text>
                }
              </>
            )}
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
            <SubmitButton onPress={handleSubmit} disabled={!showCep}>Criar</SubmitButton>
          </Form>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          {success && 
            <Text style={styles.success}>Cadastro realizado com Sucesso!</Text>
          }
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
