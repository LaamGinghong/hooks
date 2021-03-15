import useBoolean from '../useBoolean'

describe('useBoolean.ts', () => {
  it('initial', () => {
    const [state, actions] = useBoolean()

    expect(state).toBeDefined()
    expect(state.value).toBeFalsy()
    expect(actions).toBeDefined()
  })

  it('with params', () => {
    const [state] = useBoolean(true)
    expect(state.value).toBeTruthy()
  })

  it('set state', () => {
    const [state, { toggle, setTrue, setFalse }] = useBoolean()

    expect(state.value).toBeFalsy()
    toggle()
    expect(state.value).toBeTruthy()
    setFalse()
    expect(state.value).toBeFalsy()
    setTrue()
    expect(state.value).toBeTruthy()
    toggle(false)
    expect(state.value).toBeFalsy()
  })
})
