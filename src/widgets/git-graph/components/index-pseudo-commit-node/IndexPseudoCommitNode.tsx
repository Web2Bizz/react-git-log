import classNames from 'classnames'
import styles from './IndexPseudoCommitNode.module.scss'
import { useTheme } from 'hooks/use-theme'
import { IndexPseudoCommitNodeProps } from 'types/IndexPseudoCommitNode'
import { useGraphContext } from 'hooks/use-graph-context'
import { INDEX_NODE_BORDER_OPACITY } from 'constants/constants'

export const IndexPseudoCommitNode = ({ animate, columnColour }: IndexPseudoCommitNodeProps) => {
  const { nodeSize } = useGraphContext()
  const { shiftAlphaChannel } = useTheme()

  return (
    <div
      id='index-pseudo-commit-node'
      data-testid='index-pseudo-commit-node'
      className={classNames(
        styles.indexNode,
        animate === true ? styles.spin : undefined,
      )}
      style={{
        width: nodeSize,
        height: nodeSize,
        border: `2px dotted ${shiftAlphaChannel(columnColour, INDEX_NODE_BORDER_OPACITY)}`,
        backgroundColor: shiftAlphaChannel(columnColour, 0.05),
      }}
    />
  )
}
