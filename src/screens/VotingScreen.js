import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useVoting } from '../context/VotingContext';

const VotingScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { sessionId } = route.params;
  const { getSession, addVote } = useVoting();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const session = getSession(sessionId);

  const handleVote = () => {
    if (!selectedOption) {
      Alert.alert("Error", "Please select an option before voting");
      return;
    }

    addVote(sessionId, selectedOption);
    setHasVoted(true);
    
    Alert.alert(
      'Thank You!',
      'Your vote has been recorded successfully. You can view the results from the home screen.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#E9F5FF" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{session.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Voting Options */}
        <View style={styles.optionsContainer}>
          {session.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedOption === option.id && styles.selectedOption
              ]}
              onPress={() => setSelectedOption(option.id)}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option.id && styles.selectedOptionText
              ]}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Vote Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            !selectedOption && styles.submitButtonDisabled
          ]}
          onPress={handleVote}
          disabled={!selectedOption}
        >
          <Text style={styles.submitButtonText}>Submit Vote</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  header: {
    backgroundColor: '#E9F5FF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedOption: {
    backgroundColor: '#E3EEFF',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 0,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VotingScreen;
