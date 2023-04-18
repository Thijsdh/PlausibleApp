import {NavigationProp, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../Navigator';
import Card from '../../components/Card';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import TextInputField from '../../components/TextInputField';
import {login} from '../../requests/login';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export default function Login({navigation}: Props) {
  const theme = useTheme();

  const [host, setHost] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function submit() {
    setError(false);
    setLoading(true);
    let success = false;
    try {
      success = await login(host, email, password);
    } catch (e) {
      setError(true);
    }

    if (success) {
      navigation.reset({routes: [{name: 'Sites'}]});
    } else {
      setLoading(false);
      setError(true);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    error: {
      fontSize: 16,
      color: '#ff3333',
    },
    title: {
      fontSize: 20,
      color: theme.colors.text,
      fontWeight: 'bold',
      marginVertical: 16,
    },
    button: {
      marginTop: 16,
      marginBottom: 8,
    },
  });

  return (
    <KeyboardAvoidingView
      testID="ViewLogin"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          edges={['right', 'bottom', 'left']}>
          <Container>
            <Card>
              <Text style={styles.title}>Enter your email and password</Text>
              {error && (
                <Text testID="TextLoginFailed" style={styles.error}>
                  Login failed. Please try again.
                </Text>
              )}
              <TextInputField
                testID="InputHost"
                label="Plausible Host"
                value={host}
                onChangeText={setHost}
                placeholder="https://plausible.io"
                autoCapitalize="none"
                keyboardType="url"
                autoCorrect={false}
              />
              <TextInputField
                testID="InputEmail"
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="user@example.com"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
              <TextInputField
                testID="InputPassword"
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <CustomButton
                testID="ButtonLogin"
                title="Login"
                onPress={submit}
                disabled={loading}
                style={styles.button}
              />
            </Card>
          </Container>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
