import { MantineThemeOverride } from "@mantine/core";

// Shared color constants
const BLUE_SHADES = {
  light: {
    primary: [
      '#EBF2FA', // 0: Very light blue - backgrounds
      '#D7E5F5', // 1: Light blue - hover states
      '#A3C6E8', // 2: Soft blue - borders
      '#6FA1D8', // 3: Medium blue - secondary elements
      '#1B4D89', // 4: Primary blue - main elements
      '#164177', // 5: Deep blue - emphasis
      '#123561', // 6: Dark blue - text & focus
      '#0D284A', // 7: Deeper blue - contrast
      '#091D36', // 8: Very dark blue - strong contrast
      '#051224'  // 9: Darkest blue - extreme contrast
    ],
    secondary: [
      '#F0F7FF', // 0: Lightest accent
      '#CCE4FF', // 1: Light accent
      '#99C8FF', // 2: Soft accent
      '#66ADFF', // 3: Medium accent
      '#3392FF', // 4: Primary accent
      '#0066FF', // 5: Deep accent
      '#0052CC', // 6: Dark accent
      '#003D99', // 7: Deeper accent
      '#002966', // 8: Very dark accent
      '#001433'  // 9: Darkest accent
    ]
  },
  dark: {
    primary: [
      '#051224', // 0: Darkest blue (reversed)
      '#091D36', // 1: Very dark blue
      '#0D284A', // 2: Deeper blue
      '#123561', // 3: Dark blue
      '#164177', // 4: Deep blue
      '#1B4D89', // 5: Primary blue
      '#6FA1D8', // 6: Medium blue
      '#A3C6E8', // 7: Soft blue
      '#D7E5F5', // 8: Light blue
      '#EBF2FA'  // 9: Very light blue
    ],
    secondary: [
      '#001433', // 0: Darkest accent (reversed)
      '#002966', // 1: Very dark accent
      '#003D99', // 2: Deeper accent
      '#0052CC', // 3: Dark accent
      '#0066FF', // 4: Deep accent
      '#3392FF', // 5: Primary accent
      '#66ADFF', // 6: Medium accent
      '#99C8FF', // 7: Soft accent
      '#CCE4FF', // 8: Light accent
      '#F0F7FF'  // 9: Lightest accent
    ]
  }
};
// Shared color constants
const AUTUMN_HUES = {
  light: {
    primary: [
      '#FDF6EF', // 0: Very light warm beige - backgrounds
      '#F9E8D9', // 1: Light peach - hover states
      '#F2CAA7', // 2: Soft orange - borders
      '#E69E68', // 3: Medium orange - secondary elements
      '#D15E39', // 4: Burnt orange - main elements
      '#B44B2A', // 5: Deep rust - emphasis
      '#943F23', // 6: Dark rust - text & focus
      '#723019', // 7: Deeper brown - contrast
      '#522312', // 8: Very dark brown - strong contrast
      '#33160B'  // 9: Darkest brown - extreme contrast
    ],
    secondary: [
      '#FFF8F0', // 0: Lightest golden
      '#FFE4CC', // 1: Light gold
      '#FFCF99', // 2: Soft gold
      '#FFB366', // 3: Medium gold
      '#FF9833', // 4: Primary gold
      '#FF7D00', // 5: Deep gold
      '#CC6400', // 6: Dark gold
      '#994B00', // 7: Deeper gold
      '#663200', // 8: Very dark gold
      '#331900'  // 9: Darkest gold
    ]
  },
  dark: {
    primary: [
      '#33160B', // 0: Darkest brown (reversed)
      '#522312', // 1: Very dark brown
      '#723019', // 2: Deeper brown
      '#943F23', // 3: Dark rust
      '#B44B2A', // 4: Deep rust
      '#D15E39', // 5: Burnt orange
      '#E69E68', // 6: Medium orange
      '#F2CAA7', // 7: Soft orange
      '#F9E8D9', // 8: Light peach
      '#FDF6EF'  // 9: Very light warm beige
    ],
    secondary: [
      '#331900', // 0: Darkest gold (reversed)
      '#663200', // 1: Very dark gold
      '#994B00', // 2: Deeper gold
      '#CC6400', // 3: Dark gold
      '#FF7D00', // 4: Deep gold
      '#FF9833', // 5: Primary gold
      '#FFB366', // 6: Medium gold
      '#FFCF99', // 7: Soft gold
      '#FFE4CC', // 8: Light gold
      '#FFF8F0'  // 9: Lightest golden
    ]
  }
};

