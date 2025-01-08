import Drawing from 'dxf-writer'

export function generateDxf(): string {
  const d = new Drawing()

  // Cut Layer
  d.drawLine(0, 0, 110, 100)

  return d.toDxfString()
}
