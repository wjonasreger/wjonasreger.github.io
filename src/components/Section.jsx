import { useId } from 'react'

export function Section({ title, children }) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40 mb-8"
    >
      <div className="grid max-w-3xl grid-cols-1 gap-y-4 md:grid-cols-4 mb-4 pb-4">
        <h2
          id={id}
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 pr-6"
        >
          {title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  )
}

export function BasicSection({ title, children }) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="md:pl-6 md:dark:border-zinc-700/40 mb-8"
    >
      <div className="grid max-w-5xl grid-cols-1 gap-y-4 md:grid-cols-4 mb-4 pb-4">
        <div className="col-span-4 md:col-span-4">
          <h2
            id={id}
            className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 pr-6 mb-4 md:mb-0"
          >
            {title}
          </h2>
        </div>
        <div className="md:col-span-4 md:pr-6">{children}</div>
      </div>

    </section>
  )
}