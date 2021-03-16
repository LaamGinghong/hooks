import useToggle from '../useToggle'

describe('useToggle.ts', () => {
  it('initial', () => {
    const [state, actions] = useToggle()

    expect(state).toBeDefined()
    expect(state.value).toBeFalsy()
    expect(actions).toBeDefined()
  })

  it('type', () => {
    const [state, { toggle, setLeft, setRight }] = useToggle<'true', 'false'>('true', 'false')

    expect(state.value).toEqual('true')
    toggle()
    expect(state.value).toEqual('false')
    toggle()
    expect(state.value).toEqual('true')
    toggle('false')
    expect(state.value).toEqual('false')
    setLeft()
    expect(state.value).toEqual('true')
    setRight()
    expect(state.value).toEqual('false')
  })
})
