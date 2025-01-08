import { Stage, Layer, Rect } from 'react-konva'

const Visual = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={100}
          height={100}
          fill='white'
          stroke='red'
          strokeWidth={2}
        />
      </Layer>
    </Stage>
  )
}

export default Visual
