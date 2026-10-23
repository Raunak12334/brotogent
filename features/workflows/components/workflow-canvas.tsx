"use client"

import { useCallback } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Edge,
  type OnConnect,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 150 },
    data: { label: "Start" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 350, y: 150 },
    data: { label: "Step 1" },
  },
  {
    id: "3",
    position: { x: 600, y: 150 },
    data: { label: "End" },
    type: "output",
  },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
]

export function WorkflowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback<OnConnect>(
    (connection) => setEdges((eds: Edge[]) => addEdge(connection, eds)),
    [setEdges],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      proOptions={{ hideAttribution: true }}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}
