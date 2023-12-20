import CodeEditor from '@uiw/react-textarea-code-editor'
import JsonView from '@uiw/react-json-view'
import { styleBox } from '@/lib/utils/styleBox'
import { Button } from './ui/button'
import CopyIcon from './CopyIcon'

interface OutputBoxProps {
  outputYaml: boolean
  outputValue: string
}

export default function OutputBox({ outputYaml, outputValue }: OutputBoxProps) {
  
  function handleCopyClipboard() {
    if (outputYaml) {
      navigator.clipboard.writeText(outputValue)
    } else {
      navigator.clipboard.writeText(JSON.stringify(outputValue, null, 2))
    }
  }

  return (
    <div className='relative w-full'>
      <h3 className='mb-2'>Output:</h3>
      {outputYaml
        ? (<CodeEditor
          style={styleBox}
          value={outputValue}
          language='yaml'
          className='resize-none'
        />)
        : (<JsonView
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          typeof=''
          value={Object(outputValue)}
          className='resize-none'
          style={{
            ...styleBox,
            padding: 10
          }}
        />)
      }
      <Button
        size='icon'
        type='button'
        className='absolute top-10 right-6 active:bg-primary/50'
        onClick={handleCopyClipboard}
      >
        <CopyIcon className='w-5' />
      </Button>
    </div>
  )
}