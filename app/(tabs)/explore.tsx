import { Platform, StyleSheet } from 'react-native';


export default function TabTwoScreen() {
  return (
    <></>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  contentView: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
