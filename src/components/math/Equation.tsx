'use client'
import { MathJax, MathJaxContext } from 'better-react-mathjax'

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

  if (text === '') text = ' '

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

export { Equation }
