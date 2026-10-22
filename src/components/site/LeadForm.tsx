'use client'

import { useState, type FormEvent } from 'react'

const choices = [
  { value: 'warehouse', label: 'Складской терминал' },
  { value: 'container', label: 'Контейнерный терминал' },
  { value: 'transport', label: 'Автоперевозка' },
] as const

type Service = (typeof choices)[number]['value']

export function LeadForm({ defaultServices = [], sourcePage = '/ru/contacts' }: { defaultServices?: Service[]; sourcePage?: string }) {
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState('')
  const [submissionId, setSubmissionId] = useState('')

  function toggleService(service: Service) {
    setServices((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service])
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const body = Object.fromEntries(form.entries())
    const idempotencyKey = submissionId || crypto.randomUUID()
    setSubmissionId(idempotencyKey)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, services, sourcePage, locale: 'ru', submissionId: idempotencyKey }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Не удалось отправить заявку. Попробуйте ещё раз.')
      setReference(String(result.reference || result.id || ''))
      setStatus('sent')
      setMessage(result.notificationStatus === 'sent'
        ? 'Заявка сохранена, уведомление отправлено менеджеру.'
        : result.notificationStatus === 'failed'
          ? 'Заявка сохранена, но email не отправлен. Администратор увидит ошибку в панели.'
          : 'Заявка сохранена в локальной системе. Email-уведомления подключаются в настройках.')
      formElement.reset()
      setServices(defaultServices)
      setSubmissionId(crypto.randomUUID())
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте ещё раз.')
    }
  }

  return (
    <section className="request-section" id="request">
      <div className="request-section__intro">
        <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" />ОБРАТНАЯ СВЯЗЬ</p>
        <h2>Расскажите, что нужно сделать с грузом.</h2>
        <p>Можно выбрать несколько направлений в одной заявке. Менеджер уточнит детали и подготовит предложение.</p>
        <div className="request-note">
          <span className="request-note__mark">↗</span>
          <p>Не нужно знать все параметры заранее. Заполните то, что уже известно.</p>
        </div>
      </div>
      <form className="lead-form" onSubmit={submit}>
        {status === 'sent' ? (
          <div className="form-success" role="status" aria-live="polite">
            <span className="form-success__check" aria-hidden="true">✓</span>
            <div><h3>Спасибо. Запрос принят.</h3><p>{message}</p>{reference ? <small>Номер обращения: {reference}</small> : null}</div>
              <button className="text-button" type="button" onClick={() => { setStatus('idle'); setMessage(''); setReference(''); setSubmissionId(crypto.randomUUID()) }}>Отправить ещё одну заявку ↗</button>
          </div>
        ) : (
          <>
            <div className="form-heading">
              <span className="form-heading__step">01</span>
              <div><h3>Выберите направление</h3><p>Отметьте одно или несколько</p></div>
            </div>
            <div className="service-options">
              {choices.map((choice) => (
                <label className={`service-option${services.includes(choice.value) ? ' is-selected' : ''}`} key={choice.value}>
                  <input type="checkbox" checked={services.includes(choice.value)} onChange={() => toggleService(choice.value)} />
                  <span className="service-option__indicator" aria-hidden="true">{services.includes(choice.value) ? '✓' : '+'}</span>
                  <span>{choice.label}</span>
                </label>
              ))}
            </div>
            <div className="form-grid">
              <label className="field"><span>Ваше имя <b>*</b></span><input name="name" autoComplete="name" required maxLength={100} placeholder="Как к вам обращаться" /></label>
              <label className="field"><span>Компания</span><input name="company" autoComplete="organization" maxLength={140} placeholder="Название компании" /></label>
              <label className="field"><span>Телефон</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+7 …" /></label>
              <label className="field"><span>Email</span><input name="email" type="email" autoComplete="email" maxLength={180} placeholder="name@company.ru" /></label>
            </div>
            {services.length > 0 ? (
              <details className="additional-details">
                <summary>Параметры груза <span aria-hidden="true">+</span></summary>
                <div className="form-grid form-grid--details">
                  {services.includes('warehouse') ? <>
                    <label className="field"><span>Что нужно сделать на складе</span><input name="warehouseOperation" maxLength={160} placeholder="Хранение, обработка…" /></label>
                    <label className="field"><span>Срок хранения</span><input name="storagePeriod" maxLength={100} placeholder="Если известен" /></label>
                  </> : null}
                  {services.includes('container') ? <>
                    <label className="field"><span>Операция с контейнером</span><input name="containerOperation" maxLength={160} placeholder="Опишите задачу" /></label>
                    <label className="field"><span>Тип / размер контейнера</span><input name="containerType" maxLength={100} placeholder="Если известен" /></label>
                    <label className="field"><span>Статус контейнера</span><select name="containerStatus" defaultValue=""><option value="">Не выбран</option><option value="loaded">Гружёный</option><option value="empty">Порожний</option></select></label>
                    <label className="field"><span>Количество контейнеров</span><input name="containerQuantity" inputMode="numeric" maxLength={30} placeholder="Если известно" /></label>
                  </> : null}
                  {services.includes('transport') ? <>
                    <label className="field"><span>Откуда</span><input name="origin" maxLength={160} placeholder="Город или адрес" /></label>
                    <label className="field"><span>Куда</span><input name="destination" maxLength={160} placeholder="Город или адрес" /></label>
                  </> : null}
                  <label className="field"><span>Тип груза</span><input name="cargoType" maxLength={160} placeholder="Если известен" /></label>
                  <label className="field"><span>Вес / объём / габариты</span><input name="cargoDimensions" maxLength={120} placeholder="Добавьте единицы измерения" /></label>
                  <label className="field"><span>Желаемая дата</span><input name="desiredDate" maxLength={80} placeholder="Дата или период" /></label>
                  <label className="field"><span>Температурные условия</span><input name="temperature" maxLength={100} placeholder="Если требуются" /></label>
                </div>
              </details>
            ) : null}
            <label className="field field--wide"><span>Коротко опишите задачу <b>*</b></span><textarea name="description" required minLength={8} maxLength={3000} rows={4} placeholder="Что нужно перевезти, принять, обработать или хранить?" /></label>
            <label className="honeypot" aria-hidden="true">Не заполняйте это поле<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label className="consent"><input name="consentAccepted" type="checkbox" value="true" required /><span>Даю ООО «ГЕРА» согласие на обработку моих персональных данных для ответа на заявку. <a href="/ru/consent" target="_blank" rel="noopener noreferrer">Прочитать текст согласия ↗</a></span></label>
            <p className="form-privacy-link">Как обрабатываются данные: <a href="/ru/privacy" target="_blank" rel="noopener noreferrer">Политика обработки персональных данных ↗</a></p>
            {status === 'error' ? <p className="form-error" role="alert">{message}</p> : null}
            <div className="form-submit-row">
              <button className="button button--accent" type="submit" disabled={status === 'sending' || services.length === 0}>
                {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'} <span aria-hidden="true">↗</span>
              </button>
              <span>Обязательные поля отмечены *</span>
            </div>
          </>
        )}
      </form>
    </section>
  )
}
