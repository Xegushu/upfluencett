import React, { useState, useEffect } from 'react'
import ActivityArray from './ActivityArray'
import { config } from '../config'
import Loader from './Loader/Loader'

type SseItem = Record<string, { id: number, timestamp: number }>

type ParsedData = Record<string, Array<{ id: number, timestamp: number }>>

function parseSseData (SseItem: SseItem, ParsedData: ParsedData): ParsedData {
  const key = Object.keys(SseItem)[0]

  if (ParsedData[key] !== undefined) {
    ParsedData[key].push(SseItem[key])
  } else {
    ParsedData[key] = [SseItem[key]]
  }

  return ParsedData
}

const SSEComponent: React.FC = () => {
  const [data, setData] = useState<ParsedData>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let eventSource: EventSource | null = null

    try {
      eventSource = new EventSource(config.sseUrl)

      eventSource.onmessage = (event: MessageEvent) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newData: SseItem = JSON.parse(event.data)
          setData(parseSseData(newData, data))
        } catch (error) {
          console.error('Error parsing SSE data:', error)
          setError('Failed to process data from server.')
        }
      }

      eventSource.onerror = (error: Event) => {
        console.error('SSE error:', error)
        setError('Error connecting to server.')
      }
    } catch (error) {
      console.error('Error creating SSE connection:', error)
      setError('Failed to connect to server.')
    }

    return () => {
      if (eventSource !== null) {
        eventSource.close()
      }
    }
  }, [data])

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({ ...prevData }))
    }, config.refreshTime)

    return () => { clearInterval(interval) }
  }, [])

  return (
        <>
            {(Object.keys(data).length === 0) && error === null && <Loader />}
            {error !== null && <div className="p-4 bg-red-500 text-white rounded-lg shadow-md font-medium mb-6">{error}</div>}
            <div className='flex flex-wrap justify-evenly pt-4'>
                {Object.entries(data).map(([key, value]) => (
                    <ActivityArray key={key} keyName={key} posts={value} />
                ))}
            </div>
        </>
  )
}

export default SSEComponent
