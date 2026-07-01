import LogoAsset from '../assets/logo.svg'

const Logo = ({ width = 200, height = 'auto' }) => {
    return (
        <img
            src={LogoAsset}
            alt="Pilah Pinter"
            width={width}
            height={height}
            className="max-w-full h-auto"
            style={{ objectFit: 'contain' }}
        />
    )
}

export default Logo

