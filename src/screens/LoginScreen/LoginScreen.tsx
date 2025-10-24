import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Logo } from "../../components/Logo/Logo";
import { AUTH_MESSAGES, FORM_PLACEHOLDERS } from "../../constants/messages";
import { colors } from "../../constants/theme";
import { type LoginFormData, loginSchema } from "../../utils/validation";
import { styles } from "./styles";

export const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      console.log("Login data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Logo size="large" style={styles.logo} />
            <Text style={styles.title}>{AUTH_MESSAGES.WELCOME_BACK}</Text>
            <Text style={styles.subtitle}>{AUTH_MESSAGES.WELCOME_SUBTITLE}</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.EMAIL}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  leftIcon={<Mail size={20} color={colors.text.tertiary} />}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  placeholder={FORM_PLACEHOLDERS.PASSWORD}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                  leftIcon={<Lock size={20} color={colors.text.tertiary} />}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={colors.text.tertiary} />
                      ) : (
                        <Eye size={20} color={colors.text.tertiary} />
                      )}
                    </TouchableOpacity>
                  }
                  containerStyle={styles.passwordInput}
                />
              )}
            />

            <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotPasswordText}>{AUTH_MESSAGES.FORGOT_PASSWORD}</Text>
            </TouchableOpacity>

            <Button
              title={AUTH_MESSAGES.LOGIN_BUTTON}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              fullWidth
              size="large"
              style={styles.loginButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{AUTH_MESSAGES.DIVIDER_OR}</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button title={AUTH_MESSAGES.CREATE_ACCOUNT} variant="outline" fullWidth size="large" />
          </View>

          <View style={styles.footer}>
            <View style={styles.footerTextContainer}>
              <Text style={styles.footerText}>{AUTH_MESSAGES.TERMS_PREFIX} </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                <Text style={styles.footerLink}>{AUTH_MESSAGES.TERMS_LINK}</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}> {AUTH_MESSAGES.TERMS_AND} </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                <Text style={styles.footerLink}>{AUTH_MESSAGES.PRIVACY_LINK}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
