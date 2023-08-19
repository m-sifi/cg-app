import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { TypesettingFunction } from 'better-react-mathjax/MathJaxContext/MathJaxContext'
import { error } from 'console'

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
    <div className={className}>
      <MathJaxContext version={3} config={config}>
        <MathJax inline dynamic>
          {text}
        </MathJax>
      </MathJaxContext>
    </div>
  )
}

export { Equation }
