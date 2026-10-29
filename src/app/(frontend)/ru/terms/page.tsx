import Link from 'next/link'
import { LegalShell } from '@/components/site/LegalShell'
import { getSiteSettings } from '@/lib/content'
import { getLegalOperator } from '@/lib/legal'

export const metadata = { title: 'Условия использования сайта | ГЕРА' }

export default async function TermsPage() {
  const operator = getLegalOperator(await getSiteSettings())

  return (
    <LegalShell current="/terms" title="Условия использования сайта" lead="Информация об услугах и правила использования материалов ООО «ГЕРА».">
      <section>
        <h2>Информация об услугах</h2>
        <p>Владелец сайта — {operator.name}. Размещённые описания услуг, фотографии, сроки и другие сведения носят информационный характер. Конкретные условия хранения, обработки груза и перевозки компания подтверждает при рассмотрении запроса. Отправка заявки сама по себе не означает заключение договора. Если на странице прямо не указано иное, материалы сайта не являются публичной офертой.</p>
      </section>
      <section>
        <h2>Права на сайт и материалы</h2>
        <p>Исключительные права на сайт как результат подбора и расположения материалов, а также на оригинальные тексты, элементы оформления и другие созданные для сайта материалы принадлежат ООО «ГЕРА» в пределах приобретённых компанией прав. Материалы третьих лиц, если они размещены на сайте, используются на законных основаниях; права на них сохраняются за соответствующими правообладателями.</p>
        <p><strong>Копирование, переработка, повторное размещение и иное использование охраняемых материалов сайта без предварительного письменного разрешения правообладателя запрещены</strong>, кроме случаев, прямо разрешённых законом. Для запроса разрешения напишите на <a href={`mailto:${operator.email}`}>{operator.email}</a>. Ссылаться на страницы сайта можно без копирования их содержимого.</p>
      </section>
      <section>
        <h2>Обращения через сайт</h2>
        <p>При отправке заявки действуют <Link href="/privacy">Политика обработки персональных данных</Link> и отдельное <Link href="/consent">согласие на обработку данных</Link>. Посетитель отвечает за достоверность сведений, которые добровольно указывает в форме, и не должен направлять чужие конфиденциальные сведения без необходимого основания.</p>
      </section>
      <section className="legal-sources">
        <h2>Правовая основа</h2>
        <p>Положения о материалах сайта основаны на <a href="https://www.consultant.ru/document/cons_doc_LAW_64629/26eaf5de7ca59025f4388fe2980d3dd03dd5e775/" target="_blank" rel="noopener noreferrer">статье 1260</a> и <a href="https://www.consultant.ru/document/cons_doc_LAW_64629/dffcf0b87b80ff38f430dc822a0074e76ccd41a0/" target="_blank" rel="noopener noreferrer">статье 1270 ГК РФ</a>. Исключения для законного использования, включая допустимое цитирование, установлены <a href="https://www.consultant.ru/document/cons_doc_LAW_64629/84bbd636598a59112a4fe972432343dd4f51da1d/" target="_blank" rel="noopener noreferrer">статьёй 1274 ГК РФ</a>. Об информационном характере предложений — <a href="https://www.consultant.ru/document/cons_doc_LAW_5142/1a77b2ec302d6a384a228dff59e53680ccffaaca/" target="_blank" rel="noopener noreferrer">статья 437 ГК РФ</a>.</p>
      </section>
    </LegalShell>
  )
}
