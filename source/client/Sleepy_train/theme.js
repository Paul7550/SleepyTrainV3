/**
 * Design tokens for Sleepy Train.
 *
 * The app is pinned to light mode (`app.json` -> `userInterfaceStyle: "light"`),
 * so there is deliberately no dark palette here.
 */

export const colors = {
    brand: '#E8352B',
    surface: '#FFFFFF',
    border: '#E4E4E7',
    borderStrong: '#D9D9DE',

    textPrimary: '#1A1A1A',
    textSecondary: '#8A8A8E',
    textTertiary: '#6E6E73',
    textOnBrand: '#FFFFFF',

    routeLine: '#2F5FC7',
    accent: '#2F6FED',
    success: '#2E9B4F',

    brandTintBg: '#FDEAE9',
    brandTintFg: '#F3A29D',
    scrim: 'rgba(0,0,0,0.3)',
};

/** Font sizes. Neighbouring steps were folded together: 11->12, 13->14, 15->16, 17->16. */
export const type = {
    caption: 12,
    small: 14,
    body: 16,
    title: 18,
    heading: 20,
    subdisplay: 22,
    display: 26,
};

export const weight = {
    medium: '500',
    semibold: '600',
    bold: '700',
};

/**
 * Spacing scale, derived from what the app already uses rather than an imposed
 * 4pt grid -- 18 and 14 are the two most common values and snapping them would
 * shift most screens.
 */
export const space = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 32,
    max: 40,
};

export const radius = {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 20,
};

/** Horizontal padding owned by screens; cards carry no horizontal margin of their own. */
export const screenPadding = space.xl;

/** The single card treatment shared by JourneyCard, LatestConnections, SavedTripCard and AlarmCard. */
export const card = {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
};

/**
 * Flat list row used by the connection lists (search results, recent connections).
 * These read as one continuous list separated by hairlines rather than as cards.
 */
export const listRow = {
    backgroundColor: colors.surface,
    paddingVertical: space.base,
};

/** Applied to every row except the first, so lines land *between* items only. */
export const listDivider = {
    borderTopWidth: 1,
    borderTopColor: colors.border,
};
