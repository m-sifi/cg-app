'use client'
import { MathJax, MathJaxBaseContext, MathJaxContext } from 'better-react-mathjax'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import katex from 'katex'

interface EquationProps {
  className?: string
  text?: string
}

const Equation = ({ text, className }: EquationProps) => {
  const config = {
    loader: { load: ['input/asciimath'] },
    asciimath: {
      delimiters: [
        ['$', '$'],
        ['`', '`'],
      ],
    },
  }

  return (
    <span className={className}>
      <MathJaxContext version={3} config={config}>
        <MathJax inline dynamic>
          {text}
        </MathJax>
      </MathJaxContext>
    </span>
  )
}

const KatexEquation = ({ text, className }: EquationProps) => {
  const ref = useRef<HTMLElement>(null!)

  useEffect(() => {
    return katex.render(text, ref.current, { throwOnError: false })
  }, [text])

  return <span className={className} ref={ref}></span>
}

export { Equation, KatexEquation }
