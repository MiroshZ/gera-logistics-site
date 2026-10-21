'use client'

import { useState } from 'react'

export function EmailTestButton() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [failed, setFailed] = useState(false)

  async function sendTest() {
    setBusy(true)
    setMessage('')
    setFailed(false)
    try {
      const response = await fetch('/api/admin/email-test', { method: 'POST' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Не удалось отправить письмо.')
      setMessage(result.message)
    } catch (error) {
      setFailed(true)
      setMessage(error instanceof Error ? error.message : 'Не удалось отправить письмо.')
    } finally {
      setBusy(false)
    }
  }

  return <div className="email-test-control"><button className="button button--dark" type="button" onClick={sendTest} disabled={busy}>{busy ? 'Отправляем…' : 'Отправить тестовое письмо'}</button>{message ? <p role={failed ? 'alert' : 'status'}>{message}</p> : null}</div>
}
