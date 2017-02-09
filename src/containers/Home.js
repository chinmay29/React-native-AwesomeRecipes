import React, { Component } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet
} = ReactNative

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { searching: false, ingredientsInput: ''}
  }
  searchedRecipes(){
    this.setState({searching: true});
    this.props.fetchRecipes(this.state.ingredientsInput).then( () => {
      this.setState({searching: false});
    });
  }

  recipes() {
    return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key] )
  }
  render() {
    return <View style={styles.scene}>
      <View style={styles.searchSection}>
        <TextInput style={styles.textBox}
          returnKeyType='search'
          placeholder='ingredients (comma separated)'
          onChangeText={ (ingredientsInput) => this.setState({ingredientsInput}) }
          value={this.state.ingredientsInput}
        />
        <TouchableHighlight onPress={ () => this.searchedRecipes() } style={styles.searchButton}>
          <Text>Fetch Recipes</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.ScrollSection}>
        {!this.state.searching && this.recipes().map((recipe) =>{
          return <View key={recipe.href}>
              <Image source = { { uri: recipe.thumbnail}} style ={styles.resultImage} />
              <Text style={styles.resultText}>{recipe.title}</Text>
          </View>
        })}
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  scene: {
      flex: 1,
      marginTop: 20
  },
  searchSection: {
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row'
  },
  ScrollSection: {
    flex: 0.8
  },
  resultImage: {
    height: 150
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20
  },
  textBox: {
    flex: 0.7,
  },
  searchButton: {
    flex: 0.3
  }
})

function mapStateToProps(state){
  return {
    searchedRecipes: state.searchedRecipes
  }
}
export default connect(mapStateToProps)(Home);
