import type { Meta, StoryObj } from '@storybook/react-vite'
import { GitLogPaged } from './GitLogPaged'
import { entry } from 'test/stubs'

const entries = [
  entry({ hash: 'a1b2c3d', branch: 'release', message: 'feat: initial commit', parents: [] }),
  entry({ hash: 'e4f5g6h', branch: 'release', message: 'feat: add pagination', parents: ['a1b2c3d'] })
]

const meta: Meta<typeof GitLogPaged> = {
  title: 'Widgets/GitLogPaged',
  component: GitLogPaged,
  args: {
    entries,
    branchName: 'release',
    headCommitHash: 'e4f5g6h'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <GitLogPaged {...args}>
      <GitLogPaged.Tags />
      <GitLogPaged.GraphHTMLGrid />
      <GitLogPaged.Table />
    </GitLogPaged>
  )
}
