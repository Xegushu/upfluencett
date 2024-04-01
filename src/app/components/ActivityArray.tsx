import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { Bubble } from 'react-chartjs-2'

ChartJS.register(LinearScale, PointElement, Tooltip)

interface Post {
  id: number
  timestamp: number
}

interface Props {
  keyName: string
  posts: Post[]
}

interface GraphDataItem {
  y: number
  x: number
  r: number
}

function formatTitle (input: string): string {
  let formattedString = input.replace(/_/g, ' ')
  formattedString = formattedString.replace(/\b\w/g, (match) => match.toUpperCase())
  formattedString += 's'

  return formattedString
}

function formatXTicks (value: number | string): number | string {
  if (typeof value !== 'number') return ''
  if (value < 0 || value > 23) return ''
  if (value === 0) return '12am'
  if (value === 12) return '12pm'
  return value % 12
}

function formatYTicks (value: number | string): string {
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  if (typeof value !== 'number') return ''
  if (value < 0 || value > 6) return ''
  return dayOfWeek[value]
}

function convertTimestamp (timestamp: number): { dayOfWeek: number, hour: number } {
  const date = new Date(timestamp * 1000)
  const dayOfWeek = date.getDay()
  const hour = date.getHours()
  return { dayOfWeek, hour }
}

function generateGraphData (posts: Post[]): GraphDataItem[] {
  const graphData: GraphDataItem[] = []

  for (const post of posts) {
    const { dayOfWeek, hour } = convertTimestamp(post.timestamp)
    const entryIndex = graphData.findIndex(e => e.y === dayOfWeek && e.x === hour)

    if (entryIndex === -1) {
      graphData.push({ x: hour, y: dayOfWeek, r: 1 })
    } else {
      graphData[entryIndex].r++
    }
  }

  return graphData
}

const ActivityArray: React.FC<Props> = ({ keyName, posts }) => {
  const data: ChartData<'bubble'> = {
    datasets: [{
      label: 'Posts',
      data: generateGraphData(posts),
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }]
  }
  const options: ChartOptions<'bubble'> = {
    scales: {
      x: {
        max: 24,
        min: -1,
        ticks: {
          stepSize: 1,
          callback: formatXTicks
        }
      },
      y: {
        max: 7,
        min: -1,
        ticks: {
          callback: formatYTicks
        }
      }
    },
    layout: {
      padding: 0
    }
  }

  return (
        <div
        className="bg-white shadow-md rounded-lg overflow-hidden p-4 m-4 min-w-[690px] max-w-3xl"
        >
            <h2 className="text-xl font-bold text-gray-800">
                {formatTitle(keyName)}
            </h2>
            <Bubble data={data} options={options} />
        </div>
  )
}

export default ActivityArray
