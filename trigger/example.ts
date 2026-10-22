import { task } from "@trigger.dev/sdk"

export const helloWorldTask = task({
  id: "hello-world",
  maxDuration: 300,
  run: async (payload: { name: string }) => {
    console.log(`Hello, ${payload.name}!`)
    return { message: `Hello, ${payload.name}!` }
  },
})
