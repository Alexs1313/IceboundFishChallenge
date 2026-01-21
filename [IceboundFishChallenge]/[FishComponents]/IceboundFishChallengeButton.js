import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const IceboundFishChallengeButton = ({ buttonLabel, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ width: 259 }}
    >
      <LinearGradient
        colors={['#E0F9FD', '#2974C0']}
        style={{
          borderRadius: 16,
        }}
      >
        <LinearGradient
          colors={['#07519bff', '#64BAE1', '#174f87ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 15,
            padding: Platform.OS === 'ios' ? 3 : 0,
            margin: Platform.OS === 'ios' ? 0 : 3,
          }}
        >
          <View style={styles.iceBoundGradContainer}>
            <Image source={buttonLabel} />
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iceBoundOnboardText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  iceBoundGradContainer: {
    height: 69,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IceboundFishChallengeButton;
