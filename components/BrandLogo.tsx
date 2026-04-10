import { StyleSheet, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';

type BrandLogoVariant = 'full' | 'mark';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

const sources = {
  full: require('@/assets/images/kashvion-logo.png'),
  mark: require('@/assets/images/kashvion-mark.png'),
} as const;

export function BrandLogo({
  variant = 'full',
  width = 180,
  height,
  style,
}: BrandLogoProps) {
  const resolvedHeight = height ?? (variant === 'full' ? 52 : width);

  return (
    <View style={[styles.wrap, { width, height: resolvedHeight }, style]}>
      <Image
        contentFit="contain"
        source={sources[variant]}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
  },
});
