import {Dimensions, Platform, StatusBar} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';

const {width, height} = Dimensions.get('window');

export const ASPECT_RATIO = width / 390;

export const screenSize = {
  width: width + (IS_ANDROID ? 1 : 0),
  height: height + (IS_ANDROID ? 1 : 0),
  half_width: Math.round(width / 2),
  half_height: Math.round(height / 2),
};

export enum space {
  '4xs' = 2,
  '3xs' = 4,
  '2xs' = 6,
  xs = 8,
  sm = 12,
  md = 16,
  lg = 20,
  xl = 24,
  '2xl' = 28,
  '3xl' = 32,
  '4xl' = 36,
  '5xl' = 40,
  '6xl' = 46,
}

export enum avatarSize {
  xs = 24,
  sm = 32,
  md = 48,
  lg = 96,
  xl = 128,
}

export enum fontSize {
  '2xs' = 8,
  xs = 10,
  sm = 12,
  md = 14,
  lg = 16,
  xl = 18,
  '2xl' = 20,
  '3xl' = 24,
  '4xl' = 28,
  '5xl' = 32,
  '6xl' = 36,
  '7xl' = 56,
  '8xl' = 72,
  '9xl' = 92,
}

export enum iconSize {
  '3xs' = 10,
  '2xs' = 12,
  xs = 16,
  sm = 20,
  md = 24,
  lg = 28,
  xl = 32,
  '2xl' = 36,
  '3xl' = 40,
  '4xl' = 72,
}
