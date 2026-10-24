<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Database types

Derive database types from the Drizzle schema - never hand-write custom or partial
shapes for table rows. Export 'typeof table. $inferSelect' (and '$inferInsert when
needed) from lib/schema.ts' and import it. When a consumer needs only some
columns, narrow with 'Pick<Row, ... >' / Omit<Row, ... >' rather than redeclaring a
literal type. Don't add an insert type where 'db.insert( ... ).values()' already
enforces the shape.

<!-- TRIGGER.DEV SKILLS START -->
## Trigger.dev agent skills

This project has Trigger.dev agent skills installed in `.agents/skills/`. Before writing or changing Trigger.dev code (background tasks, scheduled tasks, realtime, or chat.agent AI agents), load the most relevant skill: `trigger-chat-agent-advanced`, `trigger-cost-savings`, `trigger-getting-started`, `trigger-realtime-and-frontend`, `trigger-authoring-chat-agent`, `trigger-authoring-tasks`.
<!-- TRIGGER.DEV SKILLS END -->

# React Flow

Do not rely on training data for React Flow APIs, components, hooks, types, or general usage. Always consult and search `https://reactflow.dev/llm.txt` before implementing, modifying, or referencing React Flow code.
