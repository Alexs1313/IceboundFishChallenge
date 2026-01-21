import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Share,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { fisherTales } from '../[ChallengeData]/fisherTales';
import { useNavigation } from '@react-navigation/native';

const gradientColors = ['#25609B', '#64BAE1'];
const fff = '#FFFFFF';
const bg = require('../IceboundFishChallengeAssets/images/IceboundFishChallengeTalesBg.png');

const FishTalesScreen = () => {
  const [currentIceboundTaleIndex, setCurrentIceboundTaleIndex] = useState(0);
  const [savedIceboundMap, setSavedIceboundMap] = useState({});
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const currentTale = fisherTales[currentIceboundTaleIndex];
  const isSavedTale = savedIceboundMap[currentTale.id];

  useEffect(() => {
    loadSavedIceboundTales();
  }, []);

  const loadSavedIceboundTales = async () => {
    const savedFisherTales = await AsyncStorage.getItem('FISHER_TALES_SAVED');
    if (savedFisherTales) setSavedIceboundMap(JSON.parse(savedFisherTales));
  };

  const toggleSavedIceboundTale = async () => {
    const updatedTales = {
      ...savedIceboundMap,
      [currentTale.id]: !isSavedTale,
    };
    if (isSavedTale) delete updatedTales[currentTale.id];
    setSavedIceboundMap(updatedTales);

    console.log('load');
    await AsyncStorage.setItem(
      'FISHER_TALES_SAVED',
      JSON.stringify(updatedTales),
    );
  };

  const shareCurrentTale = () => {
    Share.share({
      message: `${currentTale.title}\n\n${currentTale.text}`,
    });
  };

  const handleNextTale = () => {
    setCurrentIceboundTaleIndex(prev => (prev + 1) % fisherTales.length);

    console.log('next');
  };

  return (
    <ImageBackground source={bg} style={styles.screenIcebound}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, height: 700 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.topWrapIcebound, { paddingTop: height * 0.07 }]}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.topBarIcebound}
          >
            <TouchableOpacity
              style={styles.backActionIcebound}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeArrow.png')}
              />
            </TouchableOpacity>

            <Text style={styles.topTitleIcebound}>Fisher Tales</Text>
          </LinearGradient>
        </View>

        <LinearGradient
          colors={['#E0F9FD', '#2974C0']}
          style={styles.frameOuterIcebound}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.frameInnerIcebound}
          >
            <View style={styles.textBoxIcebound}>
              <Text style={styles.taleTitleIcebound}>{currentTale.title}</Text>
              <Text style={styles.taleBodyIcebound}>{currentTale.text}</Text>
            </View>
          </LinearGradient>
        </LinearGradient>

        <View style={styles.controlsRowIcebound}>
          <TouchableOpacity
            style={styles.iconControlIcebound}
            onPress={shareCurrentTale}
            activeOpacity={0.6}
          >
            <Image
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeTalesShr.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextControlIcebound}
            onPress={handleNextTale}
            activeOpacity={0.6}
          >
            <Text style={styles.nextLabelIcebound}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconControlIcebound}
            onPress={toggleSavedIceboundTale}
            activeOpacity={0.6}
          >
            <Image
              source={
                isSavedTale
                  ? require('../IceboundFishChallengeAssets/images/IceboundFishChallengeFilled.png')
                  : require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHeart.png')
              }
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Image
            source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeTalesGirl.png')}
            style={styles.characterArtIcebound}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenIcebound: {
    flex: 1,
  },
  topWrapIcebound: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 70,
  },
  topBarIcebound: {
    height: 62,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backActionIcebound: {
    position: 'absolute',
    left: 20,
  },
  topTitleIcebound: {
    color: fff,
    fontSize: 22,
    fontWeight: '800',
  },
  frameOuterIcebound: {
    borderRadius: 6,
    width: '80%',
    marginBottom: 60,
    alignSelf: 'center',
    marginTop: 80,
  },
  frameInnerIcebound: {
    borderRadius: 5,
    padding: Platform.OS === 'ios' ? 3 : 0,
    margin: Platform.OS === 'ios' ? 0 : 3,
  },
  textBoxIcebound: {
    padding: 18,
  },
  taleTitleIcebound: {
    fontSize: 20,
    fontWeight: '800',
    color: fff,
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  taleBodyIcebound: {
    fontSize: 16,
    color: fff,
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  controlsRowIcebound: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 10,
  },
  iconControlIcebound: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#1F5C94',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#14243E',
  },
  nextControlIcebound: {
    width: 124,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#1F5C94',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#14243E',
  },
  nextLabelIcebound: {
    color: fff,
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  characterArtIcebound: {
    height: 260,
    resizeMode: 'contain',
    marginTop: 40,
  },
});

export default FishTalesScreen;
