import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#020202',
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 20, // Adicionado para dar um espaçamento abaixo da logo
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    backgroundColor: '#121212',
    color: '#FFFFFF80',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 10,
  },
});
