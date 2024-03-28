import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/profile')({
  component: () => <div>Hello /_authenticated/profile!</div>
})