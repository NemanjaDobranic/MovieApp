import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Card from '../components/Card';
import Error from '../components/Error';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';

const Search = ({navigation}) => {
  const [text, onChangeText] = React.useState();
  const [searchResults, setSearchResults] = React.useState();
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const onSubmit = query => {
    Promise.all([
      searchMovieTv(query, 'movie'),
      searchMovieTv(query, 'tv'),
    ]).then(([movies, tv]) => setSearchResults([...movies, ...tv]));
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={onChangeText}
              placeholder={'Search Movie ot TV Show'}
            />
          </View>
          <TouchableOpacity onPress={() => onSubmit(text)}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Searched items result */}
          {searchResults?.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
            />
          )}

          {/* When Searched but no results */}
          {loaded && searchResults?.length === 0 && (
            <View style={styles.noResult}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}

          {/* When Nothing is searched */}
          {!searchResults && (
            <View>
              <Text>Type something to start searching.</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderRadius: 15,
  },
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {
    padding: 5,
  },
  noResult: {
    paddingTop: 20,
  },
});
export default Search;