const SPRINGTIME = {
  light: {
    primary: [
      '#F5FBF5', // 0: Very light sage - backgrounds
      '#E5F5E5', // 1: Light mint - hover states
      '#C1E4C1', // 2: Soft green - borders
      '#8FCD8F', // 3: Medium green - secondary elements
      '#4BA84B', // 4: Fresh green - main elements
      '#3D8A3D', // 5: Deep green - emphasis
      '#326F32', // 6: Dark green - text & focus
      '#255425', // 7: Deeper green - contrast
      '#1A3B1A', // 8: Very dark green - strong contrast
      '#102410'  // 9: Darkest green - extreme contrast
    ],
    secondary: [
      '#FFF9FB', // 0: Lightest blossom
      '#FFE6ED', // 1: Light pink
      '#FFD4E2', // 2: Soft pink
      '#FFC1D6', // 3: Medium pink
      '#FFADCA', // 4: Primary pink
      '#FF8AB7', // 5: Deep pink
      '#CC6E92', // 6: Dark pink
      '#99536E', // 7: Deeper pink
      '#663749', // 8: Very dark pink
      '#331C25'  // 9: Darkest pink
    ]
  },
  dark: {
    primary: [
      '#102410', // 0: Darkest green (reversed)
      '#1A3B1A', // 1: Very dark green
      '#255425', // 2: Deeper green
      '#326F32', // 3: Dark green
      '#3D8A3D', // 4: Deep green
      '#4BA84B', // 5: Fresh green
      '#8FCD8F', // 6: Medium green
      '#C1E4C1', // 7: Soft green
      '#E5F5E5', // 8: Light mint
      '#F5FBF5'  // 9: Very light sage
    ],
    secondary: [
      '#331C25', // 0: Darkest pink (reversed)
      '#663749', // 1: Very dark pink
      '#99536E', // 2: Deeper pink
      '#CC6E92', // 3: Dark pink
      '#FF8AB7', // 4: Deep pink
      '#FFADCA', // 5: Primary pink
      '#FFC1D6', // 6: Medium pink
      '#FFD4E2', // 7: Soft pink
      '#FFE6ED', // 8: Light pink
      '#FFF9FB'  // 9: Lightest blossom
    ]
  }
};

const CURRENT_THEME = BLUE_SHADES;

// Shared component styles
const componentStyles = {
  Button: {
    styles: (theme: any) => ({
      root: {
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
        },
      },
    }),
  },
  Card: {
    styles: (theme: any) => ({
      root: {
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      },
    }),
  },
};

// Light theme configuration
export const customTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    primary: CURRENT_THEME.light.primary,
    secondary: CURRENT_THEME.light.secondary,
  },
  primaryColor: 'primary',
  primaryShade: 6,
  defaultRadius: 'sm',
  fontFamily: 'Montserrat, sans-serif',
  components: {
    ...componentStyles,
    Card: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.white,
          border: `1px solid ${theme.colors.primary[1]}`,
          boxShadow: '0 2px 4px rgba(27, 77, 137, 0.1)',
        },
      }),
    },
  },
  other: {
    boxShadow: '0 2px 4px rgba(27, 77, 137, 0.1)',
    headerBackground: CURRENT_THEME.light.primary[0],
    bodyBackground: '#ffffff',
    textColor: CURRENT_THEME.light.primary[7],
    borderColor: CURRENT_THEME.light.primary[2],
  },
};

// Dark theme configuration
export const darkTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    primary: CURRENT_THEME.dark.primary,
    secondary: CURRENT_THEME.dark.secondary,
  },
  primaryColor: 'primary',
  primaryShade: 6,
  defaultRadius: 'sm',
  fontFamily: 'Montserrat, sans-serif',
  components: {
    ...componentStyles,
    Card: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.primary[1],
          border: `1px solid ${theme.colors.primary[2]}`,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
      }),
    },
  },
  other: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    headerBackground: CURRENT_THEME.dark.primary[1],
    bodyBackground: CURRENT_THEME.dark.primary[0],
    textColor: CURRENT_THEME.dark.primary[8],
    borderColor: CURRENT_THEME.dark.primary[2],
  },
};

// Theme provider wrapper function
export const getTheme = (colorScheme: 'light' | 'dark'): MantineThemeOverride => {
  return colorScheme === 'light' ? lightTheme : darkTheme;
};

// Usage example:
/*
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useState } from 'react';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={getTheme(colorScheme)} withGlobalStyles withNormalizeCSS>
        <YourApp />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

// Component usage examples:
const ExampleComponents = () => (
  <>
    {/* Primary button *}
    <Button color="primary">Primary Action</Button>

    {/* Secondary button *}
    <Button color="secondary" variant="light">Secondary Action</Button>

    {/* Card with hover effect *}
    <Card>
      <Text>Card content</Text>
    </Card>

    {/* Custom background *}
    <Box bg="primary.1" p="md">
      <Text color="primary.7">Custom content</Text>
    </Box>

    {/* Alert component *}
    <Alert color="primary">
      Important notification
    </Alert>
  </>
);
*/
