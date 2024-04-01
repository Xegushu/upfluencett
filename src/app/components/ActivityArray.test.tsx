import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ActivityArray from './ActivityArray'

describe('ActivityArray component', () => {
  const mockPosts = [
    { id: 1, timestamp: 1617000000 },
    { id: 2, timestamp: 1617100000 }
  ]

  describe('ActivityArray component (snapshot)', () => {
    it('should render the component with basic data', () => {
      const { asFragment } = render(<ActivityArray keyName="feed1" posts={mockPosts} />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('ActivityArray component', () => {
    it('should render the title based on props', () => {
      render(<ActivityArray keyName="example_post" posts={mockPosts} />)
      expect(screen.getByText('Example Posts')).toBeInTheDocument()
    })
  })
})
