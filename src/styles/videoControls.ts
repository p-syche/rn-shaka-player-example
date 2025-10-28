import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from './theme';

export const videoControlStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  playerContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    position: 'relative',
  },
  
  player: {
    width: '100%',
    height: '100%',
  },
  
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    color: colors.text.primary,
    marginTop: spacing.md,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
  },
  
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  
  errorText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xl,
    textAlign: 'center',
    fontWeight: typography.fontWeight.medium,
  },
  
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xxl,
    backgroundColor: colors.background.overlay,
  },
  
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background.overlay,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.background.secondary,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.purple.vibrant,
  },
  
  timeText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    width: 80,
    textAlign: 'center',
    fontWeight: typography.fontWeight.medium,
  },
  
  timeTextSmall: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
    minWidth: 80,
    textAlign: 'center',
    marginLeft: spacing.sm,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.purple.vibrant,
  },
  
  buttonText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  
  playButton: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    borderWidth: 3,
    borderColor: colors.purple.vibrant,
  },
  
  playButtonSmall: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.full,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: colors.purple.vibrant,
  },
  
  playButtonText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xxxl,
  },
  
  playButtonTextSmall: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  
  slider: {
    flex: 1,
    height: 40,
    marginLeft: spacing.md,
  },
  
  info: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.xxl,
    right: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: colors.background.overlay,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.purple.vibrant,
  },
  
  infoTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  
  infoDescription: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    lineHeight: 24,
  },
  
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
  
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});

export const sliderColors = {
  minimumTrackTintColor: colors.purple.vibrant,
  maximumTrackTintColor: colors.background.secondary,
  thumbTintColor: colors.purple.vibrant,
};
