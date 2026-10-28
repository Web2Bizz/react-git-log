import { useContext } from 'react'
import { GraphContext } from '../../context/GraphContext/GraphContext'

export const useGraphContext = () => useContext(GraphContext)