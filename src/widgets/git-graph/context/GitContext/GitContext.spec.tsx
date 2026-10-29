import { commit } from 'test/stubs'
import { renderHook } from '@testing-library/react'
import { useGitContext } from 'hooks/useGitContext/useGitContext'

describe('GitContext default implementation', () => {
  it('should be a no-op when calling setGraphOrientation if the context is not initialised', () => {
    const { result } = renderHook(useGitContext)
    expect(() => result.current.setGraphOrientation('flipped')).not.toThrow()
  })

  it('should be a no-op when calling setNodeSize if the context is not initialised', () => {
    const { result } = renderHook(useGitContext)
    expect(() => result.current.setNodeSize(27)).not.toThrow()
  })

  it('should be a no-op when calling setGraphWidth if the context is not initialised', () => {
    const { result } = renderHook(useGitContext)
    expect(() => result.current.setGraphWidth(78)).not.toThrow()
  })

  it('should be a no-op when calling setSelectedCommit if the context is not initialised', () => {
    const { result } = renderHook(useGitContext)
    const testCommit = commit()

    expect(() => result.current.setSelectedCommit(testCommit)).not.toThrow()
  })

  it('should be a no-op when calling setPreviewedCommit if the context is not initialised', () => {
    const { result } = renderHook(useGitContext)
    const testCommit = commit()

    expect(() => result.current.setPreviewedCommit(testCommit)).not.toThrow()
  })
})
