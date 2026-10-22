Create a WorkflowShell component in features/workflows/components/ that takes a workflowId and is the layout shell for the workflow editor, then render it from the workflow page.tsx at app/(dashboard)/workflows/[id]/page.tsx.

Build it in this one file with the Resizable components from components/ui/resizable.tsx, using rem values for every size (this component sizes in rem, not percentages). The layout is a horizontal ResizablePanelGroup that fills the space (size-full) with two panels and a handle between them.

Left panel: the primary column with minSize 30rem. Inside it is a vertical ResizablePanelGroup split into two panels with a handle between them. The top panel has minSize 18rem for the canvas placeholder. The bottom panel has defaultSize 8rem and minSize 6rem for the logs placeholder.

Right panel: the inspector with defaultSize 16rem, minSize 14rem, and maxSize 36rem.

Put a simple label in each panel as placeholder content (Canvas, Logs, Inspector). No sub-components and no data fetching yet.
