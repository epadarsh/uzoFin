import logo from '../../assets/logo/logo.png'
import logoSmall from '../../assets/logo/logo-small.png'

/**
 * "UzOFin" logo mark, rendered from the brand image assets.
 * Use `size="small"` (default) for the compact header/nav lockup,
 * or `size="large"` for the larger footer wordmark.
 *
 * @param {object} props
 * @param {'small' | 'large'} [props.size='small'] - which pre-exported asset/width to use.
 * @param {string} [props.className] - extra classes merged onto the <img>.
 */
export default function Logo({ size = 'small', className = '' }) {
  // Pick the pre-sized asset rather than scaling one image, so the small
  // header logo stays crisp instead of being a downscaled large PNG.
  const src = size === 'large' ? logo : logoSmall

  return (
    <img
      src={src}
      alt="UzOFin"
      className={`h-auto ${size === 'large' ? 'w-36' : 'w-28'} ${className}`}
    />
  )
}
