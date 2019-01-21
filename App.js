import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Title, Fundo, Termos, BotaoTexto } from './styles';
import { LinearGradient } from 'react-native-linear-gradient';

type Props = {};
export default class App extends Component<Props> {
  state = {
    email: '',
    password: '',
    isAuthenticated: false,
  };

  login = async () => {
    const { email , password } = this.state;

    try {

      const user = await firebase.auth()
      .signInWithEmailAndPassword(email, password);
      
      this.setState({ isAuthenticated: true });
      console.log(user);

    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    return (
      <Fundo style={styles.container}>

      <Image style={styles.logo} source={require('./img/PersonalClub_Logo2-300x97.png')}/>

        <Title>Login</Title>

        <TextInput 
          style={styles.input}
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          />

        <TextInput 
          style={styles.input}
          placeholder="CPF"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          />

          <Termos style={styles.margem}>
          Ao prosseguir você estará de acordo com nossos 
            <Text style={{color: '#F38433'}} 
              onPress={() => LinkingIOS.openURL('http://www.google.com.br')}>
                 Termos de Uso e Política de Privacidade
            </Text>
          </Termos>

          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          { this.state.isAuthenticated ? <alert>Logado com sucesso</alert> : null }
      
      </Fundo>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    height: 45,
    backgroundColor: '#F38433',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 28,
  },
  logo: {
    paddingTop:0,
    marginBottom: 30,
  },
  margem: {
    marginTop: 30,
    marginBottom: 40,
  }
});
