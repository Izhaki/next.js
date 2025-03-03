import { pickFontFileForFallbackGeneration } from './pick-font-file-for-fallback-generation'

describe('pickFontFileForFallbackGeneration', () => {
  it('should pick the weight closest to 400', () => {
    expect(
      pickFontFileForFallbackGeneration([
        {
          weight: '300',
        },
        {
          weight: '600',
        },
      ])
    ).toEqual({
      weight: '300',
    })

    expect(
      pickFontFileForFallbackGeneration([
        { weight: '200' },
        {
          weight: '500',
        },
      ])
    ).toEqual({
      weight: '500',
    })

    expect(
      pickFontFileForFallbackGeneration([
        {
          weight: 'normal',
        },
        {
          weight: '700',
        },
      ])
    ).toEqual({
      weight: 'normal',
    })

    expect(
      pickFontFileForFallbackGeneration([
        {
          weight: 'bold',
        },
        {
          weight: '900',
        },
      ])
    ).toEqual({
      weight: 'bold',
    })
  })

  it('should pick the thinner weight if both have the same distance to 400', () => {
    expect(
      pickFontFileForFallbackGeneration([
        {
          weight: '300',
        },
        {
          weight: '500',
        },
      ])
    ).toEqual({
      weight: '300',
    })
  })

  it('should pick variable range closest to 400', () => {
    expect(
      pickFontFileForFallbackGeneration([
        {
          weight: '100 300',
        },
        {
          weight: '600 900',
        },
      ])
    ).toEqual({
      weight: '100 300',
    })

    expect(
      pickFontFileForFallbackGeneration([
        { weight: '100 200' },
        {
          weight: '500 800',
        },
      ])
    ).toEqual({
      weight: '500 800',
    })

    expect(
      pickFontFileForFallbackGeneration([
        { weight: '100 900' },
        {
          weight: '300 399',
        },
      ])
    ).toEqual({
      weight: '100 900',
    })
  })

  it('should prefer normal style over italic', () => {
    expect(
      pickFontFileForFallbackGeneration([
        { weight: '400', style: 'normal' },
        { weight: '400', style: 'italic' },
      ])
    ).toEqual({ weight: '400', style: 'normal' })
  })
})
