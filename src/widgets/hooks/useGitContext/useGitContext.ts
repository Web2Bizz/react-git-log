import { useContext } from 'react'
import { GitContext } from '../../context/GitContext/GitContext'

export const useGitContext = () => useContext(GitContext)