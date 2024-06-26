import clsx from 'clsx'

import { Icon } from '../components/Icon'

const styles = {
  note: {
    container:
      'bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-sky-900 dark:text-sky-400',
    body: 'text-sky-800 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300 prose-a:text-sky-900 [--tw-prose-background:theme(colors.sky.50)]',
  },
  warning: {
    container:
      'bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 prose-code:text-amber-900 prose-a:text-amber-900 [--tw-prose-underline:theme(colors.amber.400)] dark:[--tw-prose-underline:theme(colors.sky.700)] [--tw-prose-background:theme(colors.amber.50)] dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  abstract: {
    container:
      'bg-zinc-50 dark:bg-zinc-800/60 dark:ring-1 dark:ring-zinc-300/10',
    title: 'text-zinc-900 dark:text-zinc-400',
    body: 'text-zinc-800 prose-code:text-zinc-900 prose-a:text-zinc-900 [--tw-prose-underline:theme(colors.zinc.400)] dark:[--tw-prose-underline:theme(colors.sky.700)] [--tw-prose-background:theme(colors.zinc.50)] dark:text-zinc-300 dark:prose-code:text-zinc-300 text-lg',
  },
}

const icons = {
  note: (props) => <Icon icon="lightbulb" {...props} />,
  warning: (props) => <Icon icon="warning" color="amber" {...props} />,
  abstract: (props) => <Icon icon="presets" color="zinc" {...props} />,
}

export function Callout({ type = 'note', title, children }) {
  let IconComponent = icons[type]

  return (
    <div className={clsx('not-prose my-8 flex rounded-3xl p-6', styles[type].container)}>
      <IconComponent className="flex-none w-8 h-8" />
      <div className="flex-auto ml-4">
        <p className={clsx('m-0 font-display text-xl', styles[type].title)}>
          {title}
        </p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>
          {children}
        </div>
      </div>
    </div>
  )
}
