import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, imageUrl } from '../lib/api'
import type { Release, ScheduleDay } from '../lib/types'
import Row from '../components/Row'
import { GridSkeleton } from '../components/Skeleton'
import { Link } from 'react-router-dom'

export default function Home() {
  const [latest, setLatest] = useState<Release[] | null>(null)
  const [recommended, setRecommended] = useState<Release[] | null>(null)
  const [today, setToday] = useState<ScheduleDay[] | null>(null)

  useEffect(() => {
    api.latest(21).then(setLatest).catch(() => setLatest([]))
    api.recommended(14).then(setRecommended).catch(() => setRecommended([]))
    api.scheduleNow().then((s) => setToday(s.today)).catch(() => setToday([]))
  }, [])

  const hero = latest?.[0]

  if (!latest) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6 h-[380px] w-full animate-pulse rounded-xl bg-white/5" />
        <GridSkeleton count={12} />
      </div>
    )
  }

  return (
    <div>
      {hero && (
        <div className="relative h-[380px] w-full overflow-hidden">
          <motion.img
            src={imageUrl(hero.poster?.optimized?.preview || hero.poster?.preview)}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-8"
          >
            <span className="mb-2 w-fit rounded bg-accent px-2 py-0.5 text-xs font-bold uppercase">
              Новинка
            </span>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight drop-shadow">
              {hero.name.main}
            </h1>
            <p className="mt-2 max-w-xl line-clamp-2 text-sm text-white/60">{hero.description}</p>
            <Link
              to={`/title/${hero.alias || hero.id}`}
              className="mt-4 w-fit rounded-full bg-accent px-5 py-2 text-sm font-semibold transition-colors hover:bg-accent-hover"
            >
              Смотреть
            </Link>
          </motion.div>
        </div>
      )}

      <Row title="Онгоинги сегодня" releases={today?.map((s) => s.release).filter(Boolean) ?? []} />
      <Row title="Последние обновления" releases={latest} />
      <Row title="Рекомендуем" releases={recommended ?? []} />
    </div>
  )
}
