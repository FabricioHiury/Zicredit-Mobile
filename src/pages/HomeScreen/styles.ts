import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#020202',
  },
  labelText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: 10,
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  highlightBox: {
    borderColor: '#FFCC00',
    borderWidth: 2,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  gridItem: {
    borderColor: '#FFCC00',
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
});
