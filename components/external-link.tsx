import { PropsWithChildren } from 'react';
import { Linking, Pressable, PressableProps } from 'react-native';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';

type Props = PropsWithChildren<
  Omit<PressableProps, 'onPress'> & {
    href: string;
  }
>;

export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <Pressable
      accessibilityRole="link"
      {...rest}
      onPress={async () => {
        if (process.env.EXPO_OS !== 'web') {
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
          return;
        }

        await Linking.openURL(href);
      }}>
      {children}
    </Pressable>
  );
}
