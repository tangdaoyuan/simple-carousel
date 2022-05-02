import type { ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

interface ICarousel {
  // ... other options
  children: ReactNode | ReactNode[]
}

function normalizeChildren(children: ICarousel['children']) {
  let _children = []
  if (!Array.isArray(children))
    _children.push(children)
  else
    _children = children

  return _children.map((child, ind) => {
    return (
      <div key={ind} className="carousel-lite__slide">{child}</div>
    )
  })
}

function generateSlick(length: number, currentStep: number) {
  return (
    <ul>
      {
        new Array(length).fill(0).map((_, index) => (
          <li
            key={index}
            className={`carousel-lite__dot ${index === currentStep ? 'running' : 'paused'}`}
          />
        ))
      }
    </ul>
  )
}

function Carousel(_props: ICarousel) {
  const ref = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(0)

  const children = normalizeChildren(_props.children)
  const slickNodes = generateSlick(children.length, step)

  function animation() {
    // remove prev slick animation
    // start slick animation
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      let _step = step
      if (step === children.length - 1)
        _step = -1
      _step = _step + 1
      setStep(_step)
    }, 5000)
  }

  useEffect(() => {
    if (!ref.current)
      return

    const { width } = ref.current.getBoundingClientRect()
    slidesRef.current!.style.transform = `translateX(-${step * width}px)`
    // update timer
    animation()
  }, [step])

  useEffect(() => {
    if (!ref.current)
      return
    animation()

    return () => {
      if (timer)
        clearTimeout(timer.current)
    }
  }, [])

  return (
    <div ref={ref} className="carousel-lite">
      <main ref={slidesRef} className="carousel-lite__slides">
        {children}
      </main>
      <footer className="carousel-lite__dots">
        {
          slickNodes
        }
      </footer>
    </div>
  )
}

export default Carousel
