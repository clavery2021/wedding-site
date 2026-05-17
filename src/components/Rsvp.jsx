import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClient } from '@supabase/supabase-js'

// Supabase client — publishable key is safe to expose in frontend.
// RLS policy allows inserts but blocks all reads.
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

export default function Rsvp() {
  // Attendance state lives outside react-hook-form so the toggle always
  // has a clear source of truth and never gets stale after form resets.
  const [attending, setAttending] = useState('yes')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // When conditional fields unmount they are removed from the form values,
    // so their stale values are never included in the submission payload.
    shouldUnregister: true,
  })

  const onSubmit = async (data) => {
    setStatus('loading')

    // Enforce minimum 900ms loading feel per the design spec
    const [result] = await Promise.all([
      supabase.from('rsvps').insert({
        name: data.name.trim(),
        attending: attending === 'yes',
        guest_count: attending === 'yes' ? parseInt(data.guest_count, 10) : null,
        dietary: attending === 'yes' ? (data.dietary?.trim() || null) : null,
      }),
      new Promise((resolve) => setTimeout(resolve, 900)),
    ])

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

          {/* ── Full name — always required ── */}
          <div className="form-group">
            <label className="form-label" htmlFor="rsvp-name">
              Full Name
            </label>
            <input
              id="rsvp-name"
              className="form-input"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              {...register('name', {
                required: 'Please enter your name',
                validate: (v) =>
                  v.trim().length > 0 || 'Please enter your name',
              })}
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

          {/* ── Conditional fields — only shown when attending ── */}
          {attending === 'yes' && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-guests">
                  Number of Guests
                </label>
                <select
                  id="rsvp-guests"
                  className="form-select"
                  {...register('guest_count', { required: true })}
                  defaultValue="1"
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-dietary">
                  Dietary Requirements
                </label>
                <textarea
                  id="rsvp-dietary"
                  className="form-textarea"
                  placeholder="Any allergies or dietary needs? Leave blank if none."
                  {...register('dietary')}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending\u2026' : 'Send RSVP'}
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
