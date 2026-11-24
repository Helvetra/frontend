// Checks that client-side detection maps the added languages to their app codes.
import { describe, it, expect } from 'vitest'
import { useLanguageDetection } from '../app/composables/useLanguageDetection'

const { detectLanguage } = useLanguageDetection()

describe('detectLanguage for the added languages', () => {
  it('detects Portuguese', () => {
    expect(detectLanguage('Olá, muito obrigado pela sua mensagem. Não consigo ir à reunião amanhã de manhã.')).toBe('pt')
  })

  it('detects Spanish', () => {
    expect(detectLanguage('Hola, muchas gracias por tu mensaje. Mañana no puedo ir a la reunión de la mañana.')).toBe('es')
  })

  it('detects Albanian', () => {
    expect(detectLanguage('Përshëndetje, faleminderit shumë për mesazhin tuaj. Nesër nuk mund të vij në takim.')).toBe('sq')
  })

  it('maps Croatian and Serbian text to one of the two codes', () => {
    const latin = detectLanguage('Hvala vam puno na poruci. Sutra ujutro nažalost ne mogu doći na sastanak.')
    expect(['hr', 'sr']).toContain(latin)
  })

  it('detects Serbian in Cyrillic script', () => {
    expect(detectLanguage('Хвала вам пуно на поруци. Сутра ујутро нажалост не могу да дођем на састанак.')).toBe('sr')
  })
})
