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

const VotingScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { sessionId } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Mock data - replace with your actual data
  const votingSession = {
    title: "Best Programming Language",
    options: [
      { id: 1, text: "Python", votes: 45 },
      { id: 2, text: "JavaScript", votes: 30 },
      { id: 3, text: "Java", votes: 15 },
      { id: 4, text: "C++", votes: 10 },
    ],
    totalVotes: 100
  };

  const handleVote = () => {
    if (!selectedOption) {
      Alert.alert("Error", "Please select an option before voting");
      return;
    }

    setHasVoted(true);
    // Here you would typically make an API call to submit the vote
  };

  const calculatePercentage = (votes) => {
    return `${Math.round((votes / votingSession.totalVotes) * 100)}%`;
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
        <Text style={styles.headerTitle}>{votingSession.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Voting Options */}
        <View style={styles.optionsContainer}>
          {votingSession.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedOption === option.id && styles.selectedOption,
                hasVoted && styles.votedOption
              ]}
              onPress={() => !hasVoted && setSelectedOption(option.id)}
              disabled={hasVoted}
            >
              <Text style={[
                styles.optionText,
                hasVoted && { marginBottom: 8 }
              ]}>{option.text}</Text>
              {hasVoted && (
                <View style={styles.resultBar}>
                  <View 
                    style={[
                      styles.resultFill,
                      { width: calculatePercentage(option.votes) }
                    ]} 
                  />
                  <Text style={styles.percentageText}>
                    {calculatePercentage(option.votes)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Vote Button */}
        {!hasVoted && (
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
        )}

        {/* Results Summary */}
        {hasVoted && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Thank you for voting!</Text>
            <Text style={styles.summaryText}>
              Total votes: {votingSession.totalVotes}
            </Text>
          </View>
        )}
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
  votedOption: {
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 0,
  },
  resultBar: {
    height: 24,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  resultFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#A8D5FF',
    borderRadius: 12,
  },
  percentageText: {
    position: 'absolute',
    right: 8,
    top: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
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
  summaryContainer: {
    backgroundColor: '#E3EEFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
  },
});

export default VotingScreen;
