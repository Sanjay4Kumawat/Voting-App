import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

const CreateSessionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [options, setOptions] = useState(['', '']); // Minimum 2 options
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (text, index) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a session title');
      return false;
    }
    
    const validOptions = options.filter(opt => opt.trim().length > 0);
    if (validOptions.length < 2) {
      Alert.alert('Error', 'Please add at least 2 voting options');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Here you would typically make an API call to create the session
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Success',
        'Voting session created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    }, 1000);
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
        <Text style={styles.headerTitle}>Create New Session</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content}>
          {/* Title Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Session Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter session title"
              placeholderTextColor="#999"
            />
          </View>

          {/* Date Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Voting Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {date.toLocaleDateString()}
              </Text>
              <MaterialIcons name="calendar-today" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Voting Options */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Voting Options</Text>
            {options.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <TextInput
                  style={styles.optionInput}
                  value={option}
                  onChangeText={(text) => updateOption(text, index)}
                  placeholder={`Option ${index + 1}`}
                  placeholderTextColor="#999"
                />
                {options.length > 2 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeOption(index)}
                  >
                    <MaterialIcons name="remove-circle" size={24} color="#FF6B6B" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addOptionButton}
              onPress={addOption}
            >
              <MaterialIcons name="add" size={20} color="#007AFF" />
              <Text style={styles.addOptionText}>Add Option</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Creating...' : 'Create Session'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
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
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
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
  dateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    marginRight: 8,
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
  removeButton: {
    padding: 8,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 8,
  },
  addOptionText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
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

export default CreateSessionScreen; 