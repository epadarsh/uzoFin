import logo from '../../assets/logo/logo.png'
import logoSmall from '../../assets/logo/logo-small.png'

/**
 * "UzOFin" logo mark, rendered from the brand image assets.
 * Use `size="small"` (default) for the compact header/nav lockup,
 * or `size="large"` for the larger footer wordmark.
 */
export default function Logo({ size = 'small', className = '' }) {
  const src = size === 'large' ? logo : logoSmall

  return (
    <img
      src={src}
      alt="UzOFin"
      className={`h-auto ${size === 'large' ? 'w-36' : 'w-28'} ${className}`}
    />
  )
}
