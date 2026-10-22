interface WorkflowPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { id } = await params
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 text-foreground">
      <p className="text-sm text-muted-foreground">
        Workflow: <span className="font-medium text-foreground">{id}</span>
      </p>
    </main>
  )
}
