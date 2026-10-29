/**
 * The height of each row across
 * all subcomponents, in pixels.
 */
export const ROW_HEIGHT = 40

/**
 * The default width and height of
 * a commit node on the graph.
 */
export const DEFAULT_NODE_SIZE = 20

/**
 * The width of the borders on a commit node.
 */
export const NODE_BORDER_WIDTH = 2

/**
 * The number of pixels to offset the background
 * element/colour by so that it has padding around
 * the commit node on the graph.
 */
export const BACKGROUND_HEIGHT_OFFSET = 16

/**
 * The size of the SVG curved line and
 * the lengths of the accompanying vertical
 * lines.
 */
export const CURVE_SIZE = 24

/**
 * Pseudo-hash used for the Git index / working-tree
 * pseudo-commit row rendered above HEAD.
 */
export const INDEX_HASH = 'index'

/**
 * Hash used for the default (uninitialised)
 * commit placeholder in contexts.
 */
export const DEFAULT_COMMIT_HASH = 'defaultCommit'

/**
 * Default branch name used before the
 * real context is initialised.
 */
export const DEFAULT_BRANCH_NAME = 'master'

/**
 * Bounds for the resizable graph container.
 */
export const RESIZE_MIN_WIDTH = 200
export const RESIZE_MAX_WIDTH = 800

/**
 * Opacity values used across selection,
 * preview and tag styling. Centralised to
 * avoid magic numbers drifting.
 */
export const SELECTED_BG_OPACITY = 0.15
export const PREVIEW_TAG_OPACITY = 0.8
export const DEFAULT_TAG_OPACITY = 0.4
export const INDEX_NODE_BORDER_OPACITY = 0.5
export const DIMMED_TEXT_OPACITY = 0.4

/**
 * Transition duration (seconds) for hover effects.
 */
export const HOVER_TRANSITION_DURATION = 0.3

/**
 * zIndex applied to commit-node tooltips / popovers.
 */
export const COMMIT_NODE_Z_INDEX = '20'

/**
 * Fallback colour when a commit has no mapped graph position.
 */
export const FALLBACK_COMMIT_COLOUR = 'rgb(0, 0, 0)'