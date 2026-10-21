import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Складской терминал, отдельный контейнерный терминал и автомобильные грузоперевозки ООО «ГЕРА».',
  title: 'ГЕРА — терминалы и автоперевозки',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  )
}
