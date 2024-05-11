import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#020202',
  },
  logo: {
    alignContent: 'center',
    alignItems: 'center',
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
    gap: 4,
  },
  button: {
    backgroundColor: '#FFCC00',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
  },
});
