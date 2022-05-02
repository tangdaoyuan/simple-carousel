import React from 'react'
import './App.scss'
import Carousel from '../../lib/src'
import IPHONE from './assets/iphone.png'
import TABLET from './assets/tablet.png'
import AIRPODS from './assets/airpods.png'

function App() {
  return (
    <div className="App">
      <Carousel>
        <section>
          <img src={IPHONE} alt="iphone" />
        </section>
        <section>
          <img src={TABLET} alt="tablet" />
        </section>
        <section>
          <img src={AIRPODS} alt="airpods" />
        </section>
      </Carousel>
    </div>
  )
}

export default App
