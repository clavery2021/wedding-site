import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClient } from '@supabase/supabase-js'

// Singleton — created once on first call, reused after that.
// Lazy so a missing env var doesn't crash the page on load.
let _supabase = null
function getSupabase() {
  if (_supabase) return _supabase
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key || url.includes('your-project')) {
    throw new Error('Supabase env vars are not configured.')
  }
  _supabase = createClient(url, key)
  return _supabase
}

export default function Rsvp() {
  const [attending, setAttending] = useState('yes')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: { guest_count: '1' },
  })

  // Watch guest count so name/dietary fields render dynamically
  const guestCount = parseInt(watch('guest_count') ?? '1', 10)

  const onSubmit = async (data) => {
    setStatus('loading')

    const count = parseInt(data.guest_count, 10)

    // Build a guest array — dietary only included when attending
    const guests = Array.from({ length: count }, (_, i) => ({
      name: data.guests?.[i]?.name?.trim() ?? '',
      ...(attending === 'yes' && {
        dietary: data.guests?.[i]?.dietary?.trim() || null,
      }),
    }))

    let result
    try {
      ;[result] = await Promise.all([
        getSupabase().from('rsvps').insert({
          attending: attending === 'yes',
          guest_count: count,
          guests,
        }),
        new Promise((resolve) => setTimeout(resolve, 900)),
      ])
    } catch (err) {
      console.error('Supabase setup error:', err)
      setStatus('error')
      return
    }

    if (result.error) {
      console.error('RSVP insert error:', result.error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <section className="section rsvp-section" id="rsvp">
        <div className="section-inner">
          <div className="rsvp-success">
            <p className="rsvp-success-heading">
              {attending === 'yes'
                ? "We can't wait to see you!"
                : "We'll miss you."}
            </p>
            <p className="rsvp-success-body">
              {attending === 'yes'
                ? 'Your RSVP has been received. See you on 3rd September!'
                : 'Thank you for letting us know. We hope to celebrate with you soon.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section rsvp-section" id="rsvp">
      <div className="section-inner">
        <p className="section-label">RSVP</p>
        <h2 className="section-title">
          Kindly <em>Reply</em>
        </h2>
        <div className="divider" />

        <p className="rsvp-intro">
          Please fill out the following RSVP for each guest on your invitation.
        </p>
        <p className="rsvp-deadline">Please respond by 1st August 2026</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* ── Attendance toggle ── */}
          <div className="form-group">
            <label className="form-label">Will you be joining us?</label>
            <div className="attendance-toggle">
              <button
                type="button"
                className={`att-btn${attending === 'yes' ? ' active' : ''}`}
                onClick={() => setAttending('yes')}
              >
                Joyfully accepts
              </button>
              <button
                type="button"
                className={`att-btn${attending === 'no' ? ' active' : ''}`}
                onClick={() => setAttending('no')}
              >
                Regretfully declines
              </button>
            </div>
          </div>

          {/* ── Number of guests — shown for both attending states ── */}
          <div className="form-group">
            <label className="form-label" htmlFor="rsvp-guest-count">
              Number of Guests
            </label>
            <select
              id="rsvp-guest-count"
              className="form-select"
              {...register('guest_count')}
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </div>

          {/* ── Per-guest fields ── */}
          {Array.from({ length: guestCount }, (_, i) => (
            <div className="guest-block" key={i}>
              {guestCount > 1 && (
                <p className="guest-block-label">Guest {i + 1}</p>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor={`guest-name-${i}`}>
                  {guestCount === 1 ? 'Full Name' : `Guest ${i + 1} Name`}
                </label>
                <input
                  id={`guest-name-${i}`}
                  className="form-input"
                  type="text"
                  placeholder="Full name"
                  autoComplete={i === 0 ? 'name' : 'off'}
                  {...register(`guests.${i}.name`, {
                    required: 'Please enter a name',
                    validate: (v) =>
                      (v && v.trim().length > 0) || 'Please enter a name',
                  })}
                />
                {errors.guests?.[i]?.name && (
                  <p className="form-error">{errors.guests[i].name.message}</p>
                )}
              </div>

              {/* Dietary only shown when attending */}
              {attending === 'yes' && (
                <div className="form-group">
                  <label className="form-label" htmlFor={`guest-dietary-${i}`}>
                    {guestCount === 1
                      ? 'Dietary Requirements'
                      : `Guest ${i + 1} Dietary Requirements`}
                  </label>
                  <textarea
                    id={`guest-dietary-${i}`}
                    className="form-textarea"
                    placeholder="Any allergies or dietary needs? Leave blank if none."
                    {...register(`guests.${i}.dietary`)}
                  />
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="submit-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending…' : 'Send RSVP'}
          </button>

          {status === 'error' && (
            <p className="rsvp-submit-error">
              Something went wrong — please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
