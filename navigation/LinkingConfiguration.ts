import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              Login: 'one',
            },
          },
          Person: {
            screens: {
              CreatePerson: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
