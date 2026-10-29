import { useContext } from 'react'
import { GraphContext } from '../../context/graph-context/GraphContext'

export const useGraphContext = () => useContext(GraphContext)