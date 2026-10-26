import { ColourSelection } from '@components/ColourSelector'

export type StoryHeaderProps = {
  colours: ColourSelection
  repository: string
  onChangeRepository: (repository: string) => void
  onChangeColours: (event: ColourSelection) => void
}
