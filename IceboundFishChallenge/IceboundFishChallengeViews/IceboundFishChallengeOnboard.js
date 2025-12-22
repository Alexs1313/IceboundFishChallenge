import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { onboardBackgrounds } from '../IceboundFishChallengeConsts/onboardBackgrounds';

const IceboundFishChallengeOnboard = () => {
  const [iceBoundOnboardIdx, setIceBoundOnboardIdx] = useState(0);
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={onboardBackgrounds[iceBoundOnboardIdx]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.iceBoundContainer,
            iceBoundOnboardIdx !== 0 && {
              justifyContent: 'flex-start',
              paddingTop: 120,
            },
            iceBoundOnboardIdx === 3 && {
              justifyContent: 'flex-end',
              flex: 1,
            },
          ]}
        >
          {iceBoundOnboardIdx === 0 && (
            <Image
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWlcText1.png')}
              style={styles.iceBoundWelcImg}
            />
          )}
          {iceBoundOnboardIdx === 1 && (
            <Image
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWlcText2.png')}
              style={styles.iceBoundWelcImg}
            />
          )}
          {iceBoundOnboardIdx === 2 && (
            <Image
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWlcText3.png')}
              style={styles.iceBoundWelcImg}
            />
          )}
          {iceBoundOnboardIdx === 3 && (
            <Image
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWlcText4.png')}
              style={styles.iceBoundWelcImg}
            />
          )}

          <LinearGradient
            colors={['#E0F9FD', '#2974C0']}
            style={{
              borderRadius: 6,
              width: '80%',
              marginBottom: 60,
            }}
          >
            <LinearGradient
              colors={['#25609B', '#64BAE1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 5,
                padding: Platform.OS === 'ios' ? 3 : 0,
                margin: Platform.OS === 'ios' ? 0 : 3,
              }}
            >
              <View style={styles.iceBoundOnboardGradContainer}>
                <Text style={styles.iceBoundOnboardText}>
                  {iceBoundOnboardIdx === 0 &&
                    'Scan the ice. Spot the fish. Enter the number.'}
                  {iceBoundOnboardIdx === 1 &&
                    `Fish can hide under snow, 
cracks, or only show a tail.`}
                  {iceBoundOnboardIdx === 2 &&
                    `Count carefully — one wrong
 number ends the run.`}
                  {iceBoundOnboardIdx === 3 &&
                    `One level. One reward. All stories are always open.`}
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>

          {iceBoundOnboardIdx === 0 && (
            <TouchableOpacity
              style={styles.iceBoundStartButton}
              onPress={() => {
                iceBoundOnboardIdx === 3
                  ? navigation.navigate('IceboundFishChallengeStack')
                  : setIceBoundOnboardIdx(iceBoundOnboardIdx + 1);
              }}
            >
              <Text style={styles.iceBoundStartButtonText}>
                {iceBoundOnboardIdx === 0 && 'Start'}
                {iceBoundOnboardIdx === 1 && 'Next'}
                {iceBoundOnboardIdx === 2 && 'Next'}
                {iceBoundOnboardIdx === 3 && 'Let’s Play'}
              </Text>
            </TouchableOpacity>
          )}

          {iceBoundOnboardIdx > 0 && (
            <View
              style={[
                {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 86,
                },
                iceBoundOnboardIdx < 3 && { flex: 1 },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.iceBoundStartButton}
                onPress={() => {
                  iceBoundOnboardIdx === 3
                    ? navigation.replace('IceboundFishChallengeHome')
                    : setIceBoundOnboardIdx(iceBoundOnboardIdx + 1);
                }}
              >
                <Text style={styles.iceBoundStartButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {iceBoundOnboardIdx === 0 && (
          <Image
            source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWom1.png')}
            style={{ position: 'absolute', bottom: 0, right: 0 }}
          />
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  iceBoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iceBoundStartButton: {
    marginTop: 30,
    backgroundColor: '#25609B',
    width: 124,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#14243E',
  },
  iceBoundStartButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  iceBoundOnboardText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  iceBoundOnboardGradContainer: {
    padding: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iceBoundWelcImg: { marginBottom: 34 },
});

export default IceboundFishChallengeOnboard;
