import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="site-page inner-page">
      <section className="page-intro page-intro--simple">
        <div className="page-intro__copy"><p className="eyebrow"><span className="eyebrow__dot" />ДАННЫЕ И ОБРАЩЕНИЯ</p><h1>Обработка персональных данных.</h1><p className="page-intro__lead">Эта локальная версия страницы не содержит юридического текста для публичного использования.</p></div>
      </section>
      <section className="privacy-draft"><p className="eyebrow"><span className="eyebrow__dot" />ЧЕРНОВИК</p><h2>Текст будет подготовлен для фактической схемы работы сайта.</h2><p>Перед публикацией необходимо описать состав собираемых данных, место их хранения, срок обработки, получателей уведомлений и способы отзыва согласия. Формулировки должны быть проверены специалистом для нужных юрисдикций.</p><Link className="inline-link" href="/ru/contacts#request">Вернуться к форме <span aria-hidden="true">→</span></Link></section>
    </main>
  )
}
