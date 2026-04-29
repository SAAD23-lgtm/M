import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';

export function ScreenBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.base} />
      <View style={styles.topOrb} />
      <View style={styles.bottomOrb} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.sand,
  },
  topOrb: {
    position: 'absolute',
    top: -80,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: '#cde5f6',
    opacity: 0.7,
  },
  bottomOrb: {
    position: 'absolute',
    bottom: -80,
    left: -40,
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: '#b8d8ea',
    opacity: 0.6,
  },
});
