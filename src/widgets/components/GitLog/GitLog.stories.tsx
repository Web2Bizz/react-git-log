import type { Meta, StoryObj } from '@storybook/react-vite'
import { GitLog } from './GitLog'
import { entry } from 'test/stubs'

const entries = [
  entry({ hash: 'a1b2c3d', branch: 'main', message: 'feat: initial commit', parents: [] }),
  entry({ hash: 'e4f5g6h', branch: 'main', message: 'feat: add graph', parents: ['a1b2c3d'] }),
  entry({ hash: 'i7j8k9l', branch: 'feature/graph', message: 'feat: curved edges', parents: ['e4f5g6h'] })
]

const meta: Meta<typeof GitLog> = {
  title: 'Widgets/GitLog',
  component: GitLog,
  args: {
    entries,
    currentBranch: 'main'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <GitLog {...args}>
      <GitLog.Tags />
      <GitLog.GraphHTMLGrid />
      <GitLog.Table />
    </GitLog>
  )
}

export const WithoutTable: Story = {
  render: (args) => (
    <GitLog {...args}>
      <GitLog.Tags />
      <GitLog.GraphHTMLGrid />
    </GitLog>
  )
}
