import { createStackNavigator } from '@react-navigation/stack';

// Importing all the screens/components used in the stack

import IceboundFishChallengeLoader from '../[FishComponents]/IceboundFishChallengeLoader';
import IceboundFishChallengeRewards from '../[FishIceboundViews]/IceboundFishChallengeRewards';
import FishChallengeHome from '../[FishIceboundViews]/FishChallengeHome';
import ChallengeOnboardScreen from '../[FishIceboundViews]/ChallengeOnboardScreen';
import FishLevelsScreen from '../[FishIceboundViews]/FishLevelsScreen';
import IceboundSavedScreen from '../[FishIceboundViews]/IceboundSavedScreen';
import FishTalesScreen from '../[FishIceboundViews]/FishTalesScreen';

const Stack = createStackNavigator();

const FishAppRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="IceboundFishChallengeLoader"
        component={IceboundFishChallengeLoader}
      />
      <Stack.Screen
        name="ChallengeOnboardScreen"
        component={ChallengeOnboardScreen}
      />
      <Stack.Screen name="FishChallengeHome" component={FishChallengeHome} />
      <Stack.Screen name="FishLevelsScreen" component={FishLevelsScreen} />
      <Stack.Screen
        name="IceboundFishChallengeRewards"
        component={IceboundFishChallengeRewards}
      />
      <Stack.Screen name="FishTalesScreen" component={FishTalesScreen} />
      <Stack.Screen
        name="IceboundSavedScreen"
        component={IceboundSavedScreen}
      />
    </Stack.Navigator>
  );
};

export default FishAppRoutes;
