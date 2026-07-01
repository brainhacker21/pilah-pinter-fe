import LogoAsset from '../assets/logo.svg'

const Logo = ({ width = 200, height = 100 }) => {
    return (
        <img
            src={LogoAsset}
            alt="Pilah Pinter"
            width={width}
            height={height}
            style={{ objectFit: 'contain' }}
        />
    )
}

export default Logo

