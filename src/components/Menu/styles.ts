import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#020202FA',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 30,
  },
  menuTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
    marginVertical: 5,
    width: '100%',
    borderRadius: 10,
  },
  logoutItem: {
    marginTop: 'auto',
    marginBottom: 20,
    alignSelf: 'center',
    width: '50%',
    borderColor: '#FFCC00',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  menuOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: 10,
  },
  closeButton: {},
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  menuIcon: {
    marginRight: 10,
  },
  switchStyle: {
    marginLeft: 'auto',
  },
});
