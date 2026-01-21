import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './[IceboundFishChallenge]/[IceboundChallengeStore]/iceboundFishChallengeContext';

// nav import
import FishAppRoutes from './[IceboundFishChallenge]/[IceboundFishNavigation]/FishAppRoutes';

const App = () => {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <FishAppRoutes />
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
